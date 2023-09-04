<template>
    <div class="text-center">
        <v-dialog :modelValue="networkPostBackDialog" @click:outside="closeDialog" width="auto">
            <div class="dialog-content">
                <v-table fixed-header>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Network
                            </th>
                            <th class="text-left">
                                Domain
                            </th>
                            <th class="text-left">
                                Url
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <td colspan="3"><v-skeleton-loader height="100%"></v-skeleton-loader></td>
                    </tbody>
                    <tbody v-if="!isLoading">
                        <tr v-for="(item, index) in networkPostbackUrls" :key="index">
                            <td>{{ networkName }}</td>
                            <td>{{ item.host }}</td>
                            <td>{{ item.url }}
                                <button class="copy-button" @click="copyToClipBoard(item.url)">
                                    <v-icon :icon="mdiContentCopy"></v-icon>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="close-dialog">
                                    <v-icon :icon="mdiCloseBox" @click="closeDialog"></v-icon>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </v-dialog>
    </div>
    <div class="text-center">

        <v-snackbar v-model="snackbar.isTriggered" :timeout="snackbar.timeout" color="green" :min-width="0">
            {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { watch, computed, reactive, ref } from 'vue';
import { showNetworkPostbackUrls } from '@/services/NetworkService';
import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs';

import { mdiContentCopy, mdiCloseBox } from '@mdi/js';

const props = defineProps({
    networkPostBackDialog: {
        type: Boolean,
        required: true,
        default: false
    },
    networkId: {
        required: true,
        default: 0
    },
    networkName: {
        required: true,
    }
});

const snackbar = reactive({
    isTriggered: false,
    text: 'Added to you clipboard',
    timeout: 1500
});

const isLoading = ref(false);

const networkPostbackUrls = reactive([]);

const networkIdReactive = computed(() => props.networkId);

const emit = defineEmits(['close'])

const closeDialog = () => {
    emit('close');
}

const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
    snackbar.isTriggered = true;
};

watch(networkIdReactive,
    async (newVal) => {
        try {
            isLoading.value = true;
            networkPostbackUrls.length = 0;
            const response = await showNetworkPostbackUrls(newVal);
            const networkPostbackUrlsWithHostname = response.map(item => {
                const { hostname } = new URL('http://' + item);
                return {
                    host: hostname,
                    url: 'http://' + item
                }
            });
            networkPostbackUrls.push(...networkPostbackUrlsWithHostname);
            setTimeout(() => {
                isLoading.value = false;
            }, 300);
        } catch (error) {
            console.log(error);
        }
    });

</script>

<style lang="scss" scoped>
.dialog-content {
    background-color: #ffff;
    min-width: rem(700);
    position: relative;

    .copy-button {
        margin-left: rem(10);
    }

    .close-dialog {
        display: flex;
        justify-content: center;
        font-size: rem(20);

        i {
            cursor: pointer;

        }
    }
}
</style>