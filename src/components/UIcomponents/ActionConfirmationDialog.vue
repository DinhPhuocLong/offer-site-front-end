<template>
    <v-dialog :model-value="showDialog" persistent width="auto">
        <v-card>
            <v-card-title class="text-h5 text-red">
                {{ dialogTitle }}
            </v-card-title>
            <v-card-text>{{ dialogDetail }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" variant="text" @click="confirm">
                    {{ agreeButtonText }}
                </v-btn>
                <v-btn color="black" variant="text" @click="cancle">
                    {{ disagreeButtonText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>

defineProps({
    showDialog: {
        type: Boolean,
        default: false
    },
    dialogTitle: {
        default: 'Confirm this action!',
        type: String
    },
    dialogDetail: {
        type: String,
        default: 'This action can\'t be undone!',
    },
    agreeButtonText: {
        type: String,
        default: 'Yes'
    },
    disagreeButtonText: {
        type: String,
        default: 'No'
    }
})

const emit = defineEmits(['confirmAction', 'cancleAction']);
const confirm = () => {
    emit('confirmAction');
}
const cancle = () => {
    emit('cancleAction');
}

</script>