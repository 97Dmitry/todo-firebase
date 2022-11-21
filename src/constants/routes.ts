export const AppRoutes = {
  MAIN: "/",
  DASHBOARD: "/dashboard",
  TASK: (id = ":id"): string => `/task/${id}`,
};
