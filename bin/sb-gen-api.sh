#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <ModelName>"
  exit 1
fi

modelNameRaw="$1"
modelName=$(echo "$modelNameRaw" | tr '[:upper:]' '[:lower:]')
ModelName="$(tr '[:lower:]' '[:upper:]' <<< ${modelNameRaw:0:1})${modelNameRaw:1}"
modelPlural="${modelName}s"

baseDir=$(pwd)
routesDir="$baseDir/src/routes"
controllersDir="$baseDir/src/controllers"
queriesDir="$baseDir/src/db/queries"
dbFile="$baseDir/src/db/db.js"
poolFile="$baseDir/src/db/pool.js"


mkdir -p "$routesDir" "$controllersDir" "$queriesDir"

routesPath="$routesDir/${modelPlural}.js"
controllerPath="$controllersDir/${modelName}Controller.js"
queryPath="$queriesDir/${modelName}.js"

if [[ -f "$routesPath" || -f "$controllerPath" || -f "$queryPath" ]]; then
  echo "Error: One or more files already exist:
- $routesPath
- $controllerPath
- $queryPath"
  exit 1
fi

# create pool.js
if [[ ! -f "$poolFile" ]]; then
cat > "$poolFile" <<EOF
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}
EOF
fi

# -------------------------
# Create Query File 
# -------------------------
cat > "$queryPath" <<EOF
import { query } from '../pool.js';

const queries = {
  getAll: 'SELECT * FROM ${modelPlural} ORDER BY id ASC',
  getById: 'SELECT * FROM ${modelPlural} WHERE id = \$1',
  create: 'INSERT INTO ${modelPlural} (...) VALUES (...) RETURNING *', // <-- Placeholder
  update: 'UPDATE ${modelPlural} SET ... WHERE id = \$1 RETURNING *',   // <-- Placeholder
  delete: 'DELETE FROM ${modelPlural} WHERE id = \$1'
};

const ${modelName} = {
  getAll: async (params = []) => {
    const res = await query(queries.getAll, params);
    return res.rows;
  },
  getById: async (params = []) => {
    const res = await query(queries.getById, params);
    return res.rows[0];
  },
  create: async (params = []) => {
    throw new Error('Implement "create" logic in queries/${modelName}.js');
  },
  update: async (params = []) => {
    throw new Error('Implement "update" logic in queries/${modelName}.js');
  },
  delete: async (params = []) => {
    await query(queries.delete, params);
    return { deleted: params[0] };
  }
};

export default ${modelName};
EOF

# -------------------------
# Create db.js or update it cleanly
# -------------------------
if [[ ! -f "$dbFile" ]]; then
  cat > "$dbFile" <<EOF
import ${modelName} from './queries/${modelName}.js';

const db = {
  ${modelName}
};

export default db;
EOF
else
  importLine="import ${modelName} from './queries/${modelName}.js';"
  registerLine="  ${modelName},"

  if ! grep -qF "$importLine" "$dbFile"; then
    sed -i "1i$importLine" "$dbFile"
  fi

  if grep -q "const db = {" "$dbFile" && ! grep -q "${modelName}," "$dbFile"; then
    sed -i "/const db = {/a\\
  ${modelName},
" "$dbFile"
  fi
fi
# -------------------------
# Create Routes
# -------------------------
cat > "$routesPath" <<EOF
import express from 'express';
import { getAll${ModelName}s, get${ModelName}ById, create${ModelName}, update${ModelName}, delete${ModelName} } from '../controllers/${modelName}Controller.js';

const router = express.Router();

router.get('/', getAll${ModelName}s);
router.get('/:id', get${ModelName}ById);
router.post('/', create${ModelName});
router.put('/:id', update${ModelName});
router.delete('/:id', delete${ModelName});

export default router;
EOF
# -------------------------
# Create Controller
# -------------------------
cat > "$controllerPath" <<EOF
import db from '../db/db.js';

export const getAll${ModelName}s = async (req, res, next) => {
  try {
    const items = await db.${modelName}.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const get${ModelName}ById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const item = await db.${modelName}.getById([id]);
    if (!item) return res.status(404).json({ error: '${ModelName} not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const create${ModelName} = async (req, res, next) => {
  try {
    // NOTE: You must customize these params according to your model
    const { name, email } = req.body;
    const newItem = await db.${modelName}.create([name, email]);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const update${ModelName} = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    // NOTE: You must customize these params according to your model
    const { name, email } = req.body;
    const updatedItem = await db.${modelName}.update([name, email, id]);
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const delete${ModelName} = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    await db.${modelName}.delete([id]);
    res.json({ message: '${ModelName} deleted' });
  } catch (error) {
    next(error);
  }
};
EOF
# -------------------------
# Update Routes Index (ESM)
# -------------------------
indexFile="$routesDir/index.js"

importLine="import ${modelPlural}Routes from './${modelPlural}.js';"
routeLine="  app.use(\`/api/\${apiV}/${modelPlural}\`, ${modelPlural}Routes);"

if [[ ! -f "$indexFile" ]]; then
  cat > "$indexFile" <<EOF
$importLine


function registerRoutes(app, apiV) {
$routeLine
}

export default registerRoutes;
EOF
else
  if ! grep -qF "$importLine" "$indexFile"; then
    sed -i "1i$importLine" "$indexFile"
  fi


  if ! grep -qF "$routeLine" "$indexFile"; then
    sed -i "/function registerRoutes(app, apiV) {/a\\
$routeLine
" "$indexFile"
  fi

  if ! grep -qF "export default registerRoutes;" "$indexFile"; then
    echo -e "\nexport default registerRoutes;" >> "$indexFile"
  fi
fi


echo "✅ CRUD for model \"$ModelName\" generated:
- ✔ $routesPath
- ✔ $controllerPath
- ✔ $queryPath
- ✔ db/db.js registered with db.${modelName}
"
