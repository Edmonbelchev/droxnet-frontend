const fetchUserExperiences = async (userID: number) => {
  let { data, status, error }: any = await dataFetch("/user-experiences", {
    params: {
      user_uuid: userID,
    },
  });

  return { data, status, error };
};

const createUserExperience = async (form: Object | any) => {
  let { data, status, error }: any = await dataFetch("/user-experiences", {
    method: "post",
    body: {
        experiences: form,
    }
  });

  return { data, status, error };
};

const deleteUserExperience = async (userExperienceID: Number) => {
  let { data, status, error }: any = await dataFetch(
    `/user-experiences/${userExperienceID}`,
    {
      method: "delete",
    }
  );

  return { data, status, error };
};

export {
  fetchUserExperiences,
  createUserExperience,
  deleteUserExperience,
};
