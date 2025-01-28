# Frontend Repository: mentor-sasnaka-frontend

## Overview
This repository contains the source code for the frontend of the Mentor Sasnaka platform. The application is built using modern JavaScript frameworks and tools to provide a user-friendly interface for users.

## Tech Stack
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: CSS/SCSS or a CSS-in-JS solution (e.g., TailwindCSS if applicable)
- **HTTP Client**: Axios
- **Hosting**: Vercel

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/OshadhaLakshan/mentor-sasnaka-frontend.git
   cd mentor-sasnaka-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create an `.env` file**
   Add the following environment variables to an `.env` file in the root directory:
   ```env
   VITE_API_URL=https://mentor-sasnaka-backend.vercel.app/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview the production build**
   ```bash
   npm run preview
   ```

## Folder Structure
```
/src
  /components    # Reusable React components
  /pages         # Page components (views)
  /assets        # Static files (images, fonts, etc.)
  /styles        # Global styles
  /utils         # Utility functions
  /hooks         # Custom React hooks
```

## Deployment
This project is deployed on Vercel. To deploy manually:
```bash
vercel --prod
```
