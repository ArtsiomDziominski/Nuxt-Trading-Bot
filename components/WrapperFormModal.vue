<script setup lang="ts">

</script>

<template>
  <v-dialog max-width="500">

    <v-card class="pa-6">
      <v-form @click.prevent>

        <slot name="body"/>

        <v-spacer/>

        <div class="actions">
          <slot name="actions"/>
        </div>

      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-end;
}
</style>