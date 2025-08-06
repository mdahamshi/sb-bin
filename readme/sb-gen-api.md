
# CRUD Generator Script

A simple Bash script to generate RESTful CRUD route and controller files for an Express + Prisma project, and automatically register the new routes in `src/routes/index.js`.

---

## Features

* Creates route and controller files for a given model name.
* Uses Prisma Client for database operations.
* Automatically updates (or creates) `src/routes/index.js` to import and register the new routes.
* Prevents overwriting existing files.
* Uses CommonJS style imports in `src/routes/index.js` to match existing code.

---

## Requirements

* Node.js project using **Express** and **Prisma**.

* Project directory structure with:

  ```
  src/
    controllers/
    db/
    routes/
      index.js 
  ```

* Bash shell environment.

---

## Usage

```bash
sb-gen-api <ModelName>
```

**Example:**

```bash
sb-gen-api User
```

This will create:

* `src/routes/users.js`
* `src/controllers/userController.js`
* `src/db/queries/user.js`
* Update or create `src/routes/index.js` to include and register the new `users` routes.
* Update or create `src/db/db.js` to include and register the new `users` queries.

---

## What it generates

### Routes file (`src/routes/<modelPlural>.js`)

Express router with routes for:

* GET `/` — get all items
* GET `/:id` — get item by ID
* POST `/` — create item
* PUT `/:id` — update item
* DELETE `/:id` — delete item

### Controller file (`src/controllers/<modelName>Controller.js`)

Contains CRUD functions using Prisma Client to interact with the database.

### Routes index (`src/routes/index.js`)

Imports and registers all routes under `/api/v1/<modelPlural>` paths.

---

## Notes

* Model name is case-insensitive; the script converts it to lowercase internally and pluralizes by simply adding an `s`.
* If files for the model already exist, the script will abort to prevent overwriting.
* The script assumes you want to use API version `v1`.
* Make sure your main `src/index.js` or server entry file imports and uses the route register function from `src/routes/index.js`.

---

## Example `src/index.js` usage

```js
const express = require('express');
const registerRoutes = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

---

## License

MIT License

