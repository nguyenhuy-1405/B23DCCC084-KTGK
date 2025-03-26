import { useState } from 'react';

const initialServices = [
	{ id: 1, name: 'Cắt tóc', price: 100000, duration: 60 },
	{ id: 2, name: 'Spa', price: 200000, duration: 90 },
	// ...other services...
];

export default () => {
	const [services, setServices] = useState(initialServices);

	const addOrEditService = (service) => {
		if (service.id) {
			setServices(services.map((svc) => (svc.id === service.id ? service : svc)));
		} else {
			setServices([...services, { ...service, id: Date.now() }]);
		}
	};

	const deleteService = (id) => {
		setServices(services.filter((svc) => svc.id !== id));
	};

	return {
		services,
		addOrEditService,
		deleteService,
	};
};
