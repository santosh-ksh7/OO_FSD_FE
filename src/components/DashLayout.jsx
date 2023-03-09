import {Outlet} from 'react-router-dom'
import DashFooter from './DashFooter'
import DashHeader from './DashHeader'

function DashLayout() {
    // * This just render the children of the DashLayout component. This is our Parent component for /dash path. It can have all the common components that are part of your entire applicatiom (eg. - Navbar, footer, etc). Everything inside this component is a part of all our /dash/* routes.
    // ! In this case we have multiple compoennts that are present throughout our /dash path. So we wrap everything inside a div
    // ? The outlet is the part that gets replaced by || represent the children present at different nested route inside the /dash path (except the index path)
  return (
    <>
        <DashHeader />
        <div>
            <Outlet />
        </div>
        <DashFooter />
    </>
  )
}

export default DashLayout