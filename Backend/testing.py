import os
import json
import requests
from typing import List, Tuple
from pydantic import BaseModel, ValidationError
from groq import Groq

# Pydantic Models for Validation
class Slogan(BaseModel):
    slogans: List[str]

    @staticmethod
    def model_json_schema():
        return {
            "type": "object",
            "properties": {
                "slogans": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["slogans"]
        }

class Tagline(BaseModel):
    taglines: List[str]

    @staticmethod
    def model_json_schema():
        return {
            "type": "object",
            "properties": {
                "taglines": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["taglines"]
        }

class Theme(BaseModel):
    themes: List[str]

    @staticmethod
    def model_json_schema():
        return {
            "type": "object",
            "properties": {
                "themes": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["themes"]
        }

class Caption(BaseModel):
    caption: List[str]

    @staticmethod
    def model_json_schema():
        return {
            "type": "object",
            "properties": {
                "caption": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["caption"]
        }

class Email(BaseModel):
    email_subject: str
    email_body: str

    @staticmethod
    def model_json_schema():
        return {
            "type": "object",
            "properties": {
                "email_subject": {"type": "string"},
                "email_body": {"type": "string"}
            },
            "required": ["email_subject", "email_body"]
        }

# AI Content Generation Functions
def generate_text(prompt: str, model: str, schema: dict) -> dict:
    """
    Generates text using Groq and validates against the schema.
    """
    groq = Groq(api_key=os.getenv("GROQ_API_KEY"))
    chat_completion = groq.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": prompt + f"\n\nThe JSON object must use the schema: {json.dumps(schema)}",
            }
        ],
        model=model,
        temperature=0.7,
        response_format={"type": "json_object"},
    )

    response_content = chat_completion.choices[0].message.content
    return json.loads(response_content)

def generate_campaign_slogan(campaign_name: str, product: str, target_audience: str, objective: str) -> List[str]:
    prompt = f"""Generate five catchy Hinglish slogans for an Indian campaign based on the following details:

Details:

Campaign Name: {campaign_name}
Product: {product}
Target Audience: {target_audience}
Objective: {objective}
Audience Focus:

Metro/Tier 1 Cities: Appeal to young, affluent, digital-savvy individuals with a preference for premium quality and modern lifestyle.
Tier 2/3 Cities: Emphasize value, practicality, and accessibility for a broader, tradition-oriented audience.
Provide output as valid JSON with "slogans" as the key and a list of slogans as the value."""
    response_data = generate_text(prompt, "llama3-70b-8192", Slogan.model_json_schema())
    return Slogan(**response_data).slogans

def generate_campaign_taglines(campaign_name: str, product: str, target_audience: str, objective: str) -> List[str]:
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
    response_data = generate_text(prompt, "llama3-70b-8192", Tagline.model_json_schema())
    return Tagline(**response_data).taglines

def generate_campaign_themes(campaign_name: str, product: str, target_audience: str, objective: str) -> List[str]:
    prompt = f"""Provide a list of innovative, creative campaign themes based on the details below:

Details:

Campaign Name: {campaign_name}
Product: {product}
Target Audience: {target_audience}
Objective: {objective}
Each theme should capture the campaign’s core idea, appeal to the target audience, and reflect {objective} in a unique, engaging way. Themes should work across platforms to position {product} as an attractive choice for {target_audience}. Example themes include 'Modern and Sleek,' 'Eco-Friendly,' and 'Retro Revival'.
"""
    response_data = generate_text(prompt, "llama3-70b-8192", Theme.model_json_schema())
    return Theme(**response_data).themes

def generate_campaign_caption(campaign_name: str, product: str, target_audience: str, objective: str) -> List[str]:
    prompt = f"""
Write a catchy and unique caption for the following campaign, tailored to the target audience in India using Hinglish:

Campaign Name: {campaign_name}
Product Associated: {product}
Target Audience: {target_audience}
Key Objective: {objective}

The caption should be engaging, memorable, and reflect the campaign's core message in a few impactful words, making {product} stand out for {target_audience} in India.

    """
    response_data = generate_text(prompt, "llama3-70b-8192", Caption.model_json_schema())
    return Caption(**response_data).caption

def generate_campaign_email(campaign_name: str, product: str, target_audience: str, objective: str) -> Tuple[str, str]:
    prompt = f"""
    Create an engaging email for an Indian campaign:

Details:

Campaign Name: {campaign_name}
Product: {product}
Target Audience: {target_audience}
Objective: {objective}
Requirements:

Subject Line: Catchy, single line with Hinglish.
Email Body (HTML):
Add a product link (URL provided).
Include product description, offers, and a call-to-action.
Audience Context:

Metro/Tier 1: Modern, premium appeal.
Tier 2/3: Value-conscious, practical focus.
Output as JSON:

"email_subject" (string)
"email_body" (HTML)

"""
    response_data = generate_text(prompt, "llama3-70b-8192", Email.model_json_schema())
    email = Email(**response_data)
    return email.email_subject, email.email_body

# Main Execution
def main():
    campaign_name = input("Enter campaign name: ").strip()
    product = input("Enter product name: ").strip()
    target_audience = input("Enter target audience: ").strip()
    objective = input("Enter campaign objective: ").strip()

    try:
        print("\nGenerating Campaign Content...")
        slogans = generate_campaign_slogan(campaign_name, product, target_audience, objective)
        taglines = generate_campaign_taglines(campaign_name, product, target_audience, objective)
        themes = generate_campaign_themes(campaign_name, product, target_audience, objective)
        captions = generate_campaign_caption(campaign_name, product, target_audience, objective)
        email_subject, email_body = generate_campaign_email(campaign_name, product, target_audience, objective)

        print("\nSlogans:")
        for slogan in slogans:
            print(f"- {slogan}")

        print("\nTaglines:")
        for tagline in taglines:
            print(f"- {tagline}")

        print("\nThemes:")
        for theme in themes:
            print(f"- {theme}")

        print("\nCaptions:")
        for caption in captions:
            print(f"- {caption}")

        print("\nEmail:")
        print(f"Subject: {email_subject}")
        print(f"Body: {email_body}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
