import { isLoggedIn } from "@/services/AuthService";

export function requireGuest(to, from ,next) {
    if (isLoggedIn()) {
        next({ name: 'Home' });
    } else {
        next();
    }
}

export function requeireMember(to, from, next) {
    if (!isLoggedIn()) {
        next({ name: 'Login' });
    } else {
        next();
    }
}