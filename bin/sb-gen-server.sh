#!/bin/bash

set -e

SERVER_NAME="${1:-server}"  # Use passed arg or default to 'api-server'

mkdir -p "$SERVER_NAME"/src/{controllers,db/{init,queries},routes,utils}

# docker-compose.yml
cat > "$SERVER_NAME/docker-compose.yml" <<EOF
services:
  api:
    build: .
    container_name: ${SERVER_NAME}
    ports:
      - "4000:4000"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=mydb
    depends_on:
      - db
    volumes:
      - .:/app
    command: node src/index.js

  db:
    image: postgres:15
    container_name: ${SERVER_NAME}-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d

volumes:
  pgdata:
EOF

# Dockerfile
cat > "$SERVER_NAME/Dockerfile" <<'EOF'
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["node", "src/index.js"]
EOF

# .env
cat > "$SERVER_NAME/.env" <<'EOF'
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mydb
PORT=4000
API_VERSION=v1
EOF

# package.json
cat > "$SERVER_NAME/package.json" <<'EOF'
{
  "name": "api-server",
  "version": "1.0.0",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "prettier": "3.6.1"

  }
}
EOF

# package.json
cat > "$SERVER_NAME/src/utils/logger.js" <<'EOF'

export const log = (message) => {
  console.log(`[LOG]: ${message}`);
};
export const logError = (error) => {
  console.error(`[ERROR]: ${error.message || error}`);
};
const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
};
export default logger;
EOF

cd $SERVER_NAME
# Try to run sb-gen-api.sh user from PATH or locally
if ! sb-gen-api user 2>/dev/null; then
  if [ -x "../sb-gen-api.sh" ]; then
    ../sb-gen-api.sh user
  else
    echo "❌ sb-gen-api.sh not found or not executable"
    exit 1
  fi
fi
cd -
# src/index.js
cat > "$SERVER_NAME/src/index.js" <<'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registerRoutes from './routes/index.js';
import logger, {logError} from './utils/logger.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy 🚀' });
});

registerRoutes(app, process.env.API_VERSION);



// 404 capture
app.use((req, res, next) => {
  const err = new Error('Not found');
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  logError(err);
  res.status(status).json({
    error: true,
    status,
    message: err.message || 'Internal Server Error',
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Try to visit http://localhost:${PORT}/api/health`);
});
EOF

# init.sql
cat > "$SERVER_NAME/src/db/init/init.sql" <<'EOF'
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
EOF

# seed.sql
cat > "$SERVER_NAME/src/db/init/seed.sql" <<'EOF'
-- Insert dummy users
INSERT INTO users (name, email) VALUES
('Sarah Dahamshi', 'sarah@example.com'),
('Amenah Dahamshi', 'Amenah@example.com'),
('Salmah Dahamshi', 'Salmah@example.com');
EOF
echo "✅ Project created in ./$SERVER_NAME

➡ Navigate to '$SERVER_NAME' and run:
   docker compose up --build

- Try visitng:
  http://localhost:4000/api/health

You should get:
{"status":"ok","message":"API is healthy 🚀"}


📥 To init table:
   docker exec -i ${SERVER_NAME}-postgres psql -U postgres -d mydb < init.sql
"
