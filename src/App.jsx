import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { AuthCheck } from "./components/AuthCheck";
import { RoleCheck } from "./components/RoleCheck";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <Routes>
        {routes.public.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
        <Route element={<AuthCheck />}>
          {routes.private.map((route) => (
            <Route
              key={route.id}
              element={<RoleCheck alloedRoles={route.allowedRoles} />}
            >
              <Route key={route.id} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((item) => (
                    <Route
                      key={item.id}
                      element={<RoleCheck alloedRoles={route.allowedRoles} />}
                    >
                      <Route
                        key={item.id}
                        path={item.path}
                        element={item.element}
                      />
                    </Route>
                  ))}
              </Route>
            </Route>
          ))}
        </Route>
      </Routes>
      <SpeedInsights />
    </>
  );
}

export default App;
