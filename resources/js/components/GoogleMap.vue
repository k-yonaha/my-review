<template>
    <div v-if="isMapsLoaded">
        <div ref="mapContainer" class="map">
            <SearchText @place-selected="setPlace"></SearchText>
        </div>
    </div>
    <Loading v-if="loading"></Loading>
</template>

<script setup>
import {
    shallowRef,
    toRaw,
    onMounted,
    ref,
    computed,
    watch,
    nextTick,
} from "vue";
import { useStore } from "vuex";

import { Loader } from "@googlemaps/js-api-loader";
import Loading from "./common/Loading.vue";
import SearchText from "./common/SearchText.vue";

const store = useStore();
const mapContainer = ref(null);
const isMapsLoaded = computed(() => store.getters["maps/isMapsLoaded"]);
const isMarkerLoaded = computed(() => store.getters["maps/isMarkerLoaded"]);

const googleMap = shallowRef(null);
const places = shallowRef(null);
const geoCoder = shallowRef(null);
const marker = shallowRef(null);
let currentLatLng = ref();
let searchText = null;
let loading = ref(true);

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
    language: "ja",
});

const defaultLatLng = { lat: 35.68608026070354, lng: 139.98538636846774 };

const mapOptions = {
    center: defaultLatLng,
    zoom: 14,
    mapId: "DEMO_MAP_ID",
    mapTypeControl: false,
};

const initializeMap = async () => {
    const mapsLibrary = store.getters["maps/getMapsLibrary"];
    if (mapsLibrary && mapContainer.value) {
        googleMap.value = new mapsLibrary.Map(mapContainer.value, mapOptions);
        await getCurrentLocation();
        if (currentLatLng.value) {
            initializeMarker(mapsLibrary, googleMap.value);
        }
    }
};

const initializeMarker = async (mapsLibrary, map) => {
    await store.dispatch("maps/loadMarkerLibrary");
    const markerLibrary = store.getters["maps/getMarkerLibrary"];
    // マーカーを作成
    marker.value = new markerLibrary.AdvancedMarkerElement({
        position: currentLatLng.value ?? defaultLatLng,
        map: map,
    });
};

// watch(mapContainer, (newValue) => {
//     if (newValue && isMapsLoaded.value) {
//         initializeMap();
//     }
// });

onMounted(() => {
    store.dispatch("maps/loadMapsLibrary").then(() => {
        if (isMapsLoaded.value) {
            initializeMap(); // マップを初期化
        }
    });
});

// 現在地の取得
const getCurrentLocation = async () => {
    if (navigator.geolocation) {
        try {
            const position = await getCurrentPosition();
            currentLatLng.value = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            // マップを現在地に中心を移動
            googleMap.value.setCenter(currentLatLng.value);
        } catch (error) {
            console.error("位置情報の取得に失敗しました:", error);
        }
    } else {
        console.error("位置情報の取得に失敗しました:", error);
        return false;
    }
    loading.value = false;
};

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
        );
    });
};

const initMap = async () => {
    await getCurrentLocation();

    // マップの中心位置を取得
    google.maps.event.addListener(
        googleMap.value,
        "center_changed",
        function () {
            const center = googleMap.value.getCenter();
            setAutoComplete({ lat: center.lat(), lng: center.lng() });
        }
    );
};

// マーカー設置
const setMarker = async (location, title = "") => {
    if (marker) {
        marker.setMap(null);
    }
    const markerLibrary = store.getters["maps/getMarkerLibrary"];
    marker.value = new markerLibrary.Marker({
        position,
        map: map.value,
        title: title,
    });
};

// 住所検索
const addressSearch = async () => {
    geoCoder.value.geocode({ address: searchText }, (results, status) => {
        if (results) {
            setMarker(results[0].geometry.location);
            if (status === "OK") {
                // map.setPosition({ lat: lat(), lng: lng() });
                googleMap.value.setCenter(results[0].geometry.location);
            }
        }
    });
};
const setAutoComplete = async (latLng) => {
    // 検索にオートコンプリート機能追加
    const defaultBounds = {
        north: latLng.lat + 0.1,
        south: latLng.lat - 0.1,
        east: latLng.lng + 0.1,
        west: latLng.lng - 0.1,
    };
    const placesOptions = {
        componentRestrictions: { country: "jp" },
        fields: ["address_components", "geometry", "icon", "name"],
        locationBias: { radius: 10, center: latLng },
        bounds: defaultBounds,
        strictBounds: false,
    };

    const autocomplete = new places.value.Autocomplete(
        document.getElementById("searchText"),
        placesOptions
    );

    googleMap.value.addListener("bounds_changed", () => {
        autocomplete.locationRestriction = googleMap.value.getBounds();
    });

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        searchText = place.name;
        addressSearch();
    });
    autocomplete.bindTo("bounds", googleMap.value);
};

const setPlace = (place) => {
    if (places.length > 0) {
        // 最初の候補に基づいてマップを中央にする
        const firstPlace = places[0];
        const location = firstPlace.geometry.location;

        // マップの中心を変更
        googleMap.value.setCenter(location);
        places.forEach((place) => {
            setMarker(place.geometry.location);
        });
    }
};
</script>

<style>
.map {
    height: 500px;
    width: 100%;
}
</style>
