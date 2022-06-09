<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col cols="12">
            <router-link to="/" class="mx-2">Home</router-link>
            <router-link to="/login" class="mx-2">Login</router-link>
            <router-link to="/register" class="mx-2">Register</router-link>
            <router-link to="/profile" class="mx-2">Profile</router-link>
            <router-link to="/" @click="logout" v-if="accountStore.isAuthenticated()" class="mx-2">Logout</router-link>
          </v-col>
        </v-row>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { router } from './routers'
import { useAccountStore } from './stores/account'
import { onMounted } from 'vue'

export default {
  name: 'App',

  setup() {
    const accountStore = useAccountStore()

    onMounted(() => {
      if (accountStore.isAuthenticated()) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accountStore.user.accessToken}`;
        return
      }
      console.log("User is null")
    })

    const logout = () => {
      accountStore.logout()
      router.replace("/login")
    }

    return {
      accountStore,
      logout
    }
  },
}
</script>
