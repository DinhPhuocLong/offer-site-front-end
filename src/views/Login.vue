<template>
    <div class="login-form">
        <div class="form-title">
            <h2>Welcomeback!</h2>
            <span>Admin Panel Login</span>
        </div>
        <form>
            <div class="input">
                <label for="email">Email Adress</label>
                <input class="form-control" v-model="username" type="text" placeholder="Email or username" name="email" :disabled="isSubmitForm">
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input class="form-control" v-model="password" type="password" placeholder="Password" name="password" :disabled="isSubmitForm">
            </div>
            <div class="forgot-password">
                <a href="#">Forgot Password?</a>
            </div>
            <div class="form-submit">
                <button @click.prevent="handleLogin" :disabled="isSubmitForm">Login</button>
            </div>
            <div>
                <v-snackbar class="snackbar" v-model="snackbar" :color="snackbarColor">
                    {{ snackbarText }}
                </v-snackbar>
            </div>
        </form>
    </div>
</template>

<script setup>
import router from '@/router';
import { login } from '@/services/AuthService';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('');
const isSubmitForm = ref(false);

function showSnackbar() {
    snackbar.value = true;
}

const handleLogin = async () => {
    const credentials = {
        username: username.value,
        password: password.value
    }

    try {
        isSubmitForm.value = true;
        await login(credentials);
        snackbarText.value = 'Login successfully!';
        snackbarColor.value = 'success';
        showSnackbar();
        router.push({ name: 'Home' });
    } catch (error) {
        snackbarText.value = 'Wrong Email/Username or Password!';
        snackbarColor.value = 'error';
        showSnackbar();
    } finally {
        setTimeout(() => {
            isSubmitForm.value = false
        }, 2000);
        
    }
};

</script>

<style lang="scss" scoped>
.login-form {
    width: rem(400);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 4px 10px hsla(0, 0%, 71.4%, .18);
    padding: rem(40);
    font-family: 'Roboto', sans-serif;

    .form-title {
        font-size: rem(20);
        margin-bottom: rem(20);

        h2 {
            margin-bottom: 0;
        }

        span {
            font-size: rem(16);
        }
    }

    .input {
        display: flex;
        flex-direction: column;
        font-size: rem(15);
        color: #212529;

        .form-control {
            margin-top: rem(5);
            margin-bottom: rem(20);
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border-radius: 0.25rem;
            transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }
    }

    .forgot-password {
        a {
            font-size: rem(14);
            color: blue;
            margin-left: rem(5);
        }
    }

    .form-submit {
        margin-top: rem(20);

        button {
            margin: auto;
            display: block;
            padding: rem(10) rem(30);
            background-color: red;
            border-radius: rem(45);
            color: black;
            background-color: #fff;
            box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
        }
    }
}
</style>