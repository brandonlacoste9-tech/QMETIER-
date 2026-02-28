"""
Lambda authorizer - validates JWT and injects tenant context
This is the security boundary for multi-tenant isolation
"""
import json

def handler(event, context):
    """
    Validates JWT token and returns IAM policy with tenant context
    In production, verify JWT signature and extract claims
    """
    
    # Extract token from Authorization header
    token = event.get('authorizationToken', '').replace('Bearer ', '')
    
    # In production: verify JWT signature, check expiration, etc.
    # For demo, we'll mock the decoded token
    decoded_token = {
        'sub': 'user-123',
        'tenant_id': 'tenant-abc',
        'roles': ['user']
    }
    
    # Generate IAM policy
    policy = {
        'principalId': decoded_token['sub'],
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [{
                'Action': 'execute-api:Invoke',
                'Effect': 'Allow',
                'Resource': event['methodArn']
            }]
        },
        # CRITICAL: Inject tenant context into request
        'context': {
            'tenantId': decoded_token['tenant_id'],
            'userId': decoded_token['sub'],
            'roles': json.dumps(decoded_token['roles'])
        }
    }
    
    return policy
