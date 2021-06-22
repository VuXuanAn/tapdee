import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { AccountLogin } from '../../Actions/Account.action'
import Login_img from '../../assets/image/login_img.svg'
import ContactV2 from './ContactV2';

const LoginComponent = () => {
    const [change, setchange] = useState(false);
    const [isLogin, setisLogin] = useState(false);
    const dispatch = useDispatch()


    async function onFinish(values) {
        await dispatch(AccountLogin(values.username, values.password))
        setchange(!change)
    };
    useEffect(() => {
        var token = localStorage.getItem('Account') ? JSON.parse(localStorage.getItem('Account')) : {};
        if (JSON.stringify(token) === '{}') {
            setisLogin(false)
        } else {
            setisLogin(true)
        }
    }, [change]);
    const onLogin = () => {
        setchange(!change)
    }

    return (
        isLogin === false ?
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src={Login_img} alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Chào mừng đến với <strong>Tapdee</strong></h3>
                                        <p className="mb-4">Đăng nhập để thay đổi thông tin thẻ cá nhân của bạn</p>
                                    </div>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Log in
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <ContactV2 onLogin={onLogin} />
    );
}

export default LoginComponent;
