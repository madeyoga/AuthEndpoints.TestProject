<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Register Page</h1>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
          <v-text-field type="password" v-model="password" :rules="passwordRules" label="Password" required>
          </v-text-field>
          <v-text-field type="password" v-model="confirmPassword" :rules="confirmPasswordRules" label="Confirm Password"
            required>
          </v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
            create account
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

export default {
  name: 'LoginView',
  setup() {
    return {
      accountStore: useAccountStore(),
      logo,
      valid: ref(true),
      email: ref(''),
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      username: ref(''),
      usernameRules: ref([
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 16 characters',
      ]),
      password: ref(''),
      passwordRules: ref([
        v => !!v || 'Password is required',
      ]),
      confirmPassword: ref(''),
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
      ],
    }
  },
  methods: {
    async register() {
      const userData = {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
      }
      
      await this.accountStore.register(userData)
    },
    async validate() {
      if (this.$refs.form.validate()) {
        await this.register()
      }
    },
  }
}
</script>
