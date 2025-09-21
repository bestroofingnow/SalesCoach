import openai
from typing import List, Dict, Any
import json
import math
from pydantic import BaseModel

class VideoSegment(BaseModel):
    segment_id: int
    prompt: str
    duration: int
    video_url: str = None

class OpenAIService:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
    
    async def generate_script(self, topic: str, duration: int, style: str = "cinematic", tone: str = "professional") -> str:
        """
        Generate a video script based on the topic and requirements
        """
        prompt = f"""
        Create a compelling video script about "{topic}" that will be {duration} seconds long.
        
        Style: {style}
        Tone: {tone}
        
        Requirements:
        - The script should be engaging and well-structured
        - Include clear visual descriptions for each scene
        - Make it suitable for AI video generation
        - Ensure smooth narrative flow
        - Include timing cues for pacing
        
        Format the script with clear scene descriptions and dialogue/narration.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are an expert video scriptwriter and producer. Create engaging, visual scripts perfect for AI video generation."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            raise Exception(f"Error generating script: {str(e)}")
    
    async def create_video_segments(self, script: str, total_duration: int) -> List[VideoSegment]:
        """
        Break down the script into 7-second video segments with detailed prompts
        """
        segment_duration = 7  # seconds
        num_segments = math.ceil(total_duration / segment_duration)
        
        prompt = f"""
        Break down this video script into {num_segments} segments of approximately {segment_duration} seconds each:

        SCRIPT:
        {script}

        For each segment, create a detailed visual prompt that includes:
        - Specific visual elements and composition
        - Camera angles and movements
        - Lighting and mood
        - Character actions and expressions
        - Background and environment details
        - Any text or graphics needed

        Return the response as a JSON array with this structure:
        [
            {{
                "segment_id": 1,
                "prompt": "Detailed visual description for Veo 3",
                "duration": {segment_duration}
            }},
            ...
        ]

        Make sure each prompt is detailed enough for consistent video generation and maintains visual continuity between segments.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are an expert video director creating detailed visual prompts for AI video generation. Focus on visual consistency and cinematic quality."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.6,
                max_tokens=3000
            )
            
            content = response.choices[0].message.content.strip()
            
            # Extract JSON from the response
            json_start = content.find('[')
            json_end = content.rfind(']') + 1
            
            if json_start != -1 and json_end != -1:
                json_content = content[json_start:json_end]
                segments_data = json.loads(json_content)
                
                segments = []
                for segment_data in segments_data:
                    segments.append(VideoSegment(
                        segment_id=segment_data["segment_id"],
                        prompt=segment_data["prompt"],
                        duration=segment_data.get("duration", segment_duration)
                    ))
                
                return segments
            else:
                raise Exception("Could not parse segments from response")
                
        except json.JSONDecodeError as e:
            raise Exception(f"Error parsing segments JSON: {str(e)}")
        except Exception as e:
            raise Exception(f"Error creating video segments: {str(e)}")
    
    async def refine_segment_prompt(self, segment: VideoSegment, previous_segment: VideoSegment = None) -> str:
        """
        Refine a segment prompt for better continuity with the previous segment
        """
        continuity_context = ""
        if previous_segment:
            continuity_context = f"""
            Previous segment context: {previous_segment.prompt}
            
            Ensure visual continuity with the previous segment while transitioning smoothly to this new scene.
            """
        
        prompt = f"""
        Refine this video prompt for optimal Veo 3 generation:
        
        Original prompt: {segment.prompt}
        
        {continuity_context}
        
        Make the prompt more specific and detailed for AI video generation, including:
        - Exact camera specifications
        - Precise lighting conditions
        - Detailed character descriptions
        - Environmental specifics
        - Movement and timing details
        
        Keep it under 500 characters for optimal API performance.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are an expert at creating precise, detailed prompts for AI video generation that produce high-quality, consistent results."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=500
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            raise Exception(f"Error refining segment prompt: {str(e)}")