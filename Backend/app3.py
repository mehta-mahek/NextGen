import os
import json
import requests
import urllib.parse
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pymongo
from bson import ObjectId
from bson import SON

from groq import Groq

# Load environment variables
load_dotenv()

# MongoDB Setup
MONGO_URI = os.getenv("MONGO_URI")
print(MONGO_URI)
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in environment variables.")
DB_NAME = "TechTitans"
COLLECTION_NAME = "ACE"
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
campaigns_collection = db[COLLECTION_NAME]

# Cloudinary Setup
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Initialize FastAPI app
app = FastAPI(
    title="AI Marketing Campaign API",
    description="API for generating marketing campaigns using AI.",
    version="1.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request and response validation
class CampaignRequest(BaseModel):
    campaign_name: str
    product: str
    target_audience: str
    objective: str
    performance_stat: str
    team_members: List[str]
    campaign_focus: str

class Slogan(BaseModel):
    slogans: List[str]

class Hashtag(BaseModel):
    hashtags: List[str]

class Tagline(BaseModel):
    taglines: List[str]

class Theme(BaseModel):
    themes: List[str]

class Caption(BaseModel):
    caption: List[str]

class Email(BaseModel):
    email_subject: str
    email_body: str

# AI Generation Class
class AIGeneration:
    IMAGE_API_BASE_URL = "https://image.pollinations.ai"

    @staticmethod
    def generate_campaign_image(campaign_name, product, target_audience, objective):
        prompt = f"Generate an image for a marketing campaign about {product} targeting {target_audience} with the objective of {objective}."
        encoded_prompt = urllib.parse.quote(prompt)
        url = f"{AIGeneration.IMAGE_API_BASE_URL}/prompt/{encoded_prompt}"

        try:
            response = requests.get(url)
            response.raise_for_status()
            image_path = f"{campaign_name.lower().replace(' ', '_')}.png"
            with open(image_path, "wb") as f:
                f.write(response.content)

            upload_result = cloudinary.uploader.upload(image_path)
            os.remove(image_path)  # Delete local image after upload
            return upload_result["url"]

        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Image generation failed: {str(e)}")

    @staticmethod
    def generate_text_with_groq(prompt, schema):
        """
        Generates text using Groq and validates against the schema.
        """
        groq = Groq(api_key=os.getenv("GROQ_API_KEY"))
        try:
            chat_completion = groq.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": prompt + f"\n\nThe JSON object must use the schema: {json.dumps(schema)}",
                    }
                ],
                model="llama3-70b-8192",
                temperature=0.7,
                response_format={"type": "json_object"},
            )

            response_content = chat_completion.choices[0].message.content
            return json.loads(response_content)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Groq text generation failed: {e}")

    @staticmethod
    def generate_campaign_slogan(campaign_name, product, target_audience, objective):
        prompt = f"""Generate five catchy slogans for a campaign based on the following details:

    Details:

    Campaign Name: {campaign_name}
    Product: {product}
    Target Audience: {target_audience}
    Objective: {objective}

    """
        schema = {
            "type": "object",
            "properties": {
                "slogans": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["slogans"]
        }
        response_data = AIGeneration.generate_text_with_groq(prompt, schema)
        return response_data.get("slogans", [])
    
    @staticmethod
    def generate_campaign_theme(campaign_name, product, target_audience, objective):
        prompt = f"""Generate five catchy slogans for a campaign based on the following details:

    Details:

    Campaign Name: {campaign_name}
    Product: {product}
    Target Audience: {target_audience}
    Objective: {objective}

    """
        schema = {
            "type": "object",
            "properties": {
                "themes": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["themes"]
        }
        response_data = AIGeneration.generate_text_with_groq(prompt, schema)
        return response_data.get("themes", [])

    @staticmethod
    def generate_campaign_hashtags(campaign_name, product, target_audience, objective):
        prompt = f"""Create 5 creative hashtags for a campaign based on the following details:

        Details:

        Campaign Name: {campaign_name}
        Product: {product}
        Target Audience: {target_audience}
        Objective: {objective}
        """
        schema = {
            "type": "object",
            "properties": {
                "hashtags": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["hashtags"]
        }
        response_data = AIGeneration.generate_text_with_groq(prompt, schema)
        return response_data.get("hashtags", [])

    @staticmethod
    def generate_campaign_tagline(campaign_name, product, target_audience, objective):
        prompt = f"""Create a catchy, memorable tagline in Hinglish for an Indian campaign based on the following details:

Details:

Campaign Name: {campaign_name}
Product: {product}
Target Audience: {target_audience}
Objective: {objective}
Audience Focus:

Metro/Tier 1 Cities: Appeal to young, affluent, digital-savvy individuals who value premium quality and a modern, sophisticated lifestyle.
Tier 2/3 Cities: Emphasize value, practicality, and accessibility for a broader audience that appreciates tradition and community.
Each tagline should be short, impactful, and engaging, with Hinglish elements to boost appeal. It should effectively highlight {objective}, making {product} stand out for {target_audience}"""
        schema = {
            "type": "object",
            "properties": {
                "taglines": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["taglines"]
        }
        response_data = AIGeneration.generate_text_with_groq(prompt, Tagline.model_json_schema())

        return Tagline(**response_data).taglines

    @staticmethod
    def generate_campaign_caption(campaign_name, product, target_audience, objective):
        prompt = f"""
Write a catchy and unique caption for the following campaign, tailored to the target audience in India using Hinglish:

Campaign Name: {campaign_name}
Product Associated: {product}
Target Audience: {target_audience}
Key Objective: {objective}

The caption should be engaging, memorable, and reflect the campaign's core message in a few impactful words, making {product} stand out for {target_audience} in India.

    """
        schema = {
            "type": "object",
            "properties": {
                "caption": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["caption"]
        }
        response_data = AIGeneration.generate_text_with_groq(prompt, schema)
        return response_data.get("caption", [])

# FastAPI Routes
@app.post("/generate_campaign")
def generate_campaign(request: CampaignRequest):
    try:
        # Generate campaign image
        image_url = AIGeneration.generate_campaign_image(request.campaign_name, request.product, request.target_audience, request.objective)

        # Generate slogans and hashtags
        slogans = AIGeneration.generate_campaign_slogan(request.campaign_name, request.product, request.target_audience, request.objective)
        hashtags = AIGeneration.generate_campaign_hashtags(request.campaign_name, request.product, request.target_audience, request.objective)
        taglines = AIGeneration.generate_campaign_tagline(request.campaign_name, request.product, request.target_audience, request.objective)
        themes = AIGeneration.generate_campaign_theme(request.campaign_name, request.product, request.target_audience, request.objective)
        caption = AIGeneration.generate_campaign_caption(request.campaign_name, request.product, request.target_audience, request.objective)

        # Save to database
        campaign_data = {
            "campaign_name": request.campaign_name,
            "product": request.product,
            "target_audience": request.target_audience,
            "objective": request.objective,
            "performance_stat": request.performance_stat,
            "team_members": request.team_members,
            "campaign_focus": request.campaign_focus,
            "image_url": image_url,
            "slogans": slogans,
            "hashtags": hashtags,
            "taglines":taglines,
            "caption":caption,
        }

        campaigns_collection.insert_one(campaign_data)
        campaign_data["_id"] = str(campaign_data["_id"])  # Convert ObjectId to string
        return {"message": "Campaign created successfully!", "data": campaign_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

@app.get("/get_campaigns", summary="Retrieve all campaigns", description="Fetches all stored marketing campaigns from MongoDB.")
def get_campaigns():
    campaigns = list(campaigns_collection.find({}, {"_id": 0}))
    return campaigns

@app.get("/get_campaign/{campaign_name}", summary="Retrieve a specific campaign", description="Fetches a specific campaign by name.")
def get_campaign(campaign_name: str):
    campaign = campaigns_collection.find_one({"campaign_name": campaign_name}, {"_id": 0})
    if campaign:
        return campaign
    raise HTTPException(status_code=404, detail="Campaign not found")



@app.delete("/delete_campaign/{campaign_name}", summary="Delete a specific campaign", description="Deletes a campaign by name.")
def delete_campaign(campaign_name: str):
    result = campaigns_collection.delete_one({"campaign_name": campaign_name})
    if result.deleted_count:
        return {"message": f"Campaign '{campaign_name}' deleted successfully"}
    raise HTTPException(status_code=404, detail="Campaign not found")

