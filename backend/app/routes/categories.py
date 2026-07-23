from flask import Blueprint, request, jsonify
from app import db
from app.models.category import Category
from app.utils.logging import log_manager
from marshmallow import Schema, fields, validate, ValidationError

categories_bp = Blueprint('categories', __name__, url_prefix='/api/v1/categories')

class CategorySchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str(allow_none=True)
    icon = fields.Str(validate=validate.Length(max=50))
    color = fields.Str(validate=validate.Regexp(r'^#[0-9A-Fa-f]{6}$', error="Invalid color format"))

category_schema = CategorySchema()

@categories_bp.route('', methods=['GET'])
def get_categories():
    """Get all categories"""
    categories = Category.query.all()
    
    log_manager.log_info(f"Categories fetched: {len(categories)} total")
    
    return jsonify({
        'categories': [c.to_dict() for c in categories]
    }), 200

@categories_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    """Get a single category"""
    category = Category.query.get_or_404(category_id)
    
    log_manager.log_info(f"Category fetched: {category.name}")
    
    return jsonify({'category': category.to_dict()}), 200

@categories_bp.route('', methods=['POST'])
def create_category():
    """Create a new category"""
    try:
        data = category_schema.load(request.json)
    except ValidationError as e:
        log_manager.log_warning("Validation error", extra={'errors': e.messages})
        return jsonify({'error': 'Validation failed', 'details': e.messages}), 400
    
    # Check for duplicate name
    existing = Category.query.filter_by(name=data['name']).first()
    if existing:
        log_manager.log_warning(f"Duplicate category name: {data['name']}")
        return jsonify({'error': 'Category with this name already exists'}), 409
    
    category = Category(
        name=data['name'],
        description=data.get('description'),
        icon=data.get('icon', 'category'),
        color=data.get('color', '#6366f1')
    )
    
    db.session.add(category)
    db.session.commit()
    
    log_manager.log_info(f"Category created: {category.id}", extra={
        'category_name': category.name
    })
    
    return jsonify({
        'message': 'Category created successfully',
        'category': category.to_dict()
    }), 201

@categories_bp.route('/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    """Update a category"""
    category = Category.query.get_or_404(category_id)
    
    try:
        data = category_schema.load(request.json, partial=True)
    except ValidationError as e:
        return jsonify({'error': 'Validation failed', 'details': e.messages}), 400
    
    for field, value in data.items():
        setattr(category, field, value)
    
    db.session.commit()
    
    log_manager.log_info(f"Category updated: {category_id}")
    
    return jsonify({
        'message': 'Category updated successfully',
        'category': category.to_dict()
    }), 200

@categories_bp.route('/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    """Delete a category (only if no expenses linked)"""
    category = Category.query.get_or_404(category_id)
    
    if category.expenses.count() > 0:
        log_manager.log_warning(f"Cannot delete category with expenses: {category_id}")
        return jsonify({'error': 'Cannot delete category with linked expenses'}), 400
    
    db.session.delete(category)
    db.session.commit()
    
    log_manager.log_info(f"Category deleted: {category_id}")
    
    return jsonify({'message': 'Category deleted successfully'}), 200