<template>
    <div class="list-network">

        <Filter-panel />


        <h2>List Network</h2>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        #
                    </th>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Postback
                    </th>
                    <th class="text-left">
                        Option
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(network, i) in networks" :key="network.name">
                    <td>{{ i + 1 }}</td>
                    <td>{{ network.name }}</td>
                    <td>
                        <button>
                            Postback
                        </button>
                    </td>
                    <td>
                        <v-menu :location="'right'">
                            <template v-slot:activator="{ props }">
                                <v-icon :icon="mdiCog" v-bind="props"></v-icon>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in items" :key="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import FilterPanel from '@/components/FilterPanel.vue';
import { ref } from 'vue';
import { mdiCog } from '@mdi/js'
const networks = ref([
    {
        name: 'Datify',
    },
    {
        name: 'Oblimob',
    },
    {
        name: 'Advendor',
    },
    {
        name: 'Traffcore',
    },
    {
        name: 'ImonetizeIT',
    },
]);
const items = ref([
    { title: 'Edit' },
    { title: 'Reset Click' },
    { title: 'Reset Lead' },
    { title: 'Delete' },
]);
</script>

<style lang="scss" scoped>
.list-network {
    padding: rem(20);

    button {
        background-color: rgb(70, 69, 69) !important;
        padding-left: rem(10);
        padding-right: rem(10);
        padding-top: rem(5);
        padding-bottom: rem(5);
        border-radius: rem(5);
        font-size: rem(12);
        height: rem(30);
        color: white;
    }
}
</style>

