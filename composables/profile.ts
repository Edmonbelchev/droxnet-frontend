const updateProfile = async (form: Object | any) => {
  const user: any = useAuthStore().user;

  // Check if the profile_image is different from the user's profile_image
  if(form.profile_image != user.profile_image && form.profile_image instanceof File) {
    const uploadedFile: any = await uploadFiles(form.profile_image, "avatars/");
  
    // Update the form with the new profile_image
    form.profile_image = uploadedFile.value.url;
  }

  // Check if the profile_banner is different from the user's profile_banner
  if(form.profile_banner != user.profile_banner && form.profile_banner instanceof File) {
    const uploadedFile: any = await uploadFiles(form.profile_banner, "banners/", [1920, 460]);
  
    // Update the form with the new profile_banner
    form.profile_banner = uploadedFile.value.url;
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
