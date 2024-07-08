import { Route, Routes } from 'react-router-dom';
import {routes} from './routes'

function App() {
  return (
    <Routes>
      {routes.public.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
    ))}
    <Route>
    {routes.private.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
    ))}
    </Route>
    </Routes>
  )
}

export default App;
