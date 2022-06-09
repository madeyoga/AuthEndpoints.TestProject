<template>
  <v-row class="text-center py-8">
    <v-col cols="12">
      <h1 class="display-2 font-weight-bold">Your Profile</h1>
    </v-col>

    <v-col cols="12">
      <h2 class="headline font-weight-bold">Identity</h2>
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
      <v-btn color="primary" class="mx-2" :disabled="userData.emailConfirmed"
        @click="sendEmailVerification">Verify Email</v-btn>
      <v-btn color="primary" class="mx-2" :disabled="userData.twoFactorEnabled">Enable 2fa</v-btn>
    </v-col>
  </v-row>

  <v-col cols="12" v-if="showAlert">
    <v-alert type="info" variant="outlined">
      {{ alertNote }}
    </v-alert>
  </v-col>
</template>

<script>
import { onMounted } from 'vue'
import { ref } from '@vue/reactivity'
import { useAccountStore } from '../stores/account'

export default {
  setup() {
    const accountStore = useAccountStore()
    const userData = ref({})
    const alertNote = ref("")
    const showAlert = ref(false)

    const fetchUserData = () => {
      accountStore.getUserData().then((res) => {
        userData.value = res
      })
    }

    const sendEmailVerification = async () => {
      const res = await accountStore.sendEmailVerification()
      console.log(res)
      if (res.status === 204) {
        configureAlert(
          true,
          "Verification link has been sent to your email, please check your email and follow the verification steps."
        )
        return
      }
      configureAlert(
        true,
        "Error occured!"
      )
    }

    const configureAlert = (show, note) => {
      showAlert.value = show
      alertNote.value = note
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      userData,
      fetchUserData,
      alertNote,
      showAlert,
      configureAlert,
      sendEmailVerification
    }
  },
}
</script>