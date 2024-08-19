import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {useEffect} from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  }, {
    path: "/about",
    element: (<div>about <Outlet/></div>),
    children: [
      {
        path: "a",
        element: <div>a</div>,
      }, {
        path: "b",
        element: <div>b</div>,
      }
    ]
  }, {
    path: "/contact",
    element: <div>contact</div>,
  },
]);

function App() {

  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      console.log(event, 'popstate');
    })
  });

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
