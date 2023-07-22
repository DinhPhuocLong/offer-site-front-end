<template>
    <div class="panel">
        <div class="panel-title">{{ panelTitle }}</div>
        <div class="panel-value">{{ panelValue }}</div>
        <div class="panel-bottom-value">{{ panelBottomValue }}</div>
    </div>
</template>

<script setup>
defineProps({
    panelTitle: {
        type: String,
        required: true,
        default: undefined
    },
    panelValue: {
        type: Number,
        required: true,
        default: undefined
    },
    panelBottomValue: {
        type: String,
        required: false,
        default: undefined
    }
});
</script>

<style lang="scss" scoped>
.panel {
    background-color: #FFFF;
    border-radius: rem(8);
    height: rem(150);
    width: 100%;
    padding: rem(20);
    .panel-title {
        font-size: rem(16);
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: rem(10);
    }
    .panel-value {
        font-size: rem(25);
        font-weight: bold;
        border-bottom: 1px solid rgb(197, 196, 196);
        padding-bottom: rem(10);
    }
    .panel-bottom-value {
        margin-top: rem(10);
        font-size: rem(15);
    }
}
</style>