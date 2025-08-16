
# SB Code Generator Utilities 

This repository contains two handy CLI utilities to speed up your development workflow by automating boilerplate code generation:

---
## 🛠 Installation

Install globally using npm:

```bash
npm install -g @sarawebs/sb-bin
```

This will make the `sb-gen`, `sb-gen-api` command available globally from your terminal.

## 1. `sb-gen-server`  API Server (PostgreSQL + Express + Composable DB Abstraction)
A modern Express.js API boilerplate using Docker, PostgreSQL, and a modular database query abstraction 

🚀 Features
Express + Dockerized PostgreSQL setup

.env based configuration

Modular composable db.user.getAll() style access

Simple queries/ folder for clean SQL

Auto-generated CRUD structure with custom script (sb-gen-api.sh)

📂 Project Structure

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
**See full details & usage:** [sb-gen-server README](./readme/sb-gen-server.md)

## 2. `sb-gen-api` — Express  + DB CRUD Generator


**Example:**

```bash
sb-gen-api user name:string age:int
```

> **⚠️ Deprecated:**
> This tool is no longer actively maintained. For a more robust and feature-rich solution, please visit and use [sb-crud-gen on npm](https://www.npmjs.com/package/sb-crud-gen).

* Creates route, controller, and query files for a given model name.
* Uses pg client (`pool.js`) for database operations.
* Automatically updates (or creates):

  * `src/routes/index.js` to import/register the route
  * `src/db/db.js` to register the model
* Prevents overwriting existing files.
* Cleanly removes all generated files and related registrations.
* Uses ESM style imports throughout.


**See full details & usage:** [sb-gen-api README](./readme/sb-gen-api.md)

---

## 3. `sb-gen` — React Boilerplate Code Generator CLI

A developer-friendly CLI tool to generate React components, hooks, pages, contexts, and test files with proper boilerplate and placement in your project structure.

* Supports multiple types in a single command
* Automatically handles naming conventions and folder locations
* Creates React functional components, hooks, contexts, and tests

**See full details & usage:** [sb-gen README](./readme/sb-gen.md)

---



Feel free to explore either tool to boost your backend or frontend development speed!

