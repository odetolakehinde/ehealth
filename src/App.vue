<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <p class="title mt-4">ehealth4everyone</p>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/odetolakehinde/ehealth"
        target="_blank"
        text
      >
        <span class="mr-2">Go to github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <HelloWorld/> -->
      <Chart/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
    // HelloWorld: () => import('@/components/HelloWorld'),
    Chart: () => import('@/components/Chart')
  },

  data: () => ({
    //
  })
}
</script>
