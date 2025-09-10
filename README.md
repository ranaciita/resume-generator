# Backend Setup (Python/Flask)

## 1. Clone the repository

```bash
git clone https://github.com/ranaciita/resume-generator.git
cd resume-generator/server
```

## 2. Create and activate a Python virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Run the backend server

```bash
cd app
python main.py
```

## 5. Development notes

- All backend code is in the `app/` directory.
- Endpoints are defined in `app/controllers/endpoint_controller.py`.
- Services and models are in their respective folders.
- To deactivate the venv: `deactivate`

# React + Vite Frontend setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

