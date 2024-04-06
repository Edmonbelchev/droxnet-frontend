import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore: any = useAuthStore()
    
    // If logged in state doesn't exists
    if (!authStore.loggedIn) {
         // Try to authenticated user
         await authStore.authenticated();

         if(to?.path == '/email-verification'){
            return navigateTo('/register');
         }

         // Perform redirections after authentication
         if(authStore.loggedIn){
            if(!authStore.user.email_verified && to?.path != '/email-verification') {
                return navigateTo('/email-verification');
            }

            // If email is verified, redirect to home page
            if(authStore.user.email_verified && to?.path == '/email-verification') {
                return navigateTo('/');
            }

            if(to?.path == '/login' || to?.path == '/register') {
                return navigateTo('/');
            }
         }
    } else {
        // If logged in state exists
        if(!authStore.user.email_verified && to?.path != '/email-verification') {
            return navigateTo('/email-verification');
        }

        // If email is verified, redirect to home page
        if(authStore.user.email_verified && to?.path == '/email-verification') {
            return navigateTo('/');
        }

        if(to?.path == '/login' || to?.path == '/register') {
            return navigateTo('/');
        }
    }
});