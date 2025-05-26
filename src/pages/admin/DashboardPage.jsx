import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Package,
  AlertCircle
} from 'lucide-react'

const DashboardPage = () => {
  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('week')

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        const mockSalesData = [
          { day: 'Mon', sales: 1200 },
          { day: 'Tue', sales: 1900 },
          { day: 'Wed', sales: 1500 },
          { day: 'Thu', sales: 2100 },
          { day: 'Fri', sales: 2400 },
          { day: 'Sat', sales: 1800 },
          { day: 'Sun', sales: 1300 },
        ]
        
        setSalesData(mockSalesData)
        setLoading(false)
      }, 800)
    }

    fetchDashboardData()
  }, [timeRange])

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Sales',
      value: '$12,456',
      change: '+12%',
      isPositive: true,
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      color: 'bg-green-50 border-green-100'
    },
    {
      title: 'Total Orders',
      value: '324',
      change: '+8%',
      isPositive: true,
      icon: <ShoppingBag className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100'
    },
    {
      title: 'New Customers',
      value: '45',
      change: '+5%',
      isPositive: true,
      icon: <Users className="h-6 w-6 text-purple-500" />,
      color: 'bg-purple-50 border-purple-100'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.5%',
      isPositive: false,
      icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
      color: 'bg-orange-50 border-orange-100'
    },
  ]

  // Recent orders data
  const recentOrders = [
    {
      id: 'ORD-7352',
      customer: 'Emma Johnson',
      date: '2023-06-12',
      amount: '$125.99',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'ORD-7351',
      customer: 'Michael Chen',
      date: '2023-06-12',
      amount: '$89.99',
      status: 'Processing',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'ORD-7350',
      customer: 'Sophia Rodriguez',
      date: '2023-06-11',
      amount: '$212.50',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'ORD-7349',
      customer: 'Liam Wilson',
      date: '2023-06-11',
      amount: '$45.00',
      status: 'Cancelled',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'ORD-7348',
      customer: 'Olivia Martinez',
      date: '2023-06-10',
      amount: '$178.25',
      status: 'Shipped',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
  ]

  // Low stock alerts
  const lowStockItems = [
    {
      id: 'PRD-1234',
      name: 'Kids Summer T-Shirt',
      stock: 3,
      threshold: 5,
      category: 'Tops'
    },
    {
      id: 'PRD-2345',
      name: 'Boys Denim Shorts',
      stock: 2,
      threshold: 5,
      category: 'Bottoms'
    },
    {
      id: 'PRD-3456',
      name: 'Girls Floral Dress',
      stock: 4,
      threshold: 5,
      category: 'Dresses'
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin! Here's what's happening with your store today.</p>
      </div>

      {/* Time range selector */}
      <div className="mb-6 flex justify-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium ${timeRange === range
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${range === 'day' ? 'rounded-l-lg' : ''} ${range === 'year' ? 'rounded-r-lg' : ''} border border-gray-200`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border p-6 ${card.color} shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{card.value}</h3>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last {timeRange}</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
              <span className="text-sm text-gray-600 mr-4">Sales</span>
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span className="text-sm text-gray-600">Visitors</span>
            </div>
          </div>
          
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="h-64 flex items-end justify-between">
              {salesData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-full flex justify-center mb-2">
                    <div 
                      className="w-12 bg-primary-500 rounded-t-md" 
                      style={{ height: `${(data.sales / 2500) * 180}px` }}
                    ></div>
                    <div 
                      className="w-12 bg-gray-200 rounded-t-md absolute opacity-50" 
                      style={{ height: `${(data.sales / 2500) * 140}px`, left: '50%', transform: 'translateX(-50%)' }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{data.day}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low stock alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Low Stock Alerts</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {lowStockItems.length} items
            </span>
          </div>
          
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">{item.category}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">ID: {item.id}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-sm font-medium text-red-600">{item.stock} left</span>
                  </div>
                  <span className="text-xs text-gray-500">Threshold: {item.threshold}</span>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/admin/products" 
            className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all inventory
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Link 
            to="/admin/orders" 
            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
          >
            View all
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Order ID</th>
                <th scope="col" className="px-4 py-3">Customer</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Amount</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3 font-medium">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      to={`/admin/orders/${order.id}`} 
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/admin/products/new" 
          className="flex items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <div className="p-3 rounded-full bg-primary-100 mr-4">
            <Package className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Add Product</h3>
            <p className="text-sm text-gray-600">Create a new product listing</p>
          </div>
        </Link>
        
        <Link 
          to="/admin/orders" 
          className="flex items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Process Orders</h3>
            <p className="text-sm text-gray-600">Manage pending orders</p>
          </div>
        </Link>
        
        <Link 
          to="/admin/users" 
          className="flex items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Customers</h3>
            <p className="text-sm text-gray-600">View customer information</p>
          </div>
        </Link>
        
        <Link 
          to="/admin/settings" 
          className="flex items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <div className="p-3 rounded-full bg-gray-100 mr-4">
            <Calendar className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Schedule</h3>
            <p className="text-sm text-gray-600">Plan promotions and events</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default DashboardPage