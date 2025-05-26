import { useState, useEffect, createContext, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Filter, 
  X, 
  ChevronDown, 
  Star, 
  Heart, 
  ShoppingCart,
  SlidersHorizontal,
  Check
} from 'lucide-react'

// Create a context for filters
const FilterContext = createContext()

const ProductListingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    age: [],
    size: [],
    priceRange: [0, 100],
    sort: 'newest'
  })

  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const category = searchParams.get('category') || ''
    const sort = searchParams.get('sort') || 'newest'
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '100')
    
    // Parse age and size arrays from URL
    const ageParam = searchParams.get('age')
    const sizeParam = searchParams.get('size')
    
    const age = ageParam ? ageParam.split(',') : []
    const size = sizeParam ? sizeParam.split(',') : []
    
    setFilters(prev => ({
      ...prev,
      category,
      sort,
      priceRange: [minPrice, maxPrice],
      age,
      size
    }))

    // Fetch products based on filters
    fetchProducts()
  }, [location.search])

  // Mock function to fetch products
  const fetchProducts = () => {
    setLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Rainbow Stripe T-Shirt',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          category: 'girls',
          rating: 4.8,
          isNew: true,
          isSale: false,
          ageRange: ['4-6y', '6-8y'],
          sizes: ['S', 'M', 'L']
        },
        {
          id: 2,
          name: 'Dinosaur Print Hoodie',
          price: 32.99,
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
          category: 'boys',
          rating: 4.9,
          isNew: true,
          isSale: false,
          ageRange: ['6-8y', '8-10y'],
          sizes: ['M', 'L', 'XL']
        },
        {
          id: 3,
          name: 'Soft Cotton Romper',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
          category: 'baby',
          rating: 4.7,
          isNew: false,
          isSale: true,
          salePrice: 14.99,
          ageRange: ['0-6m', '6-12m'],
          sizes: ['XS', 'S']
        },
        {
          id: 4,
          name: 'Adventure Cargo Pants',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          category: 'boys',
          rating: 4.6,
          isNew: false,
          isSale: false,
          ageRange: ['4-6y', '6-8y', '8-10y'],
          sizes: ['S', 'M', 'L', 'XL']
        },
        {
          id: 5,
          name: 'Floral Summer Dress',
          price: 34.99,
          image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
          category: 'girls',
          rating: 4.9,
          isNew: false,
          isSale: true,
          salePrice: 27.99,
          ageRange: ['2-4y', '4-6y'],
          sizes: ['XS', 'S', 'M']
        },
        {
          id: 6,
          name: 'Cozy Knit Sweater',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5bfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          category: 'boys',
          rating: 4.7,
          isNew: false,
          isSale: false,
          ageRange: ['8-10y', '10-12y'],
          sizes: ['L', 'XL', 'XXL']
        },
        {
          id: 7,
          name: 'Polka Dot Jumpsuit',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
          category: 'girls',
          rating: 4.8,
          isNew: true,
          isSale: false,
          ageRange: ['1-2y', '2-4y'],
          sizes: ['XS', 'S', 'M']
        },
        {
          id: 8,
          name: 'Organic Cotton Onesie',
          price: 22.99,
          image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          category: 'baby',
          rating: 4.9,
          isNew: true,
          isSale: false,
          ageRange: ['0-6m', '6-12m'],
          sizes: ['XS', 'S']
        },
      ])
      setLoading(false)
    }, 500)
  }

  // Filter products based on all filter criteria
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false
    }
    
    // Filter by age
    if (filters.age.length > 0) {
      // Check if any of the selected age ranges match the product's age ranges
      const hasMatchingAge = filters.age.some(age => 
        product.ageRange && product.ageRange.includes(age)
      )
      if (!hasMatchingAge) return false
    }
    
    // Filter by size
    if (filters.size.length > 0) {
      // Check if any of the selected sizes match the product's available sizes
      const hasMatchingSize = filters.size.some(size => 
        product.sizes && product.sizes.includes(size)
      )
      if (!hasMatchingSize) return false
    }
    
    // Filter by price range
    const productPrice = product.isSale ? product.salePrice : product.price
    if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
      return false
    }
    
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-low':
        return (a.isSale ? a.salePrice : a.price) - (b.isSale ? b.salePrice : b.price)
      case 'price-high':
        return (b.isSale ? b.salePrice : b.price) - (a.isSale ? a.salePrice : a.price)
      case 'rating':
        return b.rating - a.rating
      case 'newest':
      default:
        return a.isNew ? -1 : b.isNew ? 1 : 0
    }
  })

  // Update filters
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      
      // Update URL with new filters
      const searchParams = new URLSearchParams()
      if (newFilters.category) searchParams.set('category', newFilters.category)
      if (newFilters.sort !== 'newest') searchParams.set('sort', newFilters.sort)
      
      // Add age and size arrays to URL if they're not empty
      if (newFilters.age.length > 0) searchParams.set('age', newFilters.age.join(','))
      if (newFilters.size.length > 0) searchParams.set('size', newFilters.size.join(','))
      
      // Add price range to URL if it's not the default
      if (newFilters.priceRange[0] > 0) searchParams.set('minPrice', newFilters.priceRange[0].toString())
      if (newFilters.priceRange[1] < 100) searchParams.set('maxPrice', newFilters.priceRange[1].toString())
      
      navigate({
        pathname: location.pathname,
        search: searchParams.toString()
      })
      
      return newFilters
    })
  }
  
  // Handle checkbox filters (age, size)
  const handleCheckboxFilter = (key, value, checked) => {
    setFilters(prev => {
      let newValues = [...prev[key]]
      
      if (checked) {
        // Add the value if it's not already in the array
        if (!newValues.includes(value)) {
          newValues.push(value)
        }
      } else {
        // Remove the value if it's in the array
        newValues = newValues.filter(v => v !== value)
      }
      
      return { ...prev, [key]: newValues }
    })
  }

  // Toggle filter sidebar on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  // Create a context value object
  const filterContextValue = {
    filters,
    handleFilterChange,
    handleCheckboxFilter
  }

  return (
    <FilterContext.Provider value={filterContextValue}>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {filters.category 
              ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Collection` 
              : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filters.category 
              ? `Browse our ${filters.category} collection for stylish and comfortable clothing.` 
              : 'Explore our full range of kids clothing and accessories.'}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={toggleFilter}
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 py-3 px-4 rounded-xl font-medium"
          >
            <Filter className="h-5 w-5" />
            <span>Filter & Sort</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Sidebar */}
          <aside 
            className={`lg:w-64 ${isFilterOpen ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden lg:block'}`}
          >
            {isFilterOpen && (
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={toggleFilter}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close filters"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-bold mb-3">Category</h3>
                <div className="space-y-2">
                  <FilterButton 
                    selected={filters.category === ''}
                    onClick={() => handleFilterChange('category', '')}
                  >
                    All Products
                  </FilterButton>
                  <FilterButton 
                    selected={filters.category === 'boys'}
                    onClick={() => handleFilterChange('category', 'boys')}
                  >
                    Boys
                  </FilterButton>
                  <FilterButton 
                    selected={filters.category === 'girls'}
                    onClick={() => handleFilterChange('category', 'girls')}
                  >
                    Girls
                  </FilterButton>
                  <FilterButton 
                    selected={filters.category === 'baby'}
                    onClick={() => handleFilterChange('category', 'baby')}
                  >
                    Baby
                  </FilterButton>
                </div>
              </div>

              {/* Age Filter */}
              <div>
                <h3 className="text-lg font-bold mb-3">Age</h3>
                <div className="space-y-2">
                  <FilterCheckbox label="0-6 months" name="age" value="0-6m" />
                  <FilterCheckbox label="6-12 months" name="age" value="6-12m" />
                  <FilterCheckbox label="1-2 years" name="age" value="1-2y" />
                  <FilterCheckbox label="2-4 years" name="age" value="2-4y" />
                  <FilterCheckbox label="4-6 years" name="age" value="4-6y" />
                  <FilterCheckbox label="6-8 years" name="age" value="6-8y" />
                  <FilterCheckbox label="8-10 years" name="age" value="8-10y" />
                  <FilterCheckbox label="10-12 years" name="age" value="10-12y" />
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="text-lg font-bold mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  <SizeButton size="XS" />
                  <SizeButton size="S" />
                  <SizeButton size="M" />
                  <SizeButton size="L" />
                  <SizeButton size="XL" />
                  <SizeButton size="XXL" />
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-bold mb-3">Price Range</h3>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Min Price</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={filters.priceRange[0]} 
                        onChange={(e) => {
                          const min = parseInt(e.target.value)
                          const max = filters.priceRange[1]
                          // Ensure min doesn't exceed max
                          if (min <= max) {
                            setFilters(prev => ({ ...prev, priceRange: [min, max] }))
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Max Price</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={filters.priceRange[1]} 
                        onChange={(e) => {
                          const min = filters.priceRange[0]
                          const max = parseInt(e.target.value)
                          // Ensure max doesn't go below min
                          if (max >= min) {
                            setFilters(prev => ({ ...prev, priceRange: [min, max] }))
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sort Options (Mobile Only) */}
              <div className="lg:hidden">
                <h3 className="text-lg font-bold mb-3">Sort By</h3>
                <div className="space-y-2">
                  <FilterButton 
                    selected={filters.sort === 'newest'}
                    onClick={() => handleFilterChange('sort', 'newest')}
                  >
                    Newest
                  </FilterButton>
                  <FilterButton 
                    selected={filters.sort === 'price-low'}
                    onClick={() => handleFilterChange('sort', 'price-low')}
                  >
                    Price: Low to High
                  </FilterButton>
                  <FilterButton 
                    selected={filters.sort === 'price-high'}
                    onClick={() => handleFilterChange('sort', 'price-high')}
                  >
                    Price: High to Low
                  </FilterButton>
                  <FilterButton 
                    selected={filters.sort === 'rating'}
                    onClick={() => handleFilterChange('sort', 'rating')}
                  >
                    Top Rated
                  </FilterButton>
                </div>
              </div>

              {/* Apply Filters Button (Mobile Only) */}
              <div className="mt-6 lg:hidden">
                <button 
                  onClick={toggleFilter}
                  className="w-full btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Filter Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                <span className="font-medium">Filter:</span>
                <div className="ml-4 flex flex-wrap gap-2">
                  {filters.category && (
                    <FilterTag 
                      label={`Category: ${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`}
                      onRemove={() => handleFilterChange('category', '')}
                    />
                  )}
                  
                  {/* Age filter tags */}
                  {filters.age.length > 0 && (
                    <FilterTag 
                      label={`Age: ${filters.age.length} selected`}
                      onRemove={() => handleFilterChange('age', [])}
                    />
                  )}
                  
                  {/* Size filter tags */}
                  {filters.size.length > 0 && (
                    <FilterTag 
                      label={`Size: ${filters.size.join(', ')}`}
                      onRemove={() => handleFilterChange('size', [])}
                    />
                  )}
                  
                  {/* Price range filter tag */}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                    <FilterTag 
                      label={`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`}
                      onRemove={() => handleFilterChange('priceRange', [0, 100])}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">Sort by:</span>
                <select 
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="input py-1 pl-3 pr-8"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
                    <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {sortedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </FilterContext.Provider>
  )
}

// Helper Components
const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <Link to={`/products/${product.id}`} className="block">
          <div className="aspect-w-1 aspect-h-1">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
              New
            </span>
          )}
          {product.isSale && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
              Sale
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${product.category === 'boys' ? 'bg-blue-500' : product.category === 'girls' ? 'bg-pink-500' : 'bg-yellow-500'}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>
        
        {/* Quick action buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-2 rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to wishlist"
            onClick={() => {
              // In a real app, this would add the product to the wishlist
              console.log('Add to wishlist:', product.id)
            }}
          >
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
          <button 
            className="p-2 rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to cart"
            onClick={() => {
              // In a real app, this would add the product to the cart
              console.log('Add to cart:', product.id)
            }}
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      <Link to={`/products/${product.id}`} className="block">
        <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            {product.isSale ? (
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

const FilterButton = ({ children, selected, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selected ? 'bg-primary-100 text-primary-700 font-medium' : 'hover:bg-gray-100'}`}
    >
      {children}
    </button>
  )
}

const FilterCheckbox = ({ label, name, value }) => {
  // Get access to the parent component's filters and handler
  const { filters, handleCheckboxFilter } = useContext(FilterContext)
  const checked = filters[name].includes(value)
  
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className={`w-5 h-5 border rounded flex items-center justify-center ${checked ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      <input 
        type="checkbox" 
        className="hidden" 
        name={name} 
        value={value} 
        checked={checked}
        onChange={(e) => {
          handleCheckboxFilter(name, value, !checked)
        }}
      />
      <span>{label}</span>
    </label>
  )
}

const SizeButton = ({ size }) => {
  // Get access to the parent component's filters and handler
  const { filters, handleCheckboxFilter } = useContext(FilterContext)
  const selected = filters.size.includes(size)
  
  return (
    <button 
      onClick={() => {
        handleCheckboxFilter('size', size, !selected)
      }}
      className={`py-2 rounded-lg text-center transition-colors ${selected ? 'bg-primary-100 text-primary-700 font-medium' : 'border border-gray-200 hover:border-primary-300'}`}
    >
      {size}
    </button>
  )
}

const FilterTag = ({ label, onRemove }) => {
  return (
    <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
      <span>{label}</span>
      <button 
        onClick={onRemove}
        className="ml-2 p-0.5 rounded-full hover:bg-primary-100"
        aria-label="Remove filter"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export default ProductListingPage