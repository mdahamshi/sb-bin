
# SB Code Generator Utilities 

This repository contains two handy CLI utilities to speed up your development workflow by automating boilerplate code generation:

---
## 🛠 Installation

Install globally using npm:

```bash
npm install -g @sarawebs/sb-bin
```

This will make the `sb-gen`, `sb-gen-api` command available globally from your terminal.

## 1. `sb-gen-api` — Express  + DB CRUD Generator

A bash script to quickly scaffold RESTful CRUD routes and controllers for your Node.js backend using Express and db.

* Generates route and controller files for a given model
* Automatically updates or creates `src/routes/index.js` to register new routes
* Prevents overwriting existing files

**See full details & usage:** [sb-gen-api README](./readme/sb-gen-api.md)

---

## 2. `sb-gen` — React Boilerplate Code Generator CLI

A developer-friendly CLI tool to generate React components, hooks, pages, contexts, and test files with proper boilerplate and placement in your project structure.

* Supports multiple types in a single command
* Automatically handles naming conventions and folder locations
* Creates React functional components, hooks, contexts, and tests

**See full details & usage:** [sb-gen README](./readme/sb-gen.md)

---
## 3. `sb-gen-server`  API Server (PostgreSQL + Express + Composable DB Abstraction)
A modern Express.js API boilerplate using Docker, PostgreSQL, and a modular database query abstraction 

🚀 Features
Express + Dockerized PostgreSQL setup

.env based configuration

Modular composable db.user.getAll() style access

Simple queries/ folder for clean SQL

Auto-generated CRUD structure with custom script (sb-gen-api.sh)

📂 Project Structure
graphql
Copy
Edit
api-server/
├── src/
│   ├── controllers/     # CRUD logic using db abstraction
│   ├── db/
│   │   ├── db.js        # db.user.getAll-style API
│   │   └── queries/     # SQL strings per model
│   ├── routes/          # Express routers
│   ├── utils/           # Utility modules (if needed)
│   └── index.js         # App entrypoint
├── Dockerfile
├── docker-compose.yml
├── init.sql             # DB schema initializer
├── .env
└── package.json

**See full details & usage:** [sb-gen-server README](./readme/sb-gen-server.md)


### sb-gen-api.sh — Express +  CRUD Generator

* Creates routes & controller files for your model
* Updates `src/routes/index.js` to register routes
* Usage: `./sb-gen-api User`

---

### sb-gen — Simple Boilerplate Code Generator

* Generates React components, hooks, pages, contexts, and tests
* CLI usage: `sb-gen [flags] [names...]`
* Example: `sb-gen -c Navbar Footer -h auth fetchUser -t Navbar -p Home Shop -x Cart`

---

Feel free to explore either tool to boost your backend or frontend development speed!

