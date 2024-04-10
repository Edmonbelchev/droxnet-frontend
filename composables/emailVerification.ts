import { useAuthStore } from "@/stores/auth";

const validateEmail = async (token: string) => {
  const { data, status, error }: any = await dataFetch("/email/validate", {
    method: "post",
    body: { token: token },
  });

  const authStore: any = useAuthStore();

  if (data.value.status == true) {
    // If email is verified, update the user object in the store
    authStore.user.email_verified = true;
  }

  return { data, status, error };
};

const sendEmailVerification = async () => {
  const { data, status, error }: any = await dataFetch(
    "/email/generate-token",
    {
      method: "post",
    }
  );

  return { data, status, error };
};

export { validateEmail, sendEmailVerification };
