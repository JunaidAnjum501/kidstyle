import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, CreditCard, Check } from 'lucide-react'

const PaymentMethodsPage = () => {
  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      isDefault: true,
      cardType: 'visa',
      cardNumber: '•••• •••• •••• 4242',
      cardHolder: 'Sarah Johnson',
      expiryDate: '09/25',
      billingAddress: '123 Main Street, Anytown, CA 12345'
    },
    {
      id: 2,
      isDefault: false,
      cardType: 'mastercard',
      cardNumber: '•••• •••• •••• 5678',
      cardHolder: 'Sarah Johnson',
      expiryDate: '12/24',
      billingAddress: '456 Office Plaza, Suite 200, Workville, CA 67890'
    }
  ])
  
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [editingPaymentId, setEditingPaymentId] = useState(null)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    isDefault: false
  })
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Determine card type based on first digit
    let cardType = 'unknown'
    const firstDigit = formData.cardNumber.charAt(0)
    if (firstDigit === '4') {
      cardType = 'visa'
    } else if (firstDigit === '5') {
      cardType = 'mastercard'
    } else if (firstDigit === '3') {
      cardType = 'amex'
    } else if (firstDigit === '6') {
      cardType = 'discover'
    }
    
    // Mask card number
    const maskedCardNumber = '•••• •••• •••• ' + formData.cardNumber.slice(-4)
    
    if (editingPaymentId) {
      // Update existing payment method
      setPaymentMethods(prev => prev.map(method => {
        if (method.id === editingPaymentId) {
          return { 
            ...method, 
            cardHolder: formData.cardHolder,
            expiryDate: formData.expiryDate,
            billingAddress: formData.billingAddress,
            isDefault: formData.isDefault
          }
        }
        // If the new payment is set as default, remove default from others
        if (formData.isDefault && method.isDefault) {
          return { ...method, isDefault: false }
        }
        return method
      }))
      setEditingPaymentId(null)
    } else {
      // Add new payment method
      const newPaymentMethod = {
        id: Date.now(),
        cardType,
        cardNumber: maskedCardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        billingAddress: formData.billingAddress,
        isDefault: formData.isDefault
      }
      
      // If the new payment is set as default, remove default from others
      if (newPaymentMethod.isDefault) {
        setPaymentMethods(prev => prev.map(method => ({
          ...method,
          isDefault: false
        })))
      }
      
      setPaymentMethods(prev => [...prev, newPaymentMethod])
    }
    
    // Reset form
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      isDefault: false
    })
    
    setIsAddingPayment(false)
  }
  
  // Handle edit payment method
  const handleEdit = (method) => {
    setFormData({
      cardNumber: '',  // Don't populate for security
      cardHolder: method.cardHolder,
      expiryDate: method.expiryDate,
      cvv: '',  // Don't populate for security
      billingAddress: method.billingAddress,
      isDefault: method.isDefault
    })
    setEditingPaymentId(method.id)
    setIsAddingPayment(true)
  }
  
  // Handle delete payment method
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id))
    }
  }
  
  // Handle set as default
  const handleSetDefault = (id) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
  }
  
  // Get card type icon/image
  const getCardTypeImage = (type) => {
    // In a real app, you would use actual card brand images
    return <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">{type}</div>
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        {!isAddingPayment && (
          <button
            onClick={() => setIsAddingPayment(true)}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Payment Method
          </button>
        )}
      </div>
      
      {isAddingPayment ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">
              {editingPaymentId ? 'Edit Payment Method' : 'Add New Payment Method'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!editingPaymentId && (
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10"
                        required={!editingPaymentId}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                {!editingPaymentId && (
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="XXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required={!editingPaymentId}
                    />
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Address
                  </label>
                  <textarea
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Set as default payment method</span>
                </label>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingPayment(false)
                    setEditingPaymentId(null)
                    setFormData({
                      cardNumber: '',
                      cardHolder: '',
                      expiryDate: '',
                      cvv: '',
                      billingAddress: '',
                      isDefault: false
                    })
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
                >
                  {editingPaymentId ? 'Update Payment Method' : 'Save Payment Method'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : paymentMethods.length > 0 ? (
        <div className="space-y-6">
          {paymentMethods.map((method) => (
            <motion.div 
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 relative"
            >
              {method.isDefault && (
                <div className="absolute top-4 right-4 bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Default
                </div>
              )}
              
              <div className="flex items-start">
                <div className="mr-4">
                  {getCardTypeImage(method.cardType)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">
                    {method.cardNumber}
                  </h3>
                  
                  <div className="text-gray-700">
                    <p className="mb-1">{method.cardHolder}</p>
                    <p className="mb-1">Expires {method.expiryDate}</p>
                    <p className="text-sm text-gray-500">{method.billingAddress}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleEdit(method)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                    
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-sm font-medium text-gray-600 hover:text-gray-700 flex items-center"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <CreditCard className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods saved</h3>
          <p className="text-gray-500 mb-6">Add a payment method to make checkout faster.</p>
          <button
            onClick={() => setIsAddingPayment(true)}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Payment Method
          </button>
        </div>
      )}
    </div>
  )
}

export default PaymentMethodsPage