# AI Travel Planner

A full-stack AI-powered travel planning application that generates personalized travel itineraries using Google's Gemini AI.

## Features

- 🎯 Interactive UI with travel preferences sidebar
- 🤖 AI-powered itinerary generation
- 📅 Date-based trip planning
- 🏨 Hotel and budget preferences
- ✈️ Flight class selection
- 🎨 Modern, responsive design

## Tech Stack

### Frontend
- React 18
- CSS3
- Axios for API calls

### Backend
- Flask (Python)
- Google Gemini AI API
- Flask-CORS

## Project Structure

```
Travel-Planner-AI/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── App.js    # Main React component
│   │   ├── App.css   # Styles
│   │   └── api.js    # API integration
│   └── package.json
├── backend/           # Flask backend API
│   ├── app.py        # Flask application
│   └── requirements.txt
└── amplify.yml       # AWS Amplify build configuration
```

## Local Development

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Google Gemini API Key

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the backend directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the backend:
```bash
python app.py
```

The backend will run on `http://localhost:5001`

## Environment Variables

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: `http://127.0.0.1:5001`)

### Backend
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins (default: `*`)

## AWS Amplify Deployment

### Frontend Deployment

1. Push your code to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click "New app" → "Host web app"
4. Connect your GitHub repository
5. Configure build settings (amplify.yml is already configured)
6. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: Your deployed backend URL
7. Deploy!

### Backend Deployment

Deploy your Flask backend to one of these options:
- **AWS Elastic Beanstalk** (Recommended for Flask)
- **AWS EC2**
- **AWS Lambda** (with Serverless Framework)

After deployment, update the `REACT_APP_API_URL` in Amplify Console.

## License

MIT

