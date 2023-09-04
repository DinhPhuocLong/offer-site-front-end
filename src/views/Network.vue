<template>
    <div class="list-network">
        <h2>List Network</h2>
        <v-text-field label="Search network name" v-model="filterNetworkName" hide-details="auto"
                @input="filterNetworkByName"></v-text-field>
        <v-table density="comfortable">
            <thead>
                <tr>
                    <th class="text-left">
                        #
                    </th>
                    <th class="text-left" width="35%">
                        Name
                    </th>
                    <th class="text-left">
                        Details
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
                <tr v-if="(!filteredNetworkData.length)">
                    <td class="text-center" colspan="5">No data available</td>
                </tr>
                <tr v-for="(network) in filteredNetworkData" :key="network.name">
                    <td>{{ network?.id }}</td>
                    <td>{{ network?.name }}</td>
                    <td>
                        <button class="view-detail" @click="viewNetworkDetail(network)">
                            <v-icon :icon="mdiEyeOutline"></v-icon>
                        </button>
                    </td>
                    <td>
                        <button class="view-postback" @click="openNetworkPostbackDialog(network)">
                            Postback
                        </button>
                    </td>
                    <td>
                        <v-menu :location="'right'">
                            <template v-slot:activator="{ props }">
                                <v-icon :icon="mdiCog" v-bind="props"></v-icon>
                            </template>
                            <v-list>
                                <v-list-item-title @click="editNetworkDetail(network)">Edit</v-list-item-title>
                                <v-list-item-title>Reset Click</v-list-item-title>
                                <v-list-item-title>Reset Lead</v-list-item-title>
                                <v-list-item-title>Deactivate Network</v-list-item-title>
                                <v-list-item-title @click="handleRemoveNetwork(network)">Delete Network</v-list-item-title>
                            </v-list>
                        </v-menu>
                        <ActionConfirmationDialog :dialogTitle="actionConfirmationDialog.dialogTitle"
                            :dialogDetail="actionConfirmationDialog.dialogDetail"
                            :agreeButtonText="actionConfirmationDialog.agreeButtonText"
                            :disagreeButtonText="actionConfirmationDialog.disagreeButtonText"
                            :showDialog="actionConfirmationDialog.show" @confirmAction="confirmRemoveNetwork(network)"
                            @cancleAction="cancleRemoveNetwork" />
                    </td>
                </tr>
            </tbody>
        </v-table>
        <NetworkPostbackModal :networkName="networkName" :networkId="networkId"
            :networkPostBackDialog="networkPostBackDialog" @close="closeNetworkPostbackDialog" />
        <NetworkDetail @propsChanged="networkEdited" :showNetworkDetailDialog="networkDetailDialog.show"
            :network="networkDetailDialog.networkData" :readOnly="networkDetailDialog.readOnly"
            @closeNetworkDetailDialog="closeNetworkDetailDialog" />

        <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
            {{ snackbar.text }}
            <template v-slot:actions>
                <v-btn color="black" variant="text" @click="snackbar.show = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script setup>
import { mdiEyeOutline } from '@mdi/js';
import { getNetworks } from '@/services/NetworkService';
import { ref, reactive, onMounted } from 'vue';
import { mdiCog } from '@mdi/js'
import NetworkPostbackModal from '@/components/NetworkPostbackModal';
import NetworkDetail from '@/components/NetworkDetail';
import { removeNetwork } from '@/services/NetworkService';
import ActionConfirmationDialog from '@/components/UIcomponents/ActionConfirmationDialog'
const networks = reactive([]);
const networkPostBackDialog = ref(false);
const networkDetailDialog = reactive({
    show: false,
    readOnly: false,
    networkData: {}
});
const networkId = ref(0);
const networkName = ref(null);
const actionConfirmationDialog = reactive({
    show: false,
    dialogTitle: '',
    dialogDetail: '',
    agreeButtonText: '',
    disagreeButtonText: ''
});

const snackbar = reactive({
    show: false,
    text: '',
});


const filterNetworkName = ref('');
const filteredNetworkData = ref(networks);

onMounted(async () => {
    try {
        const response = await getNetworks();
        networks.push(...response.data);
    } catch (error) {
        console.log(error);
    }
});
const openNetworkPostbackDialog = (network) => {
    networkPostBackDialog.value = true;
    networkId.value = network.id;
    networkName.value = network.name;
}

const viewNetworkDetail = (network) => {
    networkDetailDialog.networkData = network;
    networkDetailDialog.readOnly = true;
    networkDetailDialog.show = true;
}

const editNetworkDetail = (network) => {
    networkDetailDialog.networkData = network;
    networkDetailDialog.readOnly = false;
    networkDetailDialog.show = true;
}

const networkEdited = (data) => {
    const editedNetwork = networks.find((network) => network.id == data.id);
    Object.assign(editedNetwork, data);
}

const closeNetworkPostbackDialog = () => {
    networkPostBackDialog.value = false;
}

const closeNetworkDetailDialog = () => {
    networkDetailDialog.show = false;
}

const handleRemoveNetwork = (network) => {
    actionConfirmationDialog.show = true;
    actionConfirmationDialog.dialogTitle = `Are you sure want to delete ${network.name} network?`;
    actionConfirmationDialog.dialogDetail = `This action can't be undone!`;
    actionConfirmationDialog.agreeButtonText = `I'm sure`;
    actionConfirmationDialog.disagreeButtonText = `Cancel`;
}

const confirmRemoveNetwork = async (network) => {
    try {
        await removeNetwork(network.id);
        actionConfirmationDialog.show = false;
        const indexToDelete = networks.findIndex(item => item.id === network.id);
        if (indexToDelete !== -1) {
            networks.splice(indexToDelete, 1);
        }
        snackbar.text = "Delete successful!";
        snackbar.color = 'success';
        snackbar.show = true;
    } catch (error) {
        actionConfirmationDialog.show = false;
        snackbar.text = "Error when deleting network!";
        snackbar.color = 'error';
        snackbar.show = true;
    }
}

const cancleRemoveNetwork = () => {
    actionConfirmationDialog.show = false;
}


const filterNetworkByName = () => {
    const filteredData = networks.filter(network => {
        return network.name.toLocaleLowerCase().includes(filterNetworkName.value.toLocaleLowerCase());
    });
    filteredNetworkData.value = filteredData;
}
</script>

<style lang="scss" scoped>
.list-network {
    padding: rem(20);

    .view-postback {
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

:deep(.v-list) {
    min-width: rem(140) !important;

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

