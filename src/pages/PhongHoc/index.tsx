import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Table, Typography, Modal, message, Popconfirm, Tag } from 'antd';
import { useModel } from 'umi';

const { Title } = Typography;
const { Option } = Select;

const predefinedNguoiPhuTrach = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];

const PhongHoc = () => {
	const { rooms, addOrEditRoom, deleteRoom } = useModel('phongHoc');
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRoom, setEditingRoom] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [filterLoaiPhong, setFilterLoaiPhong] = useState('');

	const handleAddOrEditRoom = (values) => {
		try {
			addOrEditRoom({ ...editingRoom, ...values });
			setIsModalVisible(false);
			setEditingRoom(null);
			form.resetFields();
			message.success(editingRoom ? 'Cập nhật phòng học thành công.' : 'Thêm phòng học thành công.');
		} catch (error) {
			message.error(error.message);
		}
	};

	const handleEditRoom = (room) => {
		setEditingRoom(room);
		form.setFieldsValue(room);
		setIsModalVisible(true);
	};

	const handleDeleteRoom = (id) => {
		try {
			deleteRoom(id);
			message.success('Xóa phòng học thành công.');
		} catch (error) {
			message.error(error.message);
		}
	};

	const filteredRooms = rooms
		.filter(
			(room) =>
				room.maPhong.toLowerCase().includes(searchText.toLowerCase()) ||
				room.tenPhong.toLowerCase().includes(searchText.toLowerCase()),
		)
		.filter((room) => !filterLoaiPhong || room.loaiPhong === filterLoaiPhong);

	const columns = [
		{
			title: 'Mã phòng',
			dataIndex: 'maPhong',
			key: 'maPhong',
			render: (text) => <Tag color="blue">{text}</Tag>,
		},
		{
			title: 'Tên phòng',
			dataIndex: 'tenPhong',
			key: 'tenPhong',
			render: (text) => <span style={{ fontWeight: 'bold', color: '#096dd9' }}>{text}</span>,
		},
		{
			title: 'Số chỗ ngồi',
			dataIndex: 'soChoNgoi',
			key: 'soChoNgoi',
			sorter: (a, b) => a.soChoNgoi - b.soChoNgoi,
			render: (text) => <Tag color="green">{text}</Tag>,
		},
		{
			title: 'Loại phòng',
			dataIndex: 'loaiPhong',
			key: 'loaiPhong',
			render: (text) => {
				const color = text === 'Lý thuyết' ? 'purple' : text === 'Thực hành' ? 'orange' : 'gold';
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Người phụ trách',
			dataIndex: 'nguoiPhuTrach',
			key: 'nguoiPhuTrach',
			render: (text) => <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{text}</span>,
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<>
					<Button type="link" onClick={() => handleEditRoom(record)} style={{ color: '#1890ff' }}>
						Sửa
					</Button>
					<Popconfirm
						title="Bạn có chắc chắn muốn xóa phòng này không?"
						onConfirm={() => handleDeleteRoom(record.id)}
						okText="Xóa"
						cancelText="Hủy"
					>
						<Button type="link" danger>
							Xóa
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<Card
			style={{
				maxWidth: 1200,
				margin: 'auto',
				padding: '20px',
				backgroundColor: '#f9f9f9',
				borderRadius: '10px',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
			}}
		>
			<Title level={2} style={{ textAlign: 'center', color: '#096dd9' }}>
				Quản lý phòng học
			</Title>
			<div style={{ marginBottom: 16, display: 'flex', gap: 16, justifyContent: 'space-between' }}>
				<Input
					placeholder="Tìm kiếm theo mã phòng, tên phòng"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					style={{ width: '40%', borderRadius: '5px' }}
				/>
				<Select
					placeholder="Lọc theo loại phòng"
					value={filterLoaiPhong}
					onChange={(value) => setFilterLoaiPhong(value)}
					allowClear
					style={{ width: '30%', borderRadius: '5px' }}
				>
					<Option value="Lý thuyết">Lý thuyết</Option>
					<Option value="Thực hành">Thực hành</Option>
					<Option value="Hội trường">Hội trường</Option>
				</Select>
				<Button
					type="primary"
					onClick={() => setIsModalVisible(true)}
					style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', borderRadius: '5px' }}
				>
					Thêm phòng
				</Button>
			</div>
			<Table
				dataSource={filteredRooms}
				columns={columns}
				rowKey="id"
				bordered
				style={{ backgroundColor: '#fff', borderRadius: '10px' }}
			/>

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
				<Form form={form} onFinish={handleAddOrEditRoom} layout="vertical">
					<Form.Item
						name="maPhong"
						label="Mã phòng"
						rules={[
							{ required: true, message: 'Vui lòng nhập mã phòng' },
							{ max: 10, message: 'Mã phòng tối đa 10 ký tự' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="tenPhong"
						label="Tên phòng"
						rules={[
							{ required: true, message: 'Vui lòng nhập tên phòng' },
							{ max: 50, message: 'Tên phòng tối đa 50 ký tự' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="soChoNgoi"
						label="Số chỗ ngồi"
						rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi' }]}
					>
						<Input type="number" min={1} />
					</Form.Item>
					<Form.Item
						name="loaiPhong"
						label="Loại phòng"
						rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
					>
						<Select>
							<Option value="Lý thuyết">Lý thuyết</Option>
							<Option value="Thực hành">Thực hành</Option>
							<Option value="Hội trường">Hội trường</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="nguoiPhuTrach"
						label="Người phụ trách"
						rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
					>
						<Select placeholder="Chọn người phụ trách">
							{predefinedNguoiPhuTrach.map((nguoi) => (
								<Option key={nguoi} value={nguoi}>
									{nguoi}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ backgroundColor: '#096dd9', borderColor: '#096dd9', borderRadius: '5px' }}
					>
						{editingRoom ? 'Lưu' : 'Thêm'}
					</Button>
				</Form>
			</Modal>
		</Card>
	);
};

export default PhongHoc;
