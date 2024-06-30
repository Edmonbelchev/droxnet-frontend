const fetchUsers = async (
  page: Number,
  perPage: Number,
  body: Array<Object> = []
) => {
  let params: any = {
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

  let { data, status, error }: any = await dataFetch("/users", {
    params: params,
  });

  return { data, status, error };
};

const fetchUser = async (userID: number) => {
  let { data, status, error }: any = await dataFetch(`/users/${userID}`);

  return { data, status, error };
};

export { fetchUsers, fetchUser };
