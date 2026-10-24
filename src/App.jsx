import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Toaster from './components/Toaster'
import { StoreProvider } from './context/StoreContext'
import About from './pages/About'
import Account, { Register, SignIn } from './pages/Account'
import Brands from './pages/Brands'
import Cart from './pages/Cart'
import CategoryPage from './pages/CategoryPage'
import Checkout from './pages/Checkout'
import Compatibility from './pages/Compatibility'
import Contact from './pages/Contact'
import { ArticleDetail, Guides } from './pages/Guides'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OrderSuccess from './pages/OrderSuccess'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'

/** Reset scroll position on navigation (kept out of the listing pagination flow). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/sign-in" element={<SignIn />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<ArticleDetail />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </StoreProvider>
  )
}
