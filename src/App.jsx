import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// User Pages
import HomePage from './pages/user/HomePage'
import ProductListingPage from './pages/user/ProductListingPage'
import ProductDetailsPage from './pages/user/ProductDetailsPage'
import CartPage from './pages/user/ShoppingCartPage'
import CheckoutPage from './pages/user/CheckoutPage'
import PaymentConfirmationPage from './pages/user/PaymentConfirmationPage'
import UserAccountPage from './pages/user/UserAccountPage'
import UserMessagesPage from './pages/user/MessagesPage'
import AboutPage from './pages/user/AboutPage'
import ContactPage from './pages/user/ContactPage'
import WishlistPage from './pages/user/WishlistPage'
import CollectionPage from './pages/user/CollectionPage'

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage'
import ProductManagementPage from './pages/admin/ProductManagementPage'
import AddProductPage from './pages/admin/AddProductPage'
import ProductViewPage from './pages/admin/ProductViewPage'
import OrdersManagementPage from './pages/admin/OrdersManagementPage'
import AdminMessagesPage from './pages/admin/MessagesPage'
import UserManagementPage from './pages/admin/UserManagementPage'
import SettingsPage from './pages/admin/SettingsPage'
import OrderDetailPage from './pages/admin/OrderDetailPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment-confirmation" element={<PaymentConfirmationPage />} />
          <Route path="messages" element={<UserMessagesPage />} />
          <Route path="account/*" element={<UserAccountPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="collections" element={<CollectionPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="products/new" element={<AddProductPage />} />
          <Route path="products/:id" element={<ProductViewPage />} />
          <Route path="products/:id/edit" element={<AddProductPage />} />
          <Route path="orders" element={<OrdersManagementPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
