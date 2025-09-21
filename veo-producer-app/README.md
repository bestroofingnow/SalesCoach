# Veo Producer App

Backend service that plans a cohesive video using OpenAI and renders segments with Google Vertex AI Veo 3.

## Setup

1. Copy environment file:


cp .env.example .env


2. Fill the variables in :
- OPENAI_API_KEY (required)
- GOOGLE_CLOUD_PROJECT (required)
- GOOGLE_CLOUD_LOCATION (default us-central1)
- GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON)
- VEO_MODEL (default veo-3.0)
- OUTPUT_DIR (default ./outputs)
- LOG_LEVEL (default info)

3. Install deps:


npm install


4. Dev server:


npm run dev


## API

- POST /api/plan


{
  "idea": "City morning coffee montage",
  "totalDurationSeconds": 28,
  "segmentDurationSeconds": 7,
  "style": "cinematic"
}


- POST /api/produce


{
  "plan": { "title": "...", "synopsis": "...", "segmentDurationSeconds": 7, "segments": [ { "index": 0, "startSeconds": 0, "endSeconds": 7, "prompt": "...", "script": "..." } ] }
}


- GET /api/jobs/:id

Returns job status and outputs. If ffmpeg is available, stitchedVideoPath will contain the final video path.

Outputs are saved under OUTPUT_DIR per job folder. Veo 3 SDK method calls may need adjustment to match the latest Vertex AI release.

## Notes
- Update Veo 3 client if SDK API changes.
- For stitching, ensure ffmpeg is installed on the system.
