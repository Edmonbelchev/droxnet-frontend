import { useAuthStore } from "@/stores/auth";
import isAuthenticated from "~/composables/authenticated";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore: any = useAuthStore();

  if (await isAuthenticated()) {
    if (!authStore.user.email_verified && to?.path != "/email-verification") {
      return navigateTo("/email-verification");
    }

    // If email is verified, redirect to home page
    if (authStore.user.email_verified && to?.path == "/email-verification") {
      return navigateTo("/");
    }

    if (to?.path == "/login" || to?.path == "/register") {
      return navigateTo("/");
    }
  } else {
    // Allow access to users, companies, and jobs pages (including subpages) for unauthenticated users
    const allowedPaths = ["/login", "/register", "/"];
    const allowedPrefixes = ["/users", "/companies", "/jobs"];
    
    if (!allowedPaths.includes(to?.path) && !allowedPrefixes.some(prefix => to?.path.startsWith(prefix))) {
      return navigateTo("/");
    }
  }
});
