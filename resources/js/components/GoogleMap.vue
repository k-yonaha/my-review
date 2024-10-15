<script setup>
import { shallowRef, toRaw,onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

let searchText = null;
const googleMap = shallowRef(null);
const marker = shallowRef(null);

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
    language: "ja",
});

const mapOptions = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 4,
    mapId: "DEMO_MAP_ID",
};
onMounted(() => {
    initMap();
});

async function initMap() {
    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    googleMap.value = new Map(document.getElementById("map"), mapOptions);


    marker.value = new AdvancedMarkerElement({
        map: googleMap.value,
        position: { lat: -25.344, lng: 131.031 },
        title: "Uluru",
    });
}

const addressSearch = async () => {
    const { Geocoder } = await loader.importLibrary("geocoding");
    const geocoder = new Geocoder();

    geocoder.geocode({ address: searchText }, (results, status) => {
        marker.setVisible(false);
        marker.setMap(null);
        marker = null;
        if (results) {
            marker = new vm.google.maps.Marker({
                map: vm.map,
                position: results[0].geometry.location,
                draggable: false,
            });
            if (status === "OK") {
                // map.setPosition({ lat: lat(), lng: lng() });
                googleMap.setCenter(results[0].geometry.location);
            }
        }
    });
};
// const center = { lat: 40.689247, lng: -74.044502 }
// const markerOptions = { position: center, title: 'LADY LIBERTY' }
// const pinOptions = { background: '#FBBC04' }
// const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY
</script>

<template>
    <div id="map"></div>
    <div>
        <input
            class="px-3 py-2 d-table-cell search-form-address"
            v-model="searchText"
            placeholder="Search Address"
            style="display: block"
        />
        <div>
            <button
                class="inline-flex p-2 hover:bg-gray-100 rounded"
                @click="addressSearch"
            >
                検索
            </button>
        </div>
    </div>
</template>

<style>
#map {
    height: 100%;
    width: 100%;
}
</style>
