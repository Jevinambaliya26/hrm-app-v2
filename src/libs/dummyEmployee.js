export default [
    {
        employee_id: 1,
        email: "vijay.a@gmail.com",
        password: "123456",
        holidays: {
            read: true,
            write: true,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        adminLeaves: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        employeeLeaves: {
            read: true,
            write: true,
            create: true,
            delete: false,
            import: false,
            export: false
        },
        leavesSetting: {
            read: true,
            write: true,
            create: true,
            delete: false,
            import: false,
            export: false
        },
        clients: {
            read: true,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        attendanceEmployee: {
            read: true,
            write: true,
            create: true,
            delete: false,
            import: false,
            export: false
        },
        attendanceAdmin: {
            read: true,
            write: true,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        department: {
            read: false,
            write: true,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        designation: {
            read: true,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        timeSheet: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        overtime: {
            read: true,
            write: true,
            create: false,
            delete: false,
            import: false,
            export: false
        }
    },
    {
        employee_id: 2,
        email: "vijay.amba@gmail.com",
        password: "12345",
        holidays: {
            read: true,
            write: true,
            create: true,
            delete: false,
            import: false,
            export: false
        },
        adminLeaves: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        employeeLeaves: {
            read: true,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        leavesSetting: {
            read: true,
            write: true,
            create: true,
            delete: false,
            import: false,
            export: false
        },
        clients: {
            read: true,
            write: true,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        attendanceEmployee: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        attendanceAdmin: {
            read: true,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        department: {
            read: true,
            write: true,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        designation: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        timeSheet: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        },
        overtime: {
            read: false,
            write: false,
            create: false,
            delete: false,
            import: false,
            export: false
        }
    }
]
