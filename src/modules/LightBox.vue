<template>
  <div class="lightbox" :class="{'active': isShow}">
    <div class="lightbox__outer" :class="{'active': isLoad}">
      <div class="lightbox__inner"><img class="lightbox__img" :src="src" alt=""/></div>
      <div class="lightbox__close" @click="eventClickOutSide"></div>
    </div>
    <div class="lightbox__loading" :class="{'active': !isLoad}">
      <img src="../assets/images/loading.svg" alt="">
    </div>
    <div class="lightbox__overlay" @click="eventClickOutSide"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LightBox',

  computed: {
    ...mapState('lightbox', [
      'src',
      'isShow',
      'isLoad'
    ]),
  },

  methods: {
    ...mapActions('lightbox', [
      'setSrc',
      'setIsShow',
      'setIsLoad'
    ]),

    eventClickOutSide: function () {
      this.setIsShow(false);
      this.setIsLoad(false);
      this.setSrc('');
    }
  }
}
</script>