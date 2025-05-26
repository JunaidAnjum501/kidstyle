import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, ShoppingBag, Package, Tag, Truck, Calendar, Check, X } from 'lucide-react'

const ProductViewPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call to fetch the product by ID
        // For this demo, we'll simulate an API call with mock data
        setTimeout(() => {
          // Generate mock product data based on the ID
          const mockProduct = {
            id: id,
            name: `Kids ${['T-Shirt', 'Jeans', 'Dress', 'Sweater', 'Shorts'][parseInt(id.slice(-1)) % 5]} ${['Blue', 'Red', 'Green', 'Yellow', 'Purple'][parseInt(id.slice(-1)) % 5]}`,
            description: 'This is a high-quality kids garment perfect for everyday wear. Made from soft, durable fabric that is comfortable and easy to care for.',
            category: ['Boys', 'Girls', 'Unisex', 'Baby', 'Toddler'][parseInt(id.slice(-1)) % 5],
            price: (Math.floor(Math.random() * 100) + 10).toFixed(2),
            salePrice: (Math.floor(Math.random() * 50) + 5).toFixed(2),
            sku: `SKU-${id.slice(-4)}`,
            barcode: `BAR${id.slice(-6)}`,
            stock: Math.floor(Math.random() * 100),
            status: ['Active', 'Draft', 'Out of Stock'][parseInt(id.slice(-1)) % 3],
            features: ['Soft cotton material', 'Easy to wash', 'Comfortable fit'],
            sizes: ['2Y', '3Y', '4Y'],
            colors: ['Blue', 'Red'],
            tags: ['kids', 'clothing', 'comfortable'],
            images: Array.from({ length: 4 }, (_, i) => `https://source.unsplash.com/400x400/?kids,clothes,${id},${i}`),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
            sales: Math.floor(Math.random() * 500),
            rating: (3 + Math.random() * 2).toFixed(1),
            reviews: Math.floor(Math.random() * 50),
          }
          
          setProduct(mockProduct)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product details. Please try again.')
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <Link 
          to="/admin/products" 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-gray-500 mb-4">Product not found</div>
        <Link 
          to="/admin/products" 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header with back button and actions */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Link 
            to="/admin/products" 
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600">Product ID: {product.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="px-4 py-2 flex items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Link>
          <button
            className="px-4 py-2 flex items-center border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this product?')) {
                // In a real app, this would call an API to delete the product
                alert('Product deleted successfully!')
                // Then navigate back to the product list
                window.location.href = '/admin/products'
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product images */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Product Images</h2>
            </div>
            <div className="p-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 mb-4">
                <img src={product.images[0]} alt={product.name} className="object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200">
                    <img src={image} alt={`${product.name} ${index + 1}`} className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Product Status</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Status</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.status === 'Active' ? 'bg-green-100 text-green-800' :
                  product.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">In Stock</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.stock} units</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">SKU</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.sku}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Barcode</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.barcode}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Created</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Last Updated</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Category</h3>
                  <p className="text-sm text-gray-900">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Price</h3>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.salePrice && (
                      <span className="ml-2 text-sm line-through text-gray-500">${product.salePrice}</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Sales</h3>
                  <p className="text-sm text-gray-900">{product.sales} units sold</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Features</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span key={size} className="px-3 py-1 bg-primary-100 text-primary-800 border border-primary-300 rounded-md text-sm font-medium">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-md text-sm font-medium">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Customer Feedback</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <span className="text-2xl font-bold text-gray-900 mr-2">{product.rating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{product.reviews} reviews</span>
              </div>

              {/* Mock reviews */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                          <img src={`https://i.pravatar.cc/32?img=${i + 10}`} alt="Customer" />
                        </div>
                        <span className="font-medium text-gray-900">{['Sarah J.', 'Michael T.', 'Emma R.'][i]}</span>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg key={j} className={`w-4 h-4 ${j < 4 + (i % 2) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {[
                        "Perfect fit for my child! The material is soft and comfortable, exactly as described.",
                        "Great quality for the price. My kid loves it and it's held up well after multiple washes.",
                        "Shipping was fast and the product looks exactly like the pictures. Very satisfied with this purchase."
                      ][i]}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(Date.now() - (i + 1) * 86400000 * 3).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductViewPage