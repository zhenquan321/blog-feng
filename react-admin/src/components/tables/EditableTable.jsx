/**
 * Created by hao.cheng on 2017/4/16.
 */

import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i.toString(),
		name: `Edrward ${i}`,
		age: 32,
		address: `London Park no. ${i}`,
	});
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
		<tr {...props} />
	</EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
	getInput = () => {
		if (this.props.inputType === 'number') {
			return <InputNumber />;
		}
		return <Input />;
	};
	render() {
		const {
			editing,
			dataIndex,
			title,
			inputType,
			record,
			index,
			...restProps
		} = this.props;
		return (
			<EditableContext.Consumer>
				{(form) => {
					const { getFieldDecorator } = form;
					return (
						<td {...restProps}>
							{editing ? (
								<FormItem style={{ margin: 0 }}>
									{getFieldDecorator(dataIndex, {
										rules: [{
											required: true,
											message: `Please Input ${title}!`,
										}],
										initialValue: record[dataIndex],
									})(this.getInput())}
								</FormItem>
							) : restProps.children}
						</td>
					);
				}}
			</EditableContext.Consumer>
		);
	}
}

export default class EditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data, editingKey: '' };
		this.columns = [
			{
				title: 'name',
				dataIndex: 'name',
				width: '25%',
				editable: true,
			},
			{
				title: 'age',
				dataIndex: 'age',
				width: '15%',
				editable: true,
			},
			{
				title: 'address',
				dataIndex: 'address',
				width: '40%',
				editable: true,
			},
			{
				title: 'operation',
				dataIndex: 'operation',
				render: (text, record) => {
					const editable = this.isEditing(record);
					return (
						<div>
							{editable ? (
								<span>
									<EditableContext.Consumer>
										{form => (
											<Button
												onClick={() => this.save(form, record.key)}
												style={{ marginRight: 8 }}
											>
												Save
                      						</Button>
										)}
									</EditableContext.Consumer>
									<Popconfirm
										title="Sure to cancel?"
										onConfirm={() => this.cancel(record.key)}
									>
										<Button>Cancel</Button>
									</Popconfirm>
								</span>
							) : (
									<Button onClick={() => this.edit(record.key)}>Edit</Button>
								)}
						</div>
					);
				},
			},
		];
	}
	isEditing = (record) => {
		return record.key === this.state.editingKey;
	};
	edit(key) {
		this.setState({ editingKey: key });
	}
	save(form, key) {
		form.validateFields((error, row) => {
			if (error) {
				return;
			}
			const newData = [...this.state.data];
			const index = newData.findIndex(item => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				this.setState({ data: newData, editingKey: '' });
			} else {
				newData.push(data);
				this.setState({ data: newData, editingKey: '' });
			}
		});
	}
	cancel = () => {
		this.setState({ editingKey: '' });
	};
	render() {
		const components = {
			body: {
				row: EditableFormRow,
				cell: EditableCell,
			},
		};

		const columns = this.columns.map((col) => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
					record,
					inputType: col.dataIndex === 'age' ? 'number' : 'text',
					dataIndex: col.dataIndex,
					title: col.title,
					editing: this.isEditing(record),
				}),
			};
		});

		return (
			<Table
				components={components}
				bordered
				dataSource={this.state.data}
				columns={columns}
				rowClassName="editable-row"
			/>
		);
	}
}
