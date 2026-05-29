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
        {
          name: "<Sidebar />",
          role: "Navegación - NavLink",
          status: "active"
        },
        {
          name: "<ScrollManager />",
          role: "Gestión de Scroll",
          status: "active"
        },
        {
          name: "<Outlet />",
          role: "Inyector de Vistas dinámicas",
          status: "warning",
          children: [
            {
              name: "<DashboardHome />",
              role: "Vista: /",
              status: "active",
              children: [
                {
                  name: "<Hero />",
                  role: "UI / Audio / Glassmorphism",
                  status: "active",
                  children: [
                    {
                      name: "EqualizerBars",
                      role: "Animación keyframes",
                      status: "active"
                    }
                  ]
                },
                {
                  name: "<CrewCard /> (x3)",
                  role: "UI / Props / Link",
                  status: "active"
                }
              ]
            },
            {
              name: "<ProfileView />",
              role: "Vista paramétrica: /profile/:member",
              status: "warning",
              children: [
                {
                  name: "<ProfileHeader />",
                  role: "Nombre + Rol + Bio con typing effect",
                  status: "active"
                },
                {
                  name: "<ProjectCarousel />",
                  role: "Galería con controles manuales",
                  status: "active"
                },
                {
                  name: "<SkillList />",
                  role: "Barras de progreso animadas",
                  status: "active"
                },
                {
                  name: "<SocialLinks />",
                  role: "Botones con hover avanzado",
                  status: "active"
                }
              ]
            },
            {
              name: "<ProjectLogbook />",
              role: "Vista: /logbook",
              status: "active",
              children: [
                {
                  name: "Timeline con mapeo de logbookData.js",
                  role: "Línea de tiempo del proyecto",
                  status: "active"
                }
              ]
            },
            {
              name: "<ProjectsExplorer />",
              role: "Vista: /projects",
              status: "active",
              children: [
                {
                  name: "<Header />",
                  role: "Título reutilizable",
                  status: "active"
                },
                {
                  name: "<FilterBar />",
                  role: "Input + Select para filtrado reactivo",
                  status: "active"
                },
                {
                  name: "<ProjectCard /> (x20)",
                  role: "Renderizado desde JSON",
                  status: "active"
                }
              ]
            },
            {
              name: "<SpaceGallery />",
              role: "Vista: /space-gallery",
              status: "active",
              children: [
                {
                  name: "Loader",
                  role: "Estado de carga - Radar animado",
                  status: "active"
                },
                {
                  name: "Error",
                  role: "Estado de error",
                  status: "active"
                },
                {
                  name: "ImageGrid",
                  role: "Grid responsive de imágenes",
                  status: "active"
                },
                {
                  name: "Pagination",
                  role: "Anterior/Siguiente + indicador",
                  status: "active"
                },
                {
                  name: "Lightbox",
                  role: "Modal con navegación + ESC",
                  status: "active"
                }
              ]
            },
            {
              name: "<SystemMap />",
              role: "Vista: /system-map",
              status: "active",
              children: [
                {
                  name: "<Header />",
                  role: "Título reutilizable",
                  status: "active"
                },
                {
                  name: "<TreeNode />",
                  role: "Componente recursivo",
                  status: "active"
                }
              ]
            },
            {
              name: "<NotFound />",
              role: "Vista: /*",
              status: "active"
            }
          ]
        },
        {
          name: "<Footer />",
          role: "Pie de página global",
          status: "active"
        }
      ]
    }
  ]
};
