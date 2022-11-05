<template>
  <div class="content-wrapper ma-7">
    <div class="d-flex flex-row top-section align-center">
      <slot name="top-section" />
    </div>
    <slot />
    <!-- <v-row>
      <v-col class="data-table-col">
        <slot name="data-table" />
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    pageTitle: {
      default: ""
    },
    isPageLoading: {
      default: false
    }
  }
};
</script>
