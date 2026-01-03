export const mockEmployees = [
    {
        id: "DAYJ2025001",
        name: "John Doe",
        email: "john@dayflow.com",
        role: "employee",
        password: "password123", // In a real app, this would be hashed
        status: "present",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        department: "Engineering",
        designation: "Frontend Developer",
        joiningDate: "2025-01-15",
        manager: "Admin User",
        mobile: "1234567890",
        address: "123 Tech Street, Silicon Valley",
        salary: {
            wage: 50000,
            workingDays: 22,
            breakTime: 1,
            components: {
                basic: 25000,
                hra: 12500,
                standard: 4167,
                bonus: 2083,
                lta: 2092, // adjusted to match loose math
                fixed: 2500,
                pf: 2500,
                pt: 200
            }
        },
        bankDetails: {
            accountNumber: "123456789012",
            bankName: "HDFC Bank",
            ifsc: "HDFC0001234",
            pan: "ABCDE1234F",
            uan: "1001001001"
        }
    },
    {
        id: "DAYA2025002",
        name: "Admin User",
        email: "admin@dayflow.com",
        role: "admin",
        password: "admin",
        status: "present",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        department: "HR",
        designation: "HR Manager",
        joiningDate: "2024-01-01",
        salary: { wage: 80000, components: {} }
    },
    {
        id: "DAYS2025003",
        name: "Sarah Smith",
        email: "sarah@dayflow.com",
        role: "employee",
        password: "password123",
        status: "leave",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        department: "Design",
        designation: "UI/UX Designer",
        joiningDate: "2025-02-01",
        salary: { wage: 45000, components: {} }
    },
    {
        id: "DAYM2025004",
        name: "Mike Ross",
        email: "mike@dayflow.com",
        role: "employee",
        password: "password123",
        status: "absent",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        department: "Legal",
        designation: "Legal Associate",
        joiningDate: "2025-03-01",
        salary: { wage: 55000, components: {} }
    }
];

export const mockAttendance = [
    {
        id: 1,
        employeeId: "DAYJ2025001",
        date: new Date().toISOString().split('T')[0],
        checkIn: "09:00",
        checkOut: null, // Still checked in
        status: "present"
    },
    {
        id: 2,
        employeeId: "DAYA2025002",
        date: new Date().toISOString().split('T')[0],
        checkIn: "08:30",
        checkOut: "17:30",
        status: "present"
    }
];

export const mockTimeOff = [
    {
        id: "TO001",
        employeeId: "DAYS2025003",
        type: "Sick Leave",
        startDate: "2025-05-14",
        endDate: "2025-05-15",
        status: "Approved",
        reason: "Flu"
    },
    {
        id: "TO002",
        employeeId: "DAYJ2025001",
        type: "Paid Time Off",
        startDate: "2025-06-01",
        endDate: "2025-06-05",
        status: "Pending",
        reason: "Vacation"
    }
];
