<template>
    <div class="panels">
        <v-row>
            <v-col>
                <DailyStatisticPanel :panelTitle="'today\'s clicks'" :panelValue="10"
                    :panelBottomValue="'This month: 300'" />
            </v-col>
            <v-col>
                <DailyStatisticPanel :panelTitle="'Today\'s conversions'" :panelValue="200"
                    :panelBottomValue="'This month: 500'" />
            </v-col>
            <v-col>
                <DailyStatisticPanel :panelTitle="'Balance'" :panelValue="1000" :panelBottomValue="'This month: 10000'" />
            </v-col>
            <v-col>
                <DailyStatisticPanel :panelTitle="'Total Revenue'" :panelValue="10000" />
            </v-col>
        </v-row>
    </div>
    <div class="real-time-lead-panel">
        <v-row>
            <v-col>
                <RealTimeLeadPanel />
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DailyStatisticPanel from '@/components/DailyStatisticPanel.vue';
import RealTimeLeadPanel from '@/components/RealTimeLeadReport.vue'
</script>
<style lang="scss" scoped>
.panels, .real-time-lead-panel {
    padding: rem(20);
    padding-bottom: 0;
}
</style>