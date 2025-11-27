# Backend Setup Guide - Choice Properties

## Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (free tier is fine)
- Gmail account (for email testing)
- Postman (optional, for testing)

---

## Step 1: Clone & Install

```bash
cd backend
npm install
```

**If you get peer dependency warnings, it's safe to ignore them.**

---

## Step 2: Configure Environment Variables

### Create .env File
```bash
cp .env.example .env
```

### Fill in Your Values

**MongoDB Setup (Required):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/choice-properties`
4. Add to `.env`:
```env
MONGODB_URL=mongodb+srv://your_user:your_password@cluster.mongodb.net/choice-properties
```

**Email Setup (Required):**

**Option A: Gmail (Recommended for Testing)**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Create App Password (generate new password)
4. Copy the 16-character password
5. Add to `.env`:
```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_app_password
EMAIL_FROM=noreply@choiceproperties.com
```

**Option B: Brevo (Free Email Service)**
1. Create account at [Brevo](https://www.brevo.com)
2. Get SMTP credentials from settings
3. Add to `.env`:
```env
SMTP_USER=your-brevo-email@example.com
SMTP_PASS=your_brevo_api_key
```

**JWT Secret (Required):**
```env
JWT_SECRET=your_super_secret_jwt_key_must_be_at_least_32_characters_long_12345
```

**Complete .env Example:**
```env
NODE_ENV=development
PORT=3000
BACKEND_URL=http://localhost:3000

MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/choice-properties
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_12345

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@choiceproperties.com

LOG_LEVEL=debug
```

---

## Step 3: Start the Backend

```bash
npm run dev
```

**You should see:**
```
✅ Email server is ready to take our messages
✅ Database connected successfully
Server running on port 3000
```

---

## Step 4: Test the Backend

### Quick Test
```bash
# Check if server is running
curl http://localhost:3000/api/status
```

### Full Test (see TESTING_GUIDE.md)
```bash
# Subscribe to newsletter
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Subscribed successfully",
  "subscriber": { ... }
}
```

---

## Troubleshooting

### Issue: "MONGODB_URL is not configured"
**Solution:** Add MongoDB connection string to `.env`

### Issue: "Email service not configured"
**Solution:** Add `SMTP_USER` and `SMTP_PASS` to `.env`

### Issue: "Port 3000 already in use"
**Solution:** 
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: "Cannot connect to MongoDB"
**Solution:** 
1. Check MongoDB connection string
2. Add your IP to MongoDB Atlas whitelist: `0.0.0.0/0`
3. Verify username/password

### Issue: "Email not being sent"
**Solution:**
1. Check SMTP credentials in `.env`
2. For Gmail: Use App Password, not account password
3. Check console logs for error messages

---

## Project Structure

```
backend/
├── config/           # Configuration files
│   ├── mongodb.js    # Database connection
│   └── nodemailer.js # Email setup
├── controller/       # API endpoint handlers
│   ├── applicationController.js
│   ├── paymentController.js
│   └── newsletterController.js
├── middleware/       # Express middleware
│   ├── authmiddleware.js
│   └── errorHandler.js
├── models/           # MongoDB schemas
│   ├── applicationModel.js
│   ├── paymentModel.js
│   └── newsletterModel.js
├── routes/           # API routes
│   ├── applicationRoute.js
│   ├── paymentRoute.js
│   └── newsletterRoute.js
├── utils/            # Utility functions
│   ├── validation.js
│   └── sanitizer.js
├── server.js         # Main server file
└── email.js          # Email templates
```

---

## Available Commands

```bash
# Start development server (with auto-reload)
npm run dev

# Start production server
npm run start

# Run tests
npm test

# Check linting
npm run lint

# View logs
npm run logs
```

---

## Database Collections

The backend automatically creates these MongoDB collections:

1. **applications**
   - Stores tenant screening applications
   - Fields: firstName, lastName, email, phone, ssn (encrypted), dob, employment info, etc.
   - Indexes: applicationId, email, status, createdAt

2. **payments**
   - Stores payment transactions
   - Fields: transactionId, amount, cardLastFour, status, etc.
   - Indexes: transactionId, userId, status, createdAt

3. **newsletters**
   - Stores newsletter subscriptions
   - Fields: email, subscriptionStatus, preferences, etc.
   - Indexes: email, subscriptionStatus

---

## API Endpoints Quick Reference

**Applications:**
- `POST /api/applications/submit` - Submit application
- `GET /api/applications/get/:id` - Get application
- `GET /api/applications/all` - Get all (admin)

**Payments:**
- `POST /api/payments/initiate` - Start payment
- `POST /api/payments/process` - Process payment
- `GET /api/payments/status/:id` - Check status

**Newsletter:**
- `POST /api/newsletter/subscribe` - Subscribe
- `POST /api/newsletter/unsubscribe` - Unsubscribe
- `GET /api/newsletter/all` - Get all (admin)

See API_DOCUMENTATION.md for full details.

---

## Security Notes

✅ **What's Protected:**
- SSN encrypted with bcrypt
- Passwords hashed
- Rate limiting on all endpoints
- Input validation on all fields
- XSS prevention with sanitization
- SQL injection prevention

⚠️ **Before Production:**
1. Change JWT_SECRET to strong random value
2. Set NODE_ENV=production
3. Whitelist frontend URL in CORS
4. Enable HTTPS only
5. Set up database backups

---

## Support

**Documentation:**
- API Docs: See `API_DOCUMENTATION.md`
- Testing: See `TESTING_GUIDE.md`
- Security: See `SECURITY_AUDIT.md`

**Email:** support@choiceproperties.com
**Issues:** Check console logs with `npm run dev`

---

## Next Steps

1. ✅ Start backend: `npm run dev`
2. ✅ Test endpoints: See TESTING_GUIDE.md
3. ✅ Connect frontend: Use `http://localhost:3000`
4. ✅ Deploy: See deployment docs

Happy building! 🚀
