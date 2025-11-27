# Testing Guide - Choice Properties Backend

## Setup for Testing

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create .env File
```bash
cp .env.example .env
```

**Fill in your credentials:**
```env
MONGODB_URL=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/choice-properties
JWT_SECRET=test_secret_key_min_32_characters
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development
```

### 3. Start Backend Server
```bash
npm run dev
```

Server should start on `http://localhost:3000`

---

## Test Cases

### TEST 1: Newsletter Subscription ✉️

**Objective:** Verify newsletter subscription flow

**Steps:**
1. Open Postman or terminal
2. Send POST request:
```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test1@example.com"}'
```

**Expected Results:**
✅ Response 201 (Created)
✅ `success: true`
✅ Email saved to MongoDB
✅ Confirmation email sent to inbox

**Test Variations:**
- Invalid email: `"email":"notanemail"` → Should fail with 400
- Duplicate email: Subscribe twice → Second should return success (already subscribed)
- Rate limit: Subscribe 3 times in 1 hour → 3rd should be blocked with 429

---

### TEST 2: Tenant Application Submission 🏠

**Objective:** Verify complete application flow

**Steps:**
1. Send POST request with valid data:
```bash
curl -X POST http://localhost:3000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john.doe@example.com",
    "phone":"5551234567",
    "ssn":"123456789",
    "dob":"1990-01-15T00:00:00Z",
    "employmentStatus":"employed",
    "employer":"Tech Corp",
    "jobTitle":"Engineer",
    "annualIncome":75000,
    "employmentStartDate":"2021-06-01T00:00:00Z",
    "reference1Name":"Jane Smith",
    "reference1Phone":"5559876543",
    "reference2Name":"Bob Johnson",
    "reference2Phone":"5552223333",
    "desiredMoveDate":"2025-02-01T00:00:00Z",
    "propertyId":"prop123"
  }'
```

**Expected Results:**
✅ Response 201 (Created)
✅ Unique Application ID generated (e.g., `APP-abc123-xyz`)
✅ Data saved to MongoDB with `status: 'submitted'`
✅ SSN encrypted (hash in database, not plaintext)
✅ Confirmation email sent

**Test Variations:**
- Missing required field (e.g., no firstName) → 400 with error list
- Invalid SSN (only 8 digits) → 400 "Valid SSN (9 digits) required"
- Invalid email format → 400 "Valid email required"
- Invalid phone (only 9 digits) → 400 "Valid phone number required"
- Submit 4 times in 1 hour → 4th blocked with 429 (rate limit)

**Retrieve Application:**
```bash
curl http://localhost:3000/api/applications/get/APP-abc123-xyz
```

---

### TEST 3: Payment Processing 💳

**Objective:** Verify complete payment flow

**Step 1: Initiate Payment**
```bash
curl -X POST http://localhost:3000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount":29.99,
    "description":"Application Fee",
    "cardholderName":"John Doe",
    "cardLastFour":"4242",
    "email":"john@example.com",
    "userId":"user123"
  }'
```

**Expected Results:**
✅ Response 201
✅ Unique Transaction ID generated
✅ Payment status: `pending`
✅ Data saved to MongoDB

**Step 2: Process Payment**
```bash
curl -X POST http://localhost:3000/api/payments/process \
  -H "Content-Type: application/json" \
  -d '{
    "transactionId":"TXN-1234567890-abc123",
    "email":"john@example.com"
  }'
```

**Expected Results (90% of time):**
✅ Response 200
✅ Status changes to `completed`
✅ All stages marked true
✅ Confirmation email sent

**Expected Results (10% of time - simulated failure):**
✅ Response 402 (Payment Required)
✅ Status: `failed`
✅ Error message provided

**Test Variations:**
- Negative amount: `"amount":-10` → 400 "Amount must be positive"
- Amount too high: `"amount":999999` → 400 "Amount must be ≤ $100,000"
- Invalid card last 4: `"cardLastFour":"abc"` → 400 validation error
- 4 payments in 10 min → 4th blocked with 429

**Check Payment Status:**
```bash
curl http://localhost:3000/api/payments/status/TXN-1234567890-abc123
```

---

### TEST 4: Input Validation & Security 🛡️

**Test Email Validation:**
```bash
# Valid
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Invalid
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"notanemail"}'
```

**Test SSN Validation:**
```bash
# Valid (9 digits)
"ssn":"123456789"

# Invalid (8 digits)
"ssn":"12345678"
```

