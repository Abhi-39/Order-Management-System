# OmniOrder - Manufacturing Order Management System

OmniOrder is a high-performance, professional-grade Order Management System (OMS) specifically tailored for manufacturing companies specializing in wardrobes and modular kitchen designs.

## 🚀 Key Features

- **Dynamic Analytics Dashboard**: Real-time visualization of revenue performance, order distribution, and key business KPIs using Recharts.
- **Dealer Network Management**: Full CRUD operations for managing a distribution network, including contact details, location tracking, and status monitoring.
- **Client Relationship Tracking**: Seamlessly link end-customers to specific dealers, maintaining a clean hierarchy for order attribution.
- **Product Catalog**: Categorized manufacturing units (Wardrobes/Kitchens) with base pricing and product code management.
- **Manufacturing Order Lifecycle**:
    - Multi-item order creation.
    - Automated dealer-client linking.
    - Status tracking (Placed, Confirmed, Processing, Shipped, Delivered).
    - Payment status monitoring (Pending, Partial, Paid).
- **Global State Management**: Built using React Context (`DataContext`) to ensure data consistency across all views without page reloads.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) (ESM-based imports)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## 📂 Project Structure

```text
├── App.tsx             # Main entry point & Global DataContext
├── index.html          # HTML5 boilerplate & Import maps
├── index.tsx           # React DOM rendering
├── types.ts            # TypeScript interfaces & Enums
├── mockData.ts         # Seed data for initial state
├── metadata.json       # App configuration and permissions
└── pages/              # View components
    ├── Dashboard.tsx   # Analytics and business overview
    ├── Dealers.tsx     # Dealer management CRUD
    ├── Clients.tsx     # Client management CRUD
    ├── Orders.tsx      # Order processing and lifecycle
    └── Products.tsx    # Product catalog management
```

## ⚙️ Development

This application uses **Import Maps** for managing dependencies directly in the browser via ESM, eliminating the need for a complex build step for most development tasks.

1.  The `App.tsx` file provides a `DataContext` which acts as the "source of truth".
2.  State is initialized from `mockData.ts` but persists in-memory for the duration of the session.
3.  Modals handle all creation and editing workflows to keep the UI clean and contextual.

## 🎨 UI/UX Design Choices

- **Modern Professional Aesthetic**: Utilizes a clean "Indigo & Slate" palette typical of enterprise-grade software.
- **Responsive Layout**: Sidebar-driven navigation with a mobile-friendly header and flexible grid layouts.
- **Feedback Loops**: Immediate state updates upon saving/deleting items, with native browser confirmations for destructive actions.
- **Visibility Robustness**: Form elements are explicitly styled with `text-gray-900` and `bg-white` to ensure readability across all system themes and dark-mode browser extensions.

---

*Developed by a world-class senior frontend engineer.*