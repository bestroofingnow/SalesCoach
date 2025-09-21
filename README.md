# AI Video Creator

An intelligent video creation platform that combines OpenAI's language models with Google's Veo 3 AI video generation to create cohesive, professional videos from simple text descriptions.

## Features

- **AI-Powered Script Writing**: OpenAI generates detailed scripts based on your topic
- **Intelligent Segmentation**: Automatically breaks videos into 7-second segments for optimal generation
- **Professional Video Generation**: Uses Google Veo 3 to create high-quality video segments
- **Seamless Stitching**: Combines segments into cohesive final videos with smooth transitions
- **Customizable Styles**: Choose from cinematic, documentary, animated, or corporate styles
- **Flexible Duration**: Create videos from 15 seconds to 5 minutes
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## How It Works

1. **Input Your Idea**: Describe what you want your video to be about
2. **AI Script Generation**: OpenAI creates a detailed script with visual descriptions
3. **Segment Breakdown**: Script is divided into 7-second chunks with specific prompts
4. **Video Generation**: Google Veo 3 generates high-quality video for each segment
5. **Final Assembly**: Segments are stitched together with smooth transitions

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **OpenAI GPT-4**: Script writing and video planning
- **Google Veo 3**: AI video generation via Gemini API
- **MoviePy**: Video processing and concatenation

### Frontend
- **React 18**: Modern UI framework
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful icons

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key
- Google Gemini API key (for Veo 3 access)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-video-creator
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the backend server**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## API Documentation

### Create Video Project
```http
POST /create-video
Content-Type: application/json

{
  "topic": "A day in the life of a software developer",
  "duration": 60,
  "style": "cinematic",
  "tone": "professional"
}
```

### Generate Video Segments
```http
POST /generate-segments/{project_id}
```

### Get Project Status
```http
GET /project/{project_id}
```

## Configuration

### Video Settings
- **Duration Range**: 15 seconds to 5 minutes (300 seconds)
- **Segment Length**: 7 seconds per segment
- **Resolution**: Up to 4K (depending on Veo 3 capabilities)
- **Frame Rate**: 24 FPS

### Style Options
- **Cinematic**: Professional, movie-like quality
- **Documentary**: Realistic, informative style
- **Animated**: Cartoon or motion graphics style
- **Corporate**: Business-appropriate, clean aesthetic

### Tone Options
- **Professional**: Formal, business-appropriate
- **Casual**: Relaxed, conversational
- **Educational**: Informative, teaching-focused
- **Entertaining**: Fun, engaging content

## Usage Examples

### Creating a Product Demo Video
```javascript
{
  "topic": "Showcase the features of our new mobile app with screen recordings and user interactions",
  "duration": 90,
  "style": "corporate",
  "tone": "professional"
}
```

### Educational Content
```javascript
{
  "topic": "Explain the basics of machine learning with visual examples and animations",
  "duration": 120,
  "style": "animated",
  "tone": "educational"
}
```

### Marketing Video
```javascript
{
  "topic": "Promote our eco-friendly products with beautiful nature shots and customer testimonials",
  "duration": 45,
  "style": "cinematic",
  "tone": "entertaining"
}
```

## Development

### Project Structure
```
ai-video-creator/
├── main.py                 # FastAPI application
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── services/              # Service modules
│   ├── openai_service.py  # OpenAI integration
│   ├── veo_service.py     # Google Veo 3 integration
│   └── video_service.py   # Video processing
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── App.js        # Main application
    │   └── index.js      # Entry point
    └── public/           # Static assets
```

### Adding New Features

1. **New Video Styles**: Add to the style options in both frontend and backend
2. **Custom Durations**: Modify the duration range in `VideoCreator.js`
3. **Additional AI Models**: Extend the service classes to support other providers
4. **Enhanced Transitions**: Modify `video_service.py` for more transition effects

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API keys are correctly set in the `.env` file
   - Verify that your OpenAI account has sufficient credits
   - Check that your Google account has access to Veo 3 via Gemini API

2. **Video Generation Failures**
   - Veo 3 is in preview - some prompts may not work as expected
   - Try simplifying your video topic if generation fails
   - Check API rate limits and quotas

3. **Frontend Connection Issues**
   - Ensure the backend is running on port 8000
   - Check CORS configuration if accessing from different domains
   - Verify network connectivity between frontend and backend

### Performance Optimization

- **Batch Processing**: Generate multiple segments in parallel
- **Caching**: Store generated scripts and segments to avoid regeneration
- **CDN Integration**: Use a CDN for serving final videos
- **Database**: Add persistent storage for projects and segments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-4 and script generation capabilities
- Google for Veo 3 AI video generation technology
- The open-source community for the excellent tools and libraries used

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Note**: Google Veo 3 is currently in preview. API access and capabilities may change. Please refer to Google's official documentation for the most up-to-date information.