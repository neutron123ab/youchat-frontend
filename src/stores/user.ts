import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', ()=>{
    const userId = ref('')
    const username = ref('')

    function storeUserInfo(newUserId:any, newUserName:any){
        userId.value = newUserId
        username.value = newUserName
    }

    return { userId, username, storeUserInfo }
})
