import {defineStore} from "pinia";
import {ref} from "vue";

export const useWebsocketStore = defineStore('websocket', ()=>{
    let websocket = ref<WebSocket>()
    const state = ref(false)

    function storeWebsocket(newVal:WebSocket){
        websocket.value = newVal
        console.log('status: '+websocket.value.readyState)
        state.value = true

    }

    return { websocket, state, storeWebsocket }
})
