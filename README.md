# Label Upload UI
A simple web application built with SvelteKit that allows you to easily upload images to your Label Studio projects.

> Github Copilot built this page btw, i have little to no time for writing a readme for a simple project that I published just to use cloudflare pages.

>  I should also mention that this project is only meant to be used privately, your tokens are not really that secure so please do not trust this app.

## Features

- Drag and drop interface for uploading multiple images
- Camera capture option for mobile devices
- Real-time upload status tracking for each file
- Configuration page for Label Studio connection settings
- Local storage for persistent settings
- Simple, responsive UI
- Docker support for easy deployment
- Capacitor/Android integration for mobile app functionality

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- A running Label Studio instance with API access

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
npm run dev -- --open (to automatically open in browser)
```

4. Open your browser and navigate to the port mentioned in your terminal.

### Environment Configuration

You can configure the application using a `.env` file with the following variables:

```
# public
VITE_LABEL_STUDIO_ADDRESS=http://localhost:8080
VITE_LABEL_STUDIO_PERSONAL_ACCESS_TOKEN=your_token_here
VITE_LABEL_STUDIO_PROJECT_ID=your_project_id_here
```

Alternatively, you can configure these settings through the UI on the configurator page.

### Running on Docker
```bash
docker build -t label-studio-uploader .
# and
docker run -p 3000:3000 --name label-uploader label-studio-uploader
# You can now access it on http://localhost:3000
```

## Configuration

On first run, you'll need to configure your Label Studio connection:

1. Click the "Ayarlar" (Settings) link or navigate to the /configurator page
2. Enter your Label Studio URL (e.g., http://localhost:8080)
3. Enter your Project ID (found in the URL of your Label Studio project)
4. Enter your Personal Access Token (found in your Label Studio profile)
5. Click "Kaydet" (Save)

## Building for Production

To create a production version of your app:

```bash
npm run build           # Default build
npm run build:docker    # Build for Docker with Node adapter
npm run build:static    # Build for static hosting with static adapter
```

You can preview the production build with:

```bash
npm run preview
```

## Mobile App Support

This project includes Capacitor integration for Android:

```bash
# Install Capacitor CLI if not already installed
npm install -g @capacitor/cli

# Add Android platform (already configured in this project)
npx cap add android

# Sync web code with native project
npx cap sync

# Open in Android Studio to build and run
npx cap open android
```

## Project Structure

- `src/routes/+page.svelte` - Main page with file upload functionality
- `src/routes/configurator/+page.svelte` - Configuration page for Label Studio settings
- `src/lib/` - Reusable components and utilities
- `src/app.css` - Global styles
- `static/` - Static assets like favicon
- `android/` - Capacitor Android project files
- `build/` - Output directory for production builds
- `functions/` - Server functions (for deployment platforms like Cloudflare)

## Technical Implementation

The application uses:
- SvelteKit for the frontend framework
- Local Storage for persisting user settings
- Browser's Fetch API for communication with Label Studio
- FormData for handling file uploads
- Dynamic status tracking for upload progress
