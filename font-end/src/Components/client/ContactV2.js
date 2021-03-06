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
        // del bi???t l?? c??i g?? 
        setLoading(false)
        setloadingDes(false)
        setloadingName(false)
        setloadingLock(false)
        // m???t kh???u
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
            message.error("B???n ch??? c?? th??? t???i l??n t???p JPG / PNG / JPEG!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("H??nh ???nh ph???i nh??? h??n 2MB !");
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


    // cap nhap t??n v?? m?? t??? 
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

    // ????ng m??? ch???c n??ng thay ?????i m???t kh???u
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
            message.error("M???t kh???u m???i kh??ng kh???p!")
        }
        else if (hasWhiteSpace(values.newPassword)) {
            message.error("M???t kh???u kh??ng th??? ch???a kho???ng tr???ng !")
        }
        else if (values.newPassword.length < 8) {
            message.error("????? d??i m???t kh???u m???i ph???i tr??n 8 k?? t??? !")
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

    // kh??a t??i kho???n 
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
                    ?????i m???t kh???u
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => showDrawer('lock')}>
                    {isActive === 1 ? 'Kh??a t??i kho???n' : 'M??? kh??a t??i kho???n'}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={exitAccountHandler}>
                    ????ng xu???t
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
                            modalOk='C???p Nh???t'
                            modalCancel='H???y'
                            rotate
                            modalTitle='C???p Nh???t Avatar'
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
                        placeholder="Nh???p m?? t??? v??? b???n"
                        onChange={e => setSumaryDes(e.target.value)}
                        value={SumaryDes}
                        enterButton="L??u"
                        onSearch={() => onSave("des")}
                    />
                    <div className={toggleEditDes === false ? "text-center desAccount mt-90  mb-2" : "d-none"}>
                        <span className="mr-2">{SumaryDes === '' ? 'Nh???p m?? t??? v??? b???n t???i ????y' : SumaryDes}</span>
                        {loadingDes === false ? <i class="fas fa-pen" onClick={() => settoggleEditDes(true)}></i> : <LoadingOutlined />}
                    </div>




                    <Search
                        className={toggleEditName === true ? "text-center nameAccount maxwidth  mb-5 nameAccount" : "d-none"}
                        placeholder="Nh???p t??n v??? b???n"
                        onChange={e => setSumaryName(e.target.value)}
                        value={SumaryName}
                        enterButton="L??u"
                        onSearch={() => onSave("name")}

                    />
                    <div className={toggleEditName === false ? "text-center mb-4" : 'd-none'}>
                        <span className="mr-2  nameAccount">{SumaryName === '' ? 'Nh???p t??n b???n t???i ????y' : SumaryName}</span>
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
                    title={modalKeys === "Phone" || modalKeys === "MOMO" || modalKeys === "Zalo" ? "Nh???p s??? ??i???n tho???i c???a b???n t???i ????y!" :
                        modalKeys === "Shopee" ? "Nh???p t??n c???a h??ng shoppe c???a b???n t???i ????y" :
                            modalKeys === "Instagram" || modalKeys === "Twitter" || modalKeys === "Telegram" ? `Nh???p t??n t??i kho???n ${modalKeys} c???a b???n t???i ????y` :
                                modalKeys === "Techcombank" || modalKeys === "Agribank" || modalKeys === "BIDV" || modalKeys === "MSB"
                                    || modalKeys === "PVcomBank" || modalKeys === "TPBank" || modalKeys === "VCB"
                                    || modalKeys === "VIB" || modalKeys === "VietinBank" || modalKeys === "VPBank" ? `Nh???p s??? t??i kho???n ${modalKeys} c???a b???n t???i ????y` :
                                    `Nh???p li??n k???t ?????n ${modalKeys} c???a b???n t???i ????y`}
                    visible={isModalVisible}
                    onOk={handleOk}
                    okText={loadingSocial === true ? <LoadingOutlined /> : "OK"}
                    onCancel={handleCancel}>

                    <Input
                        value={modalValues}
                        onChange={e => setmodalValues(e.target.value)}
                        placeholder={modalKeys === "Phone" || modalKeys === "MOMO" || modalKeys === "Zalo" ? "0968475***" :
                            modalKeys === "Shopee" ? "Abc..." : modalKeys === "Gmail" ? "example@gmail.com" :
                                modalKeys === "Instagram" || modalKeys === "Twitter" || modalKeys === "Telegram" ? `T??n t??i kho???n` :
                                    modalKeys === "Techcombank" || modalKeys === "Agribank" || modalKeys === "BIDV" || modalKeys === "MSB"
                                        || modalKeys === "PVcomBank" || modalKeys === "TPBank" || modalKeys === "VCB"
                                        || modalKeys === "VIB" || modalKeys === "VietinBank" || modalKeys === "VPBank" ? `356211906***` :
                                        `http://${modalKeys}...`}
                    />
                </Modal>

                <div className="DrawerTop">
                    <Drawer
                        title={change === false ? 'Thay ?????i m???t kh???u' : 'Kh??a t??i kho???n'}
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
                                rules={[{ required: true, message: 'Vui l??ng nh???p m???t kh???u c??!' }]}
                            >
                                <Input.Password
                                    placeholder="Nh???p m???t kh???u c??"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                rules={[{ required: true, message: 'Vui l??ng nh???p m???t kh???u m???i!' }]}
                            >
                                <Input.Password
                                    placeholder="X??c nh???n m???t kh???u m???i"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="newPasswordDetermine"
                                rules={[{ required: true, message: 'Vui l??ng x??c nh???n m???t kh???u m???i!' }]}
                            >
                                <Input.Password
                                    placeholder="X??c nh???n m???t kh???u m???i"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <div className="mt-3">
                                <Button type="primary" className="mr-2" htmlType="submit">?????i m???t kh???u{loadingPassword === true ? <LoadingOutlined /> : ''}</Button>
                                <Button type="danger" onClick={onClose}>H???y b???</Button>
                            </div>
                        </Form> :
                            <div className="lock">
                                <div>
                                    <h2 className="text-center mt-3">{isActive === 1 ? 'Click v??o n??t b??n d?????i n???u b???n mu???n kh??a t??i kho???n, ?????ng lo v?? b???n c?? th??? m??? n?? b???t c??? l??c n??o' : 'T??i kho???n c???a b???n ??ang kh??a, click ????? m??? t??i kho???n'}</h2>
                                    <div className="d-flex justify-content-center ">
                                        < Button
                                            type={isActive === 1 ? 'danger' : 'primary'}
                                            className="mt-3"
                                            onClick={() => lockAccount(isActive === 1 ? 0 : 1)}>
                                            {isActive === 1 ? 'Kh??a t??i kho???n' : 'M??? t??i kho???n'}
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
