<template>
    <v-row justify="center">
        <v-dialog :model-value="showNetworkDetailDialog" persistent width="1024">
            <v-overlay v-model="isFormSubmitting" class="align-center justify-center" persistent overlay-opacity="0.15">
                <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <v-card>
                <v-card-title class="network-title">
                    <div class="time mx-auto">
                        Created at: {{ formatDateTime(7, clonedNetwork.created_at) }} - Updated at: {{ formatDateTime(7,
                            clonedNetwork.updated_at) }}
                    </div>
                </v-card-title>
                <v-form ref="form" fast-fail @submit.prevent="handleEditNetwork(clonedNetwork)">
                    <v-card-text class="pt-0">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <label class="mb-2 d-block">Network's Name</label>
                                    <v-text-field placeholder="Network's name" :readonly="readOnly"
                                        v-model="clonedNetwork.name" :rules="networkNameRules" density="compact"
                                        variant="solo-filled" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <label class="mb-2 d-block">Aff Sub</label>
                                    <v-text-field placeholder="Aff Sub Parameter" :rules="affSubParameterRules"
                                        :readonly="readOnly" v-model="clonedNetwork.aff_sub" density="compact"
                                        variant="solo-filled" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <label class="mb-2 d-block">Payout Parameter</label>
                                    <v-text-field placeholder="Payout Parameter" :readonly="readOnly"
                                        :rules="payoutParameterRules" v-model="clonedNetwork.payout" density="compact"
                                        variant="solo-filled" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-switch hide-details="auto" :readonly="readOnly" :true-value="1" :false-value="0"
                                        v-model="clonedNetwork.is_daily_click_reset" class="switch-label"
                                        label="Reset click after 24 hours"></v-switch>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-switch hide-details="auto" :readonly="readOnly"
                                        v-model="clonedNetwork.is_unique_click" :true-value="1" :false-value="0"
                                        class="switch-label" label="1 click / 1 IP"></v-switch>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-switch hide-details="auto" :readonly="readOnly"
                                        v-model="clonedNetwork.is_unique_lead" :true-value="1" :false-value="0"
                                        class="switch-label" label="1 lead / 1 IP"></v-switch>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-switch hide-details="auto" :readonly="readOnly" v-model="clonedNetwork.is_hidden"
                                        :true-value="1" :false-value="0" class="switch-label"
                                        :label="clonedNetwork.is_hidden ? 'Actived' : 'Disabled'"></v-switch>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeNetworkDetailDialog">
                            Close
                        </v-btn>
                        <v-btn type="submit" color="blue-darken-1" variant="text" v-if="!readOnly">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>

    <v-snackbar v-model="snackbar.isTriggered" :timeout="2000" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:actions>
            <v-btn color="black" variant="text" @click="snackbar.isTriggered = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>


<script setup>
import { ref, reactive, watchEffect } from 'vue';
import { editNetwork } from '@/services/NetworkService';
import { lengthValidationRule } from '@/utils/validationRules';
import { formatDateTime } from '@/utils/helper';
const props = defineProps({
    showNetworkDetailDialog: {
        type: Boolean,
        required: true,
        default: false
    },
    network: {
        type: Object,
        required: true,
    },
    readOnly: {
        type: Boolean,
        required: false,
        default: true
    }
});

const isFormSubmitting = ref(false);

const snackbar = reactive({
    triggered: false,
    color: '',
    text: ''
})

const form = ref(null);

const networkNameRules = lengthValidationRule('Network name');
const affSubParameterRules = lengthValidationRule('Aff sub parameter', 3, 15);
const payoutParameterRules = lengthValidationRule('Payout parameter', 3, 15);


let clonedNetwork = null;

const handleEditNetwork = async (network) => {
    const isValid = await form.value.validate();
    if (!isValid.valid) {
        return;
    }
    isFormSubmitting.value = true;
    try {
        // eslint-disable-next-line
        const { id, created_at, updated_at, ...filteredData } = network;
        await editNetwork(network.id, filteredData);
        emit('propsChanged', network);
        isFormSubmitting.value = false;
        snackbar.isTriggered = true;
        snackbar.color = 'success';
        snackbar.text = 'Network updated successfully!'
        closeNetworkDetailDialog();
    } catch (error) {
        snackbar.isTriggered = true;
        snackbar.color = 'error';
        snackbar.text = 'Network update failed, plesase try again!'
    } finally {
        isFormSubmitting.value = false;

    }
}

const emit = defineEmits(['closeNetworkDetailDialog', 'propsChanged']);

const closeNetworkDetailDialog = () => {
    clonedNetwork = reactive(JSON.parse(JSON.stringify(props.network)));
    emit('closeNetworkDetailDialog');
}

watchEffect(() => {
    clonedNetwork = reactive(JSON.parse(JSON.stringify(props.network)));
});
</script>


<style lang="scss">
.network-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: rem(25);
    }

    .time {
        font-size: rem(15);
        font-weight: normal;
    }
}
</style>