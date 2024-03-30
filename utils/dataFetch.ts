export async function dataFetch(
  path: any,
  options: any = {},
  baseURL: any = useRuntimeConfig().public.apiUrl
) {
  const publicUrl = useRuntimeConfig().public.publicUrl;

  //get token
  let token = csrfCookie();

  if (
    process.client &&
    ["post", "delete", "put", "patch"].includes(
      options?.method?.toLowerCase() ?? ""
    ) &&
    !token
  ) {
    await retrieveCsrfCookie();
    token = csrfCookie();
  }

  //set headers
  let headers = {
    ...options.headers,
    accept: "application/json",
    "X-Xsrf-Token": token,
  };
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
      referer: publicUrl,
    };
  }

  //fetch operation
  const result = await useFetch(path, {
    ...options,
    baseURL: baseURL,
    credentials: "include",
    headers,
    watch: false,
  });

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
