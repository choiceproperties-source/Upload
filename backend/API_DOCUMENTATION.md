# Choice Properties - API Documentation

## Base URL
```
Development: http://localhost:3000
Production: https://api.choiceproperties.com
```

---

## Authentication

### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### JWT Token
- Issued on user login
- Expires after 24 hours
- Include in Authorization header for protected routes

---

## Endpoints

### 1. TENANT APPLICATIONS

#### Submit Application
```
POST /api/applications/submit
Content-Type: application/json

Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "5551234567",
  "ssn": "123456789",
  "dob": "1990-01-15",
  "employmentStatus": "employed",
  "employer": "Tech Corp",
  "jobTitle": "Engineer",
  "annualIncome": 75000,
  "employmentStartDate": "2021-06-01",
  "reference1Name": "Jane Smith",
  "reference1Phone": "5559876543",
  "reference2Name": "Bob Johnson",
  "reference2Phone": "5552223333",
  "desiredMoveDate": "2025-02-01",
  "propertyId": "prop123"
}

Response (201 Created):
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "APP-abc123xyz-random",
  "application": { /* full application object */ }
}

Errors:
- 400: Validation failed (check required fields)
- 429: Too many applications (rate limited)
- 500: Server error
```

#### Get Application
```
GET /api/applications/get/:applicationId

Response (200 OK):
{
  "success": true,
  "application": { /* application details */ }
}

Errors:
- 404: Application not found
```

#### Get User Applications (Protected)
```
GET /api/applications/user/:userId
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "applications": [{ /* array of applications */ }]
}

Errors:
- 401: Not authenticated
```

#### Get All Applications (Admin Only)
```
GET /api/applications/all
Authorization: Bearer <admin_token>

Response (200 OK):
{
  "success": true,
  "count": 42,
  "applications": [{ /* all applications */ }]
}
```

#### Update Application Status (Admin Only)
```
PUT /api/applications/update/:applicationId
Authorization: Bearer <admin_token>

Body:
{
  "status": "screening",
  "backgroundCheckStatus": "passed"
}

Response (200 OK):
{
  "success": true,
  "message": "Application status updated",
  "application": { /* updated application */ }
}
```

---

### 2. PAYMENTS

#### Initiate Payment
```
POST /api/payments/initiate
Content-Type: application/json

Body:
{
  "amount": 29.99,
  "description": "Application Fee",
  "cardholderName": "John Doe",
  "cardLastFour": "4242",
  "email": "john@example.com",
  "userId": "user123"
}

Response (201 Created):
{
  "success": true,
  "message": "Payment initiated",
  "transactionId": "TXN-1234567890-abc123",
  "payment": { /* payment object */ }
}

Errors:
- 400: Validation failed (amount must be $0.01-$100,000)
- 429: Too many attempts (rate limited)
```

#### Process Payment
```
POST /api/payments/process
Content-Type: application/json

Body:
{
  "transactionId": "TXN-1234567890-abc123",
  "email": "john@example.com"
}

Response (200 OK):
{
  "success": true,
  "message": "Payment completed successfully",
  "transactionId": "TXN-1234567890-abc123",
  "status": "completed"
}

Response (402 Payment Required):
{
  "success": false,
  "message": "Payment authorization failed",
  "transactionId": "TXN-1234567890-abc123",
  "status": "failed"
}

Errors:
- 404: Payment not found
- 429: Too many attempts
```

#### Get Payment Status
```
GET /api/payments/status/:transactionId

Response (200 OK):
{
  "success": true,
  "payment": {
    "transactionId": "TXN-...",
    "status": "completed",
    "amount": 29.99,
    "createdAt": "2025-01-20T10:30:00Z"
  }
}
```

#### Get User Payments (Protected)
```
GET /api/payments/user/:userId
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "payments": [{ /* user's payments */ }]
}
```

#### Get All Payments (Admin Only)
```
GET /api/payments/all
Authorization: Bearer <admin_token>

Response (200 OK):
{
  "success": true,
  "count": 156,
  "payments": [{ /* all payments */ }]
}
```

---

### 3. NEWSLETTER

#### Subscribe
```
POST /api/newsletter/subscribe
Content-Type: application/json

Body:
{
  "email": "user@example.com"
}

Response (201 Created):
{
  "success": true,
  "message": "Subscribed successfully",
  "subscriber": {
    "email": "user@example.com",
    "subscriptionStatus": "active",
    "subscribedAt": "2025-01-20T10:30:00Z"
  }
}

Errors:
- 400: Valid email required
- 429: Too many subscriptions (rate limited)
```

#### Unsubscribe
```
POST /api/newsletter/unsubscribe
Content-Type: application/json

Body:
{
  "email": "user@example.com"
}

Response (200 OK):
{
  "success": true,
  "message": "Unsubscribed successfully"
}
```

#### Update Preferences (Protected)
```
PUT /api/newsletter/preferences
Authorization: Bearer <token>

Body:
{
  "email": "user@example.com",
  "frequency": "daily",
  "preferences": {
    "newListings": true,
    "marketTrends": true,
    "tips": false,
    "promotions": false
  }
}

Response (200 OK):
{
  "success": true,
  "message": "Preferences updated",
  "subscriber": { /* updated subscriber */ }
}
```

#### Get Subscriber
```
GET /api/newsletter/get/:email

Response (200 OK):
{
  "success": true,
  "subscriber": { /* subscriber details */ }
}
```

#### Get All Subscribers (Admin Only)
```
GET /api/newsletter/all
Authorization: Bearer <admin_token>

Response (200 OK):
{
  "success": true,
  "count": 5432,
  "subscribers": [{ /* all active subscribers */ }]
}
```

---

## Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check request format and validation |
| 401 | Unauthorized | Add valid JWT token |
| 402 | Payment Required | Payment processing failed |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limited - wait and retry |
| 500 | Server Error | Contact support |

---

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| POST /applications/submit | 3 per hour |
| POST /payments/initiate | 3 per 10 minutes |
| POST /payments/process | 3 per 10 minutes |
| POST /newsletter/subscribe | 2 per hour |

**Response when rate limited:**
```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "statusCode": 429
}
```

---

## Error Responses

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Valid email is required",
    "Valid SSN (9 digits) is required"
  ],
  "statusCode": 400,
  "timestamp": "2025-01-20T10:30:00Z"
}
```

### Authentication Error
```json
{
  "success": false,
  "message": "Not authorized",
  "statusCode": 401,
  "timestamp": "2025-01-20T10:30:00Z"
}
```

### Server Error
```json
{
  "success": false,
  "message": "An error occurred",
  "statusCode": 500,
  "timestamp": "2025-01-20T10:30:00Z"
}
```

---

## Testing with cURL

### Subscribe to Newsletter
```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Submit Application
```bash
curl -X POST http://localhost:3000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "phone":"5551234567",
    "ssn":"123456789",
    "dob":"1990-01-15",
    "employmentStatus":"employed",
    "reference1Name":"Jane",
    "reference1Phone":"5559876543",
    "desiredMoveDate":"2025-02-01"
  }'
```

### Process Payment
```bash
curl -X POST http://localhost:3000/api/payments/process \
  -H "Content-Type: application/json" \
  -d '{
    "transactionId":"TXN-1234567890-abc123",
    "email":"john@example.com"
  }'
```

---

## Support

For issues or questions:
- Email: support@choiceproperties.com
- Phone: +1 (234) 567-8900
- Docs: https://docs.choiceproperties.com
