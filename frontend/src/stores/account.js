// stores/counter.js
import { defineStore } from 'pinia'
import axios from "axios"
import { router } from "../routers/index"

export const useAccountStore = defineStore('counter', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    }
  },
  actions: {
    isAuthenticated(){
      return this.user != null
    },
    async loadToken() {

    },
    async register(userData) {
      const url = "https://localhost:7004/users"

      try {
        let result = await axios.post(url, userData)
      } catch (error) {
        console.log(error)
        return false
      }

      console.log(result)

      router.replace("login")

      return true
    },
    async login(credentials) {
      const url = "https://localhost:7004/jwt/create"

      let result
      try {
        result = await axios.post(url, credentials)
      } catch (error) {
        console.log(error)
        return error
      }

      this.user = result.data
      console.log(this.user)

      localStorage.setItem("user", JSON.stringify(this.user))
      
      router.replace("home")

      return this.user
    },
    logout() {
      this.user = null
      localStorage.removeItem("user")
    },
  },
})
