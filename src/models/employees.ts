import { useState } from 'react';

const initialEmployees = [
	{ id: 1, name: 'Nhân viên A', maxAppointmentsPerDay: 5, workingHours: '09:00-17:00', ratings: [], averageRating: 0 },
	{ id: 2, name: 'Nhân viên B', maxAppointmentsPerDay: 3, workingHours: '10:00-18:00', ratings: [], averageRating: 0 },
	// ...other employees...
];

export default () => {
	const [employees, setEmployees] = useState(initialEmployees);

	const addOrEditEmployee = (employee) => {
		if (employee.id) {
			setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp)));
		} else {
			setEmployees([...employees, { ...employee, id: Date.now(), ratings: [], averageRating: 0 }]);
		}
	};

	const deleteEmployee = (id) => {
		setEmployees(employees.filter((emp) => emp.id !== id));
	};

	return {
		employees,
		addOrEditEmployee,
		deleteEmployee,
	};
};
