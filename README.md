# Property Management System
- Property Management System – A simple system for managing properties and transactions efficiently.

# Overview
- This is a simple and fully responsive front-end project for managing properties and transactions. It is an LMS-type project built using:

- React + Typescript
- Tailwind CSS
- MUI (Material UI)

# How to Run the Project
1. Setup Frontend (commands)
- npm install
- npm run dev

2. Setup Backend
- Clone the backend repository: Property-BE
- npm install
- npm run dev

# Pages Included

- Admin Login Page
  ![image](https://github.com/user-attachments/assets/bd7c68a9-9b54-4013-bbdf-258d3063051e)

- Dashboard Page
  ![image](https://github.com/user-attachments/assets/304b05c0-9d64-4c59-a0dc-9490596aa5b8)

- Property Page
  ![image](https://github.com/user-attachments/assets/a44a8c2d-e163-4d8f-982e-abafb48f2bf0)

- Transaction Page
  ![image](https://github.com/user-attachments/assets/07d6aba9-d42a-4899-af04-cb83df744cce)

# For Mobile View
![image](https://github.com/user-attachments/assets/99b5cbba-87cf-42b0-b031-690d818f23f3)
![image](https://github.com/user-attachments/assets/09a8d67f-cb3e-4f8f-bb64-6b2f146ed5e8)
![image](https://github.com/user-attachments/assets/48b56e70-44d6-4196-8537-2c4581445164)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
