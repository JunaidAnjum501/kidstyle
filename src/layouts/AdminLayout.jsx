import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Bell
} from 'lucide-react'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Handle logout
  const handleLogout = () => {
    // Implement logout logic here
    navigate('/')
  }

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Sidebar - Desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out 
        w-64 bg-primary-700 text-white overflow-y-auto lg:static lg:inset-auto`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center">
              <span className="font-baloo text-xl font-bold">KidStyle Admin</span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-primary-600"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 space-y-1">
            <SidebarLink to="/admin" icon={<LayoutDashboard className="h-5 w-5" />}>
              Dashboard
            </SidebarLink>
            <SidebarLink to="/admin/products" icon={<ShoppingBag className="h-5 w-5" />}>
              Products
            </SidebarLink>
            <SidebarLink to="/admin/orders" icon={<ClipboardList className="h-5 w-5" />}>
              Orders
            </SidebarLink>
            <SidebarLink to="/admin/messages" icon={<MessageSquare className="h-5 w-5" />}>
              Messages
            </SidebarLink>
            <SidebarLink to="/admin/users" icon={<Users className="h-5 w-5" />}>
              Users
            </SidebarLink>
            <SidebarLink to="/admin/settings" icon={<Settings className="h-5 w-5" />}>
              Settings
            </SidebarLink>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm rounded-lg hover:bg-primary-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
                {/* Sidebar toggle button - desktop */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="hidden lg:block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-2 text-xl font-semibold">
                  {location.pathname === '/admin' && 'Dashboard'}
                  {location.pathname === '/admin/products' && 'Product Management'}
                  {location.pathname === '/admin/orders' && 'Orders Management'}
                  {location.pathname === '/admin/messages' && 'Customer Messages'}
                  {location.pathname === '/admin/users' && 'User Management'}
                  {location.pathname === '/admin/settings' && 'Settings'}
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>

                {/* Notifications */}
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
                </button>

                {/* Admin profile */}
                <div className="relative">
                  <button className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-medium">
                      A
                    </div>
                    <span className="hidden md:block font-medium">Admin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-700 text-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="font-baloo text-xl font-bold">KidStyle Admin</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <MobileSidebarLink to="/admin" icon={<LayoutDashboard className="h-5 w-5" />}>
                    Dashboard
                  </MobileSidebarLink>
                  <MobileSidebarLink to="/admin/products" icon={<ShoppingBag className="h-5 w-5" />}>
                    Products
                  </MobileSidebarLink>
                  <MobileSidebarLink to="/admin/orders" icon={<ClipboardList className="h-5 w-5" />}>
                    Orders
                  </MobileSidebarLink>
                  <MobileSidebarLink to="/admin/messages" icon={<MessageSquare className="h-5 w-5" />}>
                    Messages
                  </MobileSidebarLink>
                  <MobileSidebarLink to="/admin/users" icon={<Users className="h-5 w-5" />}>
                    Users
                  </MobileSidebarLink>
                  <MobileSidebarLink to="/admin/settings" icon={<Settings className="h-5 w-5" />}>
                    Settings
                  </MobileSidebarLink>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-primary-600 p-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// Helper Components
const SidebarLink = ({ to, icon, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)

  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? 'bg-primary-600 text-white' : 'text-primary-100 hover:bg-primary-600 hover:text-white'}`}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
      {isActive && (
        <motion.div 
          layoutId="sidebarIndicator"
          className="ml-auto h-2 w-2 rounded-full bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  )
}

const MobileSidebarLink = ({ to, icon, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)

  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? 'bg-primary-600 text-white' : 'text-primary-100 hover:bg-primary-600 hover:text-white'}`}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </Link>
  )
}

export default AdminLayout