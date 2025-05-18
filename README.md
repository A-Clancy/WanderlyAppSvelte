
# Wanderly Frontend

## Overview

This is the SvelteKit-based frontend for Wanderly, a full-stack application that helps users manage and explore personal Points of Interest (POIs) across the world. The frontend is built with SvelteKit and communicates with a Hapi.js backend via a REST API secured with JWT.

## Features

- **JWT Login Integration**: Secure authentication linked to backend
- **POI & Category Management**: Create and view user-specific POIs and group them by category
- **Map View with Leaflet**: POIs are plotted on an interactive map
- **Charting with Frappe**: Analytics on POI distribution by category
- **Multiple Image Upload**: Cloudinary integration with drag-and-drop support
- **Image Carousel Viewer**: Native Svelte component for viewing POI images
- **Responsive UI**: Styled with Bulma, with partials and component reuse
- **Runes (Writable Stores)**: Used for session and POI state management

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- A backend server (e.g., https://wanderly-backend.glitch.me) with valid API routes

### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/YOUR-USERNAME/WanderlyAppSvelte.git
   cd WanderlyAppSvelte
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create `.env` file**:
   ```env
   VITE_BACKEND_URL=https://your-backend-url
   ```

4. **Start the development server**:
   ```sh
   npm run dev
   ```

## Technologies Used

- **Frontend**: SvelteKit, Vite
- **Styling**: Bulma
- **Maps**: Leaflet
- **Charts**: Frappe Charts
- **State**: Svelte stores (`writable`)
- **Images**: Cloudinary + native file inputs
- **Authentication**: JWT via localStorage

## Roadmap

- Fix POI filtering (user-specific scoping)
- Add logout button
- Improve error handling and input feedback
- SSR implementation for select routes

## Git Branching

| Branch                | Purpose                                  |
|-----------------------|------------------------------------------|
| `main`               | Stable release branch                    |
| `feature/image-ui`   | Carousel and image management work       |
| `feature/maps`       | Leaflet map implementation               |

## License

MIT
