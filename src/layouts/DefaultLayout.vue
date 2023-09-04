<template>
    <div>
        <header class="header">
            <div class="container">
                <div class="row">
                    <div class="header-items">
                        <div class="logo">
                            Superlead
                        </div>

                        <!-- <div class="pinned-message">
                            Put something here !
                        </div> -->

                        <div class="user">
                            <div class="text-center">
                                <v-menu :location="location">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="profile transparent-overlay" :ripple="false" v-bind="props">
                                            <span class="user-name">{{ authUser?.name }}</span>
                                            <v-icon :icon="mdiChevronDown" />
                                        </v-btn>
                                    </template>

                                    <v-list class="list-item">
                                        <v-list-item>
                                            <router-link to="/profile">
                                                <v-list-item-title>Profile</v-list-item-title>
                                            </router-link>
                                            <router-link to="">
                                                <v-list-item-title @click="handleLogout">Logout</v-list-item-title>
                                            </router-link>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- sticky sidebar -->
        <SideBar />

        <main>
            <router-view></router-view>
        </main>

        <!-- <footer>
            this is the footer
        </footer> -->
    </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue';
import { logout } from '@/services/AuthService';
import { mdiChevronDown } from '@mdi/js';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const location = ref('bottom');

store.dispatch('getAuthUser');

const authUser = computed(() => {
    return store.getters.getAuthUser;
});


const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.log(error);
    }
} 
</script>

<style lang="scss" scoped>
main {
    margin-left: rem(230);
}

header {
    background-color: #fff;
    box-shadow: 0 4px 10px hsla(0, 0%, 71.4%, .18);
}

.container {
    max-width: 125rem;
}

.header-items {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: rem(20);

    .logo {
        font-weight: bold;
        font-size: rem(20);
    }

    .user {
        cursor: pointer;
        display: flex;
        align-items: center;

        i {
            font-size: rem(20);
            color: black;
            font-weight: bold !important;
        }

        .v-btn {
            box-shadow: none;
            transition: none;
        }

        .v-btn:hover,
        .v-btn:active,
        .v-btn:focus {
            box-shadow: none;
            background-color: transparent;
        }

        :deep(.v-btn:hover > .v-btn__overlay) {
            opacity: 0 !important;
        }

        :deep(.v-btn > .v-btn__overlay) {
            opacity: 0;
        }

    }
}

.list-item {
    width: rem(120);
    a {
        display: block;
        color: black;
        text-decoration: none;
        margin-bottom: rem(10);
        &:hover {
            color: blue;
            text-decoration: underline;
        }
    }
}
</style>