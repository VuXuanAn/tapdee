import * as types from '../Constants/Account.constant'
import API from './../axios/API'
import { message, notification } from 'antd';



// đăng kí 
export const createNewAccount = (maSoThe, matKhau, token) => async (dispatch) => {
    dispatch({
        type: types.ACCOUNT_CREATE_REQUEST,
        payload: { maSoThe, matKhau, token }
    });
    try {
        const { data } = await API('account/register', 'POST', { maSoThe, matKhau }, `Bearer ${token}`);
        dispatch({
            type: types.ACCOUNT_CREATE_SUCCESS,
        });

        if (data.Error) {
            message.error(data.Error)
        } else {
            message.success("Đăng kí thành công")
        }


    } catch (Error) {
        dispatch({
            type: types.ACCOUNT_CREATE_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.info('Không thành công! vui lòng thử lại ');
    }
}


// chúc năng đăng nhập
export const AccountLogin = (maSoThe, matKhau) => async (dispatch) => {
    dispatch({
        type: types.ACCOUNT_LOGIN_REQUEST,
        payload: { maSoThe, matKhau }
    });
    try {
        const { data } = await API('account/login', 'POST', { maSoThe, matKhau }, null);
        dispatch({
            type: types.ACCOUNT_LOGIN_SUCCESS,
        });
        message.success('Xin chào ' + maSoThe);
        localStorage.setItem('Account', JSON.stringify(data))
    } catch (Error) {
        dispatch({
            type: types.ACCOUNT_LOGIN_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error("Đăng nhập thất bại! vui lòng thử lại");
    }
}

//=================================================token=======================================
// lấy full mô tả từ 1 token 
export const getInforAccount = (token) => async (dispatch) => {
    dispatch({
        type: types.GET_INFOR_ACCOUNT_REQUEST,
        payload: { token }
    });
    try {
        const { data } = await API('account/getSumary', 'POST', null, `Bearer ${token}`);
        dispatch({
            type: types.GET_INFOR_ACCOUNT_SUCCESS,
            user: data
        });
    } catch (Error) {
        dispatch({
            type: types.GET_INFOR_ACCOUNT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}
// cập nhạp avt tài khoản 
export const updateInforAccountAvt = (token, avt) => async (dispatch) => {
    dispatch({
        type: types.UPDATE_INFOR_ACCOUNT_AVT_REQUEST,
        payload: { token, avt }
    });
    try {
        const { data } = await API('account/updateAccount', 'POST', avt, `Bearer ${token}`);
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_AVT_SUCCESS,
            user: data
        });
        message.success('Cập nhập ảnh đại diện thành công!');
    } catch (Error) {
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_AVT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error("Cập nhật ảnh thất bại, vui lòng thử lại!");
    }
}
// cập nhâp social Media
export const updateSocialMedia = (token, modalKey, modalValue) => async (dispatch) => {
    dispatch({
        type: types.UPDATE_INFOR_ACCOUNT_REQUEST,
        payload: { token, modalKey, modalValue }
    });
    try {
        const { data } = await API('account/updateSocialMedia', 'POST', { modalKey, modalValue }, `Bearer ${token}`);
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_SUCCESS,
            user: data
        });
        message.success(`Cập nhập tài khoản ${modalKey} thành công!`);

    } catch (Error) {
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}

// cập nhật ho ten 
export const updateInforAccountName = (token, hoTen) => async (dispatch) => {
    dispatch({
        type: types.UPDATE_INFOR_ACCOUNT_REQUEST,
        payload: { token, hoTen }
    });
    try {
        const { data } = await API('account/updateSumary', 'POST', { hoTen }, `Bearer ${token}`);
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_SUCCESS,
            user: data
        });
        if (data.error) {
            message.error(data.error)
        } else {
            message.success(data.message)
        }
    } catch (Error) {
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}
// cap nhap mo ta 
export const updateInforAccountDes = (token, moTa) => async (dispatch) => {
    dispatch({
        type: types.UPDATE_INFOR_ACCOUNT_REQUEST,
        payload: { token, moTa }
    });
    try {
        const { data } = await API('account/updateSumaryDes', 'POST', { moTa }, `Bearer ${token}`);
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_SUCCESS,
            user: data
        });
        if (data.error) {
            message.error(data.error)
        } else {
            message.success(data.message)
        }
    } catch (Error) {
        dispatch({
            type: types.UPDATE_INFOR_ACCOUNT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}
// lấy mạng xã hội
export const getSocialMedia = (token) => async (dispatch) => {
    dispatch({
        type: types.GET_SOCIAL_MEDIA_REQUEST,
        payload: { token }
    });
    try {
        const { data } = await API('account/getSocialMedia', 'POST', null, `Bearer ${token}`);
        dispatch({
            type: types.GET_SOCIAL_MEDIA_SUCCESS,
            socialMedia: data
        });
    } catch (Error) {
        dispatch({
            type: types.GET_SOCIAL_MEDIA_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}
// lấy tên mô tả
export const getSumary = (token) => async (dispatch) => {
    dispatch({
        type: types.GET_SUMARY_REQUEST,
        payload: { token }
    });
    try {
        const { data } = await API('account/getSumary', 'POST', null, `Bearer ${token}`);
        dispatch({
            type: types.GET_SUMARY_SUCCESS,
            socialMedia: data
        });
    } catch (Error) {
        dispatch({
            type: types.GET_SUMARY_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}



//====================================URL=======================================
// lấy tài khoản trên thanh URL 
export const getInforAccountById = (maSoThe) => async (dispatch) => {
    dispatch({
        type: types.GET_INFOR_ACCOUNT_BY_ID_REQUEST,
        payload: { maSoThe }
    });
    try {
        const { data } = await API('account/getUserByIdCard', 'POST', { maSoThe }, null);
        dispatch({
            type: types.GET_INFOR_ACCOUNT_BY_ID_SUCCESS,
            userNFC: data
        });
    } catch (Error) {
        dispatch({
            type: types.GET_INFOR_ACCOUNT_BY_ID_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}
// lay thong tin mang xa hoi nguoi dung qua ma so the 
export const getSocialMediaByIdCard = (maSoThe) => async (dispatch) => {
    dispatch({
        type: types.GET_SOCIAL_MEDIA_BY_ID_ACCOUNT_REQUEST,
        payload: { maSoThe }
    });
    try {
        const { data } = await API('account/getSocialMediaByIdCard', 'POST', { maSoThe }, null);
        dispatch({
            type: types.GET_SOCIAL_MEDIA_BY_ID_ACCOUNT_SUCCESS,
            socialMedia: data
        });
    } catch (Error) {
        dispatch({
            type: types.GET_SOCIAL_MEDIA_BY_ID_ACCOUNT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra vui lòng thử lại!');
    }
}
// dang xuat
export const signOut = () => (dispatch) => {
    localStorage.removeItem('Account')
    dispatch({
        type: types.LOGOUT_ACCOUNT
    });

}


// Cập nhật mật khẩu
export const changePassword = (oldPassword, newPassword, token) => async (dispatch) => {
    dispatch({
        type: types.CHANGE_PASSWORD_REQUEST,
        payload: { oldPassword, newPassword, token }
    });
    try {
        const { data } = await API('account/changePassword', 'POST', { oldPassword, newPassword }, `Bearer ${token}`);
        dispatch({
            type: types.CHANGE_PASSWORD_SUCCESSFULLY,
        });
        if (data.error) {
            message.error(data.error)
        } else {
            message.success(data.message)
        }
    } catch (Error) {
        dispatch({
            type: types.CHANGE_PASSWORD_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Thay đổi mật khẩu thất bại, vui lòng thử lại!');
    }
}
// mo the va khoa the 
export const activeAndDisable = (isActive, token) => async (dispatch) => {
    dispatch({
        type: types.OPEN_AND_CLOSE_CARD_REQUEST,
        payload: { isActive, token }
    });
    try {
        await API('account/active', 'POST', { isActive }, `Bearer ${token}`);
        dispatch({
            type: types.OPEN_AND_CLOSE_CARD_SUCCESS,
        });
        message.success('Thành công !');
    } catch (Error) {
        dispatch({
            type: types.OPEN_AND_CLOSE_CARD_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Thất bại !');
    }
}




// phan admin 
export const getAllAccount = (token) => async (dispatch) => {
    dispatch({
        type: types.GET_ALL_ACCOUNT_REQUEST,
        payload: { token }
    });
    try {
        const { data } = await API('account/admin/getAllAccount', 'POST', null, `Bearer ${token}`);
        dispatch({
            type: types.GET_ALL_ACCOUNT_SUCCESS,
            allAccount: data
        });
    } catch (Error) {
        dispatch({
            type: types.GET_INFOR_ACCOUNT_BY_ID_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
}


export const deleteAccount = (token, maSoThe) => async (dispatch) => {
    dispatch({
        type: types.DELETE_ACCOUNT_REQUEST,
        payload: { token, maSoThe }
    });
    try {
        const { data } = await API('account/admin/deleteAccount', 'POST', { maSoThe }, `Bearer ${token}`);
        dispatch({
            type: types.DELETE_ACCOUNT_SUCCESS,
            allAccount: data
        });
        message.success('Xóa thành công!');
    } catch (Error) {
        dispatch({
            type: types.DELETE_ACCOUNT_FAIL,
            payload: Error.response && Error.response.data.message ?
                Error.response.data.message :
                Error.message,
        })
        message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
}
