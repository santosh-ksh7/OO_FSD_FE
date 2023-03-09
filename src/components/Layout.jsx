import {Outlet} from 'react-router-dom'

function Layout() {
    // * This just render the children of the Layout component. This is our Parent component for / path. It can have all the common components that are part of your entire applicatiom (eg. - Navbar, footer, etc). Everything inside this component is a part of all our /dash/* routes.
    // ! In this case we do only return Outlet component. However, If you have multiple compoennts that are present throughout your app wrap everything inside a div
    // ? The outlet is the part that gets replaced by || represent the children present at different nested route inside the /dash path (except the index path)
  return <Outlet />
}

export default Layout