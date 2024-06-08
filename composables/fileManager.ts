const uploadImage = async (
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

  const { data, status, error } = await dataFetch("/image-upload", {
    method: "post",
    body: formData,
  });

  return {data, status, error };
};

const uploadFile = async (
  file: File,
  path: string,
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("path", path);

  const { data, status, error } = await dataFetch("/file-upload", {
    method: "post",
    body: formData,
  });

  return {data, status, error };
};

export { uploadImage, uploadFile };
