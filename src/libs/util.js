import axios from 'axios';
import env from '../config/env';
import config from '../config/config';

let util = {};

util.title = function(title) {
    title = title ? title + ' - U行政' : 'U行政';
    window.document.title = title;
};



if( env === 'development' ){

}else if(env === 'production' ){

}


util.ajax = axios.create({
    baseURL: config.ajaxUrl,
    timeout: 60000
});



export default util;