import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const jwt = ref('')
  function storeJwt(newVal:any){
    jwt.value = newVal
  }

  return { jwt, storeJwt }
})
