import { useState } from 'react';

const initialAppointments = [
	// ...initial appointments data...
];

export default () => {
	const [appointments, setAppointments] = useState(initialAppointments);

	const addAppointment = (appointment) => {
		setAppointments([...appointments, appointment]);
	};

	const updateAppointment = (index, updatedAppointment) => {
		const newAppointments = [...appointments];
		newAppointments[index] = updatedAppointment;
		setAppointments(newAppointments);
	};

	return {
		appointments,
		addAppointment,
		updateAppointment,
	};
};
