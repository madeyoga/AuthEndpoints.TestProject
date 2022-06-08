<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Login Page</h1>
        <v-alert prominent type="error" variant="outlined" v-if="showAlert">
          Wrong username or password
        </v-alert>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
          <v-text-field type="password" v-model="password" :rules="passwordRules" label="Password" required>
          </v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
            Validate
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logo from '../assets/logo.svg'
import { useAccountStore } from '../stores/account'
import { ref } from 'vue'
import { router } from '../routers'

export default {
  name: 'LoginView',
  setup() {
    return {
      accountStore: useAccountStore(),
      logo,
      valid: ref(true),
      username: ref(''),
      usernameRules: ref([
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 16 characters',
      ]),
      password: ref(''),
      passwordRules: ref([
        v => !!v || 'Password is required',
      ]),
      showAlert: ref(false),
    }
  },
  methods: {
    async login() {
      const credentials = {
        username: this.username,
        password: this.password,
      }
      console.log(credentials)
      const result = await this.accountStore.login(credentials)
      if (result.status === 200) {
        router.replace("/")
        return
      }
      // notify wrong password
      this.showAlert = true
    },
    async validate() {
      if (this.$refs.form.validate()) {
        await this.login()
      }
    },
  }
}
</script>
