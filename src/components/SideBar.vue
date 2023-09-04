<template>
    <div class="side-bar">
        <div class="side-bar-title">
            Navigator
        </div>
        <ul class="menu">
            <li class="menu-item" v-for="(item, i) in items" :key="i">
                <router-link :to="item.to" @click="toggleSubmenu(i)" v-if="item.to" active-class="active" exact>
                    <v-icon v-if="item.icon" :icon="item.icon"></v-icon>
                    <span>
                        {{ item.text }}
                    </span>
                    <v-icon v-if="item.subItems" :icon="mdiChevronDown" :class="{ 'rotate': item.isActive }"></v-icon>
                </router-link>
                <span @click="toggleSubmenu(i)" v-else>
                    <v-icon v-if="item.icon" :icon="item.icon"></v-icon>
                    <span>
                        {{ item.text }}
                    </span>
                    <v-icon v-if="item.subItems" :icon="mdiChevronDown" :class="{ 'rotate': item.isActive }"></v-icon>
                </span>
                <ul class="sub-menu" v-if="item.isActive">
                    <li class="sub-menu-item" v-for="(subItem, j) in item.subItems" :key="j">
                        <router-link :to="subItem.to" active-class="active" exact>
                            <v-icon v-if="subItem.icon" :icon="subItem.icon"></v-icon>
                            {{ subItem.text }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { mdiMonitorDashboard, mdiAccount, mdiFinance, mdiFlag, mdiBookmarkOutline, mdiDomain, mdiCogs, mdiChevronDown, mdiAccountGroup } from '@mdi/js';
const items = ref([
    {
        text: 'Dashboard', icon: mdiMonitorDashboard, to: '/',
        isActive: false
    },
    { text: 'Publisher', icon: mdiAccount, to: '/publisher', isActive: false },
    {
        text: 'Networks', icon: mdiFlag, isActive: false,
        subItems: [
            { text: 'Add network', to: '/add-network' },
            { text: 'List Network', to: '/network' },
            { text: 'Postback Error', to: '/pb-error' },

        ]
    },
    {
        text: 'Offers', icon: mdiBookmarkOutline, isActive: false,
        subItems: [
            { text: 'Add Offer', to: '/offer/add' },
            { text: 'List Offer', to: '/offer' },
        ],
    },
    {
        text: 'Members', icon: mdiAccountGroup, isActive: false,
        subItems: [
            { text: 'Add Member', to: '/add-member' },
            { text: 'List Member', to: '/member' },
        ],
    },
    {
        text: 'Statistics', icon: mdiFinance, isActive: false,
        subItems: [
            { text: 'Report Conversions', to: '/conversion' },
            { text: 'Report Lead Click', to: '/lclick' },
            { text: 'Report Click', to: '/click' },
            { text: 'Report By Country', to: '/country' },
            { text: 'Report By Offer', to: '/offer' },
            { text: 'Report By Member', to: '/member' },
        ],
    },
    { text: 'Domains', icon: mdiDomain, to: '/domain', isActive: false },
    { text: 'Settings', icon: mdiCogs, to: '/setting', isActive: false },
]);
const toggleSubmenu = (index) => {
    items.value[index].isActive = !items.value[index].isActive;
}
</script>

<style lang="scss" scoped>
.router-link-exact-active {  // highlight active route
    color: black !important;
    font-weight: 600;
}
.side-bar {
    width: rem(230);
    height: 100vh;
    position: fixed;
    box-shadow: 0 4px 10px hsla(0, 0%, 71.4%, 0.18);
    background-color: #FFFF;
    padding-left: rem(20);
    user-select: none;

    .side-bar-title {
        font-size: rem(18);
        margin-left: rem(10);
        margin-bottom: rem(20);
        margin-top: rem(15);
    }

    .menu {
        margin-left: rem(10);
        list-style: none;

        .menu-item {
            margin-bottom: rem(20);

            i {
                margin-right: rem(20);
            }

            span {
                display: flex;
                font-size: rem(16);
                color: rgb(43, 42, 42);
                text-decoration: none;
                align-items: center;

                span {
                    flex-grow: 1;
                }
            }
            a {
                display: flex;
                font-size: rem(16);
                color: rgb(43, 42, 42);
                text-decoration: none;
                align-items: center;

                span {
                    flex-grow: 1;
                }
            }
        }

        .sub-menu {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: rem(11);
                display: block;
                height: 100%;
                width: 1px;
                background-color: rgb(207, 206, 206);
            }
        }

        .sub-menu-item {
            list-style: none;

            a {
                margin-left: rem(45);
                font-size: rem(13);
                color: rgb(123, 123, 123);
            }


        }
    }

    .rotate {
        display: block;
        transform: rotate(180deg);
        transition: transform 0.1s ease-in 0s;
    }
}
</style>