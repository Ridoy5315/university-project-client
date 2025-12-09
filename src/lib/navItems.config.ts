export const getNavItems = () => {
  return [
    {
      title: "Credentials",
      items: [
        {
          title: "Add New Credential",
          href: `/credentials/add-new-credential`,
          icon: "FolderPlus",
        },
        {
          title: "View All Credentials",
          href: `/credentials/view-all-credentials`,
          icon: "ScanEye",
        },
        {
          title: "Manage Credentials",
          href: `/credentials/manage-credentials`,
          icon: "SquareChartGantt",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "Profile",
          href: "/account/profile",
          icon: "UserPen",
        },
        {
          title: "Change Password",
          href: "/account/change-password",
          icon: "LockKeyhole",
        },
      ],
    },
    {
      items: [
        {
          title: "Settings",
          href: "/settings",
          icon: "Settings2",
        },
      ],
    },
    {
      items: [
        {
          title: "About Us",
          href: "/aboutUs",
          icon: "UsersRound",
        },
      ],
    },
  ];
};
