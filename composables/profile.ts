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

    const uploadedFile: any = await uploadImage(form.profile_image, "avatars/");

    if(uploadedFile.status.value == "success") {
      // Update the form with the new profile_image
      form.profile_image = uploadedFile.data.value.url;

      setTimeout(() => {
        toast.update("toastAvatar", {
          type: "success",
          render: "Avatar uploaded successfully",
          isLoading: false,
          autoClose: 1000,
        });
      }, 100)
    } else {
      // Update the form with the new profile_image
      form.profile_image = "";

      setTimeout(() => {
        toast.update("toastAvatar", {
          type: "error",
          render: "Avatar upload failed",
          isLoading: false,
          autoClose: 1000,
        });
      }, 100)
    }
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

    const uploadedFile: any = await uploadImage(
      form.profile_banner,
      "banners/",
      [1920, 460]
    );

    if(uploadedFile.status.value == "success") {
      // Update the form with the new profile_banner
      form.profile_banner = uploadedFile.data.value.url;

      toast.update("toastBanner", {
        type: "success",
        render: "Banner uploaded successfully",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      // Update the form with the new profile_banner
      form.profile_banner = "";

      toast.update("toastBanner", {
        type: "error",
        render: "Banner upload failed",
        isLoading: false,
        autoClose: 1000,
      });
    }
  }

  toast.loading("Updating profile", {
    toastId: "toastUpdateProfile",
  });

  let { data, status, error }: any = await dataFetch("/profile/update", {
    method: "put",
    body: form,
  });

  if (status.value == "success") {
    const authStore: any = useAuthStore();
    authStore.user = data.value.data;

    toast.update("toastUpdateProfile", {
      type: "success",
      render: "Updated successfully",
      isLoading: false,
      autoClose: 1000,
    });
  } else {
    error = error._object[error._key].data.message;

    toast.update("toastUpdateProfile", {
      type: "error",
      render: error,
      isLoading: false,
      autoClose: 1000,
    });
  }

  return { data, status, error };
};

export { updateProfile };
