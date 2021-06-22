import axios from 'axios';
import * as URL from './URL';

export default function API(endpoint, method = 'GET', body, authen) {
    return axios({
        method: method,
        url: `${URL.API_TAPDEE}/${endpoint}`,
        data: body,
        headers: {
            "token": authen
        }
    }).catch(err => {
        console.log(err);
    });
};