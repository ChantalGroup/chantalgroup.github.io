# Chantal - Virtual Try-On Demo

A modern Next.js application showcasing virtual try-on capabilities for fashion products. This static site features a product gallery and detailed product pages with virtual try-on functionality.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Development Guide](#development-guide)
- [Deployment](#deployment)

## 🎯 Project Overview

Chantal is a demo website that allows users to browse a fashion collection and virtually try on clothing and accessories. The application is built with:

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Custom Fonts** - Playfair Display, Inter, DM Sans, and Bodoni Moda

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
chantal-demo-golden-path/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Home page (product gallery)
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── fonts/               # Custom font files
│   └── product/
│       └── [id]/
│           └── page.tsx     # Dynamic product detail page
│
├── components/              # Reusable React components
│   ├── Header.tsx           # Site header with logo
│   ├── Footer.tsx           # Site footer with copyright
│   ├── ProductCard.tsx      # Product card for gallery display
│   └── ProductDetail.tsx    # Product detail page with virtual try-on
│
├── lib/                     # Utilities and data
│   ├── types.ts             # TypeScript type definitions
│   └── data/
│       └── products.ts      # Product catalog data
│
├── public/                  # Static assets
│   └── images/
│       └── gallery/         # Product images (product-1.jpeg to product-30.jpeg)
│
└── Configuration files
    ├── next.config.ts       # Next.js configuration
    ├── tailwind.config.ts   # Tailwind CSS configuration
    ├── tsconfig.json        # TypeScript configuration
    └── eslint.config.mjs    # ESLint configuration
```

## 🎨 Key Features

### Components

#### `Header` (`components/Header.tsx`)
- Sticky header with blur backdrop
- Brand logo display
- Responsive layout

#### `Footer` (`components/Footer.tsx`)
- Copyright information
- Consistent styling across pages

#### `ProductCard` (`components/ProductCard.tsx`)
- Product image with Next.js Image optimization
- Product name and price display
- Hover effects
- Links to product detail pages
- "New" badge on all items

#### `ProductDetail` (`components/ProductDetail.tsx`)
- Full product information display with image, description, and pricing
- Virtual try-on section with state management
- Avatar creation prompt for first-time users
- Interactive "Create your profile" button with modal integration
- Size selection interface (XS, S, M, L, XL)
- Product features list
- Responsive two-column layout (stacked on mobile)
- Add to Cart functionality
- Back to gallery navigation

#### `AvatarModal` (`components/AvatarModal.tsx`)
- Modal dialog for avatar creation
- Two-step image upload (front-facing and side profile photos)
- Image preview with remove functionality
- Drag-and-drop or click-to-upload interface
- Form validation (both images required)
- Loading state with animation during avatar creation
- Tips section for best photo practices
- Cancel and submit actions
- Closes on backdrop click or close button

### Data Structure

#### `Product` Type (`lib/types.ts`)
```typescript
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}
```

#### Product Data (`lib/data/products.ts`)
- 30 product entries with complete information
- Easy to add, edit, or remove products
- Centralized data management

### Pages

#### Home Page (`app/page.tsx`)
- Hero section with tagline
- Responsive product grid (1-4 columns based on screen size)
- Uses `ProductCard` component for each item
- Links to individual product pages

#### Product Detail Page (`app/product/[id]/page.tsx`)
- Dynamic route for individual products
- Fetches product data by ID
- Renders `ProductDetail` component
- 404 handling for invalid product IDs

#### Product Detail Page with Avatar (`app/product/[id]/avatar/page.tsx`)
- Same as Product Detail Page but with avatar pre-loaded
- Uses `ProductDetail` component with `initialHasAvatar={true}`

## 💡 Development Guide

### Adding New Products

1. Open `lib/data/products.ts`
2. Add a new product object to the array:

```typescript
{
  id: 31,
  name: "Product Name",
  image: "/images/gallery/product-31.jpeg",
  description: "Product description",
  price: 99
}
```

3. Add the product image to `public/images/gallery/`

### Creating New Components

1. Create a new file in `components/` directory
2. Follow the existing component patterns
3. Import and use in your pages

Example:
```typescript
// components/YourComponent.tsx
export default function YourComponent() {
  return <div>Your content</div>;
}
```

### Styling Guidelines

- Use Tailwind utility classes
- Follow responsive design patterns (mobile-first)
- Custom fonts available via CSS variables:
  - `font-playfair` - Playfair Display
  - `font-inter` - Inter
  - `font-geo` - DM Sans (used for body text)
  - `font-display` - Bodoni Moda

### Type Safety

- All components use TypeScript
- Product data is strongly typed
- Import types from `lib/types.ts`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

For detailed deployment instructions, see [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 Notes

- This is a static demo site with no backend
- Product data is stored in TypeScript files
- Images should be optimized before adding to `/public/images/gallery/`
- The site uses Next.js Image component for automatic optimization

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

dns test