import { registerAPI } from "@/apis";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useRegisterStore = defineStore('register',()=>{

  const registerForm = reactive({
    username: '',
    password: '',
    rePassword: ''
  })

  const judjeUsername = (username)=>{
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

  const judjeRePassword = (rePassword)=>{
    if(typeof rePassword !== 'string') {
      return false
    }
    if(rePassword.trim() === '') {
      return false
    } else if (rePassword !== registerForm.password) {
      return false
    } else {
      return true
    }
  }

  async function register(params) {
    return await registerAPI.registerReq(params)
  }


  return {
    registerForm,
    judjePassword,
    judjeRePassword,
    judjeUsername,
    register
  }

})
