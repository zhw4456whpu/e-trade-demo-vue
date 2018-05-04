import axios from 'axios'
import utils from '../assets/j/utils'
//发出请求
/**
 * 封装http，入参args，是一个对象
 * @param {args} args 对象，包含：
 * urlObj：链接对象，此对象又包含url（链接）和type（请求类型）
 * data：请求数据，根据请求类型转化成get请求的params或者post等请求的data;
 * params：get请求下的params
 * path：url路径的动态部分，替换url上的路径占位符
 */
export function http(args){
    let urlObj = args.urlObj || {};
    let url = urlObj.url;
    let type = urlObj.type;
    let data = args.data || {};
    let params = args.params || {};

    //args里的path表示路径
    if(utils.isObject(args.path) && args.path){
        Object.keys(args.path).forEach(key =>{
            url = url.replace(':' + key,args.path[key] ) 
        })
    }
    let config = {};
    config.url = url;
    config.method = type;
    //args里的data
    if(type == 'get'){
        config.params = data;
    }
    else{
        config.data = data;
    }

    return new Promise((resolve,reject) => {
        axios(config).then(res =>{
            if(res.status =='200'){
                resolve(res);
            }
            else{
                reject(res);
            }
        })
    })
    
}