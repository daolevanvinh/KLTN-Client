<template>
  <div class="text-center">
    <img style="margin-top:1rem" :src="image" />

    <h4 style="margin-top: 0.5rem">Empty list!</h4>
  </div>
</template>
<script>
import empty from "../../assets/empty.png"
export default {
  data() {
    return {
      image : empty
    }
  }
};
</script>