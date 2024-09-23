const fetchSavedItems = async (
  page: number = 1,
  perPage: number = 10,
  type: string = "user",
  is_company: boolean = false
) => {
  let params: any = {
    page: page,
    per_page: perPage,
    type: type,
    is_company: is_company,
  };

  let { data, status, error }: any = await dataFetch("/saved-items", {
    method: "GET",
    params: params,
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const saveItem = async (type: string, id: number) => {
  let { data, status, error }: any = await dataFetch("/saved-items", {
    method: "POST",
    body: {
      saveable_id: id,
      saveable_type: type,
    },
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

const unsaveItem = async (item_id: number) => {
  let { data, status, error }: any = await dataFetch(`/saved-items/${item_id}`, {
    method: "DELETE",
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

export { fetchSavedItems, saveItem, unsaveItem };