<template>
  <div class="list-images">
    <div class="list-images__grid">
      <div
        v-for="item in images" :key="item.id"
        class="list-images__col">
        <div class="list-images__item">
          <div class="list-images__image-wrap">
            <div
              :style="{'backgroundImage': `url(${item.thumb})`}"
              class="list-images__image"></div>
          </div>
          <div
            :data-preview="item.preview"
            @click="eventPopup"
            class="list-images__preview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ListImages',

  computed: {
    ...mapState('images', [
      'images'
    ]),
  },

  methods: {
    ...mapActions('lightbox', [
      'setSrc',
      'setIsShow',
      'setIsLoad',
    ]),

    eventPopup: function (event) {
      const target = event.target;
      const src = target.attributes['data-preview'].value;

      this.setSrc(src);
      this.setIsShow(true);
      this.setIsLoad(false);

      const img = document.querySelector('.lightbox__img');

      img.addEventListener('load', () => {
        this.setIsLoad(true);
      })
    },
  }
}
</script>