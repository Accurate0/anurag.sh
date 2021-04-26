<template>
  <div
    class="lowercase subpixel-antialiased flex gap-6 flex-col items-center justify-center h-screen"
  >
    <div class="capitalize text-4xl md:text-7xl">Anurag Singh</div>
    <div class="text-xs md:text-lg">
      software engineer <b class="text-2xl">∣</b> 6<sup>th</sup> Place at
      <a
        href="https://capture.tf/"
        style="font-weight: inherit; color: inherit; text-decoration: none"
        >WACTF</a
      >
      (3<sup>rd</sup> at the end of the 1<sup>st</sup>
      day)
    </div>
    <div
      class="select-none flex text-center flex-col md:gap-3 gap-6 text-4xl md:text-1xl"
    >
      <div>
        <a @click="specialToggle()">theme</a>
      </div>
      <div>
        <nuxt-link to="/projects">projects</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/blog">blog</nuxt-link>
      </div>
      <div>
        <a href="mailto:contact@anurag.sh">email</a>
      </div>
      <div>
        <a href="https://github.com/Accurate0">github</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'index',

  methods: {
    specialToggle() {
      if (this.$colorMode.preference === 'default') {
        this.$colorMode.preference = 'special'
      } else {
        this.$colorMode.preference = 'default'
      }
    },
  },
}
</script>
