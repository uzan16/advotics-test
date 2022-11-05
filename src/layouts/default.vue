<template>
  <v-app>
    <navigation-drawer />
    <app-bar />

    <v-main>
      <template v-if="isAppReady">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </template>
      <v-overlay :absolute="true" :value="!isAppReady" opacity="0.2">
        <v-progress-circular :size="50" color="primary" indeterminate />
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/organism/app-bar";
import NavigationDrawer from "@/components/organism/navigation-drawer";

export default {
  name: "LayoutDefault",
  components: {
    AppBar,
    NavigationDrawer
  },
  data: () => ({
    isLoading: false
  }),
  mounted() {},
  computed: {
    isAppReady: function () {
      return !this.isLoading;
    }
  },
  methods: {}
};
</script>
