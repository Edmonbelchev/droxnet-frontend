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
    if (to?.path == "/email-verification") {
      return navigateTo("/register");
    }

    if (to?.path !== "/login" && to?.path !== "/register" && to?.path !== "/") {
      return navigateTo("/");
    }
  }
});
