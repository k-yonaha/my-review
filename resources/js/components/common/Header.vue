<template>
    <v-app-bar color="blue-grey-lighten-3" density="compact">
        <v-toolbar-title>Todoアプリ</v-toolbar-title>

        <template v-slot:extension>
            <v-tabs align-with-title>
                <v-tab>
                    <router-link v-bind:to="{ name: 'home' }">
                        <button class="btn btn-success">home</button>
                    </router-link></v-tab
                >
                <v-tab>
                    <router-link v-bind:to="{ name: 'about' }">
                        <button class="btn btn-success">ABOUT</button>
                    </router-link></v-tab
                >
                <v-tab>
                    <router-link v-bind:to="{ name: 'map' }">
                        <button class="btn btn-success">MAP</button>
                    </router-link></v-tab
                >
            </v-tabs>
        </template>
    </v-app-bar>
</template>
