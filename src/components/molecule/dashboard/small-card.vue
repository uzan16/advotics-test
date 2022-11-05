<template>
  <v-card>
    <v-card-title class="d-flex text-body-2 grey--text px-3 py-2 pr-2">
      <slot name="title" />
      <v-spacer />
      <v-btn icon small plain :ripple="false">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="px-3 pb-4">
      <slot />
    </v-card-text>
  </v-card>
</template>
