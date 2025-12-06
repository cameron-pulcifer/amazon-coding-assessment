# Amazon Coding Assessment for Amazon Robotics

## App Setup

Note: due to the npm worm, use the `--ignore-scripts` flag when running `yarn` commands

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
