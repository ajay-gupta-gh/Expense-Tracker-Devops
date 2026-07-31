#!/bin/sh

set -e

echo "Generating nginx configuration..."

envsubst '${BACKEND_HOST} ${BACKEND_PORT}' \
< /etc/nginx/templates/default.conf.template \
> /etc/nginx/conf.d/default.conf

echo "Backend: ${BACKEND_HOST}:${BACKEND_PORT}"

exec nginx -g "daemon off;"