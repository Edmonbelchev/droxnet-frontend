const retrieveJobComments = async (perPage: number, page: number, jobID: number) => {
  const params = {
    per_page: perPage,
    page: page,
  };


  let { data, status, error }: any = await dataFetch(`/jobs/${jobID}/comments`, {
    params: params,
  });

  return { data, status, error };
};

const createJobComment = async (jobID: number, form: any) => {
  let { data, status, error }: any = await dataFetch(
    `/jobs/${jobID}/comments`,
    {
      method: "POST",
      body: form,
    }
  );

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const updateJobComment = async (commentID: number, form: any) => {
  let { data, status, error }: any = await dataFetch(
    `/job-comments/${commentID}`,
    {
      method: "PUT",
      body: form,
    }
  );

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const deleteJobComment = async (commentID: number) => {
  let { data, status, error }: any = await dataFetch(
    `/job-comments/${commentID}`,
    {
      method: "DELETE",
    }
  );

  return { data, status, error };
};

export {
  retrieveJobComments,
  createJobComment,
  updateJobComment,
  deleteJobComment,
};
