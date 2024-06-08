const fetchUserEducations = async (userID: number) => {
    let { data, status, error }: any = await dataFetch("/user-educations", {
      params: {
        user_id: userID,
      },
    });
  
    return { data, status, error };
  };
  
  const createUserEducation = async (form: Object | any) => {
    let { data, status, error }: any = await dataFetch("/user-educations", {
      method: "post",
      body: {
          educations: form,
      }
    });
  
    return { data, status, error };
  };
  
  const deleteUserEducation = async (userEducationID: Number) => {
    let { data, status, error }: any = await dataFetch(
      `/user-educations/${userEducationID}`,
      {
        method: "delete",
      }
    );
  
    return { data, status, error };
  };
  
  export {
    fetchUserEducations,
    createUserEducation,
    deleteUserEducation,
  };
  