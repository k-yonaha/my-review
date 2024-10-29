import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
    language: "ja",
});

const state = {
  mapsLoaded: false,
  mapsLibrary: null,
  markerLoaded: false,
  markerLibrary: null,
  placesLoaded: false,
  placesLibrary: null,
  GeocoderLoaded: false,
  GeocoderLibrary: null,
};

const mutations = {
  setMapsLoaded(state, loaded) {
    state.mapsLoaded = loaded;
  },
  setMapsLibrary(state, library) {
    state.mapsLibrary = library;
  },
  setMarkerLoaded(state, loaded) {
    state.markerLoaded = loaded;
  },
  setMarkerLibrary(state, library) {
    state.markerLibrary = library;
  },
  setPlacesLoaded(state, loaded) {
    state.placesLoaded = loaded;
  },
  setPlacesLibrary(state, library) {
    state.placesLibrary = library;
  },
  setGeocoderLoaded(state, loaded) {
    state.GgeocoderLoaded = loaded;
  },
  setGeocoderLibrary(state, library) {
    state.geocoderLibrary = library;
  },
};

const actions = {
  async loadMapsLibrary({ commit }) {
    try {
      const library = await loader.importLibrary("maps");
      commit('setMapsLibrary', library);
      commit('setMapsLoaded', true);
    } catch (error) {
      console.error("Error loading maps library:", error);
    }
  },
  async loadMarkerLibrary({ commit }) {
    try {
      const library = await loader.importLibrary("marker");
      commit('setMarkerLibrary', library);
      commit('setMarkerLoaded', true);
    } catch (error) {
      console.error("Error loading marker library:", error);
    }
  },
  async loadPlacesLibrary({ commit }) {
    try {
      const library = await loader.importLibrary("places");
      commit('setPlacesLibrary', library);
      commit('setPlacesLoaded', true);
    } catch (error) {
      console.error("Error loading places library:", error);
    }
  },
  async loadGeocoderLibrary({ commit }) {
    try {
      const library = await loader.importLibrary("geocoding");
      commit('setGeocoderLibrary', library);
      commit('setGeocoderLoaded', true);
    } catch (error) {
      console.error("Error loading geocoder library:", error);
    }
  },
};

const getters = {
  isMapsLoaded: (state) => state.mapsLoaded,
  getMapsLibrary: (state) => state.mapsLibrary,
  isMarkerLoaded: (state) => state.markerLoaded,
  getMarkerLibrary: (state) => state.markerLibrary,
  isPlacesLoaded: (state) => state.placesLoaded,
  getPlacesLibrary: (state) => state.placesLibrary,
  isGeocoderLoaded: (state) => state.geocoderLoaded,
  getGeocoderLibrary: (state) => state.geocoderLibrary,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};