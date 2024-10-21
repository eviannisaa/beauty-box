import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailProduct from './pages/DetailProduct'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail-product/:id' element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
