import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./home/Home";
import Product from "./product/Product";
import About from "./about/About";
import Contect from "./contectus/Contect";
import Errorpage from "./Errorpage";
import Login from "./form/Login";
import Register from "./form/Register";
import Cart from "./cart/Cart";
import Dashboard from "./admin/Dashboard";
import AdminLayout from "./admin/AdminLayout";
import AddCategory from "./admin/AddCategory";
import ViewCategory from "./admin/ViewCategory";
import ViewProduct from "./admin/ViewProduct";
import AddProduct from "./admin/AddProduct";
import AddSlider from "./admin/AddSlider";
import ViewSlider from "./admin/ViewSlider";
import Checkout from "./checkout/Checkout";
import { FetchOrder, Protected, ProtectedAdmin } from "./extrafile/hiddenlinks";
import { FatechProducts } from "../assets/FatechProducts";
import Thankyou from "./admin/Thankyou";
import MyOreders from "./myorders/MyOreders";
import Orders from "./admin/Orders";
import MyOrederDetailes from "./myorders/MyOrederDetailes";
import OrederDetailes from "./admin/OrederDetailes";

const routing = createBrowserRouter([
    {
        path: "/", element: <App></App>, children: [
            { path: '', element: <Home></Home>,loader:FatechProducts,errorElement: <Errorpage/>},
            { path: 'about', element: <About></About> },
            { path: 'products', element: <Product></Product>,loader:FatechProducts,errorElement: <Errorpage/>},
            { path: 'contect', element: <Contect></Contect> },
            { path: 'cart', element: <Cart></Cart> },
            { path: 'login', element: <Login></Login> },
            { path: 'register', element: <Register></Register> },
            { path: 'checkout', element:<Protected> <Checkout></Checkout></Protected> },
            { path: 'thankyou', element:<Protected> <Thankyou></Thankyou></Protected> },
            { path: 'myorders', element:<Protected> <MyOreders></MyOreders></Protected>,loader:FetchOrder,errorElement: <Errorpage/>},
            { path: 'myorders/:id', element:<Protected> <MyOrederDetailes/></Protected>},
        ]
    },
    {path:'/admin',element:<ProtectedAdmin><AdminLayout></AdminLayout></ProtectedAdmin>,
        children:[
            {path:'',element:<Dashboard/>},
            {path:'category/add',element:<AddCategory/>},
            {path:'category/view',element:<ViewCategory/>},
            {path:'category/edit/:id',element:<AddCategory/>},
            {path:'product/add',element:<AddProduct/>},
            {path:'product/view',element:<ViewProduct/>},
            {path:'product/edit/:id',element:<AddProduct/>},
            {path:'slider/add',element:<AddSlider/>},
            {path:'slider/view',element:<ViewSlider/>},
            {path:'slider/edit/:id',element:<AddSlider/>},
            {path:'orders',element:<Orders/>,loader:FetchOrder,errorElement: <Errorpage/>},
            {path:'orders/:id',element:<OrederDetailes/>},
        ]
    },
    { path: '*', element: <Errorpage></Errorpage> }
])
export default routing
