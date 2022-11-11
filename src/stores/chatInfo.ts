import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useChatInfo = defineStore('chatInfo', ()=>{
    const chatInfo = ref()

    function storeChatInfo(info:any) {
        chatInfo.value = info
    }

    return { chatInfo, storeChatInfo }
})