**Test Phone Validation:**
```bash
# Valid (10 digits)
"phone":"5551234567"

# Invalid (9 digits)
"phone":"555123456"
```

**Test Amount Validation:**
```bash
# Valid
"amount":29.99

# Invalid (too low)
"amount":0.00

# Invalid (too high)
"amount":100001
```

---

### TEST 5: Rate Limiting ⚡

**Test Application Rate Limit (3/hour):**
```bash
# Run 4 times rapidly:
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/applications/submit \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test'$i'@example.com","phone":"5551234567","ssn":"123456789","dob":"1990-01-15","employmentStatus":"employed","reference1Name":"Ref","reference1Phone":"5559876543","desiredMoveDate":"2025-02-01"}'
  echo ""
done
```

**Expected:**
- Requests 1-3: Success (201)
- Request 4: Rate limited (429) with message "Too many applications"

**Test Payment Rate Limit (3/10min):**
```bash
# Make 4 payment attempts in quick succession
# 4th should get 429 response
```

---

### TEST 6: Database Integrity 🗄️

**Check MongoDB for Encrypted SSN:**
```javascript
// Connect to MongoDB and run:
db.applications.findOne();

// You should see:
// ssn: "$2b$10$..." (bcrypt hash, not plaintext)
```

**Check Indexes:**
```javascript
// Run in MongoDB:
db.applications.getIndexes();
db.payments.getIndexes();

// Should see indexes on:
// - _id (default)
// - applicationId
// - email
// - status
// - createdAt
```

---

### TEST 7: Error Handling 💥

**Test Missing Required Fields:**
```bash
curl -X POST http://localhost:3000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John"}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Last name is required",
    "Valid email is required",
    "Valid phone number is required",
    "Valid SSN (9 digits) is required",
    "Employment status is required",
    "Primary reference name is required"
  ],
  "statusCode": 400
}
```

**Test Non-existent Resource:**
```bash
curl http://localhost:3000/api/applications/get/INVALID_ID
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Application not found",
  "statusCode": 404
}
```

---

## Automated Testing (Optional)

### Using Jest/Supertest
```bash
npm install --save-dev jest supertest
npm run test
```

### Using Postman Collections
Import the provided Postman collection:
- File: `backend/postman_collection.json`
- Run: Environment → Set to "Local" → Run Collection

---

## Performance Testing

**Test Database Indexes:**
```bash
# Create 1000 applications and measure query time
# Should complete in <100ms
```

**Test Rate Limiter Under Load:**
```bash
# Use Apache Bench or similar
ab -n 1000 -c 100 http://localhost:3000/api/newsletter/subscribe
```

---

## Debugging Tips

### Enable Detailed Logging
```env
LOG_LEVEL=debug
```

### Check MongoDB Connection
```bash
# In terminal:
mongosh "mongodb+srv://username:password@cluster.mongodb.net/choice-properties"
```

### Check Email Service
```bash
# Look at console for:
# "✅ Email sent successfully: <message-id>"
```

### Monitor Rate Limiting
```bash
# Headers in response:
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 1234567890
```

---

## Test Checklist

- [ ] Newsletter subscription works
- [ ] Duplicate email handling works
- [ ] Application submission saves to DB
- [ ] SSN is encrypted, not plaintext
- [ ] Payment initiation creates transaction
- [ ] Payment processing 90% succeeds, 10% fails
- [ ] Rate limiting blocks after limit exceeded
- [ ] Invalid data rejected with proper errors
- [ ] Emails are sent successfully
- [ ] Indexes exist on all collections
- [ ] Admin routes require authentication

---

## Common Issues & Solutions

### "MONGODB_URL not set"
**Fix:** Add `MONGODB_URL` to `.env` file

### "Email sending fails"
**Fix:** Check `SMTP_USER` and `SMTP_PASS` in `.env`
- For Gmail: Use App Password, not regular password
- For Brevo: Use your API key

### "Rate limit not working"
**Fix:** Restart server after changing rate limit values

### "Tests timeout"
**Fix:** Increase timeout in test config:
```javascript
jest.setTimeout(10000); // 10 seconds
```

---

## Success Criteria

All systems working when:
✅ Application ID generated & stored
✅ Payment Transaction ID generated & stored
✅ Newsletter email saved
✅ Confirmation emails sent
✅ Invalid data rejected
✅ Rate limiting enforced
✅ SSN encrypted in database
✅ Indexes created for performance
✅ Error messages are helpful
✅ API responses consistent
