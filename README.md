# TalentoTech Node.js Project

This is a Node.js project using Express for building web applications, with Firebase as the database.

## Features

- RESTful API endpoints
- Middleware support
- Error handling
- Modular structure
- Firebase integration for data storage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Firebase account](https://firebase.google.com/)

### Installation

```bash
npm install
```

### Firebase Setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Generate and download your service account key (JSON file).
3. Add the service account key to your project (e.g., `src/firebaseConfig.json`).
4. Install Firebase Admin SDK:

```bash
npm install firebase-admin
```

### Running the App

```bash
npm start
```

The server will start on `http://localhost:3000`.

## Project Structure

```
.
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── firebaseConfig.json
│   └── app.js
├── package.json
└── README.md
```

## Usage

Modify the routes and controllers in the `src` folder to add your own logic. Use Firebase Admin SDK to interact with the database.

## License

This project is licensed under the MIT License.