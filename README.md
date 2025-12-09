# Medico - Healthcare at Your Fingertips

**Medico** is a comprehensive, cross-platform mobile healthcare application designed to streamline the patient experience. Built with a modern hybrid tech stack, it allows users to book doctor appointments, order medicines, schedule lab tests, and manage their health profile—all from a single, intuitive interface.

##  Features

* **🔐 Secure Authentication:** Full user registration and login system powered by **Firebase Auth**.
* **👨‍⚕️ Doctor Appointments:** Browse specialists and book appointments with real-time slot selection.
* **💊 Medicine Delivery:** A complete e-commerce flow for medicines, including search, cart management, and order placement.
* **🧪 Lab Tests:** Schedule diagnostic tests for home collection or lab visits.
* **📂 Digital Reports:** View and manage booking history and test reports (Mock/Placeholder).
* **👤 User Profile:** Manage personal details and view order history.
* **🌙 Dark Mode:** Fully supported system-wide dark/light theme toggling.
* **📱 Native Mobile Experience:** Optimized for Android using **Capacitor** with native status bar and navigation bar integration.

## 🛠️ Tech Stack

**Frontend:**
* [React](https://react.dev/) (v18)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) (Build Tool)

**Mobile Engine:**
* [Capacitor](https://capacitorjs.com/) (v6) - For converting the web app to a native Android APK.

**Backend & Database:**
* [Firebase Authentication](https://firebase.google.com/products/auth) - User Identity.
* [Cloud Firestore](https://firebase.google.com/products/firestore) - NoSQL Database for appointments, orders, and bookings.

**UI & Styling:**
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling.
* [shadcn/ui](https://ui.shadcn.com/) - Accessible, reusable component library (built on Radix UI).
* [Lucide React](https://lucide.dev/) - Iconography.

**State Management:**
* React Context API (`AuthContext`, `CartContext`, `ThemeContext`).

##  Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm (comes with Node.js)
* Android Studio (for building the native Android app)
* Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/iftekharuddin27/medico-app.git](https://github.com/iftekharuddin27/medico-app.git)
    cd medico-app/my-heal-guide
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    This project uses Firebase. Ensure you have your `src/lib/firebase.ts` configured with your API keys.

---

##  Development Workflow

###  Run on Web (Browser)
To start the local development server with hot-reload:
```bash
npm run dev

```

###  Run on Android (Emulator/Device)
## To sync your React code to the native Android project:

```bash
npm run build

```
Sync with Capacitor:

```bash
npx cap sync

```
Open in Android Studio:

```bash
npx cap open android

```

### Project Structure

```bash
my-heal-guide/
├── android/              # Native Android project files (Capacitor)
├── src/
│   ├── components/       # Reusable UI components (Header, Footer, ui/*)
│   ├── contexts/         # Global state (Auth, Cart, Theme)
│   ├── data/             # Static data files (articles.ts)
│   ├── hooks/            # Custom React hooks (use-toast, use-mobile)
│   ├── lib/              # Utility functions (utils.ts)
│   ├── pages/            # App Screens (Home, Doctors, Auth, etc.)
│   ├── App.tsx           # Main application component & Routing
│   └── main.tsx          # Entry point
├── public/               # Static assets (images, icons)
├── capacitor.config.ts   # Mobile app configuration (App ID, Name)
└── package.json          # Dependencies and scripts

```