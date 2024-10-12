<template>
    <v-app>
        <Header></Header>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Header from "./components/common/Header.vue"

export default {
    components: {
        Header
    }
}
</script>