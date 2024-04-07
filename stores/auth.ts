import { defineStore } from "pinia";

interface AuthState {
  loggedIn: boolean;
  user: Object;
}

const runtimeConfig = useRuntimeConfig();

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    loggedIn: false,
    user: {},
  }),

  actions: {
    async signIn(params: any) {
      const { data, status, error } = await dataFetch("/login", {
        method: "post",
        body: params,
      });

      if (status.value == "success") {
        setCookie("BEARER_TOKEN", data.value.data.token);

        // Authenticate user
        return this.authenticated();
      } else {
        const errorMessage = error._object[error._key].data.message;

        return { status, errorMessage };
      }
    },

    async signOut() {
      const { status } = await dataFetch("/logout", {
        method: "post",
      });

      if (status.value == "success") {
        this.user = {};
        this.loggedIn = false;

        const router = useRouter();
        router.push("/login");
      }

      return status;
    },

    async authenticated() {
      const { data: user, status, error }: any = await dataFetch("/profile");

      // Set user state
      if (status.value == "success") {
        // Change login state
        this.loggedIn = true;

        this.user = user.value.data;
        // Set loggedIn state
        this.loggedIn = user.value ? true : false;
      }

      return { user, status };
    },

    async resetPassword(email: string) {
      const { data: success, error } = await dataFetch(
        "/forgot-password",
        {
          method: "post",
          body: {
            email: email,
          },
        },
        useRuntimeConfig().public.publicUrl
      );

      return { success, error };
    },

    async newPassword(params: any) {
      const { data: success, error } = await dataFetch(
        runtimeConfig.public.apiUrl + "/reset-password",
        {
          method: "post",
          body: params,
        },
        useRuntimeConfig().public.publicUrl
      );

      return { success, error };
    },

    async signUp(params: any) {
      const { data, status, error } = await dataFetch("/register", {
        method: "post",
        body: params,
      });

      let errorMessage;

      if (status.value == "error") {
        errorMessage = error._object[error._key].data.message;
      } else {
        setCookie("BEARER_TOKEN", data.value.data.token);
      }

      return { data, status, errorMessage };
    },
  },
});
