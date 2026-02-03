import { registerAPI } from "@/apis";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useLoginStore = defineStore('register',()=>{

  const registerForm = reactive({
    username: '',
    password: '',
    //rePassword: ''
  })

  const judjeUsername = (username)=>{
    if(typeof username !== 'string') {
      return false
    }
    if(username.trim() === '') {
      return false
    } else {
      registerForm.username = username
      return true
    }
  }

  const judjePassword = (password)=>{
    if(typeof username !== 'string') {
      return false
    }
    if(password.trim() === '') {
      return false
    } else if(password.length < 6 || password.length > 20) {
      return false
    } else {
      registerForm.password = password
      return true
    }
  }

  const judjeRePassword = (rePassword)=>{
    if(typeof username !== 'string') {
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

  function register(params) {
    return registerAPI.registerReq(params)
  }


  return {
    registerForm,
    judjePassword,
    judjeRePassword,
    judjeUsername,
    register
  }

})
