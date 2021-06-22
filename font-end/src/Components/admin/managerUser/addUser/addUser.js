import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import * as action from '../../../../Actions/Account.action'
import { Table, InputNumber, Popconfirm, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};


// import table
const originData = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};








// function
const AddUser = (props) => {
    const [updated, setupdated] = useState(false);

    const dispatch = useDispatch()

    async function onFinish(values) {
        await dispatch(action.createNewAccount(values.id, values.userPassword, token.token))
        setupdated(!updated)
        values.id = ''
        values.userPassword = ''
    };
    // table
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;
    // fetch dữ liệu từ store

    const token = localStorage.getItem('ADMIN') ? JSON.parse(localStorage.getItem('ADMIN')) : {};
    const Account = useSelector(state => state.Account)
    const { allAccount } = Account

    const [allProductState, setProductState] = useState([]);
    // lấy tất cả user
    useEffect(() => {
        dispatch(action.getAllAccount(token.token))
    }, [updated]);


    useEffect(() => {
        if (allAccount) {
            var today = new Date();
            today.setHours(0)
            today.setMinutes(0)
            today.setSeconds(0)
            today.setMilliseconds(0)
            const task = allAccount.filter((dateCreate) => {
                const b = new Date(dateCreate.createDate)
                b.setHours(0)
                b.setMinutes(0)
                b.setSeconds(0)
                if (b.getTime() === today.getTime()) {
                    return dateCreate
                }

            })
            setProductState(task)
        }
    }, [allAccount]);










    const edit = (record) => {
        form.setFieldsValue({
            maSoThe: '',
            matKhauV: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                setEditingKey('');
            } else {
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Mã Số Thẻ',
            dataIndex: 'maSoThe',
            width: '25%',
            editable: true,
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhauV',
            width: '40%',
            editable: true,
        },
        {
            title: 'Sửa',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Sửa
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Hủy</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Sửa
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className={props.isShow === true ? "addUser" : 'd-none'}>
            <div className="row">
                <div className="col-sm-12 col-lg-6 col-md-6 mb-5">
                    <div className="adduserForm">
                        <h5 className="mb-4">Thêm 1 tài khoản!</h5>
                        <Form
                            {...layout}
                            name="basic"
                            className="ml-4"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >

                            <Form.Item

                                name="id"
                                rules={[{ required: true, message: 'id không được để trống' }]}
                            >
                                {/* <p>User Name</p> */}
                                <Input placeholder="User Name " />
                            </Form.Item>

                            <Form.Item
                                name="userPassword"
                                rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}

                            >
                                {/* <p>User Password</p> */}
                                <Input placeholder="Password" />
                            </Form.Item>

                            <Button className="greyButton" htmlType="submit">
                                Thêm
                            </Button>
                        </Form>
                    </div>
                </div>

                <div className="col-sm-12 col-lg-6 col-md-6">
                    <div className="listProduct">
                        <h5 className="mb-3">Tài khoản tạo trong ngày</h5>
                        <Form form={form} component={false} style={{ width: "100%" }}>
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={allProductState}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
