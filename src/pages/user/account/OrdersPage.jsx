import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react'

const OrdersPage = () => {
  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-123456',
      date: 'June 15, 2023',
      total: '$89.97',
      status: 'Delivered',
      items: [
        { id: 1, name: 'Striped T-Shirt', image: 'https://via.placeholder.com/80x80' },
        { id: 2, name: 'Denim Shorts', image: 'https://via.placeholder.com/80x80' }
      ]
    },
    {
      id: 'ORD-123457',
      date: 'May 28, 2023',
      total: '$124.95',
      status: 'Shipped',
      items: [
        { id: 3, name: 'Summer Dress', image: 'https://via.placeholder.com/80x80' },
        { id: 4, name: 'Canvas Shoes', image: 'https://via.placeholder.com/80x80' },
        { id: 5, name: 'Sun Hat', image: 'https://via.placeholder.com/80x80' }
      ]
    },
    {
      id: 'ORD-123458',
      date: 'May 10, 2023',
      total: '$45.99',
      status: 'Processing',
      items: [
        { id: 6, name: 'Dinosaur Pajamas', image: 'https://via.placeholder.com/80x80' }
      ]
    },
    {
      id: 'ORD-123459',
      date: 'April 22, 2023',
      total: '$67.50',
      status: 'Cancelled',
      items: [
        { id: 7, name: 'Rain Jacket', image: 'https://via.placeholder.com/80x80' },
        { id: 8, name: 'Rain Boots', image: 'https://via.placeholder.com/80x80' }
      ]
    }
  ])
  
  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'Shipped':
        return <Truck className="h-5 w-5 text-blue-500" />
      case 'Processing':
        return <Package className="h-5 w-5 text-yellow-500" />
      case 'Cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }
  
  // Get status color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">{order.id}</h3>
                    <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Ordered on {order.date}</p>
                </div>
                
                <div className="flex items-center">
                  <p className="font-bold mr-4">{order.total}</p>
                  <Link 
                    to={`/account/orders/${order.id}`} 
                    className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="p-4 flex items-center">
                <div className="flex items-center mr-4">
                  {getStatusIcon(order.status)}
                  <span className="ml-2 text-sm font-medium">{order.status}</span>
                </div>
                
                <div className="flex-1 flex items-center overflow-x-auto py-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex-shrink-0 mr-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                        title={item.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default OrdersPage