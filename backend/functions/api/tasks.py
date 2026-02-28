"""
Multi-tenant task API handler
Demonstrates SaaS Builder patterns:
- Tenant context from authorizer
- Role-based access control
- Tenant-prefixed database keys
"""
import json
import os
from datetime import datetime
from uuid import uuid4

def handler(event, context):
    """Lambda handler for task operations"""
    
    # 1. Extract tenant context from authorizer (injected by Lambda authorizer)
    tenant_id = event['requestContext']['authorizer']['tenantId']
    user_roles = event['requestContext']['authorizer']['roles']
    
    # 2. Route based on HTTP method
    method = event['httpMethod']
    
    if method == 'GET':
        return list_tasks(tenant_id, event.get('queryStringParameters', {}))
    elif method == 'POST':
        return create_task(tenant_id, json.loads(event['body']))
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': {'code': 'METHOD_NOT_ALLOWED', 'message': 'Method not allowed'}})
        }

def list_tasks(tenant_id, query_params):
    """List tasks for tenant (tenant-scoped query)"""
    # 3. All database operations prefixed with tenant ID
    # In real implementation, query DynamoDB with:
    # pk = f"{tenant_id}#Task"
    
    # Mock response
    tasks = [
        {
            'id': 'task-1',
            'title': 'Example Task',
            'description': 'This is a tenant-isolated task',
            'status': 'pending',
            'createdAt': datetime.utcnow().isoformat(),
            'tenantId': tenant_id
        }
    ]
    
    return {
        'statusCode': 200,
        'body': json.dumps(tasks)
    }

def create_task(tenant_id, body):
    """Create new task for tenant"""
    # 4. Validate input
    if 'title' not in body:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': {'code': 'INVALID_INPUT', 'message': 'Title is required'}})
        }
    
    # 5. Create task with tenant-prefixed key
    task_id = str(uuid4())
    task = {
        'id': task_id,
        'title': body['title'],
        'description': body.get('description', ''),
        'status': 'pending',
        'createdAt': datetime.utcnow().isoformat(),
        'tenantId': tenant_id
    }
    
    # In real implementation, save to DynamoDB with:
    # pk = f"{tenant_id}#Task#{task_id}"
    
    return {
        'statusCode': 201,
        'body': json.dumps(task)
    }
