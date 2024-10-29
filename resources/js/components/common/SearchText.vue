<template>
    <v-card class="mx-auto position-absolute search-text-wrapper" color="surface-light" max-width="400" >
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
                @input="searchInput"
                class=""
            ></v-text-field>
            <v-list v-if="showSuggestions && suggestions.length > 0">
                <v-list-item
                    v-for="(suggestion, index) in suggestions"
                    :key="index"
                    @click="selectSuggestion(suggestion)"
                >
                    {{ suggestion.name }}
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, shallowRef, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
    googleMap: Object,
    placesService: Object,
    currentLocation:  Object,
});

const store = useStore();
const emit = defineEmits();
const searchText = ref(null);
const searchValue = ref('');
const autocompleteService = shallowRef(null);
const placesService = shallowRef(null);
const suggestions = ref([]);
const showSuggestions = ref(false);

const searchClick = () => {
    showSuggestions.value = false
    const placeIds = suggestions.value.map((suggestion) => suggestion.place_id);
    emit("place-selected", suggestions.value);
};

const searchInput = () => {
    if (searchValue.value && props.placesService && props.currentLocation) {
        const request = {
            location: {lat:props.currentLocation.lat, lng:props.currentLocation.lng},
            radius: 5000,
            keyword: searchValue.value,
            // language:"ja"
        };
        props.placesService.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                suggestions.value = results;
                showSuggestions.value = true
            } else {
                suggestions.value = [];
                showSuggestions.value = false
            }
        });
    } else {
        suggestions.value = [];
        showSuggestions.value = false
    }
};

const selectSuggestion = (suggestion) => {
    showSuggestions.value = false
    searchValue.value = suggestion.description;
    suggestions.value = [];
    emit("place-selected", suggestion);
};

onMounted(() => {

});
</script>
<style>
.search-text-wrapper {
    top: 13%;
    width: 100%;
}
</style>