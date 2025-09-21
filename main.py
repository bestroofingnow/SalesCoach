from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import uvicorn

from services.openai_service import OpenAIService
from services.veo_service import VeoService
from services.video_service import VideoService

load_dotenv()

app = FastAPI(title="AI Video Creator", description="Create videos using OpenAI and Google Veo 3")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
openai_service = OpenAIService(api_key=os.getenv("OPENAI_API_KEY"))
veo_service = VeoService(api_key=os.getenv("GOOGLE_API_KEY"))
video_service = VideoService()

# Pydantic models
class VideoRequest(BaseModel):
    topic: str
    duration: int  # in seconds
    style: Optional[str] = "cinematic"
    tone: Optional[str] = "professional"

class VideoSegment(BaseModel):
    segment_id: int
    prompt: str
    duration: int
    video_url: Optional[str] = None

class VideoProject(BaseModel):
    project_id: str
    topic: str
    total_duration: int
    script: str
    segments: List[VideoSegment]
    status: str
    final_video_url: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "AI Video Creator API", "status": "running"}

@app.post("/create-video", response_model=VideoProject)
async def create_video(request: VideoRequest):
    """
    Create a video project with script and segments
    """
    try:
        # Generate script using OpenAI
        script = await openai_service.generate_script(
            topic=request.topic,
            duration=request.duration,
            style=request.style,
            tone=request.tone
        )
        
        # Break script into 7-second segments
        segments = await openai_service.create_video_segments(
            script=script,
            total_duration=request.duration
        )
        
        # Create project
        project = VideoProject(
            project_id=f"project_{hash(request.topic)}_{request.duration}",
            topic=request.topic,
            total_duration=request.duration,
            script=script,
            segments=segments,
            status="script_ready"
        )
        
        return project
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating video project: {str(e)}")

@app.post("/generate-segments/{project_id}")
async def generate_video_segments(project_id: str):
    """
    Generate video segments using Veo 3
    """
    try:
        # In a real app, you'd retrieve the project from a database
        # For demo purposes, we'll simulate the process
        
        # Simulate segment generation with Veo 3
        segments_data = [
            {"segment_id": 1, "prompt": "Sample prompt 1", "duration": 7},
            {"segment_id": 2, "prompt": "Sample prompt 2", "duration": 7}
        ]
        
        # Generate videos for each segment
        results = await veo_service.generate_batch_videos(segments_data)
        
        return {
            "message": "Video generation started", 
            "project_id": project_id,
            "batch_id": results.get("batch_id"),
            "status": "generating"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating video segments: {str(e)}")

@app.post("/stitch-video/{project_id}")
async def stitch_video_segments(project_id: str):
    """
    Stitch video segments together into final video
    """
    try:
        # In a real app, retrieve project and segment files from database/storage
        segment_files = [
            f"output/{project_id}/segment_1.mp4",
            f"output/{project_id}/segment_2.mp4"
        ]
        
        project_data = {
            "project_id": project_id,
            "segments": [
                {"segment_id": 1, "duration": 7, "video_url": segment_files[0]},
                {"segment_id": 2, "duration": 7, "video_url": segment_files[1]}
            ]
        }
        
        # Create final video
        result = await video_service.create_video_project(project_data)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error stitching video: {str(e)}")

@app.get("/video-status/{video_id}")
async def get_video_status(video_id: str):
    """
    Check the status of a video generation request
    """
    try:
        status = await veo_service.check_video_status(video_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking video status: {str(e)}")

@app.get("/project/{project_id}")
async def get_project(project_id: str):
    """
    Get project status and details
    """
    # In a real app, retrieve from database
    return {"project_id": project_id, "status": "in_progress"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)