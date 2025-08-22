# Overthinkr React Native App

This is a simple React Native (Expo) app that connects to the Overthinkr backend API.

## Setup

1. Install Expo CLI if not already installed:

   ```bash
   npm install -g expo-cli
   ```

2. Extract the project and install dependencies:

   ```bash
   npm install
   ```

3. Update `API_URL` in `App.js` to point to your running Overthinkr backend API (e.g., `http://192.168.0.5:3000`).

4. Run the project:

   ```bash
   npm start
   ```

   Then scan the QR code with Expo Go app or run on iOS/Android simulator.

## Features

- Text input for message
- Button to send request to `/overthink`
- Displays list of interpretations from backend
- Error handling + loading state

Enjoy building Overthinkr 🚀
