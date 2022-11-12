import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useReceivedMsgStore = defineStore('receivedMsgStore', ()=>{
    const receivedMsg = ref('')
    const message = reactive({
        userId: '',
        username: '',
        content: ''
    })

    function storeMsg(newVal:any){
        receivedMsg.value = newVal
    }

    function processMsg(){
        let msgArrays = receivedMsg.value.toString().split('-');
        message.userId = msgArrays[0]
        message.username = msgArrays[1]
        message.content = msgArrays[2]
    }

    return { receivedMsg, message, storeMsg, processMsg }
})
