# Choice Properties - Getting Started

## Quick Start

### 1. Environment Setup
All environment variables are already configured. The project includes:
- MongoDB connection (MONGO_URI)
- SendGrid email (SENDGRID_API_KEY)
- ImageKit CDN (IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT)

### 2. Running Locally
The project runs on two ports:
- **Frontend**: http://localhost:5000 (React + Vite)
- **Backend**: http://localhost:8000 (Node.js + Express)

Both are configured to run automatically via workflows.

### 3. Testing the Platform

#### View Homepage
Visit http://localhost:5000 to see:
- "Second Chances. Fair Housing. No Judgment." positioning
- Testimonials from underserved renters
- Blog posts on credit building & approval processes

#### View Application Page
Navigate to http://localhost:5000/application to see:
- Fair process banner with 5-step screening
- "No judgment" messaging throughout
- Blue + Emerald color scheme

#### View Properties
Visit http://localhost:5000/properties to see:
- 3 sample properties with acceptance criteria tags
- "All Credit Scores", "Eviction-Friendly", "No Judgment" tags

### 4. Adding More Properties
Access MongoDB Atlas dashboard and add properties to the `properties` collection with this structure:
```json
{
  "name": "Property Name",
  "location": "City, State",
  "price": 1200,
  "bedrooms": 1,
  "bathrooms": 1,
  "acceptanceCriteria": ["All Credit Scores", "Eviction-Friendly"],
  "description": "Description",
  "verified": true
}
```

### 5. Publishing
Click "Publish" in Replit to get a live URL for your platform.

## Project Structure
```
/frontend              - React app (port 5000)
/backend               - Express API (port 8000)
/admin                 - Admin dashboard
replit.md              - Project documentation
```

## Features
✅ Second chance housing for underserved renters
✅ Fair evaluation process (5-7 day approvals)
✅ No judgment messaging
✅ Properties with acceptance criteria tags
✅ Multi-step tenant application
✅ Email notifications via SendGrid
✅ Image optimization via ImageKit
✅ Premium Modern design (Blue + Emerald colors)

## Support
For detailed documentation, see:
- Backend API: `/backend/API_DOCUMENTATION.md`
- Setup Guide: `/backend/SETUP_GUIDE.md`
- README: `/README.md`
