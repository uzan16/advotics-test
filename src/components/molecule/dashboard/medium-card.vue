<template>
  <v-card>
    <v-card-title
      class="d-flex text-h6 grey--text text--darken-2 px-3 py-2 pr-2 title"
    >
      <slot name="title" />
      <v-spacer />
      <slot name="sub-title" />
      <v-btn icon small plain :ripple="false">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="px-3 pb-4 pt-2">
      <slot />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.title {
  text-transform: uppercase;
}
</style>
