import * as types from '../Constants/Admin.constant'
import API from './../axios/API'
import { message } from 'antd';

export const singIn = (userName, userPassword) => async (dispatch) => {
    dispatch({
        type: types.ADMIN_LOGIN_REQUEST,
        payload: { userName, userPassword }
    });
    try {
        const { data } = await API('admin/login', 'POST', { userName, userPassword }, null);
        dispatch({
            type: types.ADMIN_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('ADMIN', JSON.stringify(data))
        message.success('Xin chào' + userName);
    } catch (Error) {
        dispatch({
            type: types.ADMIN_LOGIN_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Đăng nhập thất bại, vui lòng thử lại!');
    }
}

export const signOut = () => (dispatch) => {
    localStorage.removeItem('ADMIN')
    dispatch({
        type: types.ADMIN_LOGOUT
    });
}