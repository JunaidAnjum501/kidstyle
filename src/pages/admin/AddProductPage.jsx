import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Plus, Minus, X } from 'lucide-react'

const AddProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams() // Get the product ID from URL params
  const isEditMode = !!id // Check if we're in edit mode
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditMode) // Add loading state for fetching product
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    salePrice: '',
    sku: '',
    barcode: '',
    stock: '',
    status: 'Active',
    features: [''],
    sizes: [],
    colors: [],
    tags: ''
  })

  // Available options
  const categories = ['Boys', 'Girls', 'Unisex', 'Baby', 'Toddler']
  const statuses = ['Active', 'Draft', 'Out of Stock']
  const availableSizes = ['0-3M', '3-6M', '6-12M', '1Y', '2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y']
  const availableColors = [
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Black', value: '#111827' },
    { name: 'White', value: '#FFFFFF' }
  ]

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        setInitialLoading(true)
        try {
          // In a real app, this would be an API call to fetch the product by ID
          // For this demo, we'll simulate an API call with mock data
          setTimeout(() => {
            // Find the product in our mock data based on the ID
            const mockProduct = {
              id: id,
              name: `Kids ${['T-Shirt', 'Jeans', 'Dress', 'Sweater', 'Shorts'][parseInt(id.slice(-1)) % 5]} ${['Blue', 'Red', 'Green', 'Yellow', 'Purple'][parseInt(id.slice(-1)) % 5]}`,
              description: 'This is a high-quality kids garment perfect for everyday wear. Made from soft, durable fabric that is comfortable and easy to care for.',
              category: ['Boys', 'Girls', 'Unisex', 'Baby', 'Toddler'][parseInt(id.slice(-1)) % 5],
              price: (Math.floor(Math.random() * 100) + 10).toString(),
              salePrice: (Math.floor(Math.random() * 50) + 5).toString(),
              sku: `SKU-${id.slice(-4)}`,
              barcode: `BAR${id.slice(-6)}`,
              stock: (Math.floor(Math.random() * 100)).toString(),
              status: ['Active', 'Draft', 'Out of Stock'][parseInt(id.slice(-1)) % 3],
              features: ['Soft cotton material', 'Easy to wash', 'Comfortable fit'],
              sizes: ['2Y', '3Y', '4Y'],
              colors: ['Blue', 'Red'],
              tags: 'kids, clothing, comfortable'
            }
            
            // Create mock image previews
            const mockImages = Array.from({ length: 2 }, (_, i) => ({
              file: null,
              preview: `https://source.unsplash.com/100x100/?kids,clothes,${id},${i}`,
              name: `product-image-${i}.jpg`
            }))
            
            // Update state with the fetched product data
            setFormData(mockProduct)
            setImages(mockImages)
            setInitialLoading(false)
          }, 800)
        } catch (error) {
          console.error('Error fetching product:', error)
          setInitialLoading(false)
        }
      }
      
      fetchProductData()
    }
  }, [id, isEditMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
      return { ...prev, sizes: newSizes }
    })
  }

  const handleColorToggle = (color) => {
    setFormData(prev => {
      const newColors = prev.colors.includes(color.name)
        ? prev.colors.filter(c => c !== color.name)
        : [...prev.colors, color.name]
      return { ...prev, colors: newColors }
    })
  }

  const handleFeatureChange = (index, value) => {
    setFormData(prev => {
      const newFeatures = [...prev.features]
      newFeatures[index] = value
      return { ...prev, features: newFeatures }
    })
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    setFormData(prev => {
      const newFeatures = [...prev.features]
      newFeatures.splice(index, 1)
      return { ...prev, features: newFeatures }
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // In a real app, you would upload these to a server
    // Here we're just creating object URLs for preview
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }))

    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    setImages(prev => {
      const newImages = [...prev]
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, you would send the form data and images to your API
      console.log('Form data:', formData)
      console.log('Images:', images)
      console.log('Mode:', isEditMode ? 'Edit' : 'Create')

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect to product management page after successful creation/update
      navigate('/admin/products')
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} product:`, error)
      setLoading(false)
    }
  }

  // Show loading state while fetching product data
  if (initialLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link 
          to="/admin/products" 
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-gray-600">{isEditMode ? 'Update product information' : 'Create a new product in your inventory'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
          {/* Main product information */}
          <div className="col-span-2 p-6">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Describe your product"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="SKU-12345"
                />
              </div>

              <div>
                <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="123456789"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="summer, new arrival, sale (comma separated)"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-1 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${formData.sizes.includes(size) ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-gray-100 text-gray-800 border-gray-300'} border`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Colors</label>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorToggle(color)}
                    className={`w-8 h-8 rounded-full border ${formData.colors.includes(color.name) ? 'ring-2 ring-primary-500 ring-offset-2' : 'ring-1 ring-gray-300'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {formData.colors.includes(color.name) && (
                      <span className="flex items-center justify-center h-full">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product images */}
          <div className="p-6 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Product Images</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Upload files</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <li key={index} className="relative group">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                        <img src={image.preview} alt={`Preview ${index}`} className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-sm text-gray-500 hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 truncate">{image.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Image Requirements</h3>
              <ul className="text-xs text-gray-500 space-y-1 list-disc pl-5">
                <li>Use high quality images (minimum 800x800px)</li>
                <li>Keep the product centered in the frame</li>
                <li>Use a white or transparent background</li>
                <li>Show the product from multiple angles</li>
                <li>Avoid text overlays or watermarks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 mr-2 border-t-2 border-white rounded-full"></span>
                {isEditMode ? 'Updating...' : 'Saving...'}
              </>
            ) : (isEditMode ? 'Update Product' : 'Save Product')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProductPage