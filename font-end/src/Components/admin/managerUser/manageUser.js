import React, { useState } from 'react';
import './managerUser.css'
import AddUser from './addUser/addUser';
import ManageAccount from './ManageAccount/ManageAccount'
import { signOut } from '../../../Actions/Admin.action'
import { useDispatch } from 'react-redux';
const ManageUser = (props) => {
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(signOut());
        props.onLogin()
    }
    const [isShowAdduser, setisShowAdduser] = useState(true);
    const [isShowManageUser, setisShowManageUser] = useState(false);

    const toggle = (type) => {
        if (type === 'addUser') {
            setisShowAdduser(true)
            setisShowManageUser(false)
        } else if (type === 'manageUser') {
            setisShowAdduser(false)
            setisShowManageUser(true)
        }
    }

    return (
        <div className="MyAccount">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Tapdee</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className={isShowAdduser === true ? "mr-3 nav-item active" : 'nav-item mr-3'} onClick={() => toggle('addUser')}>
                            <a className="nav-link" href="#">Thêm tài khoản</a>
                        </li>
                        <li onClick={() => toggle('manageUser')} className={isShowManageUser === true ? "nav-item active" : 'nav-item'}>
                            <a className="nav-link" href="#">Quản lí tài khoản</a>
                        </li>
                    </ul>
                    <h className="logoutAdmin" onClick={signOutHandler}>Đăng xuất</h>
                </div>
            </nav>
            <div className="d-flex">
                <div className=" pt-7" style={{ backgroundColor: '#F5F7FF', borderRadius: '5px' }}>
                    <AddUser isShow={isShowAdduser} />
                    <ManageAccount isShow={isShowManageUser} />
                </div>
            </div>

        </div>
    );
}

export default ManageUser;
