import axios from "axios";
import Url from "../../../support/url";

export const userLogin = (data) => {
    console.log(`yang login yaaa`, data)
    return{
        type:"LOGIN_USER",
        payload: axios.post(Url + `user/login`, data, {
            headers:{
                'authorization': 'ulalalalala',
                'x-token': 'token',
                'x-user': '1'
              }
        }).then(res => {
            const token = res.data.token
            const id_user = res.data.id_user
            const nama_user = res.data.nama_user
            const status = res.data.status
            const level = res.data.level
            localStorage.setItem('token', token)
            localStorage.setItem('id_user', id_user)
            localStorage.setItem('nama_user', nama_user)
            localStorage.setItem('status', status)
            localStorage.setItem('level', level)
        }),
        // headers:{
        //     "Content-Type": "application/json",
        //     Accept: "application/json"
        // }
    }
}