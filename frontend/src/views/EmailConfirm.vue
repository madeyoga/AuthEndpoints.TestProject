<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1>Verifying your email</h1>
    </v-col>
    <v-col cols="12">
      {{ uid }}... this may take a few seconds
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-progress-linear color="primary" indeterminate rounded height="6" v-if="loading"></v-progress-linear>

        <v-alert v-if="showAlert" :type="alertType" variant="outlined">
          {{ note }}
        </v-alert>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useAccountStore } from '../stores/account'
export default {
  setup() {
    const accountStore = useAccountStore()
    const route = useRoute()
    const loading = ref(true)
    const alertType = ref("info")
    const alertNote = ref("DefaultNote")
    const showAlert = ref(false)

    onMounted(async () => {
      const result = await accountStore.confirmEmailVerification(
        route.params.uid,
        route.params.token
      )

      if (result.status === 204) {
        alertType.value = "success"
        alertNote.value = "Your email is verified!"
      }
      else {
        alertType.value = "error"
        alertNote.value = "Error occured while verifying email"
      }

      console.log(result.status)
      console.log(alertType.value)

      loading.value = false
      showAlert.value = true
    })

    return {
      uid: route.params.uid,
      token: route.params.token,
      loading: loading,
      alertType: ref("info"),
      alertNote: alertNote,
      showAlert: showAlert,
    }
  },
}
</script>