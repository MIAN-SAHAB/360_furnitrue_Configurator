# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploying To Hostinger (SPA Routing)

This project uses `react-router-dom` with `BrowserRouter`, so direct visits to nested routes like `/home` or `/theme-customizer` need a server rewrite rule.

A `public/.htaccess` file is included so Vite copies it into `dist/.htaccess` during build.

Deployment steps:
1. Run `npm run build`.
2. Upload all files from `dist/` to your Hostinger `public_html` folder.
3. Make sure `.htaccess` exists in `public_html` after upload.

If `.htaccess` is missing or ignored, deep links will return `404 Not Found`.
