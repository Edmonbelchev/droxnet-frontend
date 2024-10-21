import Pusher from "pusher-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const pusher = new Pusher(config.public.pusher.appKey, {
    cluster: config.public.pusher.cluster,
    // Add other necessary options here
  });

  return {
    provide: {
      pusher: pusher
    }
  };
});
