# Backend Documentation - Dayflow HRMS

> **Note**: This project currently runs on a **Mock Backend** (Client-Side State). This document outlines the data structures and simulating API logic used, which serves as a blueprint for a future real backend integration (Node.js/Python/Go).

## 💾 Data Models

### 1. User / Employee Object
Structure used in `AuthContext` and stored in `employees` array:

```json
{
  "id": "ODIV2025001",           // Generated: Comp + Name + Year + Serial
  "name": "Vivek",
  "email": "vivek@odeo.com",
  "role": "employee",            // "admin" | "employee"
  "department": "Engineering",
  "status": "present",           // "present" | "leave" | "absent"
  "avatar": "https://api.dicebear.com/...",
  "joiningDate": "2025-01-01",
  "salary": {                    // Visible to Admin Only
    "wage": 50000,
    "workingDays": 22,
    "components": {
      "basic": 25000,
      "hra": 12500,
      "pf": 2500,
      ...
    }
  }
}
```

### 2. Attendance Record
Stored in `DataContext` -> `attendance` array:

```json
{
  "id": 1704230000000,
  "employeeId": "ODIV2025001",
  "date": "2025-01-03",
  "checkIn": "09:00",
  "checkOut": "18:00",
  "status": "present"
}
```

### 3. Time Off Request
Stored in `DataContext` -> `timeOffRequests` array:

```json
{
  "id": "TO12345",
  "employeeId": "ODIV2025001",
  "type": "Sick Leave",
  "startDate": "2025-05-14",
  "endDate": "2025-05-15",
  "reason": "Flu",
  "status": "Pending"            // "Pending" | "Approved" | "Rejected"
}
```

## 🔄 Simulated API Endpoints

The `AuthContext` and `DataContext` simulate the following REST API behavior:

### Authentication
*   **POST** `/api/login`: Checks credentials against mock array.
*   **POST** `/api/signup`: Generates ID and pushes new object to array.

### Resources
*   **GET** `/api/employees`: Returns list of all employees (Admin view).
*   **GET** `/api/attendance?user={id}`: Returns attendance history.
*   **POST** `/api/attendance/check-in`: Creates new attendance record for today.
*   **POST** `/api/time-off`: Creates a new leave request.

## 🔌 Future Integration

To connect a real backend:
1.  **Replace Context Logic**: Swap `useState` in Context files with `fetch()` or `axios()` calls.
2.  **API Client**: Create an `api/client.js` file to handle interceptors and JWT tokens.
3.  **Database**: Migrate the JSON structures above to a SQL (Postgres) or NoSQL (MongoDB) database schema.
