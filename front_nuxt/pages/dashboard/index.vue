<template>
  <Dashboard />
</template>

<script lang="ts">
import Vue from 'vue'
import Dashboard from "~/components/Dashboard.vue";

export default Vue.extend({
  name: 'IndexPage',
  components: {Dashboard},
  middleware: ['auth']
})
</script>
