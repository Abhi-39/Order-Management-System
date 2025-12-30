# OmniOrder - Manufacturing Order Management System

OmniOrder is a high-performance, professional-grade Order Management System (OMS) specifically tailored for manufacturing companies specializing in wardrobes and modular kitchen designs.

## 🚀 Key Features

- **Dynamic Analytics Dashboard**: Real-time visualization of revenue performance, order distribution, and key business KPIs using Recharts.
- **Dealer Network Management**: Full CRUD operations for managing a distribution network.
- **Client Relationship Tracking**: Seamlessly link end-customers to specific dealers.
- **Product Catalog**: Categorized manufacturing units (Wardrobes/Kitchens) with base pricing.
- **Manufacturing Order Lifecycle**: Multi-item order creation with automated dealer-client linking and status tracking.
- **Global State Management**: Built using React Context (`DataContext`) for cross-view consistency.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)

---

## 💻 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A modern web browser (Chrome, Edge, or Firefox)

### Setup
1. **Clone or Download** the project files into a folder.
2. **Initialize Node (Optional but recommended)**:
   If you want to use a dev server like Vite for hot-reloading:
   ```bash
   npm init -y
   npm install vite @vitejs/plugin-react
   ```
3. **Run with Vite**:
   Create a `vite.config.ts` (or `.js`) and run:
   ```bash
   npx vite
   ```
   *Note: Because this project uses a native `importmap` in `index.html`, most modern dev servers will serve it correctly out of the box.*

4. **Static Server Alternative**:
   If you prefer a simple static server:
   ```bash
   npx serve .
   ```
   *(Ensure your server is configured to handle SPA routing by redirecting unknown paths to `index.html` if you move away from HashRouter).*

---

## 🌐 Public Deployment

### Option 1: Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New" > "Project"**.
3. Import your repository.
4. If using a build tool, ensure the **Build Command** is set (e.g., `npm run build`) and the **Output Directory** is correct (e.g., `dist`).
5. Click **Deploy**.

### Option 2: Netlify
1. Drag and drop your project folder into the [Netlify Drop](https://app.netlify.com/drop) zone.
2. Or, connect your GitHub repository for continuous deployment.

### Option 3: GitHub Pages
1. Ensure you are using `HashRouter` (already configured in `App.tsx`) to avoid 404 errors on refresh.
2. Use the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
3. Add a `homepage` field to your `package.json` and deploy:
   ```bash
   npm run deploy
   ```

---

## 📂 Project Structure

```text
├── App.tsx             # Main entry point & Global DataContext
├── index.html          # HTML5 boilerplate & Import maps
├── index.tsx           # React DOM rendering
├── types.ts            # TypeScript interfaces & Enums
├── mockData.ts         # Seed data for initial state
└── pages/              # View components
```

## 🎨 UI/UX Design Choices
- **Professional Aesthetic**:Indigo & Slate palette.
- **Responsive Layout**: Sidebar-driven navigation.
- **Visibility Robustness**: Explicitly styled form elements for dark/light mode compatibility.

---
*Developed by a world-class senior frontend engineer.*