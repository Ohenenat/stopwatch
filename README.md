# Advanced Digital Clock ⏰

A feature-rich digital clock web application with alarm, stopwatch, timer, weather widget, and customizable themes.

## Features

### 🕐 Core Clock Features
- **Real-time Digital Clock** - Displays current time with seconds
- **Date Display** - Shows full date with day, month, and year
- **12/24 Hour Format** - Toggle between 12-hour (AM/PM) and 24-hour formats
- **Dark/Light Mode** - Switch between dark and light themes

### ⏰ Alarm System
- Set alarms for specific times
- Browser notifications when alarm rings
- Audio alert using Web Audio API
- Snooze functionality (5-minute intervals)
- Persistent alarm settings using localStorage

### ⏱️ Stopwatch
- Start/Stop functionality
- Reset button
- Lap recording with time tracking
- Real-time display with millisecond precision
- Visual lap history

### ⏳ Countdown Timer
- Customizable duration (minutes and seconds)
- Start/Pause/Resume functionality
- Visual warnings (orange when ≤30 seconds, red when ≤10 seconds)
- Completion notification and sound
- Reset functionality

### 🎨 Theme Customization
- 8 preset background themes:
  - **Gradients**: Blue, Sunset, Ocean, Forest
  - **Solid Colors**: Dark, Light, Purple, Green
- Light/Dark mode toggle
- Theme preferences saved to localStorage

### 🌤️ Weather Widget
- Real-time weather information
- Search by city name
- Displays temperature, conditions, and wind speed
- Uses free Open-Meteo API (no API key required)
- Weather icons and emoji indicators

### 📱 Responsive Design
- Mobile-friendly interface
- Optimized for various screen sizes
- Touch-friendly buttons and controls
- Adaptive font sizes for small screens

## Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients, animations, and backdrop filters
- **JavaScript (ES6)** - Object-oriented design with multiple classes
- **Web APIs Used**:
  - Web Audio API (alarm and timer sounds)
  - Notifications API
  - localStorage (settings persistence)
  - Fetch API (weather data)

## Project Structure

```
digital_clock/
├── index.html      # Main HTML structure
├── script.js       # JavaScript application logic
├── styles.css      # Styling and responsive design
└── README.md       # Documentation
```

## Installation & Usage

### Quick Start
1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The application will start with the default theme

### No Installation Required
This is a standalone web application - just open the HTML file in your browser!

## Usage Guide

### Clock Display
- Main clock shows time in large, easy-to-read digits
- Date appears above the clock
- Click the "24H" button to toggle time format
- Click the "🌙" button to toggle dark/light mode

### Setting an Alarm
1. Go to the **Tools** tab
2. Click on the time input field
3. Select your desired alarm time
4. Click "Set Alarm"
5. The alarm will display "Alarm set for [time]"
6. When the time arrives, you'll see a notification and hear an alert

### Using the Stopwatch
1. Go to the **Tools** tab
2. Click "Start" to begin timing
3. Use "Lap" to record split times
4. Click "Stop" to pause
5. Click "Reset" to clear and start over

### Setting a Timer
1. Go to the **Tools** tab
2. Enter minutes and seconds
3. Click "Start Timer"
4. The timer will count down
5. Visual warnings appear at ≤30 and ≤10 seconds
6. Completion notification shows when finished

### Customizing Themes
1. Go to the **Settings** tab
2. Click any background theme box
3. Your choice is saved automatically
4. Combine with dark/light mode for more options

### Checking Weather
1. Go to the **Settings** tab
2. Enter a city name in the weather widget
3. Click "Get Weather" or press Enter
4. Weather information displays with current conditions

## Browser Compatibility

- **Chrome/Edge** - Fully supported
- **Firefox** - Fully supported
- **Safari** - Fully supported
- **Mobile Browsers** - Fully responsive and functional

### Requirements
- JavaScript enabled
- Modern browser with ES6 support
- Internet connection (for weather widget)

## Keyboard Shortcuts

- **T** - Toggle dark/light mode
- **F** - Toggle 12/24 hour format
- **Enter** - Submit city name in weather widget

## Data Persistence

The application automatically saves your preferences:
- Clock display format (12/24 hour)
- Theme mode (dark/light)
- Selected background theme
- Alarm settings

All data is stored locally in your browser using localStorage.

## API Used

### Open-Meteo Weather API
- Free, no API key required
- Provides current weather data
- Supports weather codes, temperature, and wind speed
- Privacy-friendly (no tracking)

## Performance Features

- Smooth animations and transitions
- Backdrop blur effects for modern UI
- Optimized DOM updates
- Efficient event handling
- Minimal resource consumption

## Accessibility

- High contrast text for readability
- Large, easily clickable buttons
- Keyboard navigation support
- Semantic HTML structure
- Descriptive button titles (tooltips)

## Future Enhancement Ideas

- Multiple alarms support
- Custom alarm sounds
- Timezone selection
- World clock for multiple cities
- Pomodoro timer mode
- Dark theme scheduling
- Sound/vibration preferences
- Fullscreen mode
- Historical weather data

## License

This project is open source and available for personal and commercial use.

## Support

If you encounter any issues:
1. Ensure your browser is up to date
2. Clear localStorage: Open DevTools > Application > localStorage > Clear All
3. Check browser console for error messages
4. Try a different browser if problems persist

## Version

**Current Version**: 1.0.0

Last Updated: December 2025
