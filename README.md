# Amazon Coding Assessment for Amazon Robotics

## App Setup

Note: due to the npm worm, use the `--ignore-scripts` flag when running `yarn` commands

**Prerequisites**

- Install Node version 22.19.0 or higher
- Globally install Yarn - `npm install -g yarn`
- Install Docker and make sure it's running

**Set up the backend**

Open a terminal window and run the following commands:

```bash
cd todo-backend
yarn --ignore-scripts
cp .env.example .env
docker compose up -d
yarn db:migrate
yarn dev
```

Your Express api will be running at `http://localhost:3000`

---
**Set up the frontend**

Open a separate terminal window and run the following commands:

```bash
cd todo-frontend
yarn --ignore-scripts
cp .env.example .env
yarn dev
```

Your React web app will be running at `http://localhost:3001`

## Features

**Express Backend**

- TypeScript and Zod
- Routes, controllers, and services
- Drizzle ORM with repositories
- Postgres in Docker volume
- Validation middleware with Zod for validating the request body, query, and params
- Error handling middleware

**React Frontend**

- TypeScript
- React with Vite and React Compiler
- React Router with declarative mode, 404 fallback, main layout, and nested routes
- Tailwind CSS
- Axios with service hooks
- Presentational Page components
- Page hooks to handle ViewModel logic, data fetching, state management, and navigation
- React Hook Form for form validation
- Lifecycle hooks
- State management hooks
- Basic Redux Toolkit slices and selectors
- Components for common UI elements using Tailwind with merged class names
- Date formatter for showing friendly due dates
