# Interactive-Map

## Overview

Welcome to the Interactive-Map! This React-based application integrates Mapbox to provide an interactive map experience. Users can search for locations, view 3D building visualizations, and access detailed information about various places.

## Project Structure

app/
components/ # Shared components for the application
hooks/ # Custom React hooks
types/ # TypeScript types and interfaces

root/
components/
ui/ # ShadCN UI components
ui-components/ # Custom UI components for this project
lib/ # Utility functions and libraries

markdown
Копировать код

## Features

- **Mapbox Integration**: Interactive map with 3D building visualization.
- **Search Functionality**: Search locations using Mapbox Geocoding API.
- **Responsive Design**: Adaptive layout for various screen sizes.
- **3D Buildings**: Dynamic rendering of 3D buildings.
- **Place Details**: Detailed information display for selected places.

## Installation

1. **Clone the Repository**
   ```bash
   [git clone https://github.com/your-repo/mapbox-project.git](https://github.com/dev-tokumei/interactive-map.git)
Install Dependencies

bash
Копировать код
cd interactive-map
yarn install
Configure Environment Variables

Create a .env.local file in the root directory and add your Mapbox API key:

plaintext
Копировать код
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key
Usage
Start the Development Server

bash
Копировать код
yarn run dev
Open Your Browser
Navigate to http://localhost:3000 to view the application.

##Components
app/components
- **Map: The core map component that renders the map, handles 3D buildings, and manages click events.
##components/ui
- **ShadCN Components: Pre-built UI components from the ShadCN library.
##components/ui-components
- **Custom Components: Tailor-made components for this project, including headers and place detail displays.
##PlaceDetails: Displays detailed information about a selected place.
- **Header: Contains the search bar for querying locations.
##lib
- **Utilities: Shared utility functions and libraries used throughout the project
