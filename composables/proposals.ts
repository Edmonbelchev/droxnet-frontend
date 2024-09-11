const createProposal = async (form: any) => {
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
            toastId: `${key}_proposalFileUpload`,
          });
        }, 100);

        for (let fileKey = 0; fileKey < filesForUpload.length; fileKey++) {
          // Update the toast to show the progress
          toast.update(`${key}_proposalFileUpload`, {
            type: "loading",
            render: `Uploading files ${fileKey}/${filesForUpload.length}`,
            isLoading: true,
          });

          const file = filesForUpload[fileKey];
          const response = await uploadFile(file, "proposals/");

          if (response.status.value == "success") {
            filesForUpload[fileKey] = response.data.value.url;
          } else {
            // Show an error toast
            toast.update(`${key}_proposalFileUpload`, {
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

        toast.update(`${key}_proposalFileUpload`, {
          type: "success",
          render: `Files uploaded`,
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  }

  let { data, status, error }: any = await dataFetch("/proposals", {
    method: "POST",
    body: form,
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const fetchProposals = async (
  perPage: number = 8,
  page: number = 1,
  query: string = "",
  jobID: number | null = null
) => {

  let params: any = {
    page: page,
    per_page: perPage,
  };

  if (query) {
    params.query = query;
  }

  if (jobID) {
    params.job_id = jobID
  }

  let { data, status, error }: any = await dataFetch('/proposals', {
      params: params
    }
  );

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
}

const fetchProposal = async (id: number) => {
  let { data, status, error }: any = await dataFetch(`/proposals/${id}`);

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
}

const updateProposalStatus = async (id: number, value: string) => {
  let { data, status, error }: any = await dataFetch(`/proposals/${id}/update-status`, {
    method: "PATCH",
    body: {
      status: value,
    },
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
}

export { createProposal, fetchProposals, fetchProposal, updateProposalStatus };
