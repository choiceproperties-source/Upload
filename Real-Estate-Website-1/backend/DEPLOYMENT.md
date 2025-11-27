# Deployment Guide - Choice Properties Backend

## Option 1: Deploy to Render (Recommended)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create New Web Service
1. New → Web Service
2. Select backend repository
3. Configure:
   - Name: `choice-properties-api`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

### Step 3: Set Environment Variables
Add in Environment section:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=generate_random_32_char_string
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=production
```

### Step 4: Deploy
Click "Create Web Service" - deploys automatically from GitHub

Your API will be available at: `https://choice-properties-api.onrender.com`

---

## Option 2: Deploy to Railway

### Step 1: Connect Repository
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub

### Step 2: Add Environment Variables
Dashboard → Variables:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=generate_random_32_char_string
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=production
```

### Step 3: Configure Deploy
- Root Directory: `backend`
- Start Command: `npm start`

---

## Option 3: Deploy to Heroku (Legacy)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create choice-properties-api

# Set environment variables
heroku config:set MONGODB_URL=your_url
heroku config:set JWT_SECRET=your_secret
heroku config:set SMTP_USER=your_email
heroku config:set SMTP_PASS=your_password
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

---

## Production Checklist

### Security
- [ ] Change JWT_SECRET to random 32+ character string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS only (automatic on Render/Railway)
- [ ] Whitelist frontend domain in CORS
- [ ] Remove debug logging

### Database
- [ ] MongoDB backups enabled (Atlas: Backup settings)
- [ ] Database connection string in production
- [ ] Indexes verified in production database
- [ ] Read replicas configured (optional)

### Email
- [ ] Use production email credentials
- [ ] Update EMAIL_FROM to official domain email
- [ ] Test email sending before launch
- [ ] Set up bounce handling

### Monitoring
- [ ] Set up error logging (Sentry, etc.)
- [ ] Set up uptime monitoring
- [ ] Configure alerts for high error rates
- [ ] Monitor rate limiting effectiveness

### Performance
- [ ] Verify database indexes
- [ ] Test under load
- [ ] Enable gzip compression (enabled by default)
- [ ] Monitor response times

---

## Frontend Integration

Update frontend `.env` to point to production backend:
```env
VITE_API_BASE_URL=https://choice-properties-api.onrender.com
```

Or use environment variable in CI/CD to set this dynamically.

---

## Verifying Production

```bash
# Check API is responding
curl https://choice-properties-api.onrender.com/api/status

# Test subscription endpoint
curl -X POST https://choice-properties-api.onrender.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## Rollback

If something breaks in production:

**On Render:**
1. Go to Deploys
2. Click previous successful deploy
3. Click "Redeploy"

**On Railway:**
1. Go to Deployments
2. Select previous version
3. Click "Rollback"

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify MONGODB_URL in production environment
- Ensure IP whitelist in MongoDB Atlas includes Render/Railway IPs
- Check database credentials

### "Emails not sending"
- Verify SMTP credentials
- Check if sending domain is allowed
- Review email service logs

### "Rate limiting too strict"
- Adjust MAX_* environment variables
- Monitor actual usage patterns
- Add exemptions for trusted IPs if needed

### "High memory usage"
- Check for memory leaks
- Review database connection pooling
- Optimize query performance

---

## Cost Estimates

**Render (Free Tier Available):**
- Free: Limited, adequate for testing
- Hobby: $7/month, always on
- Standard: $12/month, better performance

**Railway (Free Tier Available):**
- Free: $5/month credit, pay-as-you-go
- Typical backend: $5-15/month

**MongoDB Atlas (Free Tier Available):**
- Free: 512MB storage, shared cluster
- Paid: Starting at $0.10/GB/month

**Total Estimated Cost:** $15-30/month for small production deployment

---

## Monitoring & Maintenance

### Daily
- Check error logs
- Monitor application performance
- Verify email delivery

### Weekly
- Review rate limiting statistics
- Check database growth
- Update dependencies

### Monthly
- Review security logs
- Analyze usage patterns
- Plan capacity upgrades

---

## Support

For deployment issues:
- Check platform documentation
- Review application logs
- Contact support team
- Check health endpoint: `/api/status`

