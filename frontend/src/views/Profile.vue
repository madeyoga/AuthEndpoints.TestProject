<template>
  <v-row class="text-center py-8">
    <v-col cols="12">
      <h1 class="display-2 font-weight-bold">Your Profile</h1>
    </v-col>

    <v-col cols="12">
      <h2 class="headline font-weight-bold" >Identity</h2>
      <p>{{ userData.id }}</p>
    </v-col>

    <v-col cols="12">
      <h2 class="headline font-weight-bold">Email</h2>
      <p>{{ userData.email }}</p>
    </v-col>
    <v-col cols="12">
      <h2 class="headline font-weight-bold">Email confirmed</h2>
      <p>{{ userData.emailConfirmed }}</p>
    </v-col>
    <v-col cols="12">
      <h2 class="headline font-weight-bold">Two Factor Enabled</h2>
      <p>{{ userData.twoFactorEnabled }}</p>
    </v-col>
  </v-row>

  <v-row class="text-center">
    <v-col cols="12">
      <v-btn color="primary" class="mx-2" v-if="!userData.emailConfirmed">Verify email</v-btn>
      <v-btn color="primary" class="mx-2" v-if="!userData.twoFactorEnabled">Enable 2fa</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { onMounted } from 'vue'
import { ref } from '@vue/reactivity'
import { useAccountStore } from '../stores/account'

export default {
  setup() {
    const accountStore = useAccountStore()
    const userData = ref({})

    const fetchUserData = () => {
      accountStore.getUserData().then((res) => {
        userData.value = res
      })
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      userData: userData,
      fetchUserData,
    }
  },
}
</script>