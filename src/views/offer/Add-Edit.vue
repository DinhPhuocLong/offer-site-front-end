<template>
    <div class="add-network container">
        <h2 class="pb-4">{{ route.params.id ? 'Update offer' : 'Add new offer' }}</h2>
        <v-form ref="form" class="v-row" @submit.prevent="route.params.id ? handleUpdateOffer() : handleAddOffer()"
            v-if="isOffer">
            <v-col cols="6">
                <label for="">
                    *Offer name
                </label>
                <v-text-field placeholder="Offer's name" density="compact" :rules="offerNameRules" :disabled="loading"
                    v-model="offerName" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="6">
                <label for="">
                    *Network
                </label>
                <v-select :items="networkOptions" :item-value="networkOptions.id" v-model="selectedNetwork"
                    :disabled="loading" :rules="offerNetworkRules" placeholder="Offer's network" variant="solo-filled"
                    density="compact"></v-select>
            </v-col>
            <v-col cols="6">
                <label for="">
                    *Offer's link
                </label>
                <v-text-field placeholder="Offer's link" density="compact" :rules="offerLinkRules" :disabled="loading"
                    v-model="offerLink" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="6">
                <label for="">
                    *Domain
                </label>
                <v-select :items="domainOptions" :item-value="domainOptions.domain_url" v-model="selectedDomain"
                    :disabled="loading" :rules="offerDomainRules" placeholder="Offer's domain" variant="solo-filled"
                    density="compact"></v-select>
            </v-col>
            <v-col cols="6">
                <label for="">
                    Payout
                </label>
                <v-text-field placeholder="Offer's payout" density="compact" :rules="offerPayoutRules" v-model="offerPayout"
                    :disabled="loading" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="6">
                <label for="">
                    Countries allowed
                </label>
                <v-text-field placeholder="US, DE, GB, CA, BE" density="compact" :rules="offerContryRules"
                    v-model="offerContry" :disabled="loading" variant="solo-filled"></v-text-field>
            </v-col>
            <v-col cols="4">
                <div class="d-inline-flex align-center">
                    <v-checkbox v-model="selectedOfferType" label="Desktop" :value="1" :true-value="1" :false-value="0"
                        :disabled="loading"></v-checkbox>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="d-inline-flex align-center">
                    <v-checkbox v-model="selectedOfferType" label="Mobile" :value="2" :true-value="2" :false-value="0"
                        :disabled="loading"></v-checkbox>
                </div>
            </v-col>

            <v-col cols="4">
                <div class="d-inline-flex align-center">
                    <v-checkbox v-model="selectedOfferType" label="All platform" :value="0" :true-value="0" :false-value="0"
                        :disabled="loading"></v-checkbox>
                </div>
            </v-col>

            <v-col cols="12 pt-12">
                <div class="form-submit">
                    <v-btn type="submit" :loading="loading">
                        {{ route.params.id ? 'Update offer' : 'Add new offer' }}
                    </v-btn>
                </div>
            </v-col>
        </v-form>

        <div class="nodata-error" v-if="!isOffer">
            <h3 class="text-red">Error: Invalid offer id - please try again
            </h3>
        </div>
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
import { getNetworks } from '@/services/NetworkService';
import { getDomains } from '@/services/domainService'
import { addOffer, getOfferDetail, updateOffer } from '@/services/OfferService';
import { lengthValidationRule, linkValidationRule, nonNegativeNumberValidationRule, requiredRule } from '@/utils/validationRules';
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()

const router = useRouter();
const isOffer = ref(true);
const networkOptions = reactive([]);
const selectedNetwork = ref(null);
const domainOptions = reactive([]);
const selectedDomain = ref(null);
const offerName = ref(null);
const offerLink = ref(null);
const offerPayout = ref(null);
const offerContry = ref(null);
const selectedOfferType = ref(0);

const offerNameRules = lengthValidationRule({
    fieldName: 'Offer name',
    max: 50,
    min: 3,
    required: true
});

