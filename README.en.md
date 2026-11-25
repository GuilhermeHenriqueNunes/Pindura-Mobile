<div align="center">

# 📱 Pindura Mobile — Shared Expense Management on the Go

<p align="center">
  <strong>Cross-platform mobile application (Android & iOS) for seamless expense tracking and debt settlement in shared student housings. Official mobile port of the <a href="https://github.com/GuilhermeHenriqueNunes/Pindura">Pindura</a> ecosystem.</strong>
</p>

<p align="center">
  <a href="README.md">🇧🇷 Português</a> •
  <a href="README.en.md">🇺🇸 English</a>
</p>

[![Status](https://img.shields.io/badge/Status-In_Development-yellow?style=for-the-badge&logo=git&logoColor=white)]()
[![React Native](https://img.shields.io/badge/React_Native-0.88-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_58-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Navigation](https://img.shields.io/badge/React_Navigation-v7-6B52AE?style=for-the-badge&logo=react&logoColor=white)](https://reactnavigation.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Platforms](https://img.shields.io/badge/Platforms-Android_|_iOS-3DDC84?style=for-the-badge&logo=android&logoColor=white)]()

</div>

---

## 📌 Executive Summary

**Pindura Mobile** is the mobile evolution of the web-based [Pindura](https://github.com/GuilhermeHenriqueNunes/Pindura) shared expense system. Designed to put financial clarity in the hands of roommates and student housemates, it enables instant expense recording at the point of purchase, quick checking of unsettled balances, and one-tap Pix key copying directly on mobile devices.

Developed collaboratively by a two-engineer team adopting modern patterns in the React Native (v0.88) and Expo (SDK 58) ecosystem.

---

## 🏗️ Architecture & Navigation Flow

The application leverages a hybrid navigation layout (Tabs + Modal Stacks) to deliver native feel, smooth transitions, and intuitive UX:

```mermaid
flowchart TD
    subgraph Navigation["Navigation Structure (React Navigation v7)"]
        Root["Root Stack Navigator"]
        Tabs["Bottom Tabs Navigator"]
        
        Root --> Tabs
        Tabs --> TabHome["🏠 Home Tab (Dashboard)"]
        Tabs --> TabMoradores["👥 Roommates Tab (Directory & Search)"]
        Tabs --> TabDespesas["💰 Expenses Tab (Splits & Filters)"]

        Root --> ModalMorador["➕ Add Roommate Modal"]
        Root --> ModalDespesa["➕ Add Expense Modal"]
        Root --> ModalDetalhes["🔍 Expense Details & Pix Settlement"]
    end
```

### 📁 Source Code Organization

```text
pindura-mobile/
├── assets/                  # App icons, splash screens, and favicons
├── src/
│   ├── components/          # Reusable atomic UI components (Cards, Buttons, Badges)
│   ├── navigation/          # Route setup (Stack and Bottom Tabs)
│   ├── screens/             # Screen components (Home, Roommates, Expenses)
│   └── services/            # API communication client
├── App.js                   # Application root with Theme and Navigation providers
├── app.json                 # Expo project manifest
└── package.json             # Manifest and run scripts
```

---

## 🗺️ Project Roadmap

- [x] **Project Setup**: Initialized with Expo SDK 58 and React Native 0.88.
- [x] **Navigation Foundation**: Configured `@react-navigation/native`, `bottom-tabs`, and `stack`.
- [x] **Specifications & Architecture**: Requirements mapped and layout standards defined.
- [ ] **UI & Screens**:
  - [ ] Dashboard Screen with expense KPIs and quick shortcuts.
  - [ ] Roommates Directory with real-time search.
  - [ ] Roommate Registration Form with Pix key validation.
  - [ ] Expenses Feed with payer visual badges.
  - [ ] Expense Creation Form with multi-participant selector.
  - [ ] Expense Details View with "Copy Pix Key" action.
- [ ] **API Integration**: REST client connecting to the [Pindura Backend](https://github.com/GuilhermeHenriqueNunes/Pindura).
- [ ] **Offline Cache**: Local persistence via AsyncStorage.

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js** (v20+ LTS recommended).
- **Expo Go** mobile app on your smartphone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/app/expo-go/id982107779)), or a configured local emulator (Android Studio / Xcode).

### Running the App

```bash
# 1. Clone the repository
git clone https://github.com/GuilhermeHenriqueNunes/Pindura-Mobile.git
cd Pindura-Mobile

# 2. Install dependencies
npm install

# 3. Start Expo development server
npx expo start
```

Once running:
- **On physical phone**: Open **Expo Go** and scan the terminal QR Code.
- **On Android Emulator**: Press `a` in the terminal.
- **On iOS Simulator (macOS)**: Press `i` in the terminal.
- **On Web Browser**: Press `w` in the terminal.

---

## 🔗 The Pindura Ecosystem

This app interacts with and complements:
- 🌐 **[Pindura Web / API](https://github.com/GuilhermeHenriqueNunes/Pindura)**: The core backend service built with Java 21, Spring Boot 3, and MySQL handling transaction rules and settlement math.

---

## 👥 Authors & Collaborators

Crafted in collaboration by:

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/GuilhermeHenriqueNunes">
        <img src="https://github.com/GuilhermeHenriqueNunes.png" width="100px;" alt="Guilherme Nunes"/><br />
        <sub><b>Guilherme Nunes</b></sub>
      </a><br />
      <a href="https://www.linkedin.com/in/guilherme-henriquesilva-nunes/" title="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/GuilhermeHenriqueNunes" title="GitHub">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/cordeiromarcos">
        <img src="https://github.com/cordeiromarcos.png" width="100px;" alt="Marcos Cordeiro"/><br />
        <sub><b>Marcos Cordeiro</b></sub>
      </a><br />
      <a href="https://github.com/cordeiromarcos" title="GitHub">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

## 📄 License

This open-source educational project is licensed under the [MIT License](LICENSE).
