# SevaaYukti - ସେବାୟୁକ୍ତି
Your Health Companion | Empowering Rural Healthcare in Odisha

SevaaYukti is a modern, offline-first digital health platform designed specifically for rural Odisha, India. It empowers ASHA (Accredited Social Health Activist) workers and enables seamless healthcare delivery to remote communities with limited digital literacy and internet connectivity.


## 🌟 Features

### For Citizens
- **AI Health Chatbot**: Voice-enabled, bilingual (English/Odia) health assistant for symptoms checking and health guidance
- **Sevaa Yukti Card Application**: Simple, step-by-step application process with voice input support
- **Find Local ASHA Worker**: Search by village, PIN code, or Gram Panchayat
- **Disease Awareness Hub**: Culturally appropriate health information with audio narration
- **Bilingual Interface**: Complete support for English and Odia (ଓଡ଼ିଆ) languages

### For ASHA Workers
- **Offline-First Architecture**: Record patient data without internet connectivity
- **Voice-Based Data Entry**: Speak to enter data - no typing needed
- **Smart Reminders**: Automated alerts for vaccinations and checkups
- **Dashboard**: Track patients, visits, vaccinations, and high-risk cases
- **Auto-Sync**: Automatic data synchronization when internet is available
- **Vaccination Tracker**: Visual timeline and reminder system for child immunizations
- **Maternal & Child Care**: Comprehensive pregnancy and postnatal care tracking

## 🎨 Design Principles

- **Mobile-First**: Optimized for smartphones (primary device in rural areas)
- **Low Literacy Friendly**: Large buttons, clear icons, minimal text
- **High Contrast**: Readable in bright outdoor conditions
- **Offline Indicators**: Clear visual feedback for connectivity status
- **Touch-Friendly**: Large tap targets (minimum 48x48px)
- **Government Aesthetic**: Professional, trustworthy design inspired by official portals

## 🎨 Color Palette

```css
Primary (Saffron/Orange):  #FF6B35, #F7931E
Secondary (Green):         #2D5016, #4A7C59
Accent (Blue):             #1E88E5
Background:                #FFFEF2 (Cream)
Text:                      #333333
Success:                   #4CAF50
Warning:                   #FFA726
Error:                     #EF5350
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/SevaaYukti.git
   cd SevaaYukti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section, AI chatbot widget, features, and statistics |
| `/chatbot` | Full-screen AI health assistant with voice input |
| `/apply` | Multi-step Swasthya Saathi Card application form |
| `/find-asha` | Search and find local ASHA workers |
| `/asha-login` | ASHA worker login (OTP/Biometric) |
| `/asha-dashboard` | ASHA worker dashboard with patient management |
| `/about` | About SevaaYukti and mission |
| `/notices` | Notices and health alerts |

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2
- **Routing**: React Router DOM 6.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **Fonts**: Poppins, Noto Sans, Noto Sans Oriya
- **Build Tool**: Create React App

## 🌐 Bilingual Support

The application supports:
- **English**: Primary interface language
- **Odia (ଓଡ଼ିଆ)**: Full translation including form labels and messages

Language can be toggled using the prominent button in the header.

## 📦 Project Structure

```
swasthyasaathi/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Button.js
│   │   ├── InputField.js
│   │   ├── VoiceButton.js
│   │   ├── FeatureCard.js
│   │   ├── StatCounter.js
│   │   ├── ProgressBar.js
│   │   ├── Alert.js
│   │   └── LoadingSpinner.js
│   ├── context/
│   │   └── LanguageContext.js
│   ├── pages/
│   │   ├── Welcome.js
│   │   ├── Home.js
│   │   ├── Chatbot.js
│   │   ├── ApplyCard.js
│   │   ├── FindAsha.js
│   │   ├── AshaLogin.js
│   │   ├── AshaDashboard.js
│   │   ├── About.js
│   │   └── Notices.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎯 Key Components

### Header
- Sticky navigation with shadow on scroll
- Logo with bilingual branding
- Language toggle (EN | ଓଡ଼ିଆ)
- Online/Offline status indicator
- Responsive hamburger menu for mobile

### AI Chatbot
- Voice input with waveform visualization
- Text input with quick suggestion chips
- Conversational UI with user/AI message bubbles
- Message actions (copy, feedback)
- Sidebar with quick topics

### Form Components
- Multi-step progress indicator
- Voice-enabled input fields
- Bilingual labels
- Icon-enhanced fields
- Document upload with camera capture

### ASHA Dashboard
- Quick action cards with badges
- Statistics widgets
- Sync status with manual trigger
- Recent activity feed
- Daily schedule view

## 🔒 Offline-First Features

- **Local Storage**: Patient data stored locally when offline
- **Sync Queue**: Pending records tracked and synced when online
- **Offline Banner**: Prominent indicator when working offline
- **Auto-Sync**: Automatic synchronization when connection restored
- **Sync Status**: Last sync timestamp and pending count

## ♿ Accessibility

- High contrast color modes
- Keyboard navigation support
- Screen reader compatible
- ARIA labels on interactive elements
- Focus indicators
- Font size adjustment option

## 📱 Responsive Design

- **Mobile**: 320px - 767px (primary focus)
- **Tablet**: 768px - 1024px
- **Desktop**: 1025px+

Breakpoints managed through Tailwind CSS responsive utilities.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of a government initiative for rural healthcare in Odisha. All rights reserved by the Government of Odisha, Health & Family Welfare Department.

## 🙏 Acknowledgments

- **Government of Odisha** - Health & Family Welfare Department
- **National Health Mission (NHM)** - Ministry of Health, Government of India
- **ASHA Workers** - The backbone of rural healthcare in India
- **Digital India Initiative** - For promoting digital transformation

## 📞 Contact & Support

- **Email**: support@swasthyasaathi.gov.in
- **Helpline**: 104 (Toll Free)
- **Website**: https://swasthyasaathi.gov.in

---

<div align="center">
  <p>Made with ❤️ for Rural Odisha</p>
  <p>© 2026 SwasthyaSaathi. All rights reserved.</p>
</div>
