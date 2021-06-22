import React, { useEffect, useState } from 'react';
import { Modal, Input, Upload, message, Menu, Dropdown, Drawer, Button, Form, Spin } from 'antd';
import './ContactV2.css'
import { Image } from 'cloudinary-react';
import ImgCrop from 'antd-img-crop';
import anhBia from './../../assets/image/socialMeadia/anhBia.png'
import { useDispatch, useSelector } from 'react-redux';
import {
    getSumary,
    getSocialMedia,
    updateSocialMedia,
    updateInforAccountName,
    updateInforAccountAvt,
    signOut,
    changePassword,
    activeAndDisable,
    updateInforAccountDes
} from '../../Actions/Account.action'
import { EditOutlined, PlusOutlined, CameraOutlined, LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone, SyncOutlined } from '@ant-design/icons';
const { Search } = Input;


const ContactV2 = (props) => {
    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalKeys, setmodalkeys] = useState('');//key
    const [modalValues, setmodalValues] = useState('');

    const showModal = (igKey, social) => {
        setIsModalVisible(true);
        setmodalkeys(igKey)
        setmodalValues(social)
    };
    const token = localStorage.getItem('Account') ? JSON.parse(localStorage.getItem('Account')) : {};
    //  lay du lieu tren API sau do lua vao store 


    const dispatch = useDispatch();
    const [Update, setUpdate] = useState(true);

    useEffect(() => {
        var token = localStorage.getItem('Account') ? JSON.parse(localStorage.getItem('Account')) : {};
        if (JSON.stringify(token) !== '{}') {
            dispatch(getSumary(token.token))
            dispatch(getSocialMedia(token.token))
        } else {
            alert("loi! vui long thu lai ")
        }
    }, [Update]);

    // fetch du lieu tren store
    const Account1 = useSelector(state => state.Account)
    const { sumary, socialMedia } = Account1

    const [SocialMedia, setSocialMedia] = useState({});
    const [SumaryName, setSumaryName] = useState('');

    const [SumaryDes, setSumaryDes] = useState('');
    const [avt, setavt] = useState('');
    useEffect(() => {
        if (socialMedia) {
            setSocialMedia(socialMedia[0])
        }
        if (sumary) {
            setSumaryName(sumary[0].hoTen)
            setSumaryDes(sumary[0].moTa)
            setavt(sumary[0].avt)
            setisActive(sumary[0].isActive)
        }
        // update Social Media
        setloadingSocial(false)
        setIsModalVisible(false);
        // del biết là cái gì 
        setLoading(false)
        setloadingDes(false)
        setloadingName(false)
        setloadingLock(false)
        // mật khẩu
        setloadingPassword(false)
        onClose()

    }, [socialMedia, sumary]);

    // cap nhap social media 
    const [loadingSocial, setloadingSocial] = useState(false);
    async function handleOk() {
        setloadingSocial(true);
        var token = localStorage.getItem('Account') ? JSON.parse(localStorage.getItem('Account')) : {};
        await dispatch(updateSocialMedia(token.token, modalKeys, modalValues))
        setUpdate(!Update)

    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // upload hinh anh 
    const [Loading, setLoading] = useState(false);
    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg"

        if (!isJpgOrPng) {
            message.error("Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Hình ảnh phải nhỏ hơn 2MB !");
        }
        if (isLt2M && isJpgOrPng) {
            const formData = new FormData();
            formData.append("avatar", file);
            updateAvt(token.token, formData)
            setLoading(true)
        }
        return isJpgOrPng;
    };

    async function updateAvt(token, smt) {
        await dispatch(updateInforAccountAvt(token, smt))
        setUpdate(!Update);
    }


    // cap nhap tên và mô tả 
    const [loadingName, setloadingName] = useState(false);
    const [loadingDes, setloadingDes] = useState(false);
    async function updateNameHandler() {
        setloadingName(true)
        await dispatch(updateInforAccountName(token.token, SumaryName))
        setUpdate(!Update);
    }
    async function updateDesHandler() {
        setloadingDes(true)
        await dispatch(updateInforAccountDes(token.token, SumaryDes))
        setUpdate(!Update);
    }

    // đóng mở chức năng thay đổi mật khẩu
    const [visible, setvisible] = useState(false);
    const [loadingPassword, setloadingPassword] = useState(false);
    const [loadingLock, setloadingLock] = useState(false);

    const showDrawer = (type) => {
        if (type === 'lock') {
            setvisible(true)
            setchange(true)
        } else {
            setvisible(true)
            setchange(false)
        }

    };

    const onClose = () => {
        setvisible(false)
    };
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }
    const onFinish = (values) => {
        if (values.newPassword !== values.newPasswordDetermine) {
            message.error("Mật khẩu mới không khớp!")
        }
        else if (hasWhiteSpace(values.newPassword)) {
            message.error("Mật khẩu không thể chứa khoảng trắng !")
        }
        else if (values.newPassword.length < 8) {
            message.error("Độ dài mật khẩu mới phải trên 8 kí tự !")
        }
        else {
            setloadingPassword(true)
            changePasswod(values.oldPassword, values.newPassword, token.token)
        }
    }
    async function changePasswod(oldPass, newPass, token) {
        await dispatch(changePassword(oldPass, newPass, token))
        setUpdate(!Update);
    }



    // thoat tai khaon
    const exitAccountHandler = () => {
        dispatch(signOut())
        props.onLogin()
    }

    // khóa tài khoản 
    const [isActive, setisActive] = useState(true);
    async function lockAccount(status) {
        setloadingLock(true)
        await dispatch(activeAndDisable(status, token.token))
        setUpdate(!Update);
        onClose()
    }


    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={() => showDrawer('change')}>
                    Đổi mật khẩu
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => showDrawer('lock')}>
                    {isActive === 1 ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={exitAccountHandler}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    );
    const [change, setchange] = useState(false);



    // open and close edit name and descreption
    const [toggleEditName, settoggleEditName] = useState(false);
    const [toggleEditDes, settoggleEditDes] = useState(false);

    const onSave = (type) => {
        if (type === "name") {
            settoggleEditName(false)
            updateNameHandler()
        } else if (type === "des") {
            settoggleEditDes(false)
            updateDesHandler()
        }
    }

    return (
        isActive === 1 || isActive === 0 ?
            <div>
                <div className="imageRetargular">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <div className="settingIcon"><i class="fas fa-cog"></i></div>
                    </Dropdown>

                    <img src={anhBia} className="anhBia" />
                    <h2 className="logo">TapDee</h2>
                    <Image
                        className={avt === '' ? "avtImg dash" : "avtImg"}
                        cloudName="Tapdee"
                        publicId={avt === '' ? 'avatar/f2sytixvkygof5kleenu' : avt}
                        width="300"
                        crop="scale"
                    />
                    <div className="group-upload-image">
                        <ImgCrop
                            modalOk='Cập Nhật'
                            modalCancel='Hủy'
                            rotate
                            modalTitle='Cập Nhật Avatar'
                        >
                            <Upload
                                beforeUpload={beforeUpload}
                                name="avatar"
                                fileList={[]}
                                accept=".jpg, .jpeg, .png"
                                listType="listTyp"
                                className="avataSetting"
                            >
                                {Loading == true ? <SyncOutlined spin /> : <CameraOutlined type="upload" />}
                            </Upload>
                        </ImgCrop>
                    </div>
                </div>





                <div className="editName mb-3">
                    <Search
                        className={toggleEditDes === true ? "text-center mt-90 mb-3 maxwidth desAccount" : "d-none"}
                        placeholder="Nhập mô tả về bạn"
                        onChange={e => setSumaryDes(e.target.value)}
                        value={SumaryDes}
                        enterButton="Lưu"
                        onSearch={() => onSave("des")}
                    />
                    <div className={toggleEditDes === false ? "text-center desAccount mt-90  mb-2" : "d-none"}>
                        <span className="mr-2">{SumaryDes === '' ? 'Nhập mô tả về bạn tại đây' : SumaryDes}</span>
                        {loadingDes === false ? <i class="fas fa-pen" onClick={() => settoggleEditDes(true)}></i> : <LoadingOutlined />}
                    </div>




                    <Search
                        className={toggleEditName === true ? "text-center nameAccount maxwidth  mb-5 nameAccount" : "d-none"}
                        placeholder="Nhập tên về bạn"
                        onChange={e => setSumaryName(e.target.value)}
                        value={SumaryName}
                        enterButton="Lưu"
                        onSearch={() => onSave("name")}

                    />
                    <div className={toggleEditName === false ? "text-center mb-4" : 'd-none'}>
                        <span className="mr-2  nameAccount">{SumaryName === '' ? 'Nhập tên bạn tại đây' : SumaryName}</span>
                        {loadingName === false ? <i class="fas fa-pen" onClick={() => settoggleEditName(true)}> </i> : <LoadingOutlined />}
                    </div>


                </div>













                <div className="socialMedia ">
                    {Object.keys(SocialMedia)
                        .map(igKey => {
                            return [...Array(SocialMedia[igKey])].map((social) => {
                                return (
                                    <div className={social !== "" ? `iconSocialMedia mt-2 ${igKey}` : "d-none"} onClick={() => showModal(igKey, social)}>
                                        <EditOutlined />
                                    </div>
                                )
                            });
                        })
                    }
                    {Object.keys(SocialMedia)
                        .map(igKey => {
                            return [...Array(SocialMedia[igKey])].map((social) => {
                                return (
                                    <div className={social === "" ? `iconSocialMedia mt-2 ${igKey}` : "d-none"} onClick={() => showModal(igKey, social)}>
                                        <div className="empty"></div>
                                        <PlusOutlined />
                                    </div>
                                )
                            });
                        })
                    }
                </div>
                <Modal
                    title={modalKeys === "Phone" || modalKeys === "MOMO" || modalKeys === "Zalo" ? "Nhập số điện thoại của bạn tại đây!" :
                        modalKeys === "Shopee" ? "Nhập tên cửa hàng shoppe của bạn tại đây" :
                            modalKeys === "Instagram" || modalKeys === "Twitter" || modalKeys === "Telegram" ? `Nhập tên tài khoản ${modalKeys} của bạn tại đây` :
                                modalKeys === "Techcombank" || modalKeys === "Agribank" || modalKeys === "BIDV" || modalKeys === "MSB"
                                    || modalKeys === "PVcomBank" || modalKeys === "TPBank" || modalKeys === "VCB"
                                    || modalKeys === "VIB" || modalKeys === "VietinBank" || modalKeys === "VPBank" ? `Nhập số tài khoản ${modalKeys} của bạn tại đây` :
                                    `Nhập liên kết đến ${modalKeys} của bạn tại đây`}
                    visible={isModalVisible}
                    onOk={handleOk}
                    okText={loadingSocial === true ? <LoadingOutlined /> : "OK"}
                    onCancel={handleCancel}>

                    <Input
                        value={modalValues}
                        onChange={e => setmodalValues(e.target.value)}
                        placeholder={modalKeys === "Phone" || modalKeys === "MOMO" || modalKeys === "Zalo" ? "0968475***" :
                            modalKeys === "Shopee" ? "Abc..." : modalKeys === "Gmail" ? "example@gmail.com" :
                                modalKeys === "Instagram" || modalKeys === "Twitter" || modalKeys === "Telegram" ? `Tên tài khoản` :
                                    modalKeys === "Techcombank" || modalKeys === "Agribank" || modalKeys === "BIDV" || modalKeys === "MSB"
                                        || modalKeys === "PVcomBank" || modalKeys === "TPBank" || modalKeys === "VCB"
                                        || modalKeys === "VIB" || modalKeys === "VietinBank" || modalKeys === "VPBank" ? `356211906***` :
                                        `http://${modalKeys}...`}
                    />
                </Modal>

                <div className="DrawerTop">
                    <Drawer
                        title={change === false ? 'Thay đổi mật khẩu' : 'Khóa tài khoản'}
                        placement="top"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        key="top"
                        height={310}
                    >
                        {change === false ? <Form
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="oldPassword"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                            >
                                <Input.Password
                                    placeholder="Nhập mật khẩu cũ"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                            >
                                <Input.Password
                                    placeholder="Xác nhận mật khẩu mới"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="newPasswordDetermine"
                                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}
                            >
                                <Input.Password
                                    placeholder="Xác nhận mật khẩu mới"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <div className="mt-3">
                                <Button type="primary" className="mr-2" htmlType="submit">Đổi mật khẩu{loadingPassword === true ? <LoadingOutlined /> : ''}</Button>
                                <Button type="danger" onClick={onClose}>Hủy bỏ</Button>
                            </div>
                        </Form> :
                            <div className="lock">
                                <div>
                                    <h2 className="text-center mt-3">{isActive === 1 ? 'Click vào nút bên dưới nếu bạn muốn khóa tài khoản, đừng lo vì bạn có thể mở nó bất cứ lúc nào' : 'Tài khoản của bạn đang khóa, click để mở tài khoản'}</h2>
                                    <div className="d-flex justify-content-center ">
                                        < Button
                                            type={isActive === 1 ? 'danger' : 'primary'}
                                            className="mt-3"
                                            onClick={() => lockAccount(isActive === 1 ? 0 : 1)}>
                                            {isActive === 1 ? 'Khóa tài khoản' : 'Mở tài khoản'}
                                            {loadingLock === true ? <LoadingOutlined /> : ''}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    </Drawer>
                </div>
            </div> :
            <Spin tip="Loading...">
                <div className="spinner mb-5">
                    <h2>TapDee</h2>
                    <p>Smart Card -  Smart Life</p>
                </div>
            </Spin>
    );
}

export default ContactV2;
