import os
import asyncio
from typing import List, Dict, Any
from moviepy.editor import VideoFileClip, concatenate_videoclips
import aiofiles
from pathlib import Path

class VideoService:
    def __init__(self, output_dir: str = "output"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.temp_dir = self.output_dir / "temp"
        self.temp_dir.mkdir(exist_ok=True)
    
    async def concatenate_video_segments(self, segment_files: List[str], output_filename: str) -> str:
        """
        Concatenate video segments into a single cohesive video
        """
        try:
            # Load video clips
            clips = []
            for file_path in segment_files:
                if os.path.exists(file_path):
                    clip = VideoFileClip(file_path)
                    clips.append(clip)
                else:
                    raise FileNotFoundError(f"Video segment not found: {file_path}")
            
            if not clips:
                raise ValueError("No video clips to concatenate")
            
            # Concatenate clips
            final_video = concatenate_videoclips(clips, method="compose")
            
            # Output path
            output_path = self.output_dir / output_filename
            
            # Write the final video
            final_video.write_videofile(
                str(output_path),
                codec='libx264',
                audio_codec='aac',
                fps=24,
                bitrate="5000k"
            )
            
            # Clean up clips from memory
            for clip in clips:
                clip.close()
            final_video.close()
            
            return str(output_path)
            
        except Exception as e:
            raise Exception(f"Error concatenating video segments: {str(e)}")
    
    async def add_transitions(self, segment_files: List[str], transition_duration: float = 0.5) -> List[str]:
        """
        Add smooth transitions between video segments
        """
        try:
            processed_files = []
            
            for i, file_path in enumerate(segment_files):
                if not os.path.exists(file_path):
                    continue
                
                clip = VideoFileClip(file_path)
                
                # Add fade in to first clip
                if i == 0:
                    clip = clip.fadein(transition_duration)
                
                # Add fade out to last clip
                if i == len(segment_files) - 1:
                    clip = clip.fadeout(transition_duration)
                
                # Add crossfade for middle clips
                if 0 < i < len(segment_files) - 1:
                    clip = clip.fadein(transition_duration).fadeout(transition_duration)
                
                # Save processed clip
                processed_filename = f"processed_segment_{i}.mp4"
                processed_path = self.temp_dir / processed_filename
                
                clip.write_videofile(
                    str(processed_path),
                    codec='libx264',
                    audio_codec='aac',
                    fps=24
                )
                
                processed_files.append(str(processed_path))
                clip.close()
            
            return processed_files
            
        except Exception as e:
            raise Exception(f"Error adding transitions: {str(e)}")
    
    async def create_video_project(self, project_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a complete video project from segments
        """
        try:
            project_id = project_data["project_id"]
            segments = project_data["segments"]
            
            # Create project directory
            project_dir = self.output_dir / project_id
            project_dir.mkdir(exist_ok=True)
            
            segment_files = []
            
            # Process each segment
            for segment in segments:
                if segment.get("video_url"):
                    # Download segment if it's a URL
                    segment_filename = f"segment_{segment['segment_id']}.mp4"
                    segment_path = project_dir / segment_filename
                    
                    # In a real implementation, download the video from the URL
                    # For now, we'll simulate this
                    segment_files.append(str(segment_path))
            
            if not segment_files:
                raise ValueError("No video segments available for concatenation")
            
            # Add transitions
            processed_segments = await self.add_transitions(segment_files)
            
            # Concatenate into final video
            final_filename = f"{project_id}_final.mp4"
            final_video_path = await self.concatenate_video_segments(
                processed_segments, 
                final_filename
            )
            
            # Clean up temporary files
            await self._cleanup_temp_files(processed_segments)
            
            return {
                "project_id": project_id,
                "final_video_path": final_video_path,
                "duration": sum(segment.get("duration", 7) for segment in segments),
                "segments_count": len(segments),
                "status": "completed"
            }
            
        except Exception as e:
            raise Exception(f"Error creating video project: {str(e)}")
    
    async def _cleanup_temp_files(self, file_paths: List[str]):
        """
        Clean up temporary files
        """
        for file_path in file_paths:
            try:
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception:
                pass  # Ignore cleanup errors
    
    async def get_video_info(self, video_path: str) -> Dict[str, Any]:
        """
        Get information about a video file
        """
        try:
            if not os.path.exists(video_path):
                raise FileNotFoundError(f"Video file not found: {video_path}")
            
            clip = VideoFileClip(video_path)
            
            info = {
                "duration": clip.duration,
                "fps": clip.fps,
                "size": clip.size,
                "audio": clip.audio is not None,
                "file_size": os.path.getsize(video_path)
            }
            
            clip.close()
            return info
            
        except Exception as e:
            raise Exception(f"Error getting video info: {str(e)}")
    
    async def create_thumbnail(self, video_path: str, time_offset: float = 1.0) -> str:
        """
        Create a thumbnail from a video
        """
        try:
            if not os.path.exists(video_path):
                raise FileNotFoundError(f"Video file not found: {video_path}")
            
            clip = VideoFileClip(video_path)
            
            # Create thumbnail at specified time offset
            thumbnail_path = video_path.replace('.mp4', '_thumbnail.jpg')
            clip.save_frame(thumbnail_path, t=min(time_offset, clip.duration - 1))
            
            clip.close()
            return thumbnail_path
            
        except Exception as e:
            raise Exception(f"Error creating thumbnail: {str(e)}")