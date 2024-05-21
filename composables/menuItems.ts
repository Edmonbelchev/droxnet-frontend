const profileSidebarMenuItems = () => {
  return [
    {
      title: "Insights",
      icon: "fa:dashboard",
      url: "/",
      dropdown: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics",
          url: "/",
        },
      ],
    },
    {
      title: "My Profile",
      icon: "fa:briefcase",
      url: "/",
    },
    {
      title: "All Jobs",
      icon: "fa-solid:box",
      dropdown: [
        {
          title: "Completed Jobs",
          url: "/",
        },
        {
          title: "Cancelled Jobs",
          url: "/",
        },
        {
          title: "Ongoing Jobs",
          url: "/",
        },
        {
          title: "Pending Single",
          url: "/",
        },
      ],
    },
    {
      title: "Manage Jobs",
      icon: "zondicons:announcement",
    },
    {
      title: "Messages",
      icon: "fa-solid:envelope",
    },
    {
      title: "My Saved Items",
      icon: "fa-solid:heart",
    },
    {
      title: "Invoices",
      icon: "fa-solid:file-invoice",
    },
    {
      title: "Proposals",
      icon: "fa-solid:file-signature",
    },
    {
      title: "Account Settings",
      icon: "fa-solid:cog",
    },
    {
      title: "Help & Support",
      icon: "fa-solid:question-circle",
    },
    {
      title: "Logout",
      icon: "fa-solid:sign-out-alt",
    },
  ];
};

export { profileSidebarMenuItems };
