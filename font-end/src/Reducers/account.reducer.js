import * as types from '../Constants/Account.constant'

export const AccountReducer = (state = {}, action) => {
    switch (action.type) {
        // lay thong tin ca nhan 
        case types.GET_SUMARY_SUCCESS:
            return {
                sumary: action.socialMedia
            }
        case types.GET_INFOR_ACCOUNT_BY_ID_SUCCESS:
            return {
                userNFC: action.userNFC
            }
        // lay thong tin mang xa hoi
        case types.GET_SOCIAL_MEDIA_SUCCESS: {
            return {
                socialMedia: action.socialMedia
            }
        }
        case types.GET_SOCIAL_MEDIA_BY_ID_ACCOUNT_SUCCESS: {
            return {
                socialMedia: action.socialMedia
            }
        }
        case types.GET_ALL_ACCOUNT_SUCCESS: {
            return {
                allAccount: action.allAccount
            }
        }
        default:
            return state;
    }
}


export default AccountReducer;