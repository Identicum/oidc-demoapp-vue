<template>
   <v-app id="inspire">
      <v-app-bar
          app
          color="amber"
          dark
        >
        <v-toolbar-title><span class="title ml-3 mr-5">Store&nbsp;<span class="font-weight-light">Online</span></span></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-on:click="signIn"> 
            <v-icon>mdi-login</v-icon>
            Log In
        </v-btn>
    </v-app-bar>
    <v-container
      class="fill-height"
      fluid>
      <v-row 
        align="center" 
        justify="center">
        <v-col class="text-center">
            <h1 class="display-1 font-weight-thin mb-4">Welcome to our online store!</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
        color="grey"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} | <a target="_blank" href="https://www.identicum.com">Identicum S.A.</a>
        </v-card-text>
      </v-card>
    </v-footer>
    </v-app>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
      icons: [
        'mdi-web',
        'mdi-github',
        'mdi-linkedin'
      ]}
  ),
  methods: {
    signIn: function () {
        this.$store.dispatch("auth/signin");
    }
  }
}
</script>