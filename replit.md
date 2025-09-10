# Roofing Training Academy

## Overview

Roofing Training Academy is a comprehensive multi-tenant SaaS training platform designed for roofing companies that do door-to-door sales. The platform provides structured training programs across three main areas: residential roofing, commercial roofing, and restoration services. The system enables employees to progress through modular training content, complete quizzes, take notes, participate in VAPI.ai-powered role-play training, and track their learning advancement through an interactive dashboard. Companies can customize the platform with their branding, values, and company-specific knowledge.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (September 10, 2025)

### Major Multi-Tenant Transformation
- Converted from single-company to multi-tenant SaaS platform
- Added three user levels: super_admin (platform owner), admin (company), user (trainee)
- Removed all "Best Roofing Now" and "BRN" references
- Added companies table with customizable settings
- Added user notes functionality for training
- Added VAPI agent configurations per company
- Updated authentication to support multi-tenant structure
- Pricing model: $99/month platform fee + $20/user

## Previous Changes (August 5, 2025)

### Fixed Critical Issues
- Resolved missing storage interface and database methods - created comprehensive IStorage interface with all required methods
- Fixed authentication system by implementing a development user for testing (id: test-user-123)
- Created initial training data including 3 tracks, 3 modules, and 3 lessons for testing
- Fixed TypeScript errors and database query issues
- Resolved API data structure mismatches between frontend and backend

### Added Navigation Features
- Made all "Continue Learning" buttons on dashboard functional - they now navigate to track views
- Created new training track page to view modules within each track
- Made sidebar track names and module buttons clickable for navigation
- Added proper routing for /tracks/:trackId path
- Connected all navigation elements to enable browsing through training content

### Completed Comprehensive Content Integration
- Successfully integrated detailed training content from all three educational manuals (Commercial, Insurance, Residential)
- Added comprehensive cold calling sales program with scripts, objection handling, and follow-up systems
- Populated all 24 training modules with in-depth lessons (total 94 lessons across all modules)
- Each module now contains 3-6 detailed lessons with rich HTML content, practical examples, and actionable strategies
- Added quiz questions for all modules to test knowledge retention
- Content includes: company culture, roofing fundamentals, materials, sales excellence, commercial systems, insurance processes, and more

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, organized in a monorepo structure under the `client/` directory. The application uses Vite as the build tool and development server, with React Router (wouter) for client-side routing. The UI is constructed using shadcn/ui components built on top of Radix UI primitives and styled with Tailwind CSS.

**Key Design Decisions:**
- Component-based architecture with reusable UI components in `client/src/components/ui/`
- Custom training components for lesson content, progress tracking, and quiz functionality
- Responsive design with mobile-first approach using Tailwind CSS
- Real-time query management with TanStack Query for efficient data fetching and caching

### Backend Architecture
The backend follows an Express.js RESTful API pattern with TypeScript support. The server code is organized in the `server/` directory with clear separation of concerns:

**Core Components:**
- Express.js server with middleware for request logging and error handling
- RESTful API endpoints for training tracks, modules, lessons, and user progress
- Authentication middleware integration with Replit's OpenID Connect system
- Database operations abstracted through a storage layer interface

**API Structure:**
- `/api/auth/*` - Authentication and user management
- `/api/tracks/*` - Training track management
- `/api/modules/*` - Training module operations  
- `/api/lessons/*` - Individual lesson content
- `/api/quiz/*` - Quiz functionality and scoring
- `/api/progress/*` - User progress tracking

### Data Storage Solutions
The system uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The database is hosted on Neon's serverless PostgreSQL platform.

**Schema Design:**
- User management with role-based access (trainee, instructor, admin)
- Hierarchical training structure: Tracks → Modules → Lessons
- Progress tracking with completion status and quiz responses
- Session management for authentication persistence

**Key Tables:**
- `users` - User profiles and authentication data
- `training_tracks` - Main training categories (residential, commercial, restoration)
- `training_modules` - Sub-sections within tracks
- `lessons` - Individual training content units
- `user_progress` - Completion tracking and quiz scores
- `sessions` - Authentication session storage

### Authentication and Authorization
The platform integrates with Replit's authentication system using OpenID Connect (OIDC) for secure user management.

**Features:**
- Automatic user registration on first login
- Role-based access control with support for multiple user types
- Session-based authentication with PostgreSQL session storage
- Secure logout and session cleanup

## External Dependencies

### Core Framework Dependencies
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations and schema management
- **Replit Authentication**: OpenID Connect integration for user authentication
- **TanStack Query**: Server state management and data synchronization

### UI and Styling Dependencies
- **shadcn/ui**: Pre-built component library based on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI components for React
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent visual elements

### File Upload and Storage
- **Google Cloud Storage**: Cloud storage for training materials and user uploads
- **Uppy**: File upload library with progress tracking and cloud integration

### Development and Build Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Type safety across frontend and backend code
- **ESBuild**: Fast JavaScript bundler for production builds
- **React Hook Form**: Form validation and management with Zod schema validation