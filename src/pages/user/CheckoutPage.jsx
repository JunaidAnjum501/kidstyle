import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, ChevronLeft, ChevronRight, Shield } from 'lucide-react'

const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePaymentInfo: false
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Move to next step or submit
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit order
      console.log('Order submitted:', formData)
      // Redirect to confirmation page
      window.location.href = '/payment-confirmation'
    }
  }
  
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary-600">Cart</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-primary-600 font-medium">Checkout</li>
          </ol>
        </nav>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`} />
            
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="text-sm font-medium">Review</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary-600" />
                      <span className="text-sm text-gray-600">Secure Payment</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4 mb-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                      <div className="ml-auto flex space-x-2">
                        <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                        <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                        <img src="https://via.placeholder.com/40x25" alt="Amex" className="h-6" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10"
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
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
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="XXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="savePaymentInfo"
                        name="savePaymentInfo"
                        checked={formData.savePaymentInfo}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="savePaymentInfo" className="ml-2 block text-sm text-gray-700">
                        Save this payment information for next time
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-1">{formData.firstName} {formData.lastName}</p>
                    <p className="mb-1">{formData.address}</p>
                    <p className="mb-1">{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p className="mb-1">{formData.country}</p>
                    <p className="mb-1">{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-1">{formData.cardName}</p>
                    <p className="mb-1">Card ending in {formData.cardNumber.slice(-4)}</p>
                    <p>Expires {formData.expiryDate}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                  <div className="border-t border-b border-gray-200 py-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">$129.95</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">$4.99</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">$10.40</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">$145.34</span>
                  </div>
                </div>
                
                <div className="bg-primary-50 border border-primary-100 rounded-md p-4 mb-6">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                    <p className="text-sm text-primary-700">
                      By placing your order, you agree to our <a href="#" className="underline">Terms and Conditions</a> and <a href="#" className="underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Back
                </button>
              ) : (
                <Link
                  to="/cart"
                  className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Back to Cart
                </Link>
              )}
              
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
              >
                {step < 3 ? (
                  <>
                    Continue
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CheckoutPage