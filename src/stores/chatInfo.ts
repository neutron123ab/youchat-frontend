import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useChatInfo = defineStore('chatInfo', ()=>{
    const chatInfo = reactive([])
    const amount = ref(0)

    //存储消息记录
    function storeChatInfo(info:any) {
        let len = info.length
        let len1 = chatInfo.length
        amount.value = len

        for (let i = 0; i < len1; i++) {
            chatInfo.pop()
        }

        for (let i = 0; i < len; i++) {
            // @ts-ignore
            chatInfo.push(info[len-i-1])
        }
    }

    //清除消息记录
    function clearChatInfo(){
        let len = chatInfo.length
        for (let i = 0; i < len; i++) {
            chatInfo.pop()
        }
        amount.value = 0
    }

    return { chatInfo, amount, storeChatInfo, clearChatInfo }
})
