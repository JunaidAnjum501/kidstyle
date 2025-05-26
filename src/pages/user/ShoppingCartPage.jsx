import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trash2, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ArrowRight,
  RefreshCw,
  Heart,
  ChevronLeft
} from 'lucide-react'

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Fetch cart items
  useEffect(() => {
    // In a real app, this would be an API call or from a state management store
    setTimeout(() => {
      // Mock cart data
      setCartItems([
        {
          id: 1,
          name: 'Rainbow Stripe T-Shirt',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          size: '4-5Y',
          color: 'Rainbow',
          quantity: 1,
          stock: 15
        },
        {
          id: 2,
          name: 'Dinosaur Print Hoodie',
          price: 32.99,
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
          size: '5-6Y',
          color: 'Green',
          quantity: 2,
          stock: 8
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change
          if (newQuantity >= 1 && newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity }
          }
        }
        return item
      })
    )
  }

  // Handle remove item
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Handle move to wishlist
  const handleMoveToWishlist = (id) => {
    // Find the item to move to wishlist
    const itemToMove = cartItems.find(item => item.id === id)
    
    if (itemToMove) {
      // In a real app, this would add the item to the wishlist and remove from cart
      console.log('Moving to wishlist:', itemToMove)
      
      // Remove from cart
      handleRemoveItem(id)
      
      // Show a success message (in a real app, this would be a toast notification)
      alert(`${itemToMove.name} moved to your wishlist!`)
    }
  }

  // Handle apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'kids10') {
      setCouponApplied(true)
      setDiscount(calculateSubtotal() * 0.1) // 10% discount
    } else {
      // Show error
      alert('Invalid coupon code')
    }
  }

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Calculate shipping
  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 50 ? 0 : 5.99
  }

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - discount
  }

  // Empty cart view
  if (!loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="bg-gray-100 rounded-full p-6 inline-block mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link 
                to="/products" 
                className="btn-primary inline-flex items-center"
              >
                <span>Start Shopping</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">You might like</h2>
              <div className="grid grid-cols-2 gap-4">
                <RecommendedProductCard 
                  id={5}
                  name="Floral Summer Dress"
                  price={34.99}
                  image="https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                />
                <RecommendedProductCard 
                  id={7}
                  name="Polka Dot Jumpsuit"
                  price={29.99}
                  image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="animate-pulse">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex gap-4 p-4 mb-4 border border-gray-200 rounded-xl">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="animate-pulse bg-gray-50 p-6 rounded-xl">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
                <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
          <Link 
            to="/products" 
            className="text-primary-600 hover:text-primary-700 transition-colors flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col sm:flex-row gap-4 p-4 mb-4 border border-gray-200 rounded-xl hover:border-primary-200 hover:shadow-sm transition-all"
              >
                <div className="sm:w-24 h-24 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        <Link to={`/products/${item.id}`} className="hover:text-primary-600 transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">Size: {item.size} | Color: {item.color}</p>
                    </div>
                    <div className="font-bold text-lg mb-4 sm:mb-0">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-l-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
                          if (!isNaN(val) && val >= 1 && val <= item.stock) {
                            handleQuantityChange(item.id, val - item.quantity)
                          }
                        }}
                        className="w-12 text-center border-t border-b border-gray-300 py-1"
                        min="1"
                        max={item.stock}
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                        className="p-1 rounded-r-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleMoveToWishlist(item.id)}
                        className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                        aria-label="Move to wishlist"
                      >
                        <Heart className="h-5 w-5 mr-1" />
                        <span className="text-sm">Save for later</span>
                      </button>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5 mr-1" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Update Cart Button - Mobile Only */}
            <div className="lg:hidden mb-8">
              <button 
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Update Cart</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {calculateShipping() === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">${calculateShipping().toFixed(2)}</span>
                  )}
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  {calculateShipping() === 0 && (
                    <p className="text-green-600 text-sm mt-2">You've qualified for free shipping!</p>
                  )}
                  {calculateShipping() > 0 && (
                    <p className="text-gray-500 text-sm mt-2">Add ${(50 - calculateSubtotal()).toFixed(2)} more to qualify for free shipping</p>
                  )}
                </div>
              </div>
              
              {/* Coupon Code */}
              {!couponApplied ? (
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      disabled={!couponCode}
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Try "KIDS10" for 10% off</p>
                </div>
              ) : (
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg mb-6">
                  <div>
                    <span className="text-green-600 font-medium">KIDS10</span>
                    <p className="text-sm text-green-600">10% discount applied</p>
                  </div>
                  <button 
                    onClick={() => {
                      setCouponApplied(false)
                      setDiscount(0)
                      setCouponCode('')
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              
              {/* Checkout Button */}
              <Link 
                to="/checkout" 
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">We accept</p>
                <div className="flex justify-center gap-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
const RecommendedProductCard = ({ id, name, price, image }) => {
  return (
    <Link to={`/products/${id}`} className="block group">
      <div className="rounded-lg overflow-hidden mb-2">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="font-medium text-sm mb-1 group-hover:text-primary-600 transition-colors">{name}</h3>
      <p className="font-bold text-sm">${price.toFixed(2)}</p>
    </Link>
  )
}

// X icon component
const X = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

export default ShoppingCartPage