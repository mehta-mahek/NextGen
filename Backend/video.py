import os
import json
import tempfile
import requests
import cv2
import numpy as np
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv
from pydub import AudioSegment
from elevenlabs import VoiceSettings, ElevenLabs
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Initialize API clients
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

if not GROQ_API_KEY or not ELEVENLABS_API_KEY:
    raise EnvironmentError("Missing API keys in .env file")

groq_client = Groq(api_key=GROQ_API_KEY)
eleven_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

def generate_video_ad(
    campaign_name: str,
    product: str,
    target_audience: str,
    objective: str,
    output_file: str = "output.mp4",
) -> str:
    """
    Generate a video advertisement with the following inputs:
    Args:
    campaign_name: Name of the campaign.
    product: Associated product.
    target_audience: Target audience.
    objective: Campaign objective.
    output_file: Output filename (default: "output.mp4").
    Returns:
    Path to the generated video file.
    """

    # Function to get script and image prompts from LLM
    def get_content_ideas(campaign_name: str, product: str, target_audience: str, objective: str) -> dict:
        prompt = f"""
You are tasked with crafting content for a short video advertisement (approximately 10 seconds) for social media. Your goals are to write a catchy script and generate image prompts.

Campaign Details:
Campaign Name: {campaign_name}
Product: {product}
Target Audience: {target_audience}
Objective: {objective}
Output Format: Provide a JSON object with two keys:

"script": A string with a brief, engaging narrative (3-4 sentences).
"image_ideas": An array of four vivid scene descriptions corresponding to the script.
Script Guidelines:
Highlight the unique features of the {product}.
Tailor the message to resonate with the {target_audience}.
Image Ideas:
Include scenes featuring nostalgic, cartoon-style characters.
Ensure images progress logically with the script.
Regional Considerations:
Adjust focus based on whether the target is in metro/tier 1 cities or tier 2/tier 3 cities.
        """
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Give JSON responses for the user's requirements"},
                {"role": "user", "content": prompt},
            ],
            model="llama3-8b-8192",
            response_format={"type": "json_object"},
            temperature=0.5,
        )
        return json.loads(chat_completion.choices[0].message.content)

    # Function to fetch image from Pollinations AI
    def fetch_image(image_prompt: str) -> Image.Image:
        base_url = "https://image.pollinations.ai/prompt"
        image_url = f"{base_url}/{image_prompt}"
        response = requests.get(image_url)
        response.raise_for_status()
        return Image.open(BytesIO(response.content))

    # Function to generate speech using ElevenLabs
    def generate_speech(text: str) -> BytesIO:
        response = eleven_client.text_to_speech.convert(
            voice_id="pNInz6obpgDQGcFmaJgB",
            output_format="mp3_22050_32",
            text=text,
            model_id="eleven_turbo_v2",
            voice_settings=VoiceSettings(stability=0.0, similarity_boost=1.0),
        )
        mp3_audio = BytesIO()
        for chunk in response:
            if chunk:
                mp3_audio.write(chunk)
        mp3_audio.seek(0)
        wav_audio = BytesIO()
        AudioSegment.from_mp3(mp3_audio).export(wav_audio, format="wav")
        wav_audio.seek(0)
        return wav_audio

    # Function to generate video with transitions
    def create_video(images: list[Image.Image], audio: BytesIO, length: float, output_path: str):
        FPS = 30
        total_frames = int(length * FPS)
        frames_per_image = total_frames // len(images)
        TARGET_SIZE = (1920, 1080)

        temp_video = tempfile.NamedTemporaryFile(suffix=".mp4", delete=False).name
        temp_audio = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name

        try:
            fourcc = cv2.VideoWriter_fourcc(*"mp4v")
            out = cv2.VideoWriter(temp_video, fourcc, FPS, TARGET_SIZE)

            for img in images:
                img = img.copy()
                img.thumbnail((TARGET_SIZE[0], TARGET_SIZE[1]), Image.Resampling.LANCZOS)
                background = Image.new("RGB", TARGET_SIZE, (0, 0, 0))
                offset = (
                    (TARGET_SIZE[0] - img.width) // 2,
                    (TARGET_SIZE[1] - img.height) // 2,
                )
                background.paste(img, offset)
                frame = cv2.cvtColor(np.array(background), cv2.COLOR_RGB2BGR)

                for i in range(frames_per_image):
                    progress = i / frames_per_image
                    zoom = 1.0 + (progress * 0.1)
                    h, w = frame.shape[:2]
                    zh = int(h * zoom)
                    zw = int(w * zoom)
                    zoomed = cv2.resize(frame, (zw, zh))
                    start_x = (zw - w) // 2
                    start_y = (zh - h) // 2
                    cropped = zoomed[start_y : start_y + h, start_x : start_x + w]
                    out.write(cropped)

            out.release()

            audio.seek(0)
            with open(temp_audio, "wb") as f:
                f.write(audio.read())

            os.system(f"ffmpeg -y -i {temp_video} -i {temp_audio} -c:v copy -c:a aac {output_path}")

        finally:
            try:
                os.remove(temp_video)
                os.remove(temp_audio)
            except:
                pass

    # Main execution flow
    try:
        # Get content ideas from LLM
        content = get_content_ideas(campaign_name, product, target_audience, objective)

        # Generate images
        images = [fetch_image(prompt) for prompt in content["image_ideas"]]

        # Generate audio
        voice = generate_speech(content["script"])

        # Get audio length
        audio_segment = AudioSegment.from_wav(voice)
        audio_length = len(audio_segment) / 1000.0

        # Generate final video
        create_video(images, voice, audio_length, output_file)

        return output_file

    except Exception as e:
        raise Exception(f"Error generating video advertisement: {str(e)}")


if __name__ == "__main__":
    # Take inputs from the user
    campaign_name = input("Enter campaign name: ").strip()
    product = input("Enter product name: ").strip()
    target_audience = input("Enter target audience: ").strip()
    objective = input("Enter campaign objective: ").strip()

    # Generate the video ad
    try:
        output_video = generate_video_ad(
            campaign_name=campaign_name,
            product=product,
            target_audience=target_audience,
            objective=objective,
        )
        print(f"Video ad generated: {output_video}")
    except Exception as e:
        print(f"Error: {e}")
