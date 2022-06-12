// stores/counter.js
import { defineStore } from 'pinia'
import axios from "axios"

export const axiosClient = axios.create()

export const useAccountStore = defineStore('counter', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      data: JSON.parse(localStorage.getItem("userData")),
    }
  },
  actions: {
    async getUserData() {
      if (this.data !== null) {
        return this.data
      }
      return await this.fetchUserData()
    },
    async fetchUserData() {
      const url = "https://localhost:7004/users/me"
      let result

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
      console.log(result)
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
    },
    async sendEnable2faEmail() {
      const url = "https://localhost:7004/users/enable_2fa"

      let result

      try {
        result = await axios.get(url)
      } catch (error) {
        console.log(error)
        return error.response
      }

      return result
    },
    async enable2faConfirm(provider, token) {
      const data = await this.getUserData()
      const payload = {
        email: data.email,
        provider: provider,
        token: token,
      }

      const url = "https://localhost:7004/users/enable_2fa_confirm"

      let result
      try {
        result = await axios.post(url, payload)
      } catch (error) {
        return error.response
      }

      return result
    },
    async verifyAccessToken() {
      const url = "https://localhost:7004/jwt/verify"

      let result
      try {
        result = await axios.get(url)
      } catch (error) {
        return error.response
      }

      return result
    },
    async refreshAccessToken() {
      const url = "https://localhost:7004/jwt/refresh"

      const payload = {
        refreshToken: this.user.refreshToken
      }

      let result

      try {
        result = await axios.post(url, payload)
      } catch (error) {
        this.logout()
        return error.response
      }

      this.user = result.data
      localStorage.setItem("user", JSON.stringify(this.user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.accessToken}`

      return result
    }
  },
})
