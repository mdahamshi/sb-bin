
## API Server (PostgreSQL + Express + Composable DB Abstraction)


---

### 🚀 Features: Create simple api server

* Express + Dockerized PostgreSQL setup
* `.env` based configuration
* Modular composable `db.user.getAll()` style access
* Simple `queries/` folder for clean SQL
* Auto-generated CRUD structure with custom script (`sb-gen-api`)

## Usage

```bash
sb-gen-server <serverName> # default = server
```

---

### 📂 Project Structure

```
api-server/
├── src/
│   ├── controllers/     # CRUD logic using db abstraction
│   ├── db/
│   │   ├── db.js        # db.user.getAll-style API
│   │   ├── queries/     # SQL strings per model
│   │   └── init/        # SQL schem, seed
│   ├── routes/          # Express routers
│   ├── utils/           # Utility modules (if needed)
│   └── index.js         # App entrypoint
├── Dockerfile
├── docker-compose.yml
├── docker-compose.override.yml
├── .env
└── package.json
```

---

### ⚙️ Environment Variables

Located in `.env`:

```
# API
PORT=4000  # local port (inside container or when dev)
API_PORT=4000  # mapped port to localhost
DB_PORT=5432
# DB Credentials
SERVICE_USER_POSTGRES=userapp  # coolify magic env vars style
SERVICE_PASSWORD_POSTGRES=secret

DATABASE_URL=postgres://userapp:secret@localhost:5432/userapp

```

---

### 🐳 Getting Started

#### 1. Build & Run

```bash
cd api-server
docker compose up --build
```

This will:

* Start the Express app on port `4000`
* Spin up a PostgreSQL 15 container with DB `userapp`

#### 2. Initialize Database Schema

Databse is initilized automaticlly by two files at src/db/init:
- init.sql  # have the sql schema
- seed.sql  # have the seed data



This will create the `users` table.

---

#### 3. Check API
Try visitng:
http://localhost:4000/api/health
You should get:
```json
{"status":"ok","message":"API is healthy 🚀"}
```

### 🛠️ Generate CRUD for a Model

Use `sb-gen-api.sh`:

```bash
sb-gen-api user
```

This will generate:

* `src/db/queries/user.js` – SQL strings
* `src/controllers/user.js` – Logic using `db.user.getAll`, etc.
* `src/routes/user.js` – RESTful router
* Auto-registers route in `src/routes/index.js`
* Auto-registers query in `src/db/db.js`

---

### 📦 DB Abstraction

In `src/db/db.js`, all queries are composed like this:

```js
import user from './queries/user.js';

const db = {
  user
};

export default db;

```

Usage in controller:

```js
import db from '../db/db.js';

export const getAllUsers = async (req, res) => {
  const users = await db.user.getAll();
  res.json(users);
};
```

---

### 📫 API Endpoints (for `user`)

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Get all users     |
| GET    | `/users/:id` | Get user by ID    |
| POST   | `/users`     | Create new user   |
| PUT    | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

---

### 📚 Future Plans

* Add pagination & filtering
* Add unit tests
* Extend script to support relations
* Add automatic OpenAPI generation
