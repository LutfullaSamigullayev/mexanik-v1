import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { AuthCheck } from "./components/AuthCheck";
import { RoleCheck } from "./components/RoleCheck";

function App() {
  return (
    <Routes>
      {routes.public.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
      <Route element={<AuthCheck />}>
        {routes.private.map((route) => (
          <Route element={<RoleCheck alloedRoles={route.allowedRoles} />}>
            <Route key={route.id} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((item) => (
                  <Route
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
  );
}

export default App;
