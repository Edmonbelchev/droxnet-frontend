const fetchJobs = async (
  perPage: number = 15,
  page: number = 1,
  body: Array<Object> = []
) => {
  const params: any = {
    per_page: perPage,
    page: page,
  };

  // Iterate over body keys and add them to params, handling arrays properly
  for (let key in body) {
    if (Array.isArray(body[key]) && body[key].length > 0) {
      body[key].forEach((value: any, index: number) => {
        params[`${key}[${index}]`] = value; // Format array parameters properly
      });
    } else if (
      body[key] !== null &&
      body[key] !== undefined &&
      body[key] !== ""
    ) {
      params[key] = body[key];
    }
  }

  let { data, status, error }: any = await dataFetch("/jobs", {
    params: params,
  });

  return { data, status, error };
};

const fetchJob = async (id: number) => {
  let { data, status, error }: any = await dataFetch(`/jobs/${id}`);

  return { data, status, error };
};

const fetchUserJobs = async (
  perPage: number = 15,
  page: number = 1,
  statusValue: string = ""
) => {
  const params: any = {
    per_page: perPage,
    page: page,
  };

  if (statusValue) {
    params.status = statusValue;
  }

  let { data, status, error }: any = await dataFetch("/user-jobs", {
    params: params,
  });

  return { data, status, error };
};

const createJob = async (form: any) => {
  const toast: any = useNuxtApp().$toast;
  let filesForUpload: any = [];

  // Iterate over the form and check if there are files to upload
  for (let [key, value] of Object.entries(form)) {
    if (key === "files" && value.length > 0) {
      // Reset the filesForUpload array
      filesForUpload = value.filter((file: File) => file instanceof File);

      // Check if there are files to upload
      if (filesForUpload.length > 0) {
        // Add a toast to show that file is uploading
        setTimeout(() => {
          toast.loading(`Uploading files 0/${filesForUpload.length}`, {
            toastId: `${key}_jobFileUpload`,
          });
        }, 100);

        for (let fileKey = 0; fileKey < filesForUpload.length; fileKey++) {
          // Update the toast to show the progress
          toast.update(`${key}_jobFileUpload`, {
            type: "loading",
            render: `Uploading files ${fileKey}/${filesForUpload.length}`,
            isLoading: true,
          });

          const file = filesForUpload[fileKey];
          const response = await uploadFile(file, "jobs/");

          if (response.status.value == "success") {
            filesForUpload[fileKey] = response.data.value.url;
          } else {
            // Show an error toast
            toast.update(`${key}_jobFileUpload`, {
              type: "error",
              render: `Error uploading file ${fileKey}/${filesForUpload.length}`,
              isLoading: false,
            });

            // Remove the file from the form
            delete filesForUpload[fileKey];
          }
        }

        // Update the form with the uploaded files
        form.files = form.files.filter(
          (file: File | String) => !(file instanceof File)
        );
        form.files.push(...filesForUpload);

        toast.update(`${key}_jobFileUpload`, {
          type: "success",
          render: `Files uploaded`,
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  }

  let { data, status, error }: any = await dataFetch("/jobs", {
    method: "POST",
    body: form,
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const updateJob = async (form: any, id: number) => {
  const toast: any = useNuxtApp().$toast;
  let filesForUpload: any = [];

  // Iterate over the form and check if there are files to upload
  for (let [key, value] of Object.entries(form)) {
    if (key === "files" && value.length > 0) {
      // Reset the filesForUpload array
      filesForUpload = value.filter((file: File) => file instanceof File);

      // Check if there are files to upload
      if (filesForUpload.length > 0) {
        // Add a toast to show that file is uploading
        setTimeout(() => {
          toast.loading(`Uploading files 0/${filesForUpload.length}`, {
            toastId: `${key}_jobFileUpload`,
          });
        }, 100);

        for (let fileKey = 0; fileKey < filesForUpload.length; fileKey++) {
          // Update the toast to show the progress
          toast.update(`${key}_jobFileUpload`, {
            type: "loading",
            render: `Uploading files ${fileKey}/${filesForUpload.length}`,
            isLoading: true,
          });

          const file = filesForUpload[fileKey];
          const response = await uploadFile(file, "jobs/");

          if (response.status.value == "success") {
            filesForUpload[fileKey] = response.data.value.url;
          } else {
            // Show an error toast
            toast.update(`${key}_jobFileUpload`, {
              type: "error",
              render: `Error uploading file ${fileKey}/${filesForUpload.length}`,
              isLoading: false,
            });

            // Remove the file from the form
            delete filesForUpload[fileKey];
          }
        }

        // Update the form with the uploaded files
        form.files = form.files.filter(
          (file: File | String) => !(file instanceof File)
        );
        form.files.push(...filesForUpload);

        toast.update(`${key}_jobFileUpload`, {
          type: "success",
          render: `Files uploaded`,
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  }

  let { data, status, error }: any = await dataFetch(`/jobs/${id}`, {
    method: "PUT",
    body: form,
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const destroyJob = async (id: number) => {
  let { data, status, error }: any = await dataFetch(`/jobs/${id}`, {
    method: "DELETE",
  });

  return { data, status, error };
};

const jobCounter = async (value: string) => {
  let { data, status, error }: any = await dataFetch("/jobs/counter", {
    params: {
      status: value,
    },
  });

  return { data, status, error };
};

const updateJobStatus = async (id: number, value: string) => {
  let { data, status, error }: any = await dataFetch(
    `/jobs/${id}/update-status`,
    {
      method: "PATCH",
      body: {
        status: value,
      },
    }
  );

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

export {
  fetchJobs,
  fetchJob,
  fetchUserJobs,
  createJob,
  updateJob,
  destroyJob,
  jobCounter,
  updateJobStatus,
};
