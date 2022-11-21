<script lang="ts">
  /* esto solo es el componente principal de vue solo estoy llamando el modal para llamarlo en cualquier parte con el store */
  import {
    defineComponent
  } from 'vue'
  import ProgramingModal from './components/ProgramingModal.vue'

  export default defineComponent({
    name: 'App',
    components: {
      ProgramingModal
    }
  })
</script>

<template>
  <div>
    <ProgramingModal></ProgramingModal>
    <router-view />
  </div>
</template>