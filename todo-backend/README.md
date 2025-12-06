# Express TypeScript Backend

Production-ready Express server with TypeScript, hot reloading, ESLint, and Prettier.

## Features

- **TypeScript** - Type safety and better developer experience
- **Hot Reloading** - Automatic server restart via nodemon
- **ESLint & Prettier** - Code linting and formatting
- **Common Middleware**:
  - `helmet` - Security headers
  - `cors` - Cross-origin resource sharing
  - `morgan` - HTTP request logger
  - `express.json()` - JSON body parser
  - `dotenv` - Environment variables

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

Server will automatically restart when you change any `.ts` files in the `src` directory.

## Build

```bash
npm run build
```

Builds the app to the `dist` folder.

## Production

```bash
npm start
```

## Linting & Formatting

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

## API Endpoints

- `GET /api` - Hello message
- `GET /api/health` - Health check endpoint

Server runs on `http://localhost:3000`
