<template>
    <v-app-bar color="teal-lighten-2" density="compact">
        <v-toolbar-title> マイレビュー </v-toolbar-title>

        <template v-slot:extension>
            <v-tabs fixed-tabs>
                <v-tab to="/">HOME </v-tab>
                <v-tab to="/about">ABOUT </v-tab>
                <v-tab to="/map">MAP</v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
</template>
