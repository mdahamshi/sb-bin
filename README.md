# @sarawebs/sb-bin

> 🧰 Simple CLI utilities for React component scaffolding — made for speed, structure, and simplicity.

---

## 📦 Installation

```bash
npm install -g @sarawebs/sb-bin
````

---

## 🚀 Usage

### Create a single React component

```bash
sb-cc Card
```

Creates:

```
./src/components/Card/
├── Card.jsx
└── Card.css
```

---

### Create multiple components at once

```bash
sb-cc Button Header Footer
```

Creates:

```
./src/components/Button/
├── Button.jsx
└── Button.css

./src/components/Header/
├── Header.jsx
└── Header.css

./src/components/Footer/
├── Footer.jsx
└── Footer.css
```

---


## 🧩 What It Generates

### `Component.jsx`

```jsx
import './Component.css';

export default function Component({ children }) {
  return (
    <div className="component">
      {children}
    </div>
  );
}
```

### `Component.css`

```css
.component {
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## 🛠️ Options

| Flag              | Description                                |
| ----------------- | ------------------------------------------ |
| `A B C`           | Creates multiple components at once        |

> ⚠️ Existing components won't be overwritten — you'll see a warning instead.

---

Here’s the updated `README.md` section for your `sb-bin` CLI tool, documenting the new hook creation feature:

---

## 🪝 Create React Hooks

Generate one or more React hooks in the `src/hooks` directory.

### 🔧 Usage

```bash
sb-ch useCounter useClickOutside
```

This will generate the following structure:

```
src/
└── hooks/
    ├── useCounter/
    │   └── useCounter.js
    └── useClickOutside/
        └── useClickOutside.js
```

Each hook file includes a basic template with `useEffect` and `useState` imports.

### 🛑 Notes

* If a hook directory already exists, it will be **skipped** and a warning will be shown.
* All hooks must be passed as arguments (no interactive prompt for now).

---

Let me know if you'd like to support custom templates or TypeScript too.

## 🧠 Coming Soon

* `--tsx` for TypeScript components
* `--scss` for SCSS styling
* `--module` for CSS Modules
* `--with-index` for `index.js` barrel file

---

## 👨‍💻 About

Created by [Mohammad Dahamshi](https://github.com/mdahamshi) for [SaraWebs](https://sarawebs.com) to speed up React development with a clean and repeatable structure.

---

## 📄 License

MIT

