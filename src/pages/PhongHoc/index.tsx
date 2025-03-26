import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Table, Typography, Modal, message } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const predefinedNguoiPhuTrach = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];

const PhongHoc = () => {
	const [rooms, setRooms] = useState([
		{
			id: 1,
			maPhong: 'P101',
			tenPhong: 'Phòng 101',
			soChoNgoi: 30,
			loaiPhong: 'Lý thuyết',
			nguoiPhuTrach: 'Nguyễn Văn A',
		},
		{
			id: 2,
			maPhong: 'P102',
			tenPhong: 'Phòng 102',
			soChoNgoi: 25,
			loaiPhong: 'Thực hành',
			nguoiPhuTrach: 'Trần Thị B',
		},
		{
			id: 3,
			maPhong: 'P201',
			tenPhong: 'Phòng 201',
			soChoNgoi: 100,
			loaiPhong: 'Hội trường',
			nguoiPhuTrach: 'Lê Văn C',
		},
	]);
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRoom, setEditingRoom] = useState(null);

	const handleAddOrEditRoom = (values) => {
		if (editingRoom) {
			setRooms(rooms.map((room) => (room.id === editingRoom.id ? { ...editingRoom, ...values } : room)));
			message.success('Cập nhật phòng học thành công.');
		} else {
			setRooms([...rooms, { id: Date.now(), ...values }]);
			message.success('Thêm phòng học thành công.');
		}
		setIsModalVisible(false);
		setEditingRoom(null);
		form.resetFields();
	};

	const handleEditRoom = (room) => {
		setEditingRoom(room);
		form.setFieldsValue(room);
		setIsModalVisible(true);
	};

	const handleDeleteRoom = (id) => {
		setRooms(rooms.filter((room) => room.id !== id));
		message.success('Xóa phòng học thành công.');
	};

	const columns = [
		{ title: 'Mã phòng', dataIndex: 'maPhong', key: 'maPhong' },
		{ title: 'Tên phòng', dataIndex: 'tenPhong', key: 'tenPhong' },
		{ title: 'Số chỗ ngồi', dataIndex: 'soChoNgoi', key: 'soChoNgoi' },
		{ title: 'Loại phòng', dataIndex: 'loaiPhong', key: 'loaiPhong' },
		{ title: 'Người phụ trách', dataIndex: 'nguoiPhuTrach', key: 'nguoiPhuTrach' },
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<>
					<Button type='link' onClick={() => handleEditRoom(record)}>
						Sửa
					</Button>
					<Button type='link' danger onClick={() => handleDeleteRoom(record.id)}>
						Xóa
					</Button>
				</>
			),
		},
	];

	return (
		<Card style={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
			<Title level={2}>Quản lý phòng học</Title>
			<Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
				Thêm phòng
			</Button>
			<Table dataSource={rooms} columns={columns} rowKey='id' />

			<Modal
				title={editingRoom ? 'Sửa phòng học' : 'Thêm phòng học'}
				visible={isModalVisible}
				onCancel={() => {
					setIsModalVisible(false);
					setEditingRoom(null);
					form.resetFields();
				}}
				footer={null}
			>
				<Form form={form} onFinish={handleAddOrEditRoom} layout='vertical'>
					<Form.Item name='maPhong' label='Mã phòng' rules={[{ required: true, message: 'Vui lòng nhập mã phòng' }]}>
						<Input />
					</Form.Item>
					<Form.Item name='tenPhong' label='Tên phòng' rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='soChoNgoi'
						label='Số chỗ ngồi'
						rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi' }]}
					>
						<Input type='number' min={1} />
					</Form.Item>
					<Form.Item
						name='loaiPhong'
						label='Loại phòng'
						rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
					>
						<Select>
							<Option value='Lý thuyết'>Lý thuyết</Option>
							<Option value='Thực hành'>Thực hành</Option>
							<Option value='Hội trường'>Hội trường</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name='nguoiPhuTrach'
						label='Người phụ trách'
						rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
					>
						<Select>
							{predefinedNguoiPhuTrach.map((nguoi) => (
								<Option key={nguoi} value={nguoi}>
									{nguoi}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Button type='primary' htmlType='submit'>
						{editingRoom ? 'Lưu' : 'Thêm'}
					</Button>
				</Form>
			</Modal>
		</Card>
	);
};

export default PhongHoc;
