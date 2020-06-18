<template>
  <div class="callback">Loading...</div>
</template>

<script>

export default {
  name: 'Callback',
  mounted() {
    this.$store.dispatch("auth/signinRedirectCallback")
  }
}
</script>