// ============================================
// DIGITAL CLOCK APPLICATION
// ============================================

class DigitalClock {
    constructor() {
        // DOM Elements
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.dateDisplayEl = document.getElementById('dateDisplay');
        this.ampmDisplayEl = document.getElementById('ampmDisplay');

        // Theme Toggle
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.formatToggleBtn = document.getElementById('formatToggle');

        // Tab Buttons
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        // Theme Options
        this.themeOptions = document.querySelectorAll('.theme-option');

        // State
        this.is24Hour = false;
        this.isDarkMode = true;
        this.currentTheme = 'gradient-blue';

        // Initialize
        this.init();
    }

    init() {
        this.loadSettings();
        this.updateClock();
        this.setClockInterval();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Theme and Format Toggles
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        this.formatToggleBtn.addEventListener('click', () => this.toggleFormat());

        // Tab Navigation
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn));
        });

        // Theme Options
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => this.setBackgroundTheme(option));
        });

        // Alarm Controls
        document.getElementById('setAlarmBtn').addEventListener('click', () => alarm.setAlarm());
        document.getElementById('cancelAlarmBtn').addEventListener('click', () => alarm.cancelAlarm());

        // Weather
        document.getElementById('getWeatherBtn').addEventListener('click', () => weather.getWeather());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    handleKeyboardShortcuts(e) {
        if (e.key === 't' || e.key === 'T') {
            this.toggleTheme();
        }
        if (e.key === 'f' || e.key === 'F') {
            this.toggleFormat();
        }
    }

    updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Update Date Display
        this.updateDateDisplay(now);

        // Handle 12/24 Hour Format
        let displayHours = hours;
        let ampm = '';

        if (!this.is24Hour) {
            ampm = hours >= 12 ? 'PM' : 'AM';
            displayHours = hours % 12 || 12;
        }

        // Update Clock Display
        this.hoursEl.textContent = this.padZero(displayHours);
        this.minutesEl.textContent = this.padZero(minutes);
        this.secondsEl.textContent = this.padZero(seconds);
        this.ampmDisplayEl.textContent = ampm;
    }

    updateDateDisplay(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const dayNumber = date.getDate();
        const year = date.getFullYear();

        this.dateDisplayEl.textContent = `${dayName}, ${monthName} ${dayNumber}, ${year}`;
    }

    setClockInterval() {
        setInterval(() => this.updateClock(), 1000);
    }

    padZero(num) {
        return num.toString().padStart(2, '0');
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('light-mode');
        this.themeToggleBtn.textContent = this.isDarkMode ? '🌙' : '☀️';
        this.saveSettings();
    }

    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        this.formatToggleBtn.textContent = this.is24Hour ? '12H' : '24H';
        this.updateClock();
        this.saveSettings();
    }

    switchTab(clickedBtn) {
        // Deactivate all tabs
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Activate clicked tab
        clickedBtn.classList.add('active');
        const tabId = clickedBtn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }

    setBackgroundTheme(themeElement) {
        const themeName = themeElement.getAttribute('data-theme');
        
        // Remove all theme classes
        document.body.classList.remove(
            'theme-gradient-blue', 'theme-gradient-sunset', 'theme-gradient-ocean',
            'theme-gradient-forest', 'theme-color-dark', 'theme-color-light',
            'theme-color-purple', 'theme-color-green'
        );

        // Add new theme class
        document.body.classList.add(`theme-${themeName}`);

        // Update active state
        this.themeOptions.forEach(option => option.classList.remove('active'));
        themeElement.classList.add('active');

        // Save theme
        this.currentTheme = themeName;
        this.saveSettings();
    }

    saveSettings() {
        const settings = {
            is24Hour: this.is24Hour,
            isDarkMode: this.isDarkMode,
            currentTheme: this.currentTheme
        };
        localStorage.setItem('clockSettings', JSON.stringify(settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('clockSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.is24Hour = settings.is24Hour;
            this.isDarkMode = settings.isDarkMode;
            this.currentTheme = settings.currentTheme;

            // Apply settings
            if (!this.isDarkMode) {
                document.body.classList.add('light-mode');
                this.themeToggleBtn.textContent = '☀️';
            }

            this.formatToggleBtn.textContent = this.is24Hour ? '12H' : '24H';

            // Apply theme
            document.body.classList.add(`theme-${this.currentTheme}`);
            const activeTheme = document.querySelector(`[data-theme="${this.currentTheme}"]`);
            if (activeTheme) {
                activeTheme.classList.add('active');
            }
        } else {
            // Set default theme
            const defaultTheme = document.querySelector('[data-theme="gradient-blue"]');
            if (defaultTheme) {
                defaultTheme.classList.add('active');
            }
        }
    }
}

// ============================================
// ALARM SYSTEM
// ============================================

class AlarmSystem {
    constructor() {
        this.alarmTimeInput = document.getElementById('alarmTime');
        this.setAlarmBtn = document.getElementById('setAlarmBtn');
        this.cancelAlarmBtn = document.getElementById('cancelAlarmBtn');
        this.alarmStatus = document.getElementById('alarmStatus');
        this.snoozeBtn = document.getElementById('snoozeBtn');
        this.snoozeContainer = document.getElementById('snoozeContainer');
        this.alarmSound = document.getElementById('alarmSound');

        this.alarmTime = null;
        this.isAlarmActive = false;
        this.isAlarmRinging = false;

        this.loadAlarmSettings();
        this.startAlarmCheck();
    }

    setAlarm() {
        const time = this.alarmTimeInput.value;
        if (!time) {
            alert('Please select a time');
            return;
        }

        this.alarmTime = time;
        this.isAlarmActive = true;
        this.isAlarmRinging = false;

        this.updateDisplay();
        this.saveAlarmSettings();
    }

    cancelAlarm() {
        this.alarmTime = null;
        this.isAlarmActive = false;
        this.isAlarmRinging = false;
        this.stopAlarmSound();

        this.updateDisplay();
        this.saveAlarmSettings();
    }

    startAlarmCheck() {
        setInterval(() => {
            if (this.isAlarmActive && !this.isAlarmRinging) {
                const now = new Date();
                const currentTime = `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}`;

                if (currentTime === this.alarmTime) {
                    this.ringAlarm();
                }
            }
        }, 1000);
    }

    ringAlarm() {
        this.isAlarmRinging = true;
        this.alarmStatus.textContent = '🔔 Alarm is ringing!';
        this.alarmStatus.classList.add('alarm-ringing');
        this.snoozeContainer.style.display = 'block';

        this.playAlarmSound();

        // Show browser notification
        if (Notification.permission === 'granted') {
            new Notification('Time Alert!', {
                body: `Your alarm at ${this.alarmTime} is ringing!`,
                icon: '⏰'
            });
        }
    }

    playAlarmSound() {
        // Generate a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;

        for (let i = 0; i < 5; i++) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, now + i * 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.5 + 0.3);

            oscillator.start(now + i * 0.5);
            oscillator.stop(now + i * 0.5 + 0.3);
        }
    }

    stopAlarmSound() {
        // Alarm sound stops naturally due to Web Audio API implementation
    }

    snooze() {
        this.isAlarmRinging = false;
        this.snoozeContainer.style.display = 'none';
        this.stopAlarmSound();

        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        this.alarmTime = `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}`;

        this.updateDisplay();
    }

    updateDisplay() {
        if (this.isAlarmActive) {
            this.alarmStatus.textContent = `⏰ Alarm set for ${this.alarmTime}`;
            this.alarmStatus.classList.add('alarm-active');
            this.setAlarmBtn.style.display = 'none';
            this.cancelAlarmBtn.style.display = 'block';
        } else {
            this.alarmStatus.textContent = '';
            this.alarmStatus.classList.remove('alarm-active', 'alarm-ringing');
            this.setAlarmBtn.style.display = 'block';
            this.cancelAlarmBtn.style.display = 'none';
            this.snoozeContainer.style.display = 'none';
        }
    }

    padZero(num) {
        return num.toString().padStart(2, '0');
    }

    saveAlarmSettings() {
        localStorage.setItem('alarmSettings', JSON.stringify({
            alarmTime: this.alarmTime,
            isAlarmActive: this.isAlarmActive
        }));
    }

    loadAlarmSettings() {
        const saved = localStorage.getItem('alarmSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.alarmTime = settings.alarmTime;
            this.isAlarmActive = settings.isAlarmActive;
            this.updateDisplay();
        }
    }
}

