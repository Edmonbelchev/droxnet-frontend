import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore: any = useAuthStore()
    
    // If logged in state doesn't exists
    if (!authStore.loggedIn) {
         // Try to authenticated user
         await authStore.authenticated();

         // Perform redirections after authentication
         if(authStore.loggedIn){
            // TODO: CHECK FOR VERIFIED EMAILS

            if(to?.path == '/login' || to?.path == '/register') {
                return navigateTo('/');
            }
         }
    } else {
        // If logged in state exists
        // TODO: VERIFY EMAIL

        if(to?.path == '/login' || to?.path == '/register') {
            return navigateTo('/');
        }
    }
});