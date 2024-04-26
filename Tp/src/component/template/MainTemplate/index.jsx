// path: toolkit/src/component/template/MainTemplate/index.jsx
import {Outlet} from "react-router-dom";
import NavBar from "../../NavBar/index.jsx";


const MainTemplate = () => {
  
  return (
    <main>
      <NavBar/>
      <Outlet/>
    </main>
  )
}

export default MainTemplate