<template>
  <div id="app">
    <Header />
    <div class="constrain">
      <router-view/>
    </div>
    <Footer />
    <LightBox />
  </div>
</template>

<script>
import Header from './modules/Header'
import LightBox from './modules/LightBox'
import Footer from './modules/Footer'

export default {
  name: 'App',

  components: {
    Header,
    LightBox,
    Footer
  }
}
</script>
