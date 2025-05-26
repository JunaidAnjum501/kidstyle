import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: 'Colorful Summer Collection',
      subtitle: 'Bright and playful styles for sunny days',
      image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      cta: 'Shop Now',
      link: '/products?collection=summer',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Back to School Essentials',
      subtitle: 'Comfortable and durable clothes for the classroom',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
      cta: 'Explore Collection',
      link: '/products?collection=school',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 3,
      title: 'Cozy Winter Warmers',
      subtitle: 'Soft and snuggly outfits to keep them warm',
      image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5bfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      cta: 'Discover More',
      link: '/products?collection=winter',
      color: 'from-red-500 to-orange-500',
    },
  ]

  // Featured categories
  const categories = [
    {
      id: 1,
      name: 'Boys',
      image: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      link: '/collections',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Girls',
      image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      link: '/collections',
      color: 'bg-pink-500',
    },
    {
      id: 3,
      name: 'Baby',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      link: '/collections',
      color: 'bg-yellow-500',
    },
  ]

  // New arrivals data
  const newArrivals = [
    {
      id: 1,
      name: 'Rainbow Stripe T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      category: 'girls',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Dinosaur Print Hoodie',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      category: 'boys',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Soft Cotton Romper',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      category: 'baby',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Adventure Cargo Pants',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: 'boys',
      rating: 4.6,
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Mother of two',
      content: 'The quality of the clothes is amazing! My kids love the bright colors and fun designs. The fabric is so soft and has held up well after multiple washes.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Michael Thompson',
      role: 'Father of three',
      content: 'Finally found clothes that my active boys cant destroy! The durability is impressive and the sizing is consistent across different items.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Mother of a toddler',
      content: 'The baby clothes are so adorable and practical. The snap buttons make changing diapers a breeze, and the fabric is gentle on my babys sensitive skin.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ]

  // Auto-advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animation for sections
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl text-white"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-6">{slide.subtitle}</p>
                  <Link 
                    to={slide.link}
                    className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${slide.color} text-white font-medium transition-transform hover:scale-105`}
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Navigation */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect outfits for your little ones, categorized for easy shopping</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.link} className="block group">
                  <div className="relative overflow-hidden rounded-2xl h-80">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <span className="inline-flex items-center text-white font-medium">
                        Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Check out our latest styles and designs for your growing kids</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="inline-block px-6 py-3 rounded-full bg-primary-500 text-white font-medium transition-transform hover:scale-105 hover:bg-primary-600"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale Up to 50% Off</h2>
                <p className="text-primary-100 mb-6">Get ready for summer with our colorful and comfortable collection. Limited time offer!</p>
                <Link 
                  to="/products?tag=sale"
                  className="inline-block px-6 py-3 rounded-full bg-white text-primary-600 font-medium transition-transform hover:scale-105"
                >
                  Shop the Sale
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.img 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" 
                alt="Summer Sale" 
                className="rounded-2xl shadow-lg max-h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Parents Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it - hear from our happy customers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-soft"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.content}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-gray-600 mb-8">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow h-12 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  required
                />
                <button 
                  type="submit" 
                  className="h-12 px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 bg-primary-500 text-white hover:bg-primary-600 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage