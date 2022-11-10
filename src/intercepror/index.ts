import axios from "axios";
import {useTokenStore} from "@/stores/token";

axios.interceptors.request.use((config) => {
    const store = useTokenStore()
    // @ts-ignore
    config.headers['Authorization'] = store.jwt;
    return config
})
