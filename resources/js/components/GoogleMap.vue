<script setup>
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
const markerOptions = { position: center, title: 'LADY LIBERTY' }
const pinOptions = { background: '#FBBC04' }
const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY
</script>

<template>
<!-- TODO
mapId: 'DEMO_MAP_ID' を使用してもかまいません。DEMO_MAP_ID はテスト専用です。本番環境では DEMO_MAP_ID を使用しないでください。
-->
  <GoogleMap
  :api-key="googleApiKey"
  mapId="DEMO_MAP_ID" 
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
    <AdvancedMarker :options="markerOptions" :pin-options="pinOptions"/>
  </GoogleMap>
</template>