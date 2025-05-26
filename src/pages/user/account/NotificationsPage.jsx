import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Tag, Package, CreditCard, Truck, MessageCircle, Trash2, Check } from 'lucide-react'

const NotificationsPage = () => {
  // Notification preferences
  const [preferences, setPreferences] = useState({
    email: {
      orderConfirmation: true,
      shipping: true,
      delivery: true,
      promotions: false,
      newArrivals: true,
      backInStock: true,
      reviews: false,
      newsletter: true
    },
    push: {
      orderConfirmation: true,
      shipping: true,
      delivery: true,
      promotions: true,
      newArrivals: false,
      backInStock: true,
      reviews: false,
      newsletter: false
    }
  })
  
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #ORD-123456 has been confirmed and is being processed.',
      date: '2 hours ago',
      read: false,
      icon: <Package className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Summer Sale',
      message: 'Enjoy 30% off on all summer clothing. Use code SUMMER30 at checkout.',
      date: '1 day ago',
      read: true,
      icon: <Tag className="h-5 w-5 text-primary-500" />
    },
    {
      id: 3,
      type: 'shipping',
      title: 'Order Shipped',
      message: 'Your order #ORD-123455 has been shipped. Track your package now.',
      date: '3 days ago',
      read: true,
      icon: <Truck className="h-5 w-5 text-green-500" />
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment of $89.97 for order #ORD-123456 was successful.',
      date: '3 days ago',
      read: true,
      icon: <CreditCard className="h-5 w-5 text-purple-500" />
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message regarding your recent inquiry about size guides.',
      date: '1 week ago',
      read: true,
      icon: <MessageCircle className="h-5 w-5 text-yellow-500" />
    }
  ])
  
  // Handle toggle notification preference
  const handleTogglePreference = (channel, key) => {
    setPreferences(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [key]: !prev[channel][key]
      }
    }))
  }
  
  // Handle mark notification as read
  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: true }
      }
      return notification
    }))
  }
  
  // Handle delete notification
  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })))
  }
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Recent Notifications</h2>
            </div>
            
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <motion.div 
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-primary-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {notification.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${!notification.read ? 'text-primary-800' : 'text-gray-900'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.date}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        
                        <div className="mt-2 flex space-x-4">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark as read
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="text-xs font-medium text-gray-600 hover:text-gray-700 flex items-center"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">You don't have any notifications at the moment.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Notification Preferences */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Notification Settings</h2>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium mb-3">Email Notifications</h3>
              
              <div className="space-y-3 mb-6">
                {Object.entries(preferences.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label htmlFor={`email-${key}`} className="text-sm text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id={`email-${key}`}
                        checked={value}
                        onChange={() => handleTogglePreference('email', key)}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label 
                        htmlFor={`email-${key}`}
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${value ? 'bg-primary-600' : 'bg-gray-300'}`}
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="font-medium mb-3">Push Notifications</h3>
              
              <div className="space-y-3">
                {Object.entries(preferences.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label htmlFor={`push-${key}`} className="text-sm text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id={`push-${key}`}
                        checked={value}
                        onChange={() => handleTogglePreference('push', key)}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label 
                        htmlFor={`push-${key}`}
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${value ? 'bg-primary-600' : 'bg-gray-300'}`}
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for toggle switch */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fff;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #4f46e5;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s;
          border-color: #e2e8f0;
        }
        .toggle-label {
          transition: all 0.3s;
        }
      `}</style>
    </div>
  )
}

export default NotificationsPage