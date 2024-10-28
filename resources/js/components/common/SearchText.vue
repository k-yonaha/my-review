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
                @click:append-inner="searchClick"
                @input="searchInput"
                class=""
            ></v-text-field>
            <v-list v-if="suggestions.length > 0">
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
    currentLocation:  Object,
});

const store = useStore();
const emit = defineEmits();
const searchText = ref(null);
const searchValue = ref('');
const autocompleteService = shallowRef(null);
const placesService = shallowRef(null);
const suggestions = ref([]);

const searchClick = () => {
    const placeIds = suggestions.value.map((suggestion) => suggestion.place_id);
    console.log(placeIds)
    emit("place-selected", suggestions.value);
};

// const searchInput = async () => {
//     console.log(autocompleteService.value)
//     if (!autocompleteService.value) return;

//     const request = {
//         input: searchValue.value,
//         componentRestrictions: { country: "jp" },

//         // types: ["geocode"],
//         locationBias: {lat:props.currentLocation.lat, lng:props.currentLocation.lng},
//         // locationRestriction: {lat:props.currentLocation.lat, lng:props.currentLocation.lng},

//     };
//     console.log(props.currentLocation)
//     autocompleteService.value.getPlacePredictions(request, (results, status) => {
//         console.log(5555)
//         if (status === "OK" && results) {    console.log(1212)
//             suggestions.value = results;
//         } else {    console.log(2222)
//             suggestions.value = [];
//         }
//     });
// };

const searchInput = () => {
    if (searchValue.value && placesService.value && props.currentLocation) {
        const request = {
            location: {lat:props.currentLocation.lat, lng:props.currentLocation.lng},
            radius: 5000,
            keyword: searchValue.value,
            // language:"ja"
        };
        console.log(request)
        placesService.value.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {console.log(results)
                suggestions.value = results;
            } else {console.log(3333)
                suggestions.value = [];
            }
        });
    } else {
        suggestions.value = [];
    }
};

const selectSuggestion = (suggestion) => {
    searchValue.value = suggestion.description;
    suggestions.value = [];
    emit("place-selected", suggestion);
};

const initializeAutocomplete = async () => {
    // await store.dispatch("maps/loadPlacesLibrary");
    // const placesLibrary = store.getters["maps/getPlacesLibrary"];

    // autocompleteService.value = new placesLibrary.AutocompleteService();
    // autocomplete.value.addListener("place_changed", () => {
    //     const place = autocomplete.value.getPlace();
    //     emit("place-selected", place);
    // });
};

const initializePlacesService = async () => {
    await store.dispatch("maps/loadPlacesLibrary");
    const placesLibrary = store.getters["maps/getPlacesLibrary"];
    if (placesLibrary && props.currentLocation ) {
        placesService.value = new placesLibrary.PlacesService(props.googleMap);
    }
};

onMounted(() => {
    // initializeAutocomplete();
    initializePlacesService();
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