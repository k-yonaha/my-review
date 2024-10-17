<script setup>
import { shallowRef, toRaw, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

let searchText = null;
const googleMap = shallowRef(null);
let marker = null;

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
    language: "ja",
});

const mapOptions = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    mapId: "DEMO_MAP_ID",
};
onMounted(() => {
    initMap();

});

async function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // マップを現在地に中心を移動
                googleMap.value.setCenter(location);

                // 新しいマーカーを追加
                setMarker(location, "現在地");
                return true;
            },
            (error) => {
                return false;
                console.error("位置情報の取得に失敗しました:", error);
            }
        );
    } else {
        return false;
        alert("このブラウザは位置情報の取得できません。");
    }
}
async function initMap() {
    const { Map } = await loader.importLibrary("maps");

    googleMap.value = new Map(document.getElementById("map"), mapOptions);
    result = getCurrentLocation();
    // 現在地が取得できなければデフォルトのマーカーを設置する
    if(!result) setMarker({ lat: -25.344, lng: 131.031 });


    // 検索にオートコンプリート機能追加
    const places = await loader.importLibrary("places");

    const placesOptions = {
        componentRestrictions: { country: "jp" },
        fields: ["address_components", "geometry", "icon", "name"],
    };
    const autocomplete = new places.Autocomplete(
        document.getElementById("searchText"),
        placesOptions
    );

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        searchText = place.name;
        addressSearch();
    });
}

// 住所検索
const addressSearch = async () => {
    const { Geocoder } = await loader.importLibrary("geocoding");
    const geocoder = new Geocoder();

    geocoder.geocode({ address: searchText }, (results, status) => {
        if (results) {
            setMarker(results[0].geometry.location);
            if (status === "OK") {
                // map.setPosition({ lat: lat(), lng: lng() });
                googleMap.value.setCenter(results[0].geometry.location);
            }
        }
    });
};

// マーカー設置
const setMarker = async (location, title = "") => {
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    if (marker) {
        marker.setMap(null);
    }
    marker = new AdvancedMarkerElement({
        map: googleMap.value,
        position: location,
        draggable: false,
        title: title,
    });
};
</script>

<template>
    <div id="map"></div>
    <div>
        <input
            class="px-3 py-2 d-table-cell search-form-address"
            v-model="searchText"
            placeholder="Search Address"
            style="display: block"
            id="searchText"
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
