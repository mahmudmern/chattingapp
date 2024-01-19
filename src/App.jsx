import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Registration from "./pages/login/registration/Registration";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
         <Route path="/" element={<Login/>}/>
         <Route path="/registration" element={<Registration/>}/>
      </>
    )
  )

  return (
    <RouterProvider
    router={router}
   />
  )
}

export default App
