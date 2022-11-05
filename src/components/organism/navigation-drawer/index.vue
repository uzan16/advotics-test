<template>
  <v-navigation-drawer
    app
    permanent
    clipped
    color="white"
    :mini-variant="isMini"
    class="ad-drawer"
  >
    <template v-slot:prepend>
      <div
        class="d-flex flex-row-reverse"
        :class="{ 'justify-center': isMini }"
      >
        <v-btn
          icon
          color="grey darken-2"
          class="mt-2"
          :class="{ 'mr-3': !isMini }"
          plain
          @click="isMini = !isMini"
        >
          <v-icon>{{ isMini ? "mdi-menu" : "mdi-backburger" }}</v-icon>
        </v-btn>
      </div>
    </template>
    <div class="d-flex flex-column">
      <v-list>
        <!-- It should be iteration for menus -->
        <v-list-item
          @click="() => goTo('dashboard')"
          :class="{ 'is-selected': $route.name === 'AppDashboard' }"
        >
          <v-list-item-icon>
            <v-avatar color="white" class="nav-icon-wrapper" size="24">
              <v-img
                class="nav-icon"
                contain
                :src="require(`@/assets/icon/dashboard.png`)"
              />
            </v-avatar>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-body-2 grey--text text--darken-2"
              >Dashboard</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  components: {},
  data: () => ({
    isMini: true
  }),
  methods: {
    goTo: function (to) {
      if (!to) {
        return;
      }
      this.$router.push(to);
    }
  }
};
</script>
