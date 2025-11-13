from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

app = Flask(__name__)

# Configure CORS - Allow all origins in development, specific origins in production
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
CORS(app, resources={
    r"/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Load Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise Exception("Missing GEMINI_API_KEY in .env file")

genai.configure(api_key=GEMINI_API_KEY)

# Use Gemini Flash model
model = genai.GenerativeModel("models/gemini-2.0-flash")


@app.route("/generate", methods=["POST"])
def generate_plan():
    data = request.json

    try:
        prompt = f"""
Create a {data['num_days']}-day {data['travel_theme']} travel plan
from {data['source']} to {data['destination']}.

Include:
- destination overview
- attractions + hidden gems
- restaurants + hotels ({data['hotel_rating']} rating, {data['budget']} budget)
- day-by-day itinerary with times

Traveler preferences: {data['preferences']}
Departure: {data['departure_date']}
Return: {data['return_date']}
Visa required: {data['visa']}
Insurance: {data['insurance']}
"""

        response = model.generate_content(prompt)

        if hasattr(response, "text"):
            final_output = response.text
        else:
            final_output = str(response)

        return jsonify({"plan": final_output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    return {"message": "Backend is working!"}


if __name__ == "__main__":
    app.run(port=5001, debug=True)
