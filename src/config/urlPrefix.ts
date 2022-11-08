// @ts-ignore
import * as process from "process";
import axios from "axios";

if (process.env.NODE_ENV === 'development'){
    axios.defaults.baseURL = 'http://localhost:8081'
} else if(process.env.NODE_ENV === 'product'){
    axios.defaults.baseURL = '121.4.139.32:8081'
}

