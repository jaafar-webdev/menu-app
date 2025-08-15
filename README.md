# Menu App

A modern, full-stack web application for browsing a restaurant menu, managing a cart, and placing orders. The project also includes a dashboard for administrators to manage product categories and items.

## ✨ Features

- **User Authentication:** Secure login and registration functionality.
- **Product Catalog:** Browse menu items by category.
- **Shopping Cart:** Add/remove items and view order summary.
- **Checkout Process:** Simple and intuitive user information form for placing orders.
- **Admin Dashboard:** A separate interface for managing products and categories.
- **Responsive Design:** Fully responsive layout for a seamless experience on desktop and mobile devices.

## 🛠️ Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React Framework
  - [React](https://reactjs.org/) - UI Library
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
  - [Zustand](https://github.com/pmndrs/zustand) - State Management
  - [React Query](https://tanstack.com/query/latest) - Data Fetching and Caching
- **Backend/DB:**
  - [Firebase](https://firebase.google.com/) - Authentication & Database
- **Tooling:**
  - [ESLint](https://eslint.org/) - Code Linting
  - [Prettier](https://prettier.io/) - Code Formatting
  - [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit Hooks

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/menu-app.git
    cd menu-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary Firebase configuration and API URL. You can use `.env.example` as a template:
    ```env
    # Firebase Config
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

    # API URL (for db.json)
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

### Running the Application

1.  **Start the local JSON server (if using `db.json`):**
    You may need to install `json-server` globally: `npm install -g json-server`.
    ```sh
    json-server --watch db.json --port 3001
    ```

2.  **Start the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs ESLint to find and fix problems in your code.

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
