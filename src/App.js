import {Routes, Route} from "react-router-dom"
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import NotesList from "./pages/protectedDash/NotesList";
import ProtectedHome from "./pages/protectedDash/ProtectedHome";
import UsersList from "./pages/protectedDash/UsersList";
import Login from "./pages/public/Login";
import PublicHome from "./pages/public/PublicHome";
import CreateNewNotes from "./pages/protectedDash/CreateNewNotes";
import CreateNewUser from "./pages/protectedDash/CreateNewUser";
import EditNotes from "./pages/protectedDash/EditNotes";
import EditUser from "./pages/protectedDash/EditUser";

function App() {
  return (
    <Routes>
      {/* // ! This Layout is a parent for everything else nested inside it. So it is not self closing.  */}
      <Route path="/" element={<Layout />}>
        {/* // !  Since this is the root path & at this path Layout just render the childrens i.e.. PublicHome component. This is our default component that the app shows at root path */}
        <Route index element={<PublicHome />} />  
        {/* // ! This a nested route inside of Layout, hence it is self closing. @ /login path the Outlet inside the Layout renders the children i.e.. Login Compoennt */}
        <Route path="login" element={<Login />} />

        {/* // ! Now this DashLayout is again a parent for everything else nested inside it. So it is not self closing. */}
        <Route path="dash" element={<DashLayout />} >
          {/* // ! This a nested route inside of DashLayout, hence it is self closing. @ /dash path the Outlet inside the Layout renders the children i.e.. ProtectedHome Compoennt */}
          <Route index element={<ProtectedHome />} />
          {/* // ! This is a parent which is also a nested route but without any element */}
          <Route path="notes" >
            <Route index element={<NotesList />} />
            <Route path=":id" element={<EditNotes />} />
            <Route path="new" element={<CreateNewNotes />} />
          </Route>

          <Route path="users" >
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<CreateNewUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}



export default App;











// * we have nested hierarchy. 
// * We have a index for a full app -"/" i.e. PublicHome
// * after a login we have another index for a protected route - "/dash" as well i.e.. ProtectedHome