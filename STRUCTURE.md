# 📁 Project Structure

## Front Directory Organization

```
Front/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Animated navigation bar
│   │   ├── Button.jsx      # Custom button component
│   │   └── Input.jsx       # Custom input with validation
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Homepage with city selection
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Terrains.jsx    # Terrain listing by city
│   │   ├── TerrainDetail.jsx # Individual terrain details
│   │   ├── BookTerrain.jsx # Booking & payment page
│   │   ├── Contact.jsx     # Contact page
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── MatchHistory.jsx # Match history page
│   │   └── Friends.jsx     # Friends & invite system
│   ├── data/               # Mock data
│   │   ├── terrains.js     # Terrain data
│   │   ├── matches.js      # Match history data
│   │   └── friends.js       # Friends data
│   ├── utils/              # Utility functions
│   │   └── api.js          # API utilities & real-time functions
│   ├── assets/             # Images & assets
│   │   └── react.svg
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles with Tailwind
├── node_modules/           # Dependencies
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── package-lock.json       # Lock file
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
├── README.md               # Project documentation
└── FEATURES.md             # Features documentation
```

## Key Directories

### `/src/components`
Reusable UI components used across the application.

### `/src/pages`
Main page components for different routes.

### `/src/data`
Mock data files (replace with API calls in production).

### `/src/utils`
Utility functions and API helpers.

## File Organization Principles

- **Components**: Reusable UI elements
- **Pages**: Full page views
- **Data**: Mock data (backend will replace this)
- **Utils**: Helper functions and API integrations

