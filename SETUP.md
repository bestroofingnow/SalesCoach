# AI Video Creator - Setup Guide

## Quick Start

1. **Get API Keys**
   - OpenAI API key from https://platform.openai.com/
   - Google Gemini API key from https://ai.google.dev/

2. **Setup Environment**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env and add your API keys
   nano .env
   ```

3. **Run the Application**
   ```bash
   # Make startup script executable
   chmod +x run.sh
   
   # Start both backend and frontend
   ./run.sh
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Manual Setup

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start backend server
python main.py
```

### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install Node.js dependencies
npm install

# Start development server
npm start
```

## Demo

Run the demo to see how the application works:
```bash
python3 demo_simple.py
```

## Architecture

```
AI Video Creator
├── Backend (FastAPI)
│   ├── OpenAI Integration (Script Generation)
│   ├── Google Veo 3 Integration (Video Generation)
│   └── Video Processing (Stitching)
└── Frontend (React)
    ├── Video Creator Interface
    ├── Project Dashboard
    └── Progress Tracking
```

## Key Features

✅ **AI Script Generation** - OpenAI creates detailed scripts  
✅ **7-Second Segmentation** - Optimal for AI video generation  
✅ **Professional Video Generation** - Google Veo 3 integration  
✅ **Seamless Stitching** - Smooth transitions between segments  
✅ **Multiple Styles** - Cinematic, documentary, animated, corporate  
✅ **Flexible Duration** - 15 seconds to 5 minutes  
✅ **Modern UI** - Beautiful React interface with Tailwind CSS  
✅ **Real-time Progress** - Track generation status  

## Troubleshooting

**API Key Issues:**
- Ensure keys are correctly set in `.env`
- Check API quotas and billing

**Video Generation Issues:**
- Veo 3 is in preview - some prompts may fail
- Try simpler descriptions if generation fails
- Check Google API status

**Frontend Issues:**
- Ensure backend is running on port 8000
- Check browser console for errors
- Verify CORS settings

## Next Steps

- Add database for persistent storage
- Implement user authentication
- Add more video styles and effects
- Integrate with cloud storage
- Add batch processing capabilities