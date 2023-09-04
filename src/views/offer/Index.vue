<template>
    <div class="list-offer">
        <h2>List Offer</h2>
        <v-text-field v-model="search" @input="filterOffer"  label="Search offer" single-line hide-details></v-text-field>
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="dataTable.headers" :items="dataTable.items"
            @update:sortBy="sort" :loading="loading" :itemsLength="dataTable.pagination.total" v-model:search="search"
            @update:itemsPerPage="loadData" @update:page="handlePageChange" :page="currentPage" :items-per-page-options="[
                { value: 5, title: '5' },
                { value: 10, title: '10' },
                { value: 100, title: '100' },
            ]">

            <template v-slot:[`item.offer_type`]="{ item }">
                {{ formatOfferTypeToText(item.columns.offer_type) }}
            </template>

            <template v-slot:[`item.offer_link`]="{ item }">
                <button @click="showOfferLinkDialog(item.raw)">
                    <v-icon :icon="mdiLink"></v-icon>
                </button>
            </template>

            <template v-slot:[`item.country_allowed`]="{ item }">
                {{ !item.columns.country_allowed ? 'All' : item.columns.country_allowed }}
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
                {{ formatDateTime(7, item.columns.created_at) }}
            </template>

            <template v-slot:[`item.options`]="{ item }">
                <v-btn class="option-button">
                    Options

                    <v-menu activator="parent">
                        <v-list>
                            <router-link :to="{ name: 'UpdateOffer', params: { id: item.columns.id } }">
                                <v-list-item-title>
                                    Edit
                                </v-list-item-title>
                            </router-link>
                            <v-list-item-title>Reset Click</v-list-item-title>
                            <v-list-item-title>Reset Lead</v-list-item-title>
                            <v-list-item-title>Delete</v-list-item-title>
                        </v-list>
                    </v-menu>
                </v-btn>
            </template>
        </v-data-table-server>
    </div>
    <OfferLinkDialog v-on:close="closeOfferLinkDialog" :isTriggered="offerLinkDialog.isTriggered"
        :offerDetail="offerLinkDialog.offerDetail" />
</template>



<script setup>
import { VDataTableServer } from 'vuetify/lib/labs/components.mjs';
import OfferLinkDialog from '@/components/OfferLinkDialog.vue';
import { mdiLink } from '@mdi/js';
import { ref, reactive, watch } from 'vue';
import { getOffers } from '@/services/OfferService';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { formatDateTime } from '@/utils/helper';
const router = useRouter();
const route = useRoute();


const itemsPerPage = ref(route.query.per_page || 5);
const currentPage = ref(route.query.page || 1);
const tableHasData = ref(false);

const dataTable = reactive({
    headers: [
        {
            title: '#',
            align: 'start',
            sortable: true,
            key: 'id',
        },
        { title: 'Name', align: 'start', key: 'offer_name', sortable: false },
        { title: 'Network', align: 'start', key: 'network_name', sortable: false },
        { title: 'Payout', align: 'start', key: 'offer_payout', sortable: false },
        { title: 'Countries', align: 'start', key: 'country_allowed', sortable: false },
        { title: 'Platform', align: 'start', key: 'offer_type', sortable: false },
        { title: 'Links', align: 'start', key: 'offer_link', sortable: false },
        { title: 'Created at', align: 'start', key: 'created_at', sortable: true },
        { title: 'Options', align: 'start', key: 'options', sortable: false }
    ],
    items: [],
    pagination: {
        current_page: 0,
        total: 0,
        from: 1,
        to: 0,
        first_page_number: 0,
        next_page_number: 0,
        last_page_number: 0,
    }
});

const deepClonedOfferItems = ref(null);
const loading = ref(false);
const search = ref(null);

const filterOffer = () => {
    const filterdOffer = deepClonedOfferItems.value.filter((offer) => {
        return offer.offer_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase());
    })
    dataTable.items = filterdOffer;
    console.log(dataTable.items);
}


onMounted(async () => {
    await loadData();
    deepClonedOfferItems.value = JSON.parse(JSON.stringify(dataTable.items));
})

const formatOfferTypeToText = (type) => {
    if (!type) {
        return 'All';
    }
    if (type === 1) {
        return 'Desktop';
    }
    return 'Mobile';
}

const addOptionFieldToDataTableItems = (data) => {
    return data.map(item => ({
        ...item,
        options: 'null'
    }));
}

const loadData = async () => {
    loading.value = true;
    try {
        const response = await getOffers(currentPage.value, itemsPerPage.value);
        dataTable.items = addOptionFieldToDataTableItems(response.data);
        dataTable.pagination = response.pagination;
        tableHasData.value = dataTable.items.length > 0;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

const handlePageChange = (newPage) => {
    if (tableHasData.value) {
        currentPage.value = newPage;
        loadData();
    }
    if (currentPage.value > dataTable.pagination.last_page_number) {
        currentPage.value = 1;
    }
}

const sort = (event) => {
    if (event.length) {
        const [{ key, order }] = event;
        const nullDateObject = new Date("1970-01-01T14:10:18.000000Z");
        console.log(order);
        switch (key) {
            case 'id':
                if (order == 'asc') {
                    dataTable.items = dataTable.items.sort((a, b) => a.id - b.id);
                }
                if (order == 'desc') {
                    dataTable.items = dataTable.items.sort((a, b) => b.id - a.id);
                }
                break;
            case 'created_at':
                if (order == 'desc') {
                    dataTable.items = dataTable.items.sort((a, b) => {
                        let dateA = a.created_at ? new Date(a.created_at) : nullDateObject;
                        let dateB = b.created_at ? new Date(b.created_at) : nullDateObject;
                        return dateA - dateB;
                    });
                }
                if (order == 'asc') {
                    dataTable.items = dataTable.items.sort((a, b) => {
                        let dateA = a.created_at ? new Date(a.created_at) : nullDateObject;
                        let dateB = b.created_at ? new Date(b.created_at) : nullDateObject;
                        return dateB - dateA;
                    });
                }
                break;
        }
    }
}


watch(itemsPerPage, (newValue) => {
    router.replace({ query: { ...route.query, per_page: newValue } });
});

watch(currentPage, (newValue) => {
    router.replace({ query: { ...route.query, page: newValue } });
})


const offerLinkDialog = reactive({
    isTriggered: false,
    offerDetail: {}
});


const showOfferLinkDialog = (offerDetail) => {
    offerLinkDialog.offerDetail = offerDetail;
    offerLinkDialog.isTriggered = true;
}

const closeOfferLinkDialog = () => {
    offerLinkDialog.isTriggered = false;
}


</script>

<style scoped lang="scss">
.list-offer {
    padding: rem(20);

    .option-button {
        background-color: rgb(70, 69, 69);
        color: white;
        font-size: rem(13);
    }
}

:deep(.v-list) {
    min-width: rem(140) !important;
    a {
        text-decoration: none;
        color: inherit;
    }
    .v-list-item-title {
        cursor: pointer;
        padding-top: rem(5);
        padding-bottom: rem(5);
        padding-left: rem(10);
        padding-right: rem(10);
        font-size: rem(15);
        font-weight: 500;

        &:hover {
            background-color: rgb(226, 226, 226);
        }
    }
}
</style>