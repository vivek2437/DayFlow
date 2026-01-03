# Frontend Documentation - Dayflow HRMS

## 🏗️ Architecture

Dayflow is built as a **Single Page Application (SPA)** using:
*   **React 18**: UI Library
*   **Vite**: Build Tool & Dev Server
*   **Tailwind CSS**: Utility-first styling
*   **Context API**: State Management (Auth, Employee Data)

## 📂 Directory Structure

```
src/
├── components/         # Independent UI blocks
│   ├── dashboard/      # Dashboard cards, grids
│   ├── layout/         # App shell (Sidebar, Navbar)
│   ├── profile/        # Sub-components for Profile page
│   └── ui/             # Generic primitives (Buttons, Inputs)
├── context/            # Global State Logic
│   ├── AuthContext.jsx # User sessions, Login, Signup
│   └── DataContext.jsx # Attendance, Time Off data
├── pages/              # Main Route Views
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── Attendance.jsx
│   └── ...
└── main.jsx            # Entry Point
```

## 🧩 Key Components

### `Layout.jsx`
*   Acts as the wrapper for all authenticated pages.
*   Contains the `Navbar` and the conditional logic for the `Systray` (Attendance widget).
*   Enforces authentication (redirects to Login if no user).

### `AuthContext.jsx` (State)
*   **`user`**: The currently logged-in user object.
*   **`employees`**: Array of all registered employees (Mock DB).
*   **`login(email, pass)`**: Validates credentials against `employees` array.
*   **`signup(data)`**: Creates new user with auto-generated ID (`CO..2025..`) and adds to state.

### `Systray.jsx`
*   Floating widget at bottom-right.
*   Handles "Check In" and "Check Out" actions.
*   Visually indicates status (Green = Checked In, "Shift Completed" = Checked Out).

## 🎨 Styling & Theme

*   **Tailwind Config**: Custom colors defined in `tailwind.config.js` (`bg-surface`, `text-emerald-500` etc.).
*   **Global CSS**: `index.css` contains custom scrollbar styles and keyframe animations (`animate-fade-in`, `animate-slide-up`).
*   **Glassmorphism**: UI cards use `bg-surface/50 backdrop-blur-md` for a modern, transparent look.

## 🛣️ Routing

Configured in `App.jsx` using `react-router-dom`:
*   `/login`, `/signup`: Public routes.
*   `/dashboard`, `/profile`, `/attendance`, `/time-off`: Protected routes wrapped in `<Layout>`.

## 🛠️ Adding New Features

1.  **New Page**: Create component in `pages/`, add route in `App.jsx`.
2.  **Shared State**: Add to `DataContext.jsx` if it needs to be accessed globally.
3.  **UI Component**: Build in `components/` using Tailwind classes for consistency.
