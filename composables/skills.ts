const fetchSkills = async (
  perPage: number = 15,
  page: number = 1,
  query: string = "",
  excludedSkills?: Array<Number>
) => {
  const params: any = {
    perPage: perPage,
    page: page,
  };

  if (query.length >= 2) {
    params.query = query;
    params.page = 1;
  }

  if (excludedSkills && excludedSkills.length > 0) {
    params['excluded_skill[]'] = excludedSkills;
  }

  let { data, status, error }: any = await dataFetch("/skills", {
    params: params,
  });

  return { data, status, error };
};

const fetchUserSkills = async () => {
    let { data, status, error }: any = await dataFetch("/user/skills");
    
    return { data, status, error };
}

export { fetchSkills, fetchUserSkills };
