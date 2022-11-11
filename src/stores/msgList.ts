import {defineStore} from "pinia";
import {reactive} from "vue";

export const useMsgList = defineStore('msgList', ()=>{
    const msgList = reactive([])
    function storeMsgList(newVal:any){
        newVal.reverse()

        // @ts-ignore
        msgList.push(newVal)
        // let len = newVal.length
        // for (let i = 0; i < len; i++) {
        //     // @ts-ignore
        //     msgList.push(newVal.pop())
        // }
        //@ts-ignore
        msgList.sort(function (a, b)
        {
            //根据消息发送时间对后端发来的数据进行排序
            // @ts-ignore
            return b[0]['sendTime'].localeCompare(a[0]['sendTime'])
        })
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
