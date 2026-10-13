# VELORA — Premium Fashion E-Commerce

> **"Define Your Everyday."**
>
> VELORA is a modern, editorial fashion e-commerce web application for men's and women's clothing, built with React, Vite, Tailwind CSS, and Framer Motion.

---

## ✨ Features

- **Full E-Commerce Frontend**:
  - **Homepage**: Full-bleed campaign hero, "Find Your Style" category cards, "Just Landed" new arrivals, editorial banners, side-by-side men's and women's promotional panels, best sellers, customer benefits, newsletter form, and Instagram-inspired gallery.
  - **Collections**: Comprehensive Men's and Women's collection views with multi-faceted filtering (Category, Price slider, Sizes, Colors, Product Type, Sale, Stock), multi-sorting, active filter chips, and pagination.
  - **Product Details Page (PDP)**: High-resolution image gallery (with zoom lens, full-screen lightbox, and mobile swipe carousel), color swatches that swap images, size selector, size guide modal, postal code delivery estimator, and related / recently viewed product rails.
  - **Search**: Full-width overlay with live query suggestions, recent search history, popular terms, and dedicated results page.
  - **Shopping Bag & Mini-Cart Drawer**: Slide-out mini cart and full cart page, free shipping progress bar, quantity controls, and integer-safe money calculations.
  - **Promo Codes**: Working demo promo codes (`WELCOME10`, `STYLE15`, `FREESHIP`) with instant validation and discount calculations.
  - **Multi-Step Checkout**: 5-step simulation (Contact → Shipping Address → Delivery Options → Payment Method → Order Review) with inline validation and demo order creation.
  - **Customer Dashboard**: Profile editor, address book manager, order history, and preferences.
  - **Supporting Pages**: About Us, Contact Us with interactive form, Accordion FAQ, Shipping & Returns policy, Privacy Policy, Terms & Conditions, and 404 page.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG icons
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `ShopContext`, `AuthContext`, `ToastContext`)
- **Persistence**: Browser `localStorage` for cart, wishlist, demo orders, and user settings

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/hjebarson-byte/Fashion_Design-.git

# Navigate into the project folder
cd Fashion_Design-

# Install dependencies
npm install

# Run the local development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Build for Production

```bash
npm run build
```

The production output will be generated in the `dist/` directory.

---

## ☁️ Deployment (Vercel)

This project includes a `vercel.json` SPA rewrite configuration, making deployment on [Vercel](https://vercel.com/) seamless:

1. Import this repository into Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build` (or default).
4. Output Directory: `dist`.
5. Deploy!
