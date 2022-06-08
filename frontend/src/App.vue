<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col cols="12">
            <router-link to="/" class="mx-2">Home</router-link>
            <router-link to="login" class="mx-2">Login</router-link>
            <router-link to="register" class="mx-2">Register</router-link>
            <router-link to="profile" class="mx-2">Profile</router-link>
          </v-col>
        </v-row>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './views/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>
