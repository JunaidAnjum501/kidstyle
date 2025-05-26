import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  SlidersHorizontal
} from 'lucide-react'

const OrdersManagementPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    dateRange: {
      start: '',
      end: ''
    },
    priceRange: [0, 1000]
  })

  const ordersPerPage = 10

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        const mockOrders = Array.from({ length: 50 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - Math.floor(Math.random() * 30))
          const formattedDate = date.toISOString().split('T')[0]
          
          const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
          const status = statuses[Math.floor(Math.random() * statuses.length)]
          
          const amount = Math.floor(Math.random() * 300) + 20
          
          return {
            id: `ORD-${7000 + i}`,
            customer: {
              name: `${['John', 'Jane', 'Michael', 'Emma', 'David'][Math.floor(Math.random() * 5)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
              email: `customer${i}@example.com`,
              id: `CUST-${1000 + i}`
            },
            date: formattedDate,
            amount: amount,
            items: Math.floor(Math.random() * 5) + 1,
            status: status,
            paymentMethod: ['Credit Card', 'PayPal', 'Bank Transfer'][Math.floor(Math.random() * 3)],
            shippingAddress: {
              street: `${Math.floor(Math.random() * 1000) + 1} Main St`,
              city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
              state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
              zip: `${Math.floor(Math.random() * 90000) + 10000}`
            }
          }
        })
        
        setOrders(mockOrders)
        setLoading(false)
      }, 800)
    }

    fetchOrders()
  }, [])

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !filters.status || order.status === filters.status
    
    let matchesDate = true
    if (filters.dateRange.start && filters.dateRange.end) {
      const orderDate = new Date(order.date)
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      matchesDate = orderDate >= startDate && orderDate <= endDate
    } else if (filters.dateRange.start) {
      const orderDate = new Date(order.date)
      const startDate = new Date(filters.dateRange.start)
      matchesDate = orderDate >= startDate
    } else if (filters.dateRange.end) {
      const orderDate = new Date(order.date)
      const endDate = new Date(filters.dateRange.end)
      matchesDate = orderDate <= endDate
    }
    
    const matchesPrice = order.amount >= filters.priceRange[0] && order.amount <= filters.priceRange[1]
    
    return matchesSearch && matchesStatus && matchesDate && matchesPrice
  })

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  // Status options
  const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Shipped':
        return 'bg-yellow-100 text-yellow-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      case 'Refunded':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'Shipped':
        return <Truck className="h-4 w-4 text-yellow-600" />
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'Refunded':
        return <Package className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus }
      }
      return order
    }))
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Orders</h1>
          <p className="text-gray-600">Manage customer orders and shipments</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
          <Link 
            to="/admin/orders/export"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search orders by ID, customer name, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Expanded filters */}
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, start: e.target.value}})}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="date"
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, end: e.target.value}})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({...filters, priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]})}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value) || 0]})}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setFilters({
                  status: '',
                  dateRange: {
                    start: '',
                    end: ''
                  },
                  priceRange: [0, 1000]
                })}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Orders table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${order.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <button
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}
                          onClick={() => {
                            const dropdown = document.getElementById(`status-dropdown-${order.id}`)
                            if (dropdown) {
                              dropdown.classList.toggle('hidden')
                            }
                          }}
                        >
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status}
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </button>
                        <div 
                          id={`status-dropdown-${order.id}`}
                          className="hidden absolute z-10 mt-1 w-40 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            {statuses.map((status) => (
                              <button
                                key={status}
                                onClick={() => {
                                  handleStatusChange(order.id, status)
                                  document.getElementById(`status-dropdown-${order.id}`).classList.add('hidden')
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm ${order.status === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                              >
                                <span className="inline-flex items-center">
                                  {getStatusIcon(status)}
                                  <span className="ml-2">{status}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/admin/orders/${order.id}`} 
                        className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredOrders.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">
                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                  </span> of <span className="font-medium">{filteredOrders.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredOrders.length === 0 && (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Package className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setFilters({
                  status: '',
                  dateRange: {
                    start: '',
                    end: ''
                  },
                  priceRange: [0, 1000]
                })
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersManagementPage