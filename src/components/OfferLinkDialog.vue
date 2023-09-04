<template>
    <div class="text-center">
        <v-dialog :model-value="isTriggered" @click:outside="closeDialog" width="auto">
            <div class="dialog">
                <div class="dialog-title">
                    <h3>#{{ offerDetail.id }} - {{ offerDetail.offer_name }}</h3>
                    <span>
                        Network: {{ offerDetail.network_name }} <br>
                        GEOS: {{ offerDetail.country_allowed }}
                    </span>
                </div>
                <div class="dialog-content">
                    <div class="offer-link">
                        <div class="link">
                            <span>
                                Lead URL:
                            </span> https://{{ offerDetail.offer_lead_link }}
                        </div>
                        <button class="copy-button" @click="copyToClipBoard(offerDetail.offer_lead_link)">
                            <v-icon :icon="mdiContentCopy"></v-icon>
                        </button>
                    </div>
                    <div class="offer-link">
                        <div class="link">
                            <span>
                                Click URL:
                            </span> https://{{ offerDetail.offer_click_link }}
                        </div>
                        <button class="copy-button" @click="copyToClipBoard(offerDetail.offer_click_link )">
                            <v-icon :icon="mdiContentCopy"></v-icon>
                        </button>
                    </div>
                </div>

                <div class="close-dialog text-center">
                    <button  @click="closeDialog" >
                        <v-icon :icon="mdiCloseBox"></v-icon>
                    </button>
                </div>
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
import { reactive } from 'vue';
import { mdiContentCopy, mdiCloseBox } from '@mdi/js';
defineProps({
    isTriggered: {
        type: Boolean,
        default: false,
        required: true,
    },
    offerDetail: {
        type: Object,
        required: true
    }
});

const snackbar = reactive({
    isTriggered: false,
    text: 'Added to you clipboard',
    timeout: 1500
});

const emit = defineEmits(['close'])

const closeDialog = () => {
    emit('close');
}

const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
    snackbar.isTriggered = true;
};
</script>

<style lang="scss" scoped>
.dialog {
    padding: rem(20);
    background-color: #ffff;
    min-width: rem(600);
    position: relative;

    .dialog-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: rem(20);
        padding-bottom: rem(20);
        border-bottom: 1px solid black;

        span {
            font-size: rem(12);
            font-weight: 500;
        }
    }

    .dialog-content {
        .offer-link {
            display: flex;
            justify-content: space-between;
            margin-bottom: rem(5);

            .link {
                font-size: rem(15);

                span {
                    font-weight: 500;
                    font-size: rem(16);
                }
            }

        }
    }

    .close-dialog {
        margin-top: rem(20);
    }
}
</style>