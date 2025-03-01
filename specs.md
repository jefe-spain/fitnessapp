# fitnessapp - Mobile Fitness Application

## Project Overview

fitnessapp is a comprehensive mobile fitness application built with React Native and Expo. The application provides users with tools to track workouts, monitor nutrition, view fitness statistics, and communicate with fitness professionals through a chat interface. The app features a modern, responsive UI with a custom bottom navigation bar and supports multiple languages (currently English and Spanish).

## Project Structure

```
fitnessapp/
├── app/                      # Main application screens using Expo Router
│   ├── (tabs)/               # Tab-based navigation screens
│   │   ├── _layout.tsx       # Tab layout configuration
│   │   ├── index.tsx         # Home screen
│   │   ├── workout.tsx       # Workout screen
│   │   ├── nutrition.tsx     # Nutrition screen
│   │   ├── stats.tsx         # Statistics screen
│   │   └── chat.tsx          # Chat screen
│   ├── settings/             # Settings screens
│   │   ├── _layout.tsx       # Settings layout configuration
│   │   └── index.tsx         # Settings main screen
│   └── _layout.tsx           # Root layout configuration
├── assets/                   # Static assets (images, fonts)
├── components/               # Reusable UI components
│   ├── navigation/           # Navigation components
│   │   └── BottomNav.tsx     # Custom bottom navigation bar
│   ├── Button.tsx            # Reusable button component
│   └── Container.tsx         # Layout container component
|
├── i18n/                     # Internationalization setup
│   ├── locales/              # Translation files
│   │   ├── en/               # English translations
│   │   └── es/               # Spanish translations
│   ├── config.ts             # i18n configuration
│   └── index.ts              # i18n exports
├── store/                    # State management
│   ├── language/             # Language state management
│   │   ├── index.ts          # Language store implementation
│   │   └── types.ts          # Language types
│   └── store.ts              # Store configuration
└── utils/                    # Utility functions
```

## Technical Stack

### Core Technologies

- **React Native**: Framework for building native mobile applications
- **Expo**: Platform for universal React applications
- **TypeScript**: Typed superset of JavaScript for improved developer experience

### Navigation & Routing

- **Expo Router**: File-based routing system for Expo applications
- **Custom Bottom Navigation**: Tailored navigation experience with animated indicators

### Styling & UI

- **NativeWind/Tailwind CSS**: Utility-first CSS framework for styling
- **Expo Vector Icons**: Icon library for UI elements
- **React Native Safe Area Context**: Safe area management for different device notches

### State Management

- **Zustand**: Lightweight state management solution
- **AsyncStorage**: Persistent storage for user preferences

### Internationalization

- **i18next**: Internationalization framework
- **react-i18next**: React bindings for i18next
- **Expo Localization**: Device locale detection

## Features

### Navigation

- Custom bottom navigation bar with active state indicators
- Tab-based navigation for main app sections
- Modal-based navigation for settings

### Internationalization

- Multi-language support (English and Spanish)
- Language selection in settings
- Automatic language detection based on device locale
- Persistent language preferences

### Screens

1. **Home**: Main dashboard for the application
2. **Workout**: Plan and track fitness activities
3. **Nutrition**: Monitor dietary intake and nutrition plans
4. **Stats**: View fitness progress and statistics
5. **Chat**: Communicate with fitness professionals
6. **Settings**: Configure app preferences including language

## UI/UX Design Principles

- **Responsive Design**: Adapts to different screen sizes and orientations
- **Safe Area Handling**: Proper spacing around device notches and system UI
- **Consistent Styling**: Unified design language across all screens
- **Accessibility**: Support for screen readers and accessibility features
- **Smooth Transitions**: Animated transitions between screens and states

## Development Guidelines

### Code Structure

- Functional components with TypeScript
- Component-based architecture for reusability
- File-based routing with Expo Router
- Separation of concerns (UI, logic, state)

### Styling Approach

- Tailwind CSS for consistent styling
- Responsive design with flexible layouts
- Theme-based color system

### State Management

- Zustand for global state management
- React hooks for local state
- AsyncStorage for persistent data

### Internationalization

- Structured translation files by feature
- Dynamic language switching
- Fallback language support

## Upcoming Enhancements

- Supabase integration
- User authentication
