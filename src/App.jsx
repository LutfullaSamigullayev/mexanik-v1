import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <Routes>
      {routes.public.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route>
        {routes.private.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((item) => (
                <Route
                  key={item.path}
                  path={item.path}
                  element={item.element}
                />
              ))}
          </Route>
        ))}
      </Route>
    </Routes>
  );
}

export default App;
