<template>
    <div class="overlay">
        <v-progress-circular
            color="primary"
            indeterminate
            :size="80"
            :width="10"
            
        ></v-progress-circular>
    </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明の黒 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 他の要素の上に表示 */
}

</style>