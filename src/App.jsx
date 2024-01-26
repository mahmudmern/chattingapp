import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Registration from "./pages/login/registration/Registration";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/login/home/Home";
import Message from "./pages/login/message/message";
import Notification from "./pages/login/notification/Notification";
import Setting from "./pages/login/setting/Setting";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
         <Route path="/" element={<Login/>}/>
         <Route path="/registration" element={<Registration/>}/>
         <Route element={<RootLayout/>}>
         <Route path="/home" element={<Home/>}/>
         <Route path="/message" element={<Message/>}/>
         <Route path="/notification" element={<Notification/>}/>
         <Route path="/setting" element={<Setting/>}/>
         </Route>
         
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
