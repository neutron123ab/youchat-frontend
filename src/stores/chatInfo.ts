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

    function addChatInfo(newVal:any){
        // @ts-ignore
        chatInfo.push(newVal)
    }

    //清除消息记录
    function clearChatInfo(){
        let len = chatInfo.length
        for (let i = 0; i < len; i++) {
            chatInfo.pop()
        }
        amount.value = 0
    }

    //获取群组id(用户好友id或群聊id)
    function chatId(){
        // @ts-ignore
        if(chatInfo[0].hasOwnProperty('userFriendsId')){
            console.log(chatInfo[0]['userFriendsId'])
            return 's' + chatInfo[0]['userFriendsId']
        }
        return 'g' + chatInfo[0]['userGroupId']
    }

    return { chatInfo, amount, storeChatInfo, clearChatInfo, chatId, addChatInfo }
})
