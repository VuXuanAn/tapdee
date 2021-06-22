import React, { useState, useEffect } from 'react';
import './ManageAccount.css'
import { Table, InputNumber, Popconfirm, Typography, Form, Input, DatePicker, Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../../Actions/Account.action'
import { Image } from 'cloudinary-react';
import { CloseCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { RangePicker } = DatePicker;


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

const ManageAccount = (props) => {
    // table
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const dispatch = useDispatch();

    const isEditing = (record) => record.maSoThe === editingKey;


    const edit = (record) => {
        form.setFieldsValue({
            maSoThe: '',
            matKhauV: '',
            ...record,
        });
        setEditingKey(record.maSoThe);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log(row);
            const newData = [...allProductState];
            const index = newData.findIndex((item) => key === item.maSoThe);
            console.log(index);
            if (index > -1) {

                setEditingKey('');
            } else {

                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };





    const [updated, setupdated] = useState(false);
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
            setProductState(allAccount)
            setFilter(allAccount)
        }
    }, [allAccount]);

    // toàn bộ thông tin người dùng 
    const [visible, setVisible] = useState(false);
    const [detail, setdetail] = useState({});
    const showDrawer = (record) => {
        setVisible(true);
        setdetail(record)
    };

    const onClose = () => {
        setVisible(false);
    };

    async function confirmDeleteHandler(record) {
        await dispatch(action.deleteAccount(token.token, record.maSoThe))
        setupdated(!updated)
    }

    const columns = [
        {
            title: 'Mã số thẻ',
            dataIndex: 'maSoThe',
            width: '25%',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhauV',
            width: '30%',
            editable: true,
        },
        {
            title: 'edit',
            dataIndex: 'edit',
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
                            Lưu
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
        {
            title: 'Xóa',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) =>
                <Popconfirm
                    title="Bạn chắc chắn muốn xóa tài khoản này？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => confirmDeleteHandler(record)}
                >
                    <a href="#">Xóa</a>
                </Popconfirm>,
        },
        {
            title: 'Xem chi tiết',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) => <a onClick={() => showDrawer(record)}>Xem chi tiết</a>,
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


    let transformedIngredients = Object.keys(detail)
        .map(igKey => {
            return [...Array(detail[igKey])].map(value => {
                return (
                    <h2
                        className={igKey === 'avt' || igKey === 'matKhau'
                            || igKey === 'moTa' || igKey === 'hoTen' ? 'd-none' : "itemAccount"}
                    >
                        {igKey === 'maSoThe' ? "Mã Số Thẻ" :
                            igKey === "createDate" ? "Ngày đăng kí" :
                                igKey === "isActive" ? "Kích hoạt" :
                                    igKey === "matKhauV" ? "Mật khẩu" :
                                        igKey
                        } : {value}
                    </h2>
                )
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);




    const [Filter, setFilter] = useState([]);
    const onChange2 = (date, dateString) => {
        setallProductStatus(false)
        setFilterByDate(true)
        setfilterByAmountDate(false)
        setFilterSearch(false)
        const d = new Date(dateString);
        d.setHours(0);
        const task = allAccount.filter((dateCreate) => {
            const b = new Date(dateCreate.createDate)
            b.setHours(0)
            if (b.getTime() === d.getTime()) {
                return dateCreate
            }
        })

        setFilter(task)
    }


    const onChange3 = (value, dateString) => {
        setallProductStatus(false)
        setFilterByDate(false)
        setfilterByAmountDate(true)
        setFilterSearch(false)
        if (value) {
            const dateBegin = new Date(dateString[0])
            dateBegin.setHours(0)
            dateBegin.setMilliseconds(0)
            dateBegin.setMinutes(0)
            dateBegin.setSeconds(0)
            const dateEnd = new Date(dateString[1])
            dateEnd.setHours(0)
            dateEnd.setMilliseconds(0)
            dateEnd.setMinutes(0)
            dateEnd.setSeconds(0)
            const tasks = allProductState.filter((dateCreate) => {
                const b = new Date(dateCreate.createDate)
                b.setHours(0)
                b.setMilliseconds(0)
                b.setMinutes(0)
                b.setSeconds(0)
                if (dateBegin.getTime() <= b.getTime() && b.getTime() <= dateEnd.getTime()) {
                    return dateCreate
                }
            })
            setFilter(tasks)
        }
    }

    const totalItemByMonth = () => {
        const currentTime = new Date();
        currentTime.setDate(1)
        currentTime.setHours(0)
        currentTime.setMilliseconds(0)
        currentTime.setMinutes(0)
        currentTime.setSeconds(0)
        const tasks = allProductState.filter((dateCreate) => {
            const b = new Date(dateCreate.createDate)
            b.setHours(0)
            b.setDate(1)
            b.setMilliseconds(0)
            b.setMinutes(0)
            b.setSeconds(0)
            if (currentTime.getTime() === b.getTime()) {
                return dateCreate
            }
        })
        return tasks.length
    }

    const totalItemByDate = () => {
        const currentTime = new Date();
        currentTime.setHours(0)
        currentTime.setMilliseconds(0)
        currentTime.setMinutes(0)
        currentTime.setSeconds(0)
        const tasks = allProductState.filter((dateCreate) => {
            const b = new Date(dateCreate.createDate)
            b.setHours(0)
            b.setMilliseconds(0)
            b.setMinutes(0)
            b.setSeconds(0)
            if (currentTime.getTime() === b.getTime()) {
                return dateCreate
            }
        })
        return tasks.length
    }


    const totalItemByYear = () => {
        const currentTime = new Date();
        currentTime.setHours(0)
        currentTime.setMilliseconds(0)
        currentTime.setMinutes(0)
        currentTime.setSeconds(0)
        currentTime.setDate(1)
        currentTime.setMonth(1)
        const tasks = allProductState.filter((dateCreate) => {
            const b = new Date(dateCreate.createDate)
            b.setHours(0)
            b.setMilliseconds(0)
            b.setMinutes(0)
            b.setSeconds(0)
            b.setDate(1)
            b.setMonth(1)
            if (currentTime.getTime() === b.getTime()) {
                return dateCreate
            }
        })
        return tasks.length
    }

    const showAllProduct = () => {
        setFilter(allProductState)
        setallProductStatus(true)
        setFilterByDate(false)
        setfilterByAmountDate(false)
        setFilterSearch(false)
    }


    // trang thai filter
    const [allProductStatus, setallProductStatus] = useState(true);
    const [FilterByDate, setFilterByDate] = useState(false);
    const [filterByAmountDate, setfilterByAmountDate] = useState(false);
    const [FilterSearch, setFilterSearch] = useState(false);

    // chuc nang tim kiem 
    const onSearch = (value) => {
        setallProductStatus(false)
        setFilterByDate(false)
        setfilterByAmountDate(false)
        setFilterSearch(true)
        const tasks = allProductState.filter((dateCreate) => {
            if (dateCreate.maSoThe === value) {
                return dateCreate
            }
        })
        setFilter(tasks)
    }

    return (
        <div className={props.isShow === true ? "ManageAccountAdmin" : "d-none"}>
            <div className="row ">
                <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div className="totalMain total">
                        <h5 className="text-center">Tổng tài khoản </h5>
                        <h3 className="text-center mt-4">{allProductState.length}</h3>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div className="totalDay total">
                        <h5 className="text-center">Tài khoản trong ngày</h5>
                        <h3 className="text-center mt-4">{totalItemByDate()}</h3>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div className="totalMonth total">
                        <h5 className="text-center">Tài khoản trong tháng</h5>
                        <h3 className="text-center mt-4">{totalItemByMonth()}</h3>
                    </div>
                </div>

                <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div className="totalYear total">
                        <h5 className="text-center">Tài khoản trong năm</h5>
                        <h3 className="text-center mt-4">{totalItemByYear()}</h3>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="totalReponsive">
                        <h5>Thống kê tài khoản</h5>
                        <h3>Trong ngày: {totalItemByDate()} </h3>
                        <h3>Trong tháng: {totalItemByMonth()}</h3>
                        <h3>Trong năm: {totalItemByYear()} </h3>
                        <h3>Tất cả sản phẩm: {allProductState.length} </h3>
                    </div>
                </div>



                <div className="sortAndFiler">
                    <div className="sortAndFilter d-flex justify-content-between">
                        <h2>Đơn hàng của bạn!</h2>
                        <div>
                            <Button className={allProductStatus === true ? "mr-3 mb-3 mt-3 activeSort" : "mr-3 mt-3 mb-3"} onClick={showAllProduct}>Tất cả sản phẩm</Button>
                            <Search className={FilterSearch === true ? "mr-3 mb-3 mt-3 activeSort" : "mr-3 mb-3 mt-3"} onSearch={onSearch} placeholder="Nhập mã số thẻ" style={{ width: 200 }} />
                            <DatePicker className={FilterByDate === true ? "mr-3 mb-3 mt-3 activeSort" : "mr-3 mt-3 mb-3"} onChange={onChange2} />
                            <RangePicker className={filterByAmountDate === true ? "activeSort mb-3 mt-3" : " mt-3 mb-3"} onChange={onChange3} />
                        </div>
                    </div>

                    <Form form={form} component={false} style={{ width: "100%" }}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={Filter}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                        />
                    </Form>
                </div>





                {/* hiển thị thông tin cá nhân */}
                <div className="fullInfor">
                    <Drawer
                        width={500}
                        title="Tất cả thông tin "
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >

                        <div className=" d-flex justify-content-center ">
                            <CloseCircleOutlined onClick={onClose} />
                        </div>
                        <div className="avtAccount d-flex justify-content-center">
                            <Image
                                cloudName="Tapdee"
                                publicId={detail.avt === '' ? 'avatar/f2sytixvkygof5kleenu' : detail.avt}
                                width="300"
                                crop="scale"
                            />
                        </div>
                        <div className="text-center mt-4 mb-4">
                            <h4 className='nameAccountAdmin'>{detail.hoTen}</h4>
                            <p className="desAccountAdmin">{detail.moTa}</p>
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            {transformedIngredients}
                        </div>

                    </Drawer>
                </div>
            </div>
        </div>
    );

}

export default ManageAccount;
