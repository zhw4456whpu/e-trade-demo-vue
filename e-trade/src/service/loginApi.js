import {http} from './http'
//接口地址
var loginInterface = {url:'/api/login',type:'get'}
export default {
    login(config = {}) {
        config.urlObj = loginInterface;
        return new Promise((resolve,reject) =>{
            http(config).then(res =>{
                if(res.status =='200' || res.status == '304'){
                    resolve(res.data);
                }
            }, err =>{
                console.log(err);
            })
        })
    }    
}