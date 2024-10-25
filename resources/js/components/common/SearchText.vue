<template>
    <v-card class="mx-auto" color="surface-light" max-width="400">
        <v-card-text>
            <v-text-field
                ref="searchText"
                v-model="searchValue"
                append-inner-icon="mdi-magnify"
                density="compact"
                label="検索"
                variant="solo"
                hide-details
                single-line
                @click:append-inner="searchClick"
            ></v-text-field>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, shallowRef, onMounted, defineEmits } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits();
const searchText = ref(null);
const searchValue = ref('');
const autocomplete = shallowRef(null);

const searchClick = () => {
    emit("place-selected", suggestion);
};

const initializeAutocomplete = async () => {
    await store.dispatch("maps/loadPlacesLibrary");
    const placesLibrary = store.getters["maps/getPlacesLibrary"];

    autocomplete.value = new placesLibrary.Autocomplete(searchText.value.$el.querySelector('input'));
    autocomplete.value.addListener("place_changed", () => {
        const place = autocomplete.value.getPlace();
        emit("place-selected", place);
    });
};

onMounted(() => {
    initializeAutocomplete();
});
</script>
<style>
#app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* ページの高さを100%に */
}
</style>