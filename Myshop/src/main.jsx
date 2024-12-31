import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routing from './assets/Routes.jsx'
import { Provider } from 'react-redux'
import store from './assets/redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={routing}/>
  </Provider>,
)
