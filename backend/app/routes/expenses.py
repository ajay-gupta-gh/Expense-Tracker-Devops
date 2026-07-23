from flask import Blueprint, request, jsonify
from app import db
from app.models.expense import Expense
from app.models.category import Category
from app.utils.logging import log_manager, log_execution_time
from app.utils.helpers import parse_date
from datetime import datetime, timedelta
from sqlalchemy import func, desc
from marshmallow import Schema, fields, validate, ValidationError

expenses_bp = Blueprint('expenses', __name__, url_prefix='/api/v1/expenses')


class ExpenseSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    amount = fields.Float(required=True, validate=validate.Range(min=0.01))
    description = fields.Str(allow_none=True)
    date = fields.Date(required=True)
    category_id = fields.Int(required=True)
    payment_method = fields.Str(
        validate=validate.OneOf(
            ['cash', 'card', 'bank_transfer', 'digital_wallet']
        )
    )


expense_schema = ExpenseSchema()


@expenses_bp.route('', methods=['GET'])
def get_expenses():
    """
    Get all expenses with optional filtering and pagination
    Query params: page, per_page, category_id, start_date, end_date, sort_by, order
    """

    log_manager.log_info("Fetching expenses", extra={
        'query_params': dict(request.args)
    })

    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    per_page = min(per_page, 100)

    # Filters
    query = Expense.query

    category_id = request.args.get('category_id', type=int)

    if category_id:
        query = query.filter(Expense.category_id == category_id)

    start_date = request.args.get('start_date')

    if start_date:
        try:
            start_date = parse_date(start_date)
            query = query.filter(Expense.date >= start_date)
        except ValueError as e:
            log_manager.log_warning(
                f"Invalid start_date format: {start_date}"
            )

    end_date = request.args.get('end_date')

    if end_date:
        try:
            end_date = parse_date(end_date)
            query = query.filter(Expense.date <= end_date)
        except ValueError as e:
            log_manager.log_warning(
                f"Invalid end_date format: {end_date}"
            )

    # Sorting
    sort_by = request.args.get('sort_by', 'date')
    order = request.args.get('order', 'desc')

    sort_column = getattr(Expense, sort_by, Expense.date)

    if order == 'desc':
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(sort_column)

    # Execute query
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    log_manager.log_info("Expenses fetched successfully", extra={
        'total': pagination.total,
        'page': page,
        'per_page': per_page
    })

    return jsonify({
        'expenses': [e.to_dict() for e in pagination.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': pagination.total,
            'pages': pagination.pages,
            'has_next': pagination.has_next,
            'has_prev': pagination.has_prev
        }
    }), 200


@expenses_bp.route('/<int:expense_id>', methods=['GET'])
def get_expense(expense_id):
    """Get a single expense by ID"""

    expense = Expense.query.get_or_404(expense_id)

    log_manager.log_info(f"Expense fetched: {expense_id}")

    return jsonify({
        'expense': expense.to_dict()
    }), 200


@expenses_bp.route('', methods=['POST'])
def create_expense():
    """
    Create a new expense
    Request body: {title, amount, description, date, category_id, payment_method}
    """

    try:
        data = expense_schema.load(request.json)

    except ValidationError as e:
        log_manager.log_warning(
            "Validation error",
            extra={'errors': e.messages}
        )

        return jsonify({
            'error': 'Validation failed',
            'details': e.messages
        }), 400


    # Verify category exists
    category = Category.query.get(data['category_id'])

    if not category:
        log_manager.log_warning(
            f"Invalid category_id: {data['category_id']}"
        )

        return jsonify({
            'error': 'Category not found'
        }), 404


    expense = Expense(
        title=data['title'],
        amount=data['amount'],
        description=data.get('description'),
        date=data['date'],
        category_id=data['category_id'],
        payment_method=data.get('payment_method', 'cash')
    )

    db.session.add(expense)
    db.session.commit()


    log_manager.log_info(
        f"Expense created: {expense.id}",
        extra={
            'expense_id': expense.id,
            'amount': float(expense.amount),
            'category': category.name
        }
    )


    return jsonify({
        'message': 'Expense created successfully',
        'expense': expense.to_dict()
    }), 201


@expenses_bp.route('/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):
    """Update an existing expense"""

    expense = Expense.query.get_or_404(expense_id)

    try:
        data = expense_schema.load(
            request.json,
            partial=True
        )

    except ValidationError as e:
        log_manager.log_warning(
            "Validation error on update",
            extra={'errors': e.messages}
        )

        return jsonify({
            'error': 'Validation failed',
            'details': e.messages
        }), 400


    for field, value in data.items():
        setattr(expense, field, value)


    db.session.commit()


    log_manager.log_info(
        f"Expense updated: {expense_id}",
        extra={
            'updated_fields': list(data.keys())
        }
    )


    return jsonify({
        'message': 'Expense updated successfully',
        'expense': expense.to_dict()
    }), 200


@expenses_bp.route('/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    """Delete an expense"""

    expense = Expense.query.get_or_404(expense_id)

    db.session.delete(expense)
    db.session.commit()

    log_manager.log_info(
        f"Expense deleted: {expense_id}"
    )

    return jsonify({
        'message': 'Expense deleted successfully'
    }), 200


@expenses_bp.route('/stats', methods=['GET'])
def get_expense_stats():
    """
    Get expense statistics
    Query params: start_date, end_date, category_id
    """

    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    category_id = request.args.get('category_id', type=int)


    query = db.session.query(
        func.count(Expense.id).label('count'),
        func.sum(Expense.amount).label('total'),
        func.avg(Expense.amount).label('average')
    )


    if start_date:
        try:
            query = query.filter(
                Expense.date >= parse_date(start_date)
            )

        except ValueError:
            pass


    if end_date:
        try:
            query = query.filter(
                Expense.date <= parse_date(end_date)
            )

        except ValueError:
            pass


    if category_id:
        query = query.filter(
            Expense.category_id == category_id
        )


    result = query.first()


    log_manager.log_info(
        "Expense stats fetched"
    )


    return jsonify({
        'stats': {
            'total_count': result.count or 0,
            'total_amount': float(result.total or 0),
            'average_amount': float(result.average or 0)
        }
    }), 200
