<template>
  <ListAlbums />
</template>

<script>
import { setMeta } from '../utils/https'
import ListAlbums from '../modules/ListAlbums'


export default {
  name: 'Home',

  components: {
    ListAlbums
  },

  created () {
    setMeta({
      title: "Thư viện ảnh - Giáo Xứ Phú Hòa - Trang Chủ"
    });
  }
}
</script>