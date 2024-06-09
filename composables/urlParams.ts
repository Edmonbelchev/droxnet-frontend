// Add method for getting a param in url for active tab
const getParam = (key: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

// Add method for adding a param in url for active tab
const addParam = (key: string = "tab", value: number | any) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url);

  return value;
};


export { getParam, addParam };