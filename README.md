# Menu App

This is a modern, responsive menu application built with Next.js and Tailwind CSS. It provides a seamless user experience for browsing food categories and items, with a dynamic layout that adapts to different screen sizes.

## ✨ Features

-  **Responsive Design**: Optimized for small, medium, and large screens.
-  **Component-Based Architecture**: Built with reusable React components.
-  **Dynamic Layout**: The layout adjusts based on the screen size to provide the best user experience.
-  **Skeleton Loading**: Skeletons are shown while content is loading to reduce Cumulative Layout Shift (CLS) and improve perceived performance.
-  **Sticky Elements**: The shopping cart and category switcher are sticky for easy access.
-  **Modern Tech Stack**: Utilizes Next.js for server-side rendering and Tailwind CSS for styling.

## 🛠️ Tech Stack

-  **Framework**: [Next.js](https://nextjs.org/)
-  **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-  **Language**: JavaScript (with JSX)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

-  [Node.js](https://nodejs.org/)
-  [npm](https://www.npmjs.com/get-npm)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/menu-app.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd menu-app
   ```
3. **Install the dependencies:**
   ```sh
   npm install
   ```

## 🛡️ Environment Variables

All environment variables should be defined in the `.env` file. See `.env.example` for required variables.

-  `NEXT_PUBLIC_API_URL`: The base URL for your API.
-  `NEXT_PUBLIC_APP_NAME`: The name of your application.

### Setting Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Fill in the required values in `.env`.

### Running the Development Server

To start the development server, run the following command:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src
├── app
│   ├── globals.css         # Global styles
│   ├── layout.js           # Main layout component
│   └── page.js             # Main page component
└── components
    ├── cart
    │   └── CartDesktop.jsx   # Desktop cart component
    ├── categories
    │   ├── CategoriesDesktop.jsx
    │   ├── CategoriesMobile.jsx
    │   ├── CategoriesSwitcher.jsx
    │   ├── CategoryTab.jsx
    │   └── ...               # Other category-related components
    ├── header
    │   ├── Header.jsx        # Header component
    │   └── ...               # Other header-related components
    ├── menu
    │   ├── MenuItem.jsx      # Menu item component
    │   ├── MenuList.jsx      # Menu list component
    │   └── ...               # Other menu-related components
    └── shared
        ├── Button.jsx        # Reusable button component
        └── IconButton.jsx    # Reusable icon button component
```
