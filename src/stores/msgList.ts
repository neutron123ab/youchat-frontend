import {defineStore} from "pinia";
import {reactive} from "vue";

export const useMsgList = defineStore('msgList', ()=>{
    const msgList = reactive([])
    function storeMsgList(newVal:any){
        // @ts-ignore
        msgList.push(newVal)
    }

    function clearMsgList(){
        // @ts-ignore
        let len = msgList.length
        for (let i = 0; i < len; i++) {
            msgList.pop()
        }
    }

    return { msgList, storeMsgList, clearMsgList }
})
