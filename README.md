# NextGen: Your Digital Campaign Dashboard

NextGen is an advanced digital marketing platform that leverages real-time social media metrics and AI-driven insights to empower businesses in optimizing audience targeting and enhancing brand visibility. It features an interactive dashboard, comprehensive reporting, and AI-powered support to drive data-based decision-making.

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Implementation](#implementation)
- [Technical Architecture](#technical-architecture)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)

## Project Overview
NextGen provides an integrated solution for modern digital marketing challenges. The platform allows users to monitor key performance metrics in real time, visualize data trends through an intuitive dashboard, and access detailed reports for informed decision-making. With an AI-driven chatbot and creative content generation tools, NextGen bridges the gap between strategic planning and effective campaign execution.

## Key Features

- **Real-Time Dashboard**: Displays dynamic metrics like likes, retweets, comments, and views sourced from live social media data.
- **Interactive Data Visualization**: Engaging graphs and charts that transform complex data into actionable insights.
- **Campaign Management**: Detailed campaign listings with pop-up views for budget allocation, goals, and performance analytics.
- **Report Generation**: Comprehensive reports that can be downloaded for further analysis.
- **AI-Powered Chatbot**: Provides 24/7 support with instant recommendations and guidance.
- **Creative Content Tools**: Automates the generation of images, taglines, captions, and voice-overs via integrated AI services.

## Implementation

### Dashboard & Metrics
Our team of four developed multiple pages, starting with the landing page and the login/signup page. The main highlight is the dashboard page, which showcases crucial social media metrics, including:

- Total likes
- Total retweets
- Total comments
- Total views

All this data was web-scraped from real Twitter statistics 

### Campaign List & Details
On the dashboard, we included a campaign list displayed in a table format. The table included essential details such as target audience and team members. Clicking on a campaign revealed a pop-up box containing comprehensive campaign insights, including:

- Campaign type
- Budget
- Goals
- Metrics
- Post images of the campaign

### Reports & Chatbot
We also developed a report page, which stores detailed reports of all campaigns and marketing strategies. Users can download reports directly from our platform for further analysis. Additionally, we integrated an AI-powered chatbot to assist users with queries anytime.

## Technical Architecture

### Backend & Databases
- **Backend**: Built using FastAPI for seamless connection with the database and handling model requests.

- **Databases**:
  - **MongoDB** - Stores textual campaign data in JSON format.
  - **Cloudinary** - Stores images, with links referenced in MongoDB.

### AI & Model Integrations
We incorporated multiple AI models to enhance the platform’s capabilities:

- **GROQ** - Generates campaign taglines, slogans, captions, and themes.
- **Pollination AI** - Generates images for campaigns.
- **ElevenLabs Turbo v2** - Generates voice-overs for videos.

  ## Installation & Setup
  
  ### Python Backend Setup
  
  1. **Clone the Repository and Install Dependencies:**
  
     ```bash
     git clone https://github.com/mehta-mahek/NextGen.git
     cd NextGen
  
     # Create a requirements.txt file
      fastapi
      uvicorn
      python-cloudinary
      python-dotenv
      pydantic
  
  
  
     # Install dependencies
     pip install -r requirements.txt
  2. **Front-end setup:**
  
      ```bash
      #The frontend is built with Next.js. Navigate to the frontend directory (if separate) and install dependencies:
      npm install
    
  ## Environment Configuration
    Create a .env file in the project root with your configuration keys:
      # MongoDB Configuration
      MONGO_URI=your_mongo_uri
      
      # Cloudinary Configuration
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      
      # GROQ Configuration
      GROQ_API_KEY=your_groq_api_key
      
      # Gemini Configuration
      GEMINI_API_KEY=your_gemini_api_key
  
  ## Usage
    ### Backend
      Start the FastAPI server by running:
      uvicorn main:app3 --reload
  
    ### Frontend
      Start the Next.js development server by running:
      npm run dev
  
