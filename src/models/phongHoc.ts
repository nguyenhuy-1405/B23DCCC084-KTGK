import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'phongHocRooms';

const initialRooms = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') || [
	{
		id: 1,
		maPhong: 'P101',
		tenPhong: 'Phòng 101',
		soChoNgoi: 30,
		loaiPhong: 'Lý thuyết',
		nguoiPhuTrach: 'Nguyễn Văn A',
	},
	{ id: 2, maPhong: 'P102', tenPhong: 'Phòng 102', soChoNgoi: 25, loaiPhong: 'Thực hành', nguoiPhuTrach: 'Trần Thị B' },
	{ id: 3, maPhong: 'P201', tenPhong: 'Phòng 201', soChoNgoi: 100, loaiPhong: 'Hội trường', nguoiPhuTrach: 'Lê Văn C' },
];

export default () => {
	const [rooms, setRooms] = useState(initialRooms);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rooms));
	}, [rooms]);

	const addOrEditRoom = (room) => {
		if (room.id) {
			setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
		} else {
			setRooms([...rooms, { ...room, id: Date.now() }]);
		}
	};

	const deleteRoom = (id) => {
		setRooms(rooms.filter((r) => r.id !== id));
	};

	return {
		rooms,
		addOrEditRoom,
		deleteRoom,
	};
};
