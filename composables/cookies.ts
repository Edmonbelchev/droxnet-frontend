// Retrieve cookie stored in browser
const bearerTokenCookie = () => {
  const token: any = useCookie("BEARER_TOKEN");

  return token.value ?? undefined;
};

// Helper function to get cookie value
const getCookie = (name: String | any) => {
  const value: any = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Helper function to set cookie value
const setCookie = (
  name: String | any,
  value: any,
  time: any = null,
  unit: String = "days"
) => {
  if (time) {
    const expirationDate: Date = new Date();

    if (unit === "days") {
      expirationDate.setDate(expirationDate.getDate() + time);
    } else if (unit === "minutes") {
      expirationDate.setTime(expirationDate.getTime() + time * 60000); // Convert minutes to milliseconds
    }

    const expires: String = `expires=${expirationDate.toUTCString()}`;

    return (document.cookie = `${name}=${value}; ${expires}; path=/`);
  }

  return (document.cookie = `${name}=${value}; path=/`);
};

export { bearerTokenCookie, getCookie, setCookie };