// ============================================
// STOPWATCH
// ============================================

class Stopwatch {
    constructor() {
        this.startStopBtn = document.getElementById('startStopBtn');
        this.resetBtn = document.getElementById('resetStopwatchBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.display = document.getElementById('stopwatchDisplay');
        this.lapsList = document.getElementById('lapTimes');

        this.isRunning = false;
        this.elapsed = 0;
        this.startTime = 0;
        this.laps = [];
        this.intervalId = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startStopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleStartStop();
        });
        this.resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.reset();
        });
        this.lapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.addLap();
        });
    }

    toggleStartStop() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        this.isRunning = true;
        this.startTime = Date.now() - this.elapsed;
        this.startStopBtn.textContent = 'Stop';
        this.startStopBtn.classList.add('btn-secondary');
        this.startStopBtn.classList.remove('btn-primary');

        this.intervalId = setInterval(() => {
            this.elapsed = Date.now() - this.startTime;
            this.updateDisplay();
        }, 10);
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.classList.remove('btn-secondary');
        this.startStopBtn.classList.add('btn-primary');
    }

    reset() {
        this.stop();
        this.elapsed = 0;
        this.laps = [];
        this.updateDisplay();
        this.lapsList.innerHTML = '';
    }

    addLap() {
        if (this.isRunning) {
            this.laps.push(this.elapsed);
            this.displayLap();
        }
    }

    displayLap() {
        const lapDiv = document.createElement('div');
        lapDiv.className = 'lap-item';
        const lapNumber = this.laps.length;
        const lapTime = this.formatTime(this.elapsed);
        const lapDuration = lapNumber > 1
            ? this.formatTime(this.laps[lapNumber - 1] - this.laps[lapNumber - 2])
            : lapTime;

        lapDiv.innerHTML = `
            <span>Lap ${lapNumber}</span>
            <span>${lapDuration}</span>
        `;
        this.lapsList.insertBefore(lapDiv, this.lapsList.firstChild);
    }

    updateDisplay() {
        this.display.textContent = this.formatTime(this.elapsed);
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const centiseconds = Math.floor((ms % 1000) / 10);

        return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}.${this.padZero(centiseconds)}`;
    }

    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}

// ============================================
// COUNTDOWN TIMER
// ============================================

class CountdownTimer {
    constructor() {
        this.minutesInput = document.getElementById('timerMinutes');
        this.secondsInput = document.getElementById('timerSeconds');
        this.startBtn = document.getElementById('startTimerBtn');
        this.pauseBtn = document.getElementById('pauseTimerBtn');
        this.resetBtn = document.getElementById('resetTimerBtn');
        this.display = document.getElementById('timerDisplay');
        this.inputsContainer = document.querySelector('.timer-inputs');

        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.startTimer();
        });
        this.pauseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.pauseTimer();
        });
        this.resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.resetTimer();
        });
    }

    startTimer() {
        if (!this.isRunning) {
            const minutes = parseInt(this.minutesInput.value) || 0;
            const seconds = parseInt(this.secondsInput.value) || 0;

            if (minutes === 0 && seconds === 0) {
                alert('Please set a duration');
                return;
            }

            this.totalSeconds = minutes * 60 + seconds;
            this.remainingSeconds = this.totalSeconds;

            this.isRunning = true;
            this.inputsContainer.style.display = 'none';
            this.display.style.display = 'block';
            this.startBtn.style.display = 'none';
            this.pauseBtn.style.display = 'block';

            this.countDown();
        }
    }

    pauseTimer() {
        if (this.isRunning) {
            this.isPaused = !this.isPaused;
            if (this.isPaused) {
                clearInterval(this.intervalId);
                this.pauseBtn.textContent = 'Resume';
            } else {
                this.countDown();
                this.pauseBtn.textContent = 'Pause';
            }
        }
    }

    countDown() {
        this.intervalId = setInterval(() => {
            this.remainingSeconds--;
            this.updateDisplay();

            if (this.remainingSeconds <= 0) {
                this.finishTimer();
            } else if (this.remainingSeconds <= 10) {
                this.display.classList.add('danger');
            } else if (this.remainingSeconds <= 30) {
                this.display.classList.add('warning');
            }
        }, 1000);
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.display.textContent = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    finishTimer() {
        clearInterval(this.intervalId);
        this.display.classList.remove('warning', 'danger');
        this.display.textContent = '00:00';
        this.isRunning = false;
        this.isPaused = false;

        // Play alarm sound
        this.playTimerSound();

        // Show notification
        if (Notification.permission === 'granted') {
            new Notification('Timer Complete!', {
                body: 'Your countdown timer has finished.',
                icon: '⏳'
            });
        }

        this.resetTimer();
    }

    playTimerSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;

        for (let i = 0; i < 3; i++) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 1000;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, now + i * 0.6);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.6 + 0.3);

            oscillator.start(now + i * 0.6);
            oscillator.stop(now + i * 0.6 + 0.3);
        }
    }

    resetTimer() {
        clearInterval(this.intervalId);
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.isRunning = false;
        this.isPaused = false;

        this.minutesInput.value = '';
        this.secondsInput.value = '';
        this.inputsContainer.style.display = 'flex';
        this.display.style.display = 'none';
        this.display.classList.remove('warning', 'danger');
        this.startBtn.style.display = 'block';
        this.pauseBtn.style.display = 'none';
        this.pauseBtn.textContent = 'Pause';
    }

    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}

// ============================================
// WEATHER WIDGET
// ============================================

class WeatherWidget {
    constructor() {
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.weatherDisplay = document.getElementById('weatherDisplay');

        this.getWeatherBtn.addEventListener('click', () => this.getWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.getWeather();
        });
    }

    getWeather() {
        const city = this.cityInput.value.trim();
        if (!city) {
            alert('Please enter a city name');
            return;
        }

        // Using Open-Meteo (free API, no key required)
        this.getCoordinates(city);
    }

    getCoordinates(city) {
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const result = data.results[0];
                    this.getWeatherData(result.latitude, result.longitude, result.name, result.country);
                } else {
                    this.weatherDisplay.innerHTML = '<p>City not found. Try another search.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.weatherDisplay.innerHTML = '<p>Unable to fetch weather data.</p>';
            });
    }

    getWeatherData(lat, lon, city, country) {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                this.displayWeather(data.current, city, country);
            })
            .catch(error => {
                console.error('Error:', error);
                this.weatherDisplay.innerHTML = '<p>Unable to fetch weather data.</p>';
            });
    }

    displayWeather(current, city, country) {
        const temp = Math.round(current.temperature_2m);
        const windSpeed = Math.round(current.wind_speed_10m);
        const condition = this.getWeatherCondition(current.weather_code);
        const icon = this.getWeatherIcon(current.weather_code);

        this.weatherDisplay.innerHTML = `
            <div class="weather-info">
                <div class="weather-icon">${icon}</div>
                <div class="weather-details">
                    <h4>${city}, ${country}</h4>
                    <div class="weather-temp">${temp}°C</div>
                    <p>${condition}</p>
                    <p>Wind: ${windSpeed} km/h</p>
                </div>
            </div>
        `;
    }

    getWeatherCondition(code) {
        const conditions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Foggy (Rime)',
            51: 'Drizzle',
            53: 'Drizzle',
            55: 'Drizzle',
            61: 'Rain',
            63: 'Rain',
            65: 'Heavy rain',
            71: 'Snow',
            73: 'Snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Rain showers',
            81: 'Heavy rain showers',
            82: 'Violent rain showers',
            85: 'Snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Thunderstorm with hail'
        };
        return conditions[code] || 'Unknown';
    }

    getWeatherIcon(code) {
        if (code === 0) return '☀️';
        if (code === 1 || code === 2) return '⛅';
        if (code === 3) return '☁️';
        if (code === 45 || code === 48) return '🌫️';
        if (code >= 51 && code <= 55) return '🌧️';
        if (code >= 61 && code <= 65) return '🌧️';
        if (code >= 71 && code <= 77) return '❄️';
        if (code >= 80 && code <= 82) return '🌧️';
        if (code >= 85 && code <= 86) return '🌨️';
        if (code >= 95 && code <= 99) return '⛈️';
        return '🌤️';
    }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Create global instances
const clock = new DigitalClock();
const alarm = new AlarmSystem();
const stopwatch = new Stopwatch();
const timer = new CountdownTimer();
const weather = new WeatherWidget();

// Add snooze button event listener
document.getElementById('snoozeBtn').addEventListener('click', () => {
    alarm.snooze();
});
