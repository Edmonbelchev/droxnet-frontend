export async function dataFetch(
  path: any,
  options: any = {}
) {
  const apiURL = useRuntimeConfig().public.apiUrl;

  //get token
  let token = bearerTokenCookie();

  if (
    process.client &&
    ["post", "delete", "put", "patch"].includes(
      options?.method?.toLowerCase() ?? ""
    ) &&
    !token
  ) {
    token = bearerTokenCookie();
  }

  //set headers
  let headers = {
    ...options.headers,
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"])
    };
  }

  //fetch operation
  const result = await useFetch(path, {
    ...options,
    baseURL: apiURL,
    headers,
    watch: false,
  });

  console.log(result)

  //handle error
  const { error, status }: { error: any; status: any } = result;
  if (status.value === "success") {
    return result;
  } else {
    switch (error.value.statusCode) {
      case 401:
        return navigateTo("/login");
      case 419:
        return navigateTo("/login");
      case 500:
        console.log("server error");
        return error;
      default:
        return result;
    }
  }
}
