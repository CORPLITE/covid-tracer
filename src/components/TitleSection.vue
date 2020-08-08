<template>
  <section :key="'TitleSection'" :class="['section-content', sectionClassName]">
    <div class="container">
      <h1 class="title is-1">{{ title }}</h1>
      <h3 id="pageSubtitle" class="subtitle">{{ subtitle }}</h3>
    </div>
  </section>
</template>

<style lang="scss">
#pageSubtitle {
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-top: 1.5rem;
}
</style>

<script>
export default {
  name: 'TitleSection',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    sectionClassName: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
