<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Form />
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Login/Form.vue'

export default {
  name: 'Login',
  components: {
    Form
  }
}
</script>
