import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Home, Briefcase, Check } from 'lucide-react'

const AddressesPage = () => {
  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      isDefault: true,
      name: 'Sarah Johnson',
      street: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States',
      phone: '(555) 123-4567'
    },
    {
      id: 2,
      type: 'work',
      isDefault: false,
      name: 'Sarah Johnson',
      street: '456 Office Plaza, Suite 200',
      city: 'Workville',
      state: 'CA',
      zipCode: '67890',
      country: 'United States',
      phone: '(555) 987-6543'
    }
  ])
  
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
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
    
    if (editingAddressId) {
      // Update existing address
      setAddresses(prev => prev.map(address => {
        if (address.id === editingAddressId) {
          return { ...formData, id: editingAddressId }
        }
        // If the new address is set as default, remove default from others
        if (formData.isDefault && address.isDefault) {
          return { ...address, isDefault: false }
        }
        return address
      }))
      setEditingAddressId(null)
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now()
      }
      
      // If the new address is set as default, remove default from others
      if (newAddress.isDefault) {
        setAddresses(prev => prev.map(address => ({
          ...address,
          isDefault: false
        })))
      }
      
      setAddresses(prev => [...prev, newAddress])
    }
    
    // Reset form
    setFormData({
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false
    })
    
    setIsAddingAddress(false)
  }
  
  // Handle edit address
  const handleEdit = (address) => {
    setFormData(address)
    setEditingAddressId(address.id)
    setIsAddingAddress(true)
  }
  
  // Handle delete address
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(address => address.id !== id))
    }
  }
  
  // Handle set as default
  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(address => ({
      ...address,
      isDefault: address.id === id
    })))
  }
  
  // Get address type icon
  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5" />
      case 'work':
        return <Briefcase className="h-5 w-5" />
      default:
        return <Home className="h-5 w-5" />
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        {!isAddingAddress && (
          <button
            onClick={() => setIsAddingAddress(true)}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Address
          </button>
        )}
      </div>
      
      {isAddingAddress ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="home"
                      checked={formData.type === 'home'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Home</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="work"
                      checked={formData.type === 'work'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Work</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
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
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
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
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
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
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code
                  </label>
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
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
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
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                </label>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingAddress(false)
                    setEditingAddressId(null)
                    setFormData({
                      type: 'home',
                      name: '',
                      street: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      country: 'United States',
                      phone: '',
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
                  {editingAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : addresses.length > 0 ? (
        <div className="space-y-6">
          {addresses.map((address) => (
            <motion.div 
              key={address.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 relative"
            >
              {address.isDefault && (
                <div className="absolute top-4 right-4 bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Default
                </div>
              )}
              
              <div className="flex items-start">
                <div className="p-2 bg-gray-100 rounded-full mr-4">
                  {getAddressTypeIcon(address.type)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">
                    {address.type === 'home' ? 'Home' : 'Work'} Address
                  </h3>
                  
                  <div className="text-gray-700">
                    <p className="mb-1">{address.name}</p>
                    <p className="mb-1">{address.street}</p>
                    <p className="mb-1">{address.city}, {address.state} {address.zipCode}</p>
                    <p className="mb-1">{address.country}</p>
                    <p>{address.phone}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                    
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
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
          <Home className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-6">Add a new address to make checkout faster.</p>
          <button
            onClick={() => setIsAddingAddress(true)}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Address
          </button>
        </div>
      )}
    </div>
  )
}

export default AddressesPage