const offerLinkRules = linkValidationRule({
    fieldName: 'Offer link',
    required: true
});

const offerContryRules = lengthValidationRule({
    fieldName: 'Offer country',
    max: 500,
    min: 2,
    required: false
});

const offerPayoutRules = nonNegativeNumberValidationRule({
    fieldName: 'Offer payout',
    required: false
});

const offerDomainRules = requiredRule({
    fieldName: 'Offer domain'
});

const offerNetworkRules = requiredRule({
    fieldName: 'Offer network'
});

const form = ref(null);

const loading = ref(false);

const snackbar = reactive({
    show: false,
    color: '',
    text: ''
});

onMounted(() => {
    if (route.params.id) {
        fetchOfferDetail(route.params.id);
    }
    fetchAndProcessSelectOptionData(getNetworks, networkOptions, 'name');
    fetchAndProcessSelectOptionData(getDomains, domainOptions, 'domain_url');
});

onBeforeRouteLeave(() => {
    console.log('leave this route');
    selectedNetwork.value = null;
    selectedDomain.value = null;
    selectedOfferType.value = 0;
    offerLink.value = null;
    offerName.value = null;
    offerContry.value = null;
    offerPayout.value = null;
});


const fetchOfferDetail = async (id) => {
    loading.value = true
    try {
        const response = await getOfferDetail(id);
        if (response.data) {
            selectedNetwork.value = response.data.network_id;
            selectedDomain.value = response.data.offer_domain;
            selectedOfferType.value = response.data.offer_type;
            offerLink.value = response.data.offer_link;
            offerName.value = response.data.offer_name;
            offerContry.value = response.data.country_allowed;
            offerPayout.value = response.data.offer_payout;

        }
    } catch (error) {
        isOffer.value = false;
    } finally {
        loading.value = false;
    }
}

const fetchAndProcessSelectOptionData = async (apiService, optionsArray, titleField) => {
    try {
        const response = await apiService();
        optionsArray.push(
            ...response.data.map(item => ({
                value: item.id,
                title: item[titleField]
            }))
        );
    } catch (error) {
        console.log(error);
    }
}

const handleAddOffer = async () => {
    const offer = {
        offer_name: offerName.value,
        network_id: selectedNetwork.value,
        offer_domain: selectedDomain.value,
        offer_type: selectedOfferType.value,
        offer_link: offerLink.value,
        country_allowed: offerContry.value,
        offer_payout: Number(offerPayout.value)
    }
    const isValid = await form.value.validate();
    if (!isValid.valid) {
        return;
    }
    loading.value = true;
    try {
        await addOffer(offer);
        snackbar.show = true;
        snackbar.color = 'success';
        snackbar.text = 'Add offer successfully!';
        setTimeout(() => {
            router.push('/offer');
        }, 1000);
    } catch (error) {
        snackbar.show = true;
        snackbar.color = 'error';
        snackbar.text = 'Add new offer failed!';
    } finally {
        loading.value = false;
    }
}

const handleUpdateOffer = async () => {
    const offerId = route.params.id;
    const offer = {
        offer_name: offerName.value,
        network_id: selectedNetwork.value,
        offer_domain: selectedDomain.value,
        offer_type: selectedOfferType.value,
        offer_link: offerLink.value,
        country_allowed: offerContry.value,
        offer_payout: Number(offerPayout.value)
    }

    const isValid = await form.value.validate();
    if (!isValid.valid) {
        return;
    }
    loading.value = true;

    try {
        await updateOffer(offerId, offer);
        snackbar.show = true;
        snackbar.color = 'success';
        snackbar.text = 'Update offer successfully!';
        setTimeout(() => {
            router.push('/offer');
        }, 1000);
    } catch (error) {
        snackbar.show = true;
        snackbar.color = 'error';
        snackbar.text = 'Update offer failed!';
    } finally {
        loading.value = false;
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