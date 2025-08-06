# 🧱 `sb-gen` — Simple Boilerplate Code Generator

A developer-friendly CLI utility to quickly scaffold React boilerplate files in your project structure.
Easily generate components, hooks, tests, pages, and context files using intuitive commands.

---

## 🚀 Features

* 🔧 Generate React components with boilerplate
* 🪝 Create custom hooks with sensible defaults
* 🧪 Add test files for your components
* 📄 Scaffold page files for routing
* 🧠 Create React context providers and hooks
* ✨ Supports multiple entries per type in a single command
* 📁 Automatically places files in the correct `src/` subfolders

---

## 📁 Folder Structure

```bash
src/
├── assets/            # images, logos, etc.
├── components/        # reusable components (Navbar, ProductCard, etc.)
├── context/           # global state with React context
├── hooks/             # custom React hooks
├── pages/             # main views like Home, Cart, Shop
├── tests/             # unit tests
```

---

## 🛠 Installation

Install globally using npm:

```bash
npm install -g @sarawebs/sb-bin
```

This will make the `sb-gen` command available globally from your terminal.

---

## 💻 Usage

```bash
sb-gen [flags] [names...]
```

### ✅ Supported Flags

| Flag          | Alias | Description                      | Target Directory  |
| ------------- | ----- | -------------------------------- | ----------------- |
| `--component` | `-c`  | Create React components          | `src/components/` |
| `--hook`      | `-h`  | Create custom React hooks        | `src/hooks/`      |
| `--test`      | `-t`  | Create test files                | `src/tests/`      |
| `--page`      | `-p`  | Create React pages               | `src/pages/`      |
| `--context`   | `-x`  | Create React context boilerplate | `src/context/`    |

---

## ✨ Examples

```bash
sb-gen -c Navbar Footer -h auth fetchUser -t Navbar -p Home Shop -x Cart
```

📦 This creates:

```
src/components/Navbar.jsx
src/components/Footer.jsx
src/hooks/useAuth.jsx
src/hooks/useFetchUser.jsx
src/tests/Navbar.test.jsx
src/pages/Home.jsx
src/pages/Shop.jsx
src/context/CartContext.jsx
```

---

## 📚 Boilerplate Overview

* **Component:** Functional React component
* **Hook:** Custom `useX` hook
* **Test:** React Testing Library setup
* **Page:** Basic functional component
* **Context:** Provider + custom hook for usage

---

## 📌 Notes

* Component and context names are automatically capitalized.
* Hook names are prefixed with `use` if not already.
* All files use `.jsx` extension.
* Works best inside a standard React app using the described folder structure.

---

## 🧩 License

MIT — Feel free to use, modify, and contribute.

