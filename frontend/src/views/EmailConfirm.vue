<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1>Verifying your email</h1>
    </v-col>
    <v-col cols="12">
      ID {{ uid }} with token {{ token }}... this may take a few seconds
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-progress-linear 
          color="primary" 
          indeterminate 
          rounded 
          height="6"
        ></v-progress-linear>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    console.log(route.params)
    return {
      uid: route.params.uid,
      token: route.params.token,
    }
  },
}
</script>