<template>
  <div class="d-flex">
    <div>
      <b-avatar
        size="2em"
        :src="
          comment.user.avatar
            ? comment.user.avatar
            : 'https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/team-4.jpg'
        "
      ></b-avatar>
    </div>
    <div>
      <b>{{ comment.user.fullname || "ngoc khue" }}</b>
      <p>{{ comment.comment }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>