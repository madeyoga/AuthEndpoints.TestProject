<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1 class="display-2 font-weight-bold">Enabling Two-Factor Authentication</h1>
    </v-col>
    <v-col cols="12">
      <p>Enter 2fa code to enable 2fa:</p>
      <OTP ref="otpRef" />
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" @click="submitForm">Enable 2FA</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { useAccountStore } from '../stores/account'
import OTP from '../components/OTP.vue'
import { ref } from '@vue/runtime-core';

export default {
  components: { OTP },
  setup() {
    const accountStore = useAccountStore();

    const otpRef = ref(null)

    const submitForm = async () => {
      let otp = ""
      for (const inp of otpRef.value.inputs) {
        otp += inp.value.value
      }
      console.log(otp)
      const res = await accountStore.enable2faConfirm("Email", otp)
      console.log(res)
    }

    return {
      otpRef,
      submitForm,
    };
  },
}
</script>