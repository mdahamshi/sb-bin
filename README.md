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
./Card/
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
./Button/
├── Button.jsx
└── Button.css

./Header/
├── Header.jsx
└── Header.css

./Footer/
├── Footer.jsx
└── Footer.css
```

---

### Create inside a `components/` folder

```bash
sb-cc Card Button --in-components
```

Creates:

```
./components/Card/
├── Card.jsx
└── Card.css

./components/Button/
├── Button.jsx
└── Button.css
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
| `--in-components` | Puts components inside a `components/` dir |
| `A B C`           | Creates multiple components at once        |

> ⚠️ Existing components won't be overwritten — you'll see a warning instead.

---

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

