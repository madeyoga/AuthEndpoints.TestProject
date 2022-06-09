// stores/counter.js
import { defineStore } from 'pinia'
import axios from "axios"

export const useAccountStore = defineStore('counter', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      data: JSON.parse(localStorage.getItem("userData")),
    }
  },
  actions: {
    async getUserData() {
      const url = "https://localhost:7004/users/me"
      let result
      
      console.log(this.data)

      if (this.data !== null) {
        return this.data
      }

      try {
        result = await axios.get(url)
      } catch (error) {
        return error.response
      }

      this.data = result.data
      localStorage.setItem("userData", JSON.stringify(this.data))

      return result.data
    },
    isAuthenticated() {
      return this.user != null
    },
    async register(userData) {
      const url = "https://localhost:7004/users"
      
      let result
      try {
        result = await axios.post(url, userData)
      } catch (error) {
        console.log(error)
        return error.response
      }

      return result
    },
    async login(credentials) {
      const url = "https://localhost:7004/jwt/create"

      let result
      try {
        result = await axios.post(url, credentials)
      } catch (error) {
        console.log(error.response)
        return error.response
      }

      this.user = result.data
      localStorage.setItem("user", JSON.stringify(this.user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.accessToken}`

      return result
    },
    logout() {
      this.user = null
      localStorage.removeItem("user")
      localStorage.removeItem("userData")
      delete axios.defaults.headers.common['Authorization'];
    },
    async sendEmailVerification() {
      const url = "https://localhost:7004/users/verify_email"

      let result
      try {
        result = await axios.get(url)
      } catch (error) {
        console.log(error.response)
        return error.response
      }

      return result
    },
    async confirmEmailVerification(uid, token) {
      const payload = {
        identity: uid,
        token: token,
      }

      const url = "https://localhost:7004/users/verify_email_confirm"

      let result

      try {
        result = await axios.post(url, payload)
      } catch (error) {
        return error.response
      }

      return result
    }
  },
})
