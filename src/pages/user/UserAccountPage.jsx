import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Bell, 
  LogOut,
  ChevronRight
} from 'lucide-react'

// Account Sub-Pages
import ProfilePage from './account/ProfilePage'
import OrdersPage from './account/OrdersPage'
import AddressesPage from './account/AddressesPage'
import PaymentMethodsPage from './account/PaymentMethodsPage'
import WishlistPage from './WishlistPage'
import NotificationsPage from './account/NotificationsPage'

const UserAccountPage = () => {
  const location = useLocation()
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://via.placeholder.com/150',
    joinDate: 'January 2023'
  })
  
  // Navigation items for sidebar
  const navItems = [
    { 
      path: '/account/profile', 
      label: 'My Profile', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      path: '/account/orders', 
      label: 'My Orders', 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      path: '/account/wishlist', 
      label: 'My Wishlist', 
      icon: <Heart className="h-5 w-5" /> 
    },
    { 
      path: '/account/payment-methods', 
      label: 'Payment Methods', 
      icon: <CreditCard className="h-5 w-5" /> 
    },
    { 
      path: '/account/addresses', 
      label: 'Addresses', 
      icon: <MapPin className="h-5 w-5" /> 
    },
    { 
      path: '/account/notifications', 
      label: 'Notifications', 
      icon: <Bell className="h-5 w-5" /> 
    }
  ]
  
  // Check if the current path matches the nav item path
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    console.log('Logging out...')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-primary-600 font-medium">My Account</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* User Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">Member since {user.joinDate}</p>
            </div>
            
            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive(item.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      {isActive(item.path) && (
                        <ChevronRight className="ml-auto h-5 w-5 text-primary-400" />
                      )}
                    </Link>
                  </li>
                ))}
                
                <li className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <Routes>
              <Route path="/" element={<ProfilePage user={user} setUser={setUser} />} />
              <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/payment-methods" element={<PaymentMethodsPage />} />
              <Route path="/addresses" element={<AddressesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UserAccountPage