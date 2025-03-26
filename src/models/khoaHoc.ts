import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'khoaHocData';

const initialCourses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') || [
	{
		id: 1,
		tenKhoaHoc: 'ReactJS Basics',
		giangVien: 'Nguyễn Văn A',
		soLuongHocVien: 0,
		trangThai: 'Đang mở',
		moTa: 'Khóa học cơ bản về ReactJS',
	},
	{
		id: 2,
		tenKhoaHoc: 'NodeJS Advanced',
		giangVien: 'Trần Thị B',
		soLuongHocVien: 10,
		trangThai: 'Đã kết thúc',
		moTa: 'Khóa học nâng cao về NodeJS',
	},
];

export default () => {
	const [courses, setCourses] = useState(initialCourses);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
	}, [courses]);

	const addOrEditCourse = (course) => {
		if (course.id) {
			setCourses(courses.map((c) => (c.id === course.id ? course : c)));
		} else {
			setCourses([...courses, { ...course, id: Date.now(), soLuongHocVien: 0 }]);
		}
	};

	const deleteCourse = (id) => {
		setCourses(courses.filter((c) => c.id !== id));
	};

	return {
		courses,
		addOrEditCourse,
		deleteCourse,
	};
};
