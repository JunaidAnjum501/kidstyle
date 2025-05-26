import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react'

const PaymentConfirmationPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // In a real app, you would get the order details from context/state management
  const orderDetails = {
    orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    total: '$145.34',
    email: 'customer@example.com',
    paymentMethod: 'Credit Card ending in 4242',
    shippingAddress: '123 Main St, Anytown, ST 12345, United States',
    items: [
      {
        id: 1,
        name: 'Colorful Striped T-Shirt',
        color: 'Multi',
        size: '4T',
        price: '$24.99',
        quantity: 2,
        image: 'https://via.placeholder.com/80x80'
      },
      {
        id: 2,
        name: 'Denim Overall Shorts',
        color: 'Blue',
        size: '5T',
        price: '$39.99',
        quantity: 1,
        image: 'https://via.placeholder.com/80x80'
      },
      {
        id: 3,
        name: 'Dinosaur Print Pajama Set',
        color: 'Green',
        size: '4-5Y',
        price: '$29.99',
        quantity: 1,
        image: 'https://via.placeholder.com/80x80'
      }
    ],
    estimatedDelivery: '3-5 business days'
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary-600 text-white p-8 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-10 w-10 text-primary-600" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-primary-100">Your order has been received and is being processed.</p>
          </div>
          
          {/* Order Details */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-gray-200 pb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-sm text-gray-500 mb-1">Order Number</h2>
                <p className="font-medium">{orderDetails.orderNumber}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <h2 className="text-sm text-gray-500 mb-1">Date</h2>
                <p className="font-medium">{orderDetails.date}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <h2 className="text-sm text-gray-500 mb-1">Total Amount</h2>
                <p className="font-medium">{orderDetails.total}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Payment Method</h2>
                <p className="font-medium">{orderDetails.paymentMethod}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Order Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-gray-700">{orderDetails.shippingAddress}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <p className="text-gray-700">{orderDetails.email}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Quantity</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderDetails.items.map(item => (
                      <tr key={item.id}>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                            <div>
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">{item.quantity}</td>
                        <td className="py-4 px-4 text-right font-medium">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-primary-50 border border-primary-100 rounded-md p-4 mb-8">
              <div className="flex items-start">
                <ShoppingBag className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-primary-800 mb-1">Estimated Delivery</h3>
                  <p className="text-primary-700">
                    Your order is expected to arrive within {orderDetails.estimatedDelivery}.
                    You will receive a shipping confirmation email with tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                to="/products"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md text-center flex items-center justify-center transition-colors"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                to="/account/orders"
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-md text-center transition-colors"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentConfirmationPage