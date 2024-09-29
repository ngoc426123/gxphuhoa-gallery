<template>
  <div>
    <AlbumsInfo />
    <ListImages />
  </div>
</template>

<script>
import { setMeta } from '../utils/https'
import { mapState, mapActions } from 'vuex'

import AlbumsInfo from '../modules/AlbumsInfo'
import ListImages from '../modules/ListImages'

export default {
  name: 'Detail',

  components: {
    AlbumsInfo,
    ListImages
  },

  computed: {
    ...mapState('images', [
      'name'
    ]),
  },

  methods: {
    ...mapActions('images', [
      'getAlbumsDetail',
    ]),
  },

  async created () {
    const slug = this.$route.params.slug;
    await this.getAlbumsDetail({slug});
    setMeta({
      title: this.name,
    });
  },
}
</script>