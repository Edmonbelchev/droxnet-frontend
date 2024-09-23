const fetchFollowers = async (perPage: number = 15, page: number = 1, id: number) => {
  let { data, status, error }: any = await dataFetch(`/companies/followers`, {
    method: "GET",
    params: {
      per_page: perPage,
      page: page,
      company_id: id,
    },
  });

  return { data, status, error };
};

export {
  fetchFollowers,
};
