import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, X, ChevronDown, Star, Heart, ShoppingCart, SlidersHorizontal, Check } from 'lucide-react'

const CollectionPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')

  // Fetch collections
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setCollections([
        {
          id: 1,
          name: 'Boys Collection',
          type: 'boys',
          description: 'Comfortable and stylish clothing for boys of all ages',
          image: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          items: [
            {
              id: 101,
              name: 'Dinosaur Print Hoodie',
              price: 32.99,
              image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
              rating: 4.9,
              isNew: true,
              isSale: false
            },
            {
              id: 102,
              name: 'Adventure Cargo Pants',
              price: 29.99,
              image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              rating: 4.6,
              isNew: false,
              isSale: true,
              salePrice: 24.99
            },
            {
              id: 103,
              name: 'Graphic Print T-Shirt',
              price: 18.99,
              image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
              rating: 4.7,
              isNew: false,
              isSale: false
            },
            {
              id: 104,
              name: 'Denim Jacket',
              price: 39.99,
              image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80',
              rating: 4.8,
              isNew: true,
              isSale: false
            }
          ]
        },
        {
          id: 2,
          name: 'Girls Collection',
          type: 'girls',
          description: 'Stylish and playful clothing for girls of all ages',
          image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
          items: [
            {
              id: 201,
              name: 'Rainbow Stripe T-Shirt',
              price: 24.99,
              image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              rating: 4.8,
              isNew: true,
              isSale: false
            },
            {
              id: 202,
              name: 'Floral Summer Dress',
              price: 34.99,
              image: 'https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
              rating: 4.9,
              isNew: false,
              isSale: true,
              salePrice: 29.99
            },
            {
              id: 203,
              name: 'Denim Overalls',
              price: 39.99,
              image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
              rating: 4.7,
              isNew: false,
              isSale: false
            },
            {
              id: 204,
              name: 'Unicorn Hoodie',
              price: 32.99,
              image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              rating: 4.8,
              isNew: true,
              isSale: false
            }
          ]
        },
        {
          id: 3,
          name: 'Baby Collection',
          type: 'baby',
          description: 'Soft and comfortable clothing for babies and toddlers',
          image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          items: [
            {
              id: 301,
              name: 'Soft Cotton Romper',
              price: 19.99,
              image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
              rating: 4.7,
              isNew: true,
              isSale: false
            },
            {
              id: 302,
              name: 'Animal Print Onesie',
              price: 22.99,
              image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
              rating: 4.9,
              isNew: false,
              isSale: true,
              salePrice: 18.99
            },
            {
              id: 303,
              name: 'Baby Knit Set',
              price: 29.99,
              image: 'https://images.unsplash.com/photo-1619784299133-f691ffaea42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              rating: 4.8,
              isNew: false,
              isSale: false
            },
            {
              id: 304,
              name: 'Soft Booties',
              price: 14.99,
              image: 'https://images.unsplash.com/photo-1580440282860-8555b1ae102c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              rating: 4.6,
              isNew: true,
              isSale: false
            }
          ]
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter collections by type
  const filteredCollections = activeType === 'all' 
    ? collections 
    : collections.filter(collection => collection.type === activeType)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of clothing collections for kids of all ages</p>
        </motion.div>

        {/* Collection Type Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveType('all')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeType === 'all' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              All Collections
            </button>
            <button
              onClick={() => setActiveType('boys')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeType === 'boys' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Boys
            </button>
            <button
              onClick={() => setActiveType('girls')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeType === 'girls' ? 'bg-pink-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Girls
            </button>
            <button
              onClick={() => setActiveType('baby')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeType === 'baby' ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Baby
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredCollections.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-4">No collections found</h3>
                <p className="text-gray-500 mb-6">Try selecting a different category or check back later.</p>
                <button 
                  onClick={() => setActiveType('all')}
                  className="btn-primary"
                >
                  View All Collections
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredCollections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={collection.image} 
                        alt={collection.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold">{collection.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">{collection.description}</p>
                      <Link 
                        to={`/products?category=${collection.type}`}
                        className="btn-primary w-full flex items-center justify-center"
                      >
                        View Collection
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Featured Products from Collections */}
            {filteredCollections.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredCollections.flatMap(collection => 
                    collection.items.slice(0, activeType === 'all' ? 1 : 4)
                  ).map(product => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
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
                          {product.isNew && (
                            <div className="absolute top-4 left-4">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-green-500">
                                New
                              </span>
                            </div>
                          )}
                          {product.isSale && (
                            <div className="absolute top-4 right-4">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-red-500">
                                Sale
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-4 right-4 flex space-x-2">
                            <button 
                              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition-colors"
                              onClick={(e) => {
                                e.preventDefault()
                                console.log('Add to wishlist:', product.name)
                              }}
                              aria-label="Add to wishlist"
                            >
                              <Heart className="h-5 w-5" />
                            </button>
                            <button 
                              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition-colors"
                              onClick={(e) => {
                                e.preventDefault()
                                console.log('Add to cart:', product.name)
                              }}
                              aria-label="Add to cart"
                            >
                              <ShoppingCart className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.isSale ? (
                              <div className="flex items-center">
                                <span className="font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
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
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CollectionPage