import { loginAPI } from "@/apis";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useLoginStore = defineStore('login',()=>{
  const loginForm = reactive({
    username: '',
    password: '',
  })

  const judjeUsername = (username) => {
    if(typeof username !== 'string') {
      return false
    }
    if(username.trim() === '') {
      return false
    } else {
      return true
    }
  }

  const judjePassword = (password)=>{
    if(typeof password !== 'string') {
      return false
    }
    if(password.trim() === '') {
      return false
    } else if(password.length < 6 || password.length > 20) {
      return false
    } else {
      return true
    }
  }

  async function login(params) {
    return await loginAPI.loginReq(params)
  }



  return {
    loginForm,
    judjeUsername,
    judjePassword,
    login
  }

})
