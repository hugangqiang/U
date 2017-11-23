import axios from 'axios';
import env from '../config/env';
import config from '../config/config';

let util = {};

util.title = function(title) {
    title = title ? title + ' - U行政' : 'U行政';
    window.document.title = title;
};



if( env === 'development' ){
	//config.ajaxUrl = 'http://192.168.1.21:8080';
	console.log("开发环境。" + config.ajaxUrl);
	
}else if(env === 'production' ){
	//config.ajaxUrl = 'http://120.76.242.202:8080/api-daps';
	console.log("正式环境。" + config.ajaxUrl);
}


util.ajax = axios.create({
    baseURL: config.ajaxUrl,
    timeout: 30000
});



export default util;