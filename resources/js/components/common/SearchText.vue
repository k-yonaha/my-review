<template>
    <v-card class="mx-auto" color="surface-light" max-width="400" >
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
 
                @input="onInput"
                class=""
            ></v-text-field>
            <v-list v-if="suggestions.length > 0">
                <v-list-item
                    v-for="(suggestion, index) in suggestions"
                    :key="index"
                    @click="selectSuggestion(suggestion)"
                >
                    {{ suggestion.description }}
                </v-list-item>
            </v-list>
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
const suggestions = ref([]);

const searchClick = () => {
    emit("place-selected", suggestion);
};

const onInput = async () => {
    if (!autocompleteService.value) return;

    const request = {
        input: searchValue.value,
        componentRestrictions: { country: "jp" },
        fields: ["address_components", "geometry", "icon", "name"],
    };

    autocompleteService.value.getPlacePredictions(request, (results, status) => {
        if (status === "OK" && results) {
            suggestions.value = results;
        } else {
            suggestions.value = [];
        }
    });
};

const selectSuggestion = (suggestion) => {
    searchValue.value = suggestion.description;
    suggestions.value = [];
    emit("place-selected", suggestion);
};

const initializeAutocomplete = async () => {
    await store.dispatch("maps/loadPlacesLibrary");
    const placesLibrary = store.getters["maps/getPlacesLibrary"];

    autocomplete.value = new placesLibrary.AutocompleteService();
    // autocomplete.value.addListener("place_changed", () => {
    //     const place = autocomplete.value.getPlace();
    //     emit("place-selected", place);
    // });
};

onMounted(() => {
    initializeAutocomplete();
});
</script>
<style>
.search-form-wrapper {
	position: absolute;
	bottom: 20px;
	right: 10px;
	border: solid 4px #757575;
	border-radius: 30px;
	cursor: pointer;
}
.search-form-address {
	max-width: 400px;
	border: none;
	outline: none;
}
</style>