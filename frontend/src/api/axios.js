import axios from "axios"
import { useAccountStore } from "../stores/account"

axios.interceptors.request.use(
  async (request) => {
    const accountStore = useAccountStore()

    if (!accountStore.isAuthenticated()) {
      return request
    }

    request.headers.Authorization = `Bearer ${accountStore.user.accessToken}`
    console.log("Add token to header")

    return request
  }
)

axios.interceptors.response.use(
  response => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }

    if (error.response.status !== 403) {
      return Promise.reject(error)
    }

    const originalRequest = error.config;

    // Check if request is a retry
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    const accountStore = useAccountStore()

    // if response is 403 unauthorized
    // then try verify the access token
    const verifyResult = await accountStore.verifyAccessToken()

    // if access token is not expired
    if (verifyResult.status === 200) {
      return Promise.reject(error)
    }

    // if access token is expired
    // then try refresh the access token
    const refreshResult = await accountStore.refreshAccessToken()

    // if refresh token is not expired
    if (refreshResult.status === 200) {
      return Promise.reject(error)
    }

    // if refresh token is also expired, then logout.
    console.log("Expired session, please login again")
    accountStore.logout()

    return Promise.reject(error)
  }
)
