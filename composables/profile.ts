const updateProfile = async (form: Object | any) => {
  const user: any = useAuthStore().user;
  const toast: any = useNuxtApp().$toast;

  // Check if the profile_image is different from the user's profile_image
  if (
    form.profile_image != user.profile_image &&
    form.profile_image instanceof File
  ) {
    // Add a toast to show that an image is uploading
    toast.loading("Uploading profile image...", {
      toastId: "toastAvatar",
    });

    const uploadedFile: any = await uploadFiles(form.profile_image, "avatars/");

    // Update the form with the new profile_image
    form.profile_image = uploadedFile.value.url;

    // Update the toast to show that the image has been uploaded
    setTimeout(() => {
      toast.update("toastAvatar", {
        type: "success",
        text: "Profile image uploaded successfully",
        isLoading: false,
        autoClose: 600,
      });
    }, 100)
  }

  // Check if the profile_banner is different from the user's profile_banner
  if (
    form.profile_banner != user.profile_banner &&
    form.profile_banner instanceof File
  ) {
    // Add a toast to show that an image is uploading
    toast.loading("Uploading profile banner...", {
      toastId: "toastBanner",
    });

    const uploadedFile: any = await uploadFiles(
      form.profile_banner,
      "banners/",
      [1920, 460]
    );

    // Update the form with the new profile_banner
    form.profile_banner = uploadedFile.value.url;

    toast.update("toastBanner", {
      type: "success",
      text: "Profile image uploaded successfully",
      isLoading: false,
      autoClose: 800,
    });
  }

  let { data, status, error }: any = await dataFetch("/profile/update", {
    method: "put",
    body: form,
  });

  if (status.value == "success") {
    const authStore: any = useAuthStore();
    authStore.user = data.value.data;
  } else {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

export { updateProfile };
