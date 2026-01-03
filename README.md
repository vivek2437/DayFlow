Team Name:TechFlow

# DayFlow 

Dayflow is a modern, premium Human Resource Management System built with React and Tailwind CSS. It streamlines HR operations including employee management, attendance tracking, leave management, and payroll visibility with a sleek, dark-themed interface.


## 🚀 Features

### 1. **Authentication & User Management**
- **Secure Login/Signup**: Role-based access (Employee vs Admin).
- **Auto-ID Generation**: Employee IDs are automatically generated based on Company and Name initials (e.g., `ODJO2025001`).
- **Department Selection**: New employees can select their specific department during registration.

### 2. **Interactive Dashboard**
- **Employee Grid**: Visual overview of all employees with status indicators (🟢 Present, 🟠 On Leave, 🔴 Absent).
- **Search & Filter**: Quickly find employees by status.
- **Quick Actions**: Access profiles directly from cards.

### 3. **Smart Attendance System**
- **Systray Widget**: Floating Check-In/Check-Out button accessible from any page.
- **Real-time Tracking**: Automatically calculates work hours for the day.
- **Admin Reports**: Admins can view attendance records for all employees, while employees see only their own.

### 4. **Comprehensive Profile Management**
- **Tabbed Interface**: Organized into Resume, Private Info, Salary, and Security tabs.
- **Salary Automation** (Admin Only): 
  - Auto-calculates components (Basic, HRA, PF) based on the monthly wage.
  - Interactive "What-if" editing for Admins.
  - Read-only breakdown for Employees.

### 5. **Time Off Management**
- **Request Workflow**: Employees can request Paid Time Off, Sick Leave, etc.
- **Approval System**: Admins can Approve or Reject requests directly from the dashboard.
- **Status Tracking**: Visual badges for Pending, Approved, and Rejected requests.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Custom "Surface" Dark Theme & Glassmorphism
- **State Management**: React Context API
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns

---

## 💻 Installation & Setup

1. **Clone the repository** (or download source):
   ```bash
   git clone <repository-url>
   cd dayflow-hrms
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Visit `http://localhost:5173`

---

## 🔐 Default Credentials

For testing purposes, the application comes with pre-configured accounts:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@dayflow.com` | `admin` |
| **Employee** | `john@dayflow.com` | `password123` |

> **Note**: You can also sign up as a new user. The system uses local state mock data, so refreshing the page will reset new registrations but persist the default mock accounts.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── dashboard/   # Employee Card, Grid
│   ├── layout/      # Navbar, Systray, Main Layout
│   ├── profile/     # Tabs (Resume, Salary, etc.)
│   └── ui/          # Reusable UI components
├── context/
│   ├── AuthContext.jsx  # User session, Login, Signup Logic
│   ├── DataContext.jsx  # Attendance & Time Off State
│   └── mockData.js      # Initial Sample Data
├── pages/           # Main Route Pages (Login, Dashboard, etc.)
└── index.css        # Global Styles & Animations
```

---

## ✨ Design Philosophy

Dayflow follows a "Premium Dark" aesthetic:
- **Surface Colors**: Deep slates (`#1e293b`) for cards against a darker background (`#0f172a`).
- **Accents**: Emerald Green (`#10b981`) for success/primary actions.
- **Interactions**: Smooth hover effects and transitions using CSS animations and `Framer Motion` concepts.

---
