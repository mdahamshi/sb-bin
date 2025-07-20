# @sarawebs/sb-bin

> 🧰 Simple CLI utilities for React component scaffolding — made for speed, structure, and simplicity.

---

## 📦 Installation

```bash
npm install -g @sarawebs/sb-bin
````

---

## 🚀 Usage

### Create a new React component with CSS

```bash
sb-cc Card
```

This will generate the following structure in your current directory:

```
Card/
├── Card.jsx
└── Card.css
```

### ✅ Generated `Card.jsx`

```jsx
import './Card.css';

export default function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

### ✅ Generated `Card.css`

```css
.card {
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## 🛠 Options (Coming Soon)

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--tsx`    | Generate a TypeScript component |
| `--scss`   | Use SCSS instead of CSS         |
| `--module` | Use CSS Modules                 |

---

## 💡 About

Built by [Mohammad Dahamshi](https://github.com/mdahamshi) for use with [SaraWebs](https://sarawebs.com) projects, and anyone who wants a quick way to scaffold clean React components.

---

## 📄 License

MIT

