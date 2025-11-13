# Travel Planner Backend - Serverless Deployment

This backend is deployed to AWS Lambda using the Serverless Framework.

## Prerequisites

1. **Node.js and npm** - Install from https://nodejs.org/
2. **AWS CLI** - Install with `pip install awscli`
3. **Serverless Framework** - Install globally with `npm install -g serverless`

## Setup

### 1. Configure AWS Credentials

```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Default output format: `json`

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Set Environment Variables

**Windows PowerShell:**
```powershell
$env:GEMINI_API_KEY="your_gemini_api_key_here"
$env:ALLOWED_ORIGINS="https://your-amplify-url.amplifyapp.com"
```

**Windows CMD:**
```cmd
set GEMINI_API_KEY=your_gemini_api_key_here
set ALLOWED_ORIGINS=https://your-amplify-url.amplifyapp.com
```

**Linux/Mac:**
```bash
export GEMINI_API_KEY="your_gemini_api_key_here"
export ALLOWED_ORIGINS="https://your-amplify-url.amplifyapp.com"
```

**Note:** If you haven't deployed Amplify yet, you can use `*` for `ALLOWED_ORIGINS` temporarily:
```powershell
$env:ALLOWED_ORIGINS="*"
```

### 4. Deploy to AWS Lambda

```bash
serverless deploy
```

This will:
- Package your Flask app
- Create a Lambda function
- Create an API Gateway
- Deploy everything to AWS

Deployment takes 2-5 minutes.

### 5. Get Your API URL

After deployment, you'll see output like:

```
endpoints:
  ANY - https://xxxxx.execute-api.us-east-1.amazonaws.com/
  ANY - https://xxxxx.execute-api.us-east-1.amazonaws.com/{proxy+}
```

**Copy this URL** - this is your backend API URL.

### 6. Update Amplify Environment Variable

1. Go to AWS Amplify Console
2. Select your app
3. Go to **Environment variables**
4. Update `REACT_APP_API_URL` with your Lambda API Gateway URL
5. Save and redeploy

## Useful Commands

```bash
# Deploy to dev (default)
serverless deploy

# Deploy to production
serverless deploy --stage prod

# View logs in real-time
serverless logs -f app -t

# Remove deployment
serverless remove

# Check deployment status
serverless info
```

## Troubleshooting

### Issue: "serverless command not found"
**Solution:** Install globally with `npm install -g serverless`

### Issue: "AWS credentials not found"
**Solution:** Run `aws configure` and enter your credentials

### Issue: "Module not found" errors
**Solution:** Make sure all dependencies are in `requirements.txt`

### Issue: CORS errors
**Solution:** Update `ALLOWED_ORIGINS` environment variable and redeploy

### Issue: Timeout errors
**Solution:** Increase `timeout` in `serverless.yml` (max 900 seconds for Lambda)

## Cost

- **AWS Lambda:** Free tier includes 1M requests/month
- **API Gateway:** Free tier includes 1M API calls/month
- **After free tier:** Very low cost (pay per request)

## Files

- `app.py` - Flask application
- `wsgi_handler.py` - Lambda handler wrapper
- `serverless.yml` - Serverless Framework configuration
- `requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies for Serverless Framework

