const uploadFiles = async (
  file: File,
  path: string,
  dimension: Array<Number> = [512, 512]
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("path", path);
  dimension.forEach((dim: any, index: Number) => {
    formData.append(`dimension[${index}]`, dim);
  });

  const { data } = await dataFetch("/upload-file", {
    method: "post",
    body: formData,
  });

  return data;
};

export { uploadFiles };
