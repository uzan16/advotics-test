<template>
  <v-app-bar
    app
    color="#FFFFFF"
    class="ad-appbar"
    :light="true"
    :clipped-left="true"
  >
    <div class="d-flex align-end">
      <v-img
        class="shrink mr-4 topbar-logo"
        contain
        :src="require(`@/assets/images/advotics-logo.jpg`)"
      />
      <span class="topbar-sub mr-2">powered by</span>
      <v-img
        class="shrink topbar-logo sm"
        contain
        :src="require(`@/assets/images/advotics-logo.jpg`)"
      />
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex flex-column align-center mr-4">
      <span class="text-body-2 text-username">Username</span>
      <span class="text-caption text-username">Company Name</span>
    </div>
    <v-avatar class="mr-4" color="grey lighten-1" size="32">
      <v-icon dark>mdi-account</v-icon>
    </v-avatar>
    <v-btn icon color="grey darken-2" class="mr-2" plain>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
