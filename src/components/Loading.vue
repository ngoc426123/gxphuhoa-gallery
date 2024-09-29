<template>
  <div class="loader" :class="{'active': isShow}">
    <div class="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',

  props: ['isShow'],
}
</script>