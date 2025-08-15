# Project Structure Overview

This document provides an overview of the project structure for your Next.js menu app, along with a simple explanation of what each main component and file does.

```
menu-app/
├── db.json                  # Mock database for menu data (used by json-server)
├── package.json             # Project dependencies and scripts
├── next.config.mjs          # Next.js configuration (e.g., image domains)
├── postcss.config.mjs       # PostCSS configuration for Tailwind CSS
├── tailwind.config.js       # Tailwind CSS configuration
├── .gitignore               # Git ignored files
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles for the app
│   │   ├── layout.js        # Main layout for the app
│   │   ├── page.js          # Main entry page (redirects to /menu)
│   │   ├── (dashboard)/     # Dashboard-related pages (admin)
│   │   │   ├── layout.js    # Dashboard layout with sidebar
│   │   │   ├── page.js      # Dashboard home page
│   │   │   ├── addcategory/ # Add new category page and form
│   │   │   ├── addproduct/  # Add new product page
│   │   │   ├── categories/  # View categories page
│   │   │   └── products/    # View products page
│   │   ├── (public)/        # Public-facing menu pages
│   │   │   └── menu/
│   │   │       ├── page.js  # Menu page (main user interface)
│   │   │       └── loading.jsx # Loading skeleton for menu
│   │   └── api/
│   │       └── db/
│   │           └── route.js # API route to serve db.json data
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── components/  # Dashboard sidebar and file upload
│   │   │   └── hooks/       # Custom hooks (e.g., file upload)
│   │   └── public/
│   │       ├── cart/
│   │       │   └── CartDesktop.jsx              # Shopping cart component for desktop view
│   │       ├── categories/
│   │       │   ├── Categories.jsx               # Main categories component
│   │       │   ├── CategoriesDesktop.jsx        # Categories for desktop view
│   │       │   ├── CategoriesMobile.jsx         # Categories for mobile view
│   │       │   ├── CategoriesSwitcher.jsx       # Switches between categories
│   │       │   ├── CategoryCard.jsx             # Displays a single category card
│   │       │   ├── CategoryTabDisktop.jsx       # Tab for categories on desktop
│   │       │   ├── CategoryTabSkeleton.jsx      # Skeleton loader for category tabs
│   │       │   ├── categories.css               # Styles for categories
│   │       │   └── useActiveCategory.js         # Hook to manage active category state
│   │       ├── header/
│   │       │   ├── Header.jsx                   # Main header component
│   │       │   ├── components/
│   │       │   │   ├── BranchSelector.jsx       # Dropdown to select branch
│   │       │   │   ├── IconButton.jsx           # Reusable icon button
│   │       │   │   └── TopBar.jsx               # Top bar section of header
│   │       │   ├── header.css                   # Styles for header
│   │       │   └── icons/
│   │       │       ├── BranchIcon.jsx           # Icon for branch
│   │       │       ├── CartIcon.jsx             # Icon for cart
│   │       │       └── MenuIcon.jsx             # Icon for menu
│   │       ├── menuList/
│   │       │   ├── MenuItem.jsx                 # Displays a single menu item
│   │       │   ├── MenuItemSkeleton.jsx         # Skeleton loader for menu item
│   │       │   └── MenuList.jsx                 # List of menu items
│   │       ├── products/
│   │       │   └── productModal/
│   │       │       ├── ProductActions.jsx         # Handles product-related actions (e.g., add to cart)
│   │       │       ├── ProductDetails.jsx         # Displays detailed information about a product
│   │       │       ├── ProductDetailsModal.jsx    # Modal component for showing product details
│   │       │       ├── ProductImageWithClose.jsx  # Shows product image with a close button
│   │       │       └── ProductModalOverlay.jsx    # Overlay for the product modal
│   │       ├── services/
│   │       │   └── getGroups.js                  # Service to fetch group data
│   │       └── sidebar/
│   │           ├── ArrowIcon.jsx                 # Icon for sidebar navigation
│   │           ├── Sidebar.jsx                   # Main sidebar component
│   │           ├── SidebarContent.jsx            # Content for sidebar
│   │           └── sidebar.css                   # Styles for sidebar
│   └── store/
│       └── cartStore.js     # Zustand store for cart state management
└── public/
    └── ...                  # Static assets (images, etc.)
```

---

## Key Components & Files

- **db.json**: Contains all menu data (categories, products, etc.) used for local development and API mocking.
- **src/app/**: Main application folder for Next.js routing, layouts, and pages.
   - **globals.css**: Global CSS and Tailwind imports.
   - **layout.js**: Root layout for the app.
   - **(dashboard)/**: Admin dashboard pages for managing categories and products.
   - **(public)/menu/page.js**: Main menu page for users to browse food items.
   - **api/db/route.js**: API endpoint to serve menu data from db.json.
- **src/features/**: Contains all feature-specific React components.
   - **dashboard/**: Components and hooks for admin dashboard (sidebar, file upload).
   - **public/**: Components for the public-facing menu (cart, categories, header, menu list, products, sidebar).
- **src/store/cartStore.js**: Zustand store for managing cart state globally.
- **tailwind.config.js, postcss.config.mjs**: Tailwind CSS and PostCSS configuration files.
- **next.config.mjs**: Next.js configuration, including image domain whitelisting.
- **package.json**: Project metadata, dependencies, and scripts (including `json-server` for local API).

---

## How It Works

- The **public menu** is rendered using components in `src/features/public/` and data fetched from the local API (`db.json` via `api/db/route.js`).
- The **dashboard** allows admins to add/view categories and products.
- **State management** for the cart is handled by Zustand (`src/store/cartStore.js`).
- **Styling** is done with Tailwind CSS, configured in `tailwind.config.js` and imported in `globals.css`.
- **API requests** for menu data use service functions in `src/features/public/services/`.

---

This structure helps keep your code organized, maintainable, and scalable as your menu app grows.
