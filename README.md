# OmniOrder - Manufacturing Order Management System

OmniOrder is a high-performance, professional-grade Order Management System (OMS) specifically tailored for manufacturing companies specializing in wardrobes and modular kitchen designs.

## 🚀 Key Features

- **Dynamic Analytics Dashboard**: Real-time visualization of revenue performance, order distribution, and key business KPIs using Recharts.
- **Dealer Network Management**: Full CRUD operations for managing a distribution network.
- **Client Relationship Tracking**: Seamlessly link end-customers to specific dealers.
- **Product Catalog**: Categorized manufacturing units (Wardrobes/Kitchens) with base pricing.
- **Manufacturing Order Lifecycle**: Multi-item order creation with automated dealer-client linking and status tracking.
- **Local Persistence**: Data is persisted in the browser's `localStorage`, allowing for a fully functional demo without a dedicated backend server.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Persistence**: Simulated Async API with Browser Storage

---

## 💻 Getting Started (Local Development)

### Prerequisites
- A modern web browser (Chrome, Edge, or Firefox)

### Setup
1. The application is a standalone frontend project.
2. Data is stored locally in your browser. Clearing your browser cache or site data will reset the system to the initial mock data.

---

## 📂 Project Structure

```text
├── App.tsx             # Main entry point & Global DataContext
├── api.ts              # Simulated API layer (LocalStorage)
├── index.html          # HTML5 boilerplate & Import maps
├── index.tsx           # React DOM rendering
├── types.ts            # TypeScript interfaces & Enums
├── mockData.ts         # Seed data for initial state
└── pages/              # View components
```

## 🎨 UI/UX Design Choices
- **Professional Aesthetic**: Indigo & Slate palette.
- **Responsive Layout**: Sidebar-driven navigation.
- **Persistence**: Implements an asynchronous simulation of a backend to mirror real-world application behavior.

---
*Developed by a world-class senior frontend engineer.*
