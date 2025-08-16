
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
sb-gen-api user name:string age:int
```

### 🛠️ Change config.json

Use `sb-gen-server --init-config`:

```bash
sb-gen-server --init-config # copy default config.json to current dir, you can change it as you need
```


* Creates route, controller, and query files for a given model name.
* Uses pg client (`pool.js`) for database operations.
* Automatically updates (or creates):

  * `src/routes/index.js` to import/register the route
  * `src/db/db.js` to register the model
* Prevents overwriting existing files.
* Cleanly removes all generated files and related registrations.
* Uses ESM style imports throughout.

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
