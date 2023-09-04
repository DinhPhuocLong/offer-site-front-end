<template>
    <div class="add-network container">
        <h2 class="pb-4">Add new network</h2>
        <v-form ref="form" class="v-row" @submit.prevent="handleAddNetwork">
            <v-col cols="6">
                <label for="">
                    *Network name
                </label>
                <v-text-field v-model="network.name" placeholder="Network's name" density="compact"
                    :rules="networkNameRules" :disabled="loading" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="6">
                <label for="">
                    *Click id param
                </label>
                <v-text-field v-model="network.aff_sub" placeholder="{ click_id }" density="compact"
                    :rules="affSubParameterRules" :disabled="loading" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="6">
                <label for="">
                    Payout param
                </label>
                <v-text-field v-model="network.payout" placeholder="{ payout }" density="compact"
                    :rules="payoutParameterRules" :disabled="loading" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="12">
                <div class="d-inline-flex align-center">
                    <v-switch hide-details="auto" v-model="network.is_unique_click" class="switch-label" :disabled="loading"
                        label="Limit click"></v-switch>
                </div>
            </v-col>
            <v-col cols="12">
                <div class="d-inline-flex align-center">
                    <v-switch hide-details="auto" v-model="network.is_unique_lead" class="switch-label" :disabled="loading"
                        label="Limit lead"></v-switch>
                </div>
            </v-col>

            <v-col cols="12">
                <div class="d-inline-flex align-center">
                    <v-switch hide-details="auto" v-model="network.is_hidden" class="switch-label" :disabled="loading"
                        label="Active network offer"></v-switch>
                </div>
            </v-col>

            <v-col cols="12">
                <div class="d-inline-flex align-center">
                    <v-switch hide-details="auto" v-model="network.is_daily_click_reset" class="switch-label"
                        :disabled="loading" label="Reset click after 24 hours"></v-switch>
                </div>
            </v-col>

            <v-col cols="12 pt-12">
                <div class="form-submit">
                    <v-btn type="submit" :loading="loading">
                        Submit Network
                    </v-btn>
                </div>
            </v-col>
        </v-form>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:actions>
            <v-btn color="black" variant="text" @click="snackbar.show = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
import { addNetwork } from '@/services/NetworkService';
import { lengthValidationRule } from '@/utils/validationRules';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
const network = reactive({
    name: '',
    aff_sub: '',
    payout: '',
    is_daily_click_reset: false,
    is_unique_click: false,
    is_hidden: false,
    is_unique_lead: false
});


const router = useRouter();
const loading = ref(false);
const form = ref(null)
const networkNameRules = lengthValidationRule({
    fieldName: 'Network name',
    min: 3,
    max: 50,
    required: true
});
const affSubParameterRules = lengthValidationRule({
    fieldName: 'Aff sub parameter',
    min: 3,
    max: 15,
    required: true
});
const payoutParameterRules = lengthValidationRule({
    fieldName: 'Payout parameter',
    min: 3,
    max: 15,
    required: true
});

const snackbar = reactive({
    show: false,
    color: '',
    text: ''
});

const handleAddNetwork = async () => {
    const isValid = await form.value.validate();
    if (!isValid.valid) {
        return;
    }
    try {
        loading.value = true;
        await addNetwork(network);
        loading.value = false;
        snackbar.show = true;
        snackbar.color = 'success';
        snackbar.text = 'Add new network successfully!';
        router.push('/network');
        
    } catch (error) {
        loading.value = false;
        snackbar.show = true;
        snackbar.color = 'error';
        snackbar.text = 'Add new network failed!';
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: none;
}

.add-network {
    padding: rem(20);

    :deep(.v-field__input) {
        background-color: white;
    }

    :deep(.switch-label) {
        label {
            color: black;
            opacity: 1;
        }
    }
}
</style>