<template>
  <div class="h-screen">
    <h1 class="text-7xl px-16 pt-16">{{ page.title }}</h1>
    <div class="px-16 pt-8">
      <nuxt-content :document="page" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, _error }) {
    const page = await $content(
      'blog',
      params.slug === undefined ? 'index' : params.slug
    ).fetch()
    return {
      page,
    }
  },
}
</script>
