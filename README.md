# Label Upload UI
A simple web application built with SvelteKit that allows you to easily upload images to your Label Studio projects.

> Github Copilot built this page btw, i have little to no time for writing a readme for a simple project that I published just to use cloudflare pages.

## Features

- Drag and drop interface for uploading multiple images
- Configuration page for Label Studio connection settings
- Local storage for persistent settings
- Real-time upload status tracking
- Simple, responsive UI

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

4. Open your browser and navigate to the local server (usually http://localhost:5173)

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
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## Project Structure

- `src/routes/+page.svelte` - Main page with file upload functionality
- `src/routes/configurator/+page.svelte` - Configuration page for Label Studio settings
- `src/lib/` - Reusable components and utilities
- `static/` - Static assets like favicon

## Customizing the Project

To modify the project:

1. Edit components in the `src/routes` directory for page-level changes
2. Add or modify styles in the `<style>` sections of each component
3. Create reusable components in the `src/lib` directory
4. For global styles, edit `src/app.css`
