export const systemData = {
  name: "<App /> (Router)",
  role: "Root",
  status: "active",
  children: [
    {
      name: "<Layout />",
      role: "Estructura Global",
      status: "active",
      children: [
        { name: "<Sidebar />", role: "Navegación", status: "active" },
        { name: "<Footer />", role: "Pie de página", status: "active" },
        {
          name: "<Outlet />",
          role: "Inyector de Vistas",
          status: "warning",
          children: [
            {
              name: "<DashboardHome />",
              role: "Vista ( / )",
              status: "active",
              children: [
                { name: "<Hero />", role: "UI / Audio", status: "active" },
                { name: "<CrewCard /> (x3)", role: "UI / Props", status: "active" }
              ]
            },
            { name: "<ProjectLogbook />", role: "Vista ( /logbook )", status: "active" },
            { name: "<ProfileView />", role: "Vista paramétrica", status: "active" },
            { name: "<ProjectsExplorer />", role: "Vista ( /projects )", status: "active" },
            { name: "<SpaceGallery />", role: "Vista ( /gallery )", status: "active" }
          ]
        }
      ]
    }
  ]
};
