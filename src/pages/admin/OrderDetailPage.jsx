import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  MapPin,
  CreditCard,
  Download,
  Send,
  Printer
} from 'lucide-react'

// Add CSS for print media query
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .print-section, .print-section * {
      visibility: visible;
    }
    .no-print {
      display: none !important;
    }
    .print-section {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .print-customer-info {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    .print-customer-info h2 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    .print-customer-info .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .print-customer-info .info-box {
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 12px;
    }
    .print-customer-info .info-title {
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .print-customer-info .info-content {
      font-size: 13px;
    }
  }
`;

const OrderDetailPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrderDetails = () => {
      setLoading(true)
      // In a real app, this would be an API call with the order ID
      setTimeout(() => {
        // Mock data for the specific order
        const mockOrder = {
          id: id,
          date: new Date().toISOString().split('T')[0],
          status: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'][Math.floor(Math.random() * 5)],
          amount: Math.floor(Math.random() * 300) + 20,
          customer: {
            name: `${['John', 'Jane', 'Michael', 'Emma', 'David'][Math.floor(Math.random() * 5)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
            email: `customer@example.com`,
            id: `CUST-${1000 + parseInt(id.split('-')[1])}`
          },
          paymentMethod: ['Credit Card', 'PayPal', 'Bank Transfer'][Math.floor(Math.random() * 3)],
          shippingAddress: {
            street: `${Math.floor(Math.random() * 1000) + 1} Main St`,
            city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
            state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
            zip: `${Math.floor(Math.random() * 90000) + 10000}`
          },
          items: [
            {
              id: `PROD-${1000 + Math.floor(Math.random() * 100)}`,
              name: `Kid's ${['T-Shirt', 'Jeans', 'Dress', 'Sweater', 'Jacket'][Math.floor(Math.random() * 5)]}`,
              price: Math.floor(Math.random() * 50) + 10,
              quantity: Math.floor(Math.random() * 3) + 1,
              image: `/src/assets/product-${Math.floor(Math.random() * 5) + 1}.jpg`
            },
            {
              id: `PROD-${1000 + Math.floor(Math.random() * 100)}`,
              name: `Kid's ${['Shoes', 'Hat', 'Socks', 'Backpack', 'Pajamas'][Math.floor(Math.random() * 5)]}`,
              price: Math.floor(Math.random() * 40) + 5,
              quantity: Math.floor(Math.random() * 2) + 1,
              image: `/src/assets/product-${Math.floor(Math.random() * 5) + 1}.jpg`
            }
          ],
          timeline: [
            {
              status: 'Order Placed',
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              note: 'Order was placed by customer'
            },
            {
              status: 'Payment Confirmed',
              date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              note: 'Payment was confirmed'
            },
            {
              status: 'Processing',
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              note: 'Order is being processed'
            },
            {
              status: 'Shipped',
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              note: 'Order has been shipped via Express Delivery'
            }
          ],
          notes: 'Customer requested gift wrapping. Please include a gift note.'
        }
        
        setOrder(mockOrder)
        setLoading(false)
      }, 800)
    }

    if (id) {
      fetchOrderDetails()
    }
  }, [id])

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
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'Shipped':
        return <Truck className="h-5 w-5 text-yellow-600" />
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'Refunded':
        return <Package className="h-5 w-5 text-purple-600" />
      default:
        return null
    }
  }

  // Handle status change
  const handleStatusChange = (newStatus) => {
    // In a real app, this would be an API call
    setOrder({...order, status: newStatus})
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Order not found</h3>
        <p className="text-gray-500 mb-4">The order you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/admin/orders"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Add style tag for print styles */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 no-print">
          <div className="flex items-center">
            <Link 
              to="/admin/orders" 
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Order {order.id}</h1>
              <p className="text-gray-600">Placed on {order.date}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Email Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary and Status - This is what we want to print */}
          <div className="lg:col-span-2 print-section">
            {/* Print-only customer information section */}
            <div className="print-customer-info hidden print:block">
              <h2>Order Information</h2>
              <div className="info-grid">
                <div className="info-box">
                  <div className="info-title">Customer Details</div>
                  <div className="info-content">
                    <p><strong>Name:</strong> {order.customer.name}</p>
                    <p><strong>ID:</strong> {order.customer.id}</p>
                    <p><strong>Email:</strong> {order.customer.email}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  </div>
                </div>
                <div className="info-box">
                  <div className="info-title">Shipping Address</div>
                  <div className="info-content">
                    <p>{order.customer.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 no-print">
                  <div>
                    <span className="text-sm text-gray-500">Status</span>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadgeColor(order.status)}`}>
                        <span className="mr-1.5">{getStatusIcon(order.status)}</span>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 no-print">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Items</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 overflow-hidden">
                                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">{item.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <th scope="row" colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            Subtotal
                          </th>
                          <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                            ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            Shipping
                          </th>
                          <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                            $5.00
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            Tax
                          </th>
                          <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                            ${(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.08).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            Total
                          </th>
                          <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                            ${order.amount.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mt-8 no-print">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Order Timeline</h3>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {order.timeline.map((event, eventIdx) => (
                        <li key={event.status}>
                          <div className="relative pb-8">
                            {eventIdx !== order.timeline.length - 1 ? (
                              <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center ring-8 ring-white">
                                  {getStatusIcon(event.status) || <Clock className="h-5 w-5 text-primary-600" />}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-900">{event.status}</p>
                                  <p className="text-sm text-gray-500">{event.note}</p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  {event.date}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Order Notes */}
                {order.notes && (
                  <div className="mt-8">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Notes</h3>
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
                      <p className="text-sm text-yellow-800">{order.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="lg:col-span-1 no-print">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Customer</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">{order.customer.id}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500">Email</dt>
                      <dd className="text-gray-900 font-medium">{order.customer.email}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500">Payment Method</dt>
                      <dd className="text-gray-900 font-medium flex items-center">
                        <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                        {order.paymentMethod}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-900 font-medium">{order.customer.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{order.shippingAddress.street}</p>
                    <p className="text-sm text-gray-500">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetailPage