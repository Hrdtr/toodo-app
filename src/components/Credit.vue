<template>
  <div id="container">
    <strong>Toodo</strong> App
    <!-- eslint-disable-next-line vue/no-parsing-error -->
    <p>Made with ❤️ &nbsp by <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/hrdtr_">Herdi Tr.</a></p>
  </div>
</template>

<script>

export default {
  name: 'ExploreContainer',
  props: {
    name: String
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  /* position: absolute; */
  left: 0;
  right: 0;
  /* top: 75%;
  transform: translateY(-50%); */
  margin-top: 80px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>