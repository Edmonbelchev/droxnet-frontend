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
      url: "/profile",
    },
    {
      title: "All Jobs",
      icon: "fa-solid:box",
      url: "/profile/jobs",
      dropdown: [
        {
          title: "Completed Jobs",
          url: "/profile/jobs?status=completed",
        },
        {
          title: "Cancelled Jobs",
          url: "/profile/jobs?status=cancelled",
        },
        {
          title: "Ongoing Jobs",
          url: "/profile/jobs?status=ongoing",
        }
      ],
    },
    {
      title: "Manage Jobs",
      icon: "zondicons:announcement",
      url: "/profile/manage-jobs",
    },
    {
      title: "Messages",
      icon: "fa-solid:envelope",
      url: "/profile/messages",
    },
    {
      title: "My Saved Items",
      icon: "fa-solid:heart",
      url: "/profile/saved-items",
    },
    {
      title: "Invoices",
      icon: "fa-solid:file-invoice",
    },
    {
      title: "Proposals",
      icon: "fa-solid:file-signature",
      url: "/profile/proposals",
    },
    {
      title: "Account Settings",
      icon: "fa-solid:cog",
      url: "/account-settings"
    },
    {
      title: "Help & Support",
      icon: "fa-solid:question-circle",
    },
    {
      title: "Logout",
      icon: "fa-solid:sign-out-alt"
    },
  ];
};

export { profileSidebarMenuItems };
