const fetchUserProjects = async (userID: number) => {
  let { data, status, error }: any = await dataFetch("/user-projects", {
    params: {
      user_id: userID,
    },
  });

  return { data, status, error };
};

const createUserProject = async (form: Object | any) => {
  const toast: any = useNuxtApp().$toast;
  let filesForUpload: any = [];

  // Iterate over the form and check if there are files to upload
  for (let [key, value] of Object.entries(form)) {
    if (value.files.length > 0) {
      // Reset the filesForUpload array
      filesForUpload = value.files.filter((file: File) => file instanceof File);

      // Check if there are files to upload
      if (filesForUpload.length > 0) {
        // Add a toast to show that file is uploading
        setTimeout(() => {
          toast.loading(
            `Project ${key}: Uploading files 0/${
              filesForUpload.length
            }`,
            {
              toastId: `${key}_projectFileUpload`,
            }
          );
        }, 100);

        for (let fileKey = 0; fileKey < filesForUpload.length; fileKey++) {
          // Update the toast to show the progress
          toast.update(`${key}_projectFileUpload`, {
            type: "loading",
            render: `Project ${key}: Uploading files ${fileKey}/${filesForUpload.length}`,
            isLoading: true,
          });

          const file = filesForUpload[fileKey];
          const response = await uploadFile(file, "projects/");

          if (response.status.value == "success") {
            filesForUpload[fileKey] = response.data.value.url;
          } else {
            // Show an error toast
            toast.update(`${key}_projectFileUpload`, {
              type: "error",
              render: `Project ${key}: Error uploading file ${fileKey}/${filesForUpload.length}`,
              isLoading: false,
            });

            // Remove the file from the form
            delete filesForUpload[fileKey];
          }
        }

        // Update the form with the uploaded files
        form[key].files = form[key].files.filter(
          (file: File | String) => !(file instanceof File)
        );
        form[key].files.push(...filesForUpload);

        toast.update(`${key}_projectFileUpload`, {
          type: "success",
          render: `Project ${key}: Files uploaded`,
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  }

  let { data, status, error }: any = await dataFetch("/user-projects", {
    method: "post",
    body: {
      projects: form,
    },
  });

  return { data, status, error };
};

const deleteUserProject = async (userProjectID: Number) => {
  let { data, status, error }: any = await dataFetch(
    `/user-projects/${userProjectID}`,
    {
      method: "delete",
    }
  );

  return { data, status, error };
};

export { fetchUserProjects, createUserProject, deleteUserProject };
