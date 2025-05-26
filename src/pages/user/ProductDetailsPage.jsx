import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  Plus,
  Minus,
  X,
  Check
} from 'lucide-react'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false)

  // Fetch product data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock product data
      setProduct({
        id: parseInt(id),
        name: 'Rainbow Stripe T-Shirt',
        price: 24.99,
        salePrice: null,
        description: 'This vibrant rainbow stripe t-shirt is perfect for your little one. Made from 100% organic cotton, its soft, breathable, and designed for all-day comfort. The playful rainbow pattern adds a pop of color to any outfit.',
        features: [
          '100% organic cotton',
          'Soft and breathable fabric',
          'Ribbed crew neck',
          'Machine washable',
          'Ethically manufactured'
        ],
        sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y'],
        colors: ['Rainbow', 'Blue', 'Pink'],
        category: 'girls',
        rating: 4.8,
        reviewCount: 124,
        stock: 15,
        isNew: true,
        images: [
          'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        ],
        relatedProducts: [
          {
            id: 2,
            name: 'Dinosaur Print Hoodie',
            price: 32.99,
            image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
            category: 'boys',
            rating: 4.9,
          },
          {
            id: 5,
            name: 'Floral Summer Dress',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
            category: 'girls',
            rating: 4.9,
            salePrice: 27.99,
          },
          {
            id: 7,
            name: 'Polka Dot Jumpsuit',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
            category: 'girls',
            rating: 4.8,
          },
        ]
      })
      setLoading(false)
    }, 500)
  }, [id])

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      // Show size selection error
      return
    }
    
    // In a real app, this would add the product to the cart
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    setIsAddedToWishlist(!isAddedToWishlist)
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-200 rounded-2xl h-96 mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded-xl h-24"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
              <div className="bg-gray-200 h-6 w-1/4 mb-6 rounded"></div>
              <div className="bg-gray-200 h-4 w-full mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-full mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-3/4 mb-6 rounded"></div>
              <div className="bg-gray-200 h-10 w-full mb-4 rounded"></div>
              <div className="bg-gray-200 h-12 w-full rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-primary-600 transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link 
            to={`/products?category=${product.category}`} 
            className="hover:text-primary-600 transition-colors"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-900">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4 overflow-hidden rounded-2xl">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary-500' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            {/* Product badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                  New Arrival
                </span>
              )}
              {product.salePrice && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                  Sale
                </span>
              )}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${product.category === 'boys' ? 'bg-blue-500' : product.category === 'girls' ? 'bg-pink-500' : 'bg-yellow-500'}`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="mb-4">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-red-600 mr-2">${product.salePrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-lg">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Select Size:</h3>
                <button 
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Size Chart
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg text-center transition-colors ${selectedSize === size ? 'bg-primary-100 text-primary-700 font-medium border-2 border-primary-500' : 'border border-gray-200 hover:border-primary-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize === '' && (
                <p className="text-sm text-red-500 mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Quantity:</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-l-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    if (!isNaN(val) && val >= 1 && val <= product.stock) {
                      setQuantity(val)
                    }
                  }}
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                  min="1"
                  max={product.stock}
                />
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2 rounded-r-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                disabled={selectedSize === ''}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>
              <button 
                onClick={handleAddToWishlist}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${isAddedToWishlist ? 'bg-red-50 text-red-600 border-2 border-red-200' : 'border-2 border-gray-200 hover:border-gray-300'}`}
              >
                <Heart className={`h-5 w-5 ${isAddedToWishlist ? 'fill-current' : ''}`} />
                <span>Wishlist</span>
              </button>
              <button 
                className="hidden sm:flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Shipping & Returns */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm">Free shipping over $50</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm">30-day returns</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm">2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {product.relatedProducts.map((relatedProduct) => (
              <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {isSizeChartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Size Chart</h3>
                <button 
                  onClick={() => setIsSizeChartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close size chart"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Age</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Height (cm)</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Chest (cm)</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Waist (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">2-3Y</td>
                      <td className="border border-gray-200 px-4 py-2">2-3 years</td>
                      <td className="border border-gray-200 px-4 py-2">92-98</td>
                      <td className="border border-gray-200 px-4 py-2">53-55</td>
                      <td className="border border-gray-200 px-4 py-2">51-53</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">3-4Y</td>
                      <td className="border border-gray-200 px-4 py-2">3-4 years</td>
                      <td className="border border-gray-200 px-4 py-2">98-104</td>
                      <td className="border border-gray-200 px-4 py-2">55-57</td>
                      <td className="border border-gray-200 px-4 py-2">53-55</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">4-5Y</td>
                      <td className="border border-gray-200 px-4 py-2">4-5 years</td>
                      <td className="border border-gray-200 px-4 py-2">104-110</td>
                      <td className="border border-gray-200 px-4 py-2">57-59</td>
                      <td className="border border-gray-200 px-4 py-2">55-57</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">5-6Y</td>
                      <td className="border border-gray-200 px-4 py-2">5-6 years</td>
                      <td className="border border-gray-200 px-4 py-2">110-116</td>
                      <td className="border border-gray-200 px-4 py-2">59-61</td>
                      <td className="border border-gray-200 px-4 py-2">57-59</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">6-7Y</td>
                      <td className="border border-gray-200 px-4 py-2">6-7 years</td>
                      <td className="border border-gray-200 px-4 py-2">116-122</td>
                      <td className="border border-gray-200 px-4 py-2">61-63</td>
                      <td className="border border-gray-200 px-4 py-2">59-61</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">7-8Y</td>
                      <td className="border border-gray-200 px-4 py-2">7-8 years</td>
                      <td className="border border-gray-200 px-4 py-2">122-128</td>
                      <td className="border border-gray-200 px-4 py-2">63-65</td>
                      <td className="border border-gray-200 px-4 py-2">61-63</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold mb-2">How to Measure</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Height:</strong> Measure from the top of the head to the bottom of the feet while standing straight.</li>
                  <li><strong>Chest:</strong> Measure around the fullest part of the chest, keeping the tape measure horizontal.</li>
                  <li><strong>Waist:</strong> Measure around the natural waistline, keeping the tape measure comfortable but not tight.</li>
                </ul>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Note: These measurements are approximate. For the best fit, we recommend trying on the garment.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper Components
const RelatedProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl mb-4">
          <div className="aspect-w-1 aspect-h-1">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute top-4 right-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${product.category === 'boys' ? 'bg-blue-500' : product.category === 'girls' ? 'bg-pink-500' : 'bg-yellow-500'}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
        </div>
        <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="font-bold text-red-600 mr-2">${product.salePrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductDetailsPage