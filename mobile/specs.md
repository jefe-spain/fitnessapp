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
│   │   ├── nutrition.tsx     # Nutrition redirect
│   │   ├── nutrition/        # Nutrition feature folder
│   │   │   ├── _layout.tsx   # Nutrition stack layout
│   │   │   ├── index.tsx     # Nutrition list screen
│   │   │   ├── [id].tsx      # Meal detail screen
│   │   │   ├── types.ts      # Nutrition type definitions
│   │   │   └── components/   # Nutrition-specific components
│   │   │       └── MealCard.tsx # Meal card component
│   │   ├── stats.tsx         # Statistics screen
│   │   └── chat.tsx          # Chat screen
│   ├── auth/                 # Authentication screens
│   │   ├── _layout.tsx       # Auth layout configuration
│   │   ├── index.tsx         # Main login screen with social options
│   │   ├── email.tsx         # Email login screen
│   │   └── signup.tsx        # Sign up screen
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
│   ├── auth/                 # Authentication state management
│   │   └── index.ts          # Auth store implementation
│   ├── nutrition/            # Nutrition state management
│   │   └── index.ts          # Nutrition store with meal data
│   └── store.ts              # Store configuration
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma         # Prisma schema definition
│   └── migrations/           # Database migrations
├── supabase/                 # Supabase configuration and migrations
│   └── config.toml           # Supabase local configuration
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

### Database & Backend

- **Supabase**: Backend-as-a-Service for authentication, database, and storage
- **Prisma**: Database schema management and migrations
- **PostgreSQL**: Relational database for data storage

## Features

### Navigation

- Custom bottom navigation bar with active state indicators
- Tab-based navigation for main app sections
- Stack navigation for detailed views (e.g., meal details)
- Modal-based navigation for settings

### Internationalization

- Multi-language support (English and Spanish)
- Language selection in settings
- Automatic language detection based on device locale
- Persistent language preferences

### Screens

1. **Home**: Main dashboard for the application
2. **Workout**: Plan and track fitness activities
3. **Nutrition**:
   - Browse meal options with nutritional information
   - View detailed meal information including ingredients, instructions, and macros
   - Card-based UI for meal selection
4. **Stats**: View fitness progress and statistics
5. **Chat**: Communicate with fitness professionals
6. **Settings**: Configure app preferences including language

## Nutrition Feature

The nutrition feature allows users to:

- Browse a list of meals with preview information (calories, protein, prep time)
- View detailed information about each meal including:
  - Full nutritional breakdown (protein, carbs, fat)
  - Ingredient list with quantities
  - Step-by-step preparation instructions
  - Cooking tips
- Navigate between the meal list and individual meal details using stack navigation
- Visual indicators for meal properties (prep time, serving size, calories)

### Nutrition Data Model

#### Meal

- **id**: Unique identifier
- **name**: Name of the meal
- **imageUrl**: URL to the meal image
- **prepTime**: Preparation time
- **servingSize**: Serving size information
- **calories**: Calorie count
- **protein**: Protein content in grams
- **carbs**: Carbohydrate content in grams
- **fat**: Fat content in grams
- **ingredients**: Array of ingredients with name, quantity, and optional notes
- **instructions**: Array of step-by-step instructions
- **tips**: Optional cooking or preparation tips

## UI/UX Design Principles

- **Responsive Design**: Adapts to different screen sizes and orientations
- **Safe Area Handling**: Proper spacing around device notches and system UI
- **Consistent Styling**: Unified design language across all screens
- **Accessibility**: Support for screen readers and accessibility features
- **Smooth Transitions**: Animated transitions between screens and states
- **Card-Based UI**: Visual card components for browsing items like meals

## Development Guidelines

### Code Structure

- Functional components with TypeScript
- Component-based architecture for reusability
- File-based routing with Expo Router
- Separation of concerns (UI, logic, state)

### Styling Approach

- NativeWind/Tailwind CSS for consistent styling
- Responsive design with flexible layouts
- Theme-based color system

### State Management

- Zustand for global state management
- React hooks for local state
- AsyncStorage for persistent data
- Feature-specific stores (auth, nutrition, etc.)

### Internationalization

- Structured translation files by feature
- Dynamic language switching
- Fallback language support

### Database Schema

The application uses Prisma to manage the database schema and Supabase as the backend service. The current schema includes:

#### User Model

- **id**: Unique identifier (UUID)
- **email**: User's email address (unique)
- **name**: User's full name (optional)
- **avatar_url**: URL to user's profile picture (optional)
- **height_cm**: User's height in centimeters (optional)
- **weight_kg**: User's weight in kilograms (optional)
- **date_of_birth**: User's date of birth (optional)
- **gender**: User's gender (optional)
- **created_at**: Timestamp when the user was created
- **updated_at**: Timestamp when the user was last updated

## Authentication System

The application includes a robust authentication system with the following features:

### Authentication State Management

- **Zustand Store**: Centralized authentication state management using Zustand
- **Secure Storage**: Secure token storage using `expo-secure-store` for native platforms and encrypted localStorage for web
- **Mock Authentication**: Currently using mock authentication functions (to be replaced with actual backend integration)

### Authentication Flow

- **Conditional Navigation**: Redirects users based on authentication status
- **Protected Routes**: Prevents access to protected routes for unauthenticated users
- **Token Management**: Handles access and refresh tokens securely

### Authentication Screens

- **Login Screen**: Email/password login with social login placeholders
- **Signup Screen**: User registration with email/password
- **Web Landing Page**: Special authentication handling for web platform

### Security Features

- **Secure Token Storage**: Tokens stored securely using platform-specific methods
- **Cross-Platform Support**: Works on both native and web platforms
- **Token Refresh**: Automatic token refresh mechanism
