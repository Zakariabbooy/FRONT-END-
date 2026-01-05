# 🎾 Padel Finder

A modern, responsive web application for finding padel courts across Morocco's major cities.

## ✨ Features

- 🔐 **User Authentication** - Register and login system
- 🏙️ **City Selection** - Browse courts in Casablanca, Rabat, Marrakech, and Fes
- 🎯 **Terrain Listings** - View available padel courts with detailed information
- 📍 **Map Integration** - Location cards for each terrain (ready for Google Maps)
- 📞 **Contact System** - Contact form for inquiries
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Modern Design** - Beautiful UI with gradient colors and smooth animations
- 🧭 **Animated Navbar** - Toggle menu with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Project Structure

```
Front/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx    # Animated navigation bar
│   │   ├── Button.jsx    # Custom button component
│   │   └── Input.jsx     # Custom input component
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Homepage with city selection
│   │   ├── Login.jsx     # Login page
│   │   ├── Register.jsx  # Registration page
│   │   ├── Terrains.jsx  # Terrain listing by city
│   │   ├── TerrainDetail.jsx  # Individual terrain details
│   │   ├── Contact.jsx   # Contact page
│   │   └── Dashboard.jsx # User dashboard
│   ├── data/
│   │   └── terrains.js   # Mock data for terrains
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Entry point
└── package.json
```

## 🎨 Design Features

- **Color Scheme**: Modern gradient design with primary (blue) and accent (purple) colors
- **Responsive**: Mobile-first design that works on all screen sizes
- **Animations**: Smooth transitions and hover effects
- **Clean UI**: Minimalist design with excellent UX

## 📋 Available Cities

- **Casablanca** - 2 terrains
- **Rabat** - 2 terrains
- **Marrakech** - 1 terrain
- **Fes** - 1 terrain

## 🔧 Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Local Storage** - Authentication persistence

## 📝 Notes

- Currently uses mock data for terrains
- Authentication is client-side only (ready for backend integration)
- Map integration placeholder is ready for Google Maps API
- All forms include validation

## 🚧 Next Steps (Backend Integration)

1. Connect to MongoDB Atlas
2. Implement real authentication with JWT
3. Add Google Maps API for terrain locations
4. Create booking system
5. Add user profiles and favorites

## 📄 License

This project is open source and available for personal use.

---

Built with ❤️ for Padel enthusiasts in Morocco
