import os
import pandas as pd
import json
from pydantic import BaseModel, ValidationError
from groq import Groq

# Pydantic Model for Validating AI Outputs
class Insights(BaseModel):
    """
    Pydantic model to validate and enforce the schema of insights data.
    """
    engagement_rates: list[float]
    average_metrics: dict
    top_post_type: dict
    recommendations: dict

    @staticmethod
    def model_json_schema():
        """
        Returns the JSON schema for the insights model.
        """
        return {
            "type": "object",
            "properties": {
                "engagement_rates": {
                    "type": "array",
                    "items": {"type": "number"}
                },
                "average_metrics": {
                    "type": "object"
                },
                "top_post_type": {
                    "type": "object"
                },
                "recommendations": {
                    "type": "object"
                }
            },
            "required": ["engagement_rates", "average_metrics", "top_post_type", "recommendations"]
        }


class AIGeneration:
    """
    Handles interaction with the Groq API for generating insights and analysis.
    """
    def __init__(self, api_key: str):
        self.groq = Groq(api_key=api_key)

    def generate_insights(self, df: pd.DataFrame) -> dict:
        """
        Generates insights using the Groq API based on the campaign data in the dataframe.
        """
        prompt = f"""Analyze the following campaign data and provide actionable insights:

        Data: {df.to_dict(orient='records')}

        Requirements:
        - Calculate engagement rates for each campaign using the formula: (likes + comments + shares) / views * 100.
        - Identify the top-performing campaign type based on average likes.
        - Provide recommendations for improving engagement rates.
        - Utilize all available columns in the analysis for a detailed understanding.

        Provide the output as valid JSON with the following schema: {json.dumps(Insights.model_json_schema())}
        """

        try:
            # Send request to the Groq API
            chat_completion = self.groq.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": prompt,
                    }
                ],
                model="llama3-70b-8192",  # Specify the correct model
                temperature=0.7,
                response_format={"type": "json_object"},
            )

            # Parse the response
            response_content = chat_completion.choices[0].message.content
            insights_data = json.loads(response_content)

            # Validate the response using Pydantic
            validated_insights = Insights(**insights_data)

            return validated_insights.dict()

        except ValidationError as e:
            raise Exception(f"Response validation failed: {e}")
        except Exception as e:
            raise Exception(f"Error during API call: {e}")


def analyze_campaign_data(file_path: str, api_key: str) -> dict:
    """
    Analyze campaign data from a CSV file using AI.
    """
    df = pd.read_csv(file_path)

    # Ensure all columns are included
    if df.empty:
        raise ValueError("The provided CSV file is empty or invalid.")

    # Initialize AI generation object
    ai_gen = AIGeneration(api_key)

    # Generate insights
    insights = ai_gen.generate_insights(df)

    return insights


def main():
    print("Welcome to the Campaign Analysis Tool!")
    print("Please provide the details to analyze your campaign data.\n")

    # File path to the campaign data CSV
    file_path = input("Enter the path to your campaign data CSV file: ").strip()

    # Get Groq API Key
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("Error: GROQ_API_KEY environment variable not set.")
        return

    try:
        # Analyze the campaign data
        insights = analyze_campaign_data(file_path, api_key)

        # Output the insights in JSON format
        print("\nGenerated Insights:")
        print(json.dumps(insights, indent=4))

    except Exception as e:
        print(f"An error occurred: {str(e)}")


if __name__ == "__main__":
    main()
