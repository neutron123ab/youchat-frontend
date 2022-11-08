import axios from "axios";
import {useTokenStore} from "@/stores/token";

axios.interceptors.request.use((config:any) => {
    const store = useTokenStore()
    config.headers['Authorization'] = store.jwt;
    return config
})
