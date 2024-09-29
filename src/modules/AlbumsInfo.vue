<template>
  <div class="albums-info">
    <div class="albums-info__name"><h1>{{name}}</h1></div>
    <div class="albums-info__attr">
      <ul>
        <li>{{sl}}</li>
        <li>{{date}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AlbumsInfo',

  computed: {
    ...mapState('images', [
      'name',
      'sl',
      'date'
    ]),
  },
}
</script>