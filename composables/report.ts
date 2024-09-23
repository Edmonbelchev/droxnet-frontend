const storeReport = async (form: any) => {
  let { data, status, error }: any = await dataFetch("/reports", {
    method: "POST",
    body: form,
  });

  if (status._value == "error") {
    error = error._object[error._key].data.message;
  }

  return { data, status, error };
};

export { storeReport };
