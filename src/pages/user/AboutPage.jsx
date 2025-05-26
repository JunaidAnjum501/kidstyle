import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-primary-600">About KidStyle</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Creating joyful, sustainable, and high-quality clothing for the next generation
          </p>
        </motion.div>
        
        {/* Hero Banner */}
        <motion.div 
          className="relative rounded-xl overflow-hidden mb-16 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" 
            alt="Happy children in colorful clothes" 
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 md:p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Dressing the Future</h2>
              <p className="text-lg md:text-xl max-w-2xl">Since 2015, we've been on a mission to create clothing that celebrates childhood.</p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden mb-16">
          <div className="p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-600 border-b border-primary-100 pb-2">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2015 by parents who understood the challenges of finding clothes that kids want to wear and that stand up to the demands of childhood, KidStyle is dedicated to providing high-quality, comfortable, and stylish clothing for children of all ages. We believe that kids should feel good in what they wear, and parents should feel good about what they're buying.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-primary-600 border-b border-primary-100 pb-2">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At KidStyle, our mission is to create clothing that celebrates childhood while being practical, durable, and affordable. We're committed to using safe, sustainable materials that are gentle on sensitive skin and kind to our planet. Every piece we create is designed with both style and functionality in mind, ensuring that children can express themselves while parents can appreciate the quality and value.
              </p>
            </motion.div>
            
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-600 border-b border-primary-100 pb-2">Our Journey</h2>
              <div className="relative border-l-2 border-primary-200 pl-8 ml-4 space-y-10">
                <TimelineItem year="2015" title="The Beginning">
                  KidStyle was founded by two parents looking to create better clothing options for their own children.
                </TimelineItem>
                <TimelineItem year="2017" title="Going Online">
                  We launched our first e-commerce store, making our products available nationwide.
                </TimelineItem>
                <TimelineItem year="2019" title="Sustainable Initiative">
                  Introduced our first fully sustainable collection using 100% organic materials.
                </TimelineItem>
                <TimelineItem year="2021" title="International Expansion">
                  KidStyle products became available in international markets across Europe and Asia.
                </TimelineItem>
                <TimelineItem year="2023" title="Today">
                  Continuing to innovate with new designs, materials, and shopping experiences for families everywhere.
                </TimelineItem>
              </div>
            </motion.div>
            
            {/* Values */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-600 border-b border-primary-100 pb-2">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="bg-primary-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-primary-700">Quality</h3>
                  </div>
                  <p className="text-gray-700">We never compromise on quality. Every stitch, button, and zipper is carefully selected and tested to ensure durability through countless adventures and washes.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-primary-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-primary-700">Sustainability</h3>
                  </div>
                  <p className="text-gray-700">We're committed to reducing our environmental footprint by using organic cotton, recycled materials, and eco-friendly packaging.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-primary-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-primary-700">Inclusivity</h3>
                  </div>
                  <p className="text-gray-700">We design clothes for all children, regardless of gender, ability, or background. Our sizing is inclusive and our designs are diverse.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-primary-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-primary-700">Affordability</h3>
                  </div>
                  <p className="text-gray-700">We believe quality children's clothing should be accessible to all families, which is why we work hard to keep our prices fair.</p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-600 border-b border-primary-100 pb-2">Our Team</h2>
              <p className="text-lg text-gray-700 mb-8">
                Our diverse team brings together expertise from fashion, sustainability, and child development to create clothing that's perfect for growing kids.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TeamMember 
                  name="Sarah Johnson" 
                  role="Founder & Creative Director"
                  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                />
                <TeamMember 
                  name="Michael Chen" 
                  role="Head of Sustainability"
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                />
                <TeamMember 
                  name="Aisha Patel" 
                  role="Lead Designer"
                  image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                />
              </div>
            </motion.div>
            
            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-600 border-b border-primary-100 pb-2">What Parents Say</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Testimonial 
                  quote="KidStyle clothes have been a game-changer for our family. They're durable enough to handle my son's adventures and cute enough that he actually wants to wear them!"
                  author="Jessica M., Mother of two"
                />
                <Testimonial 
                  quote="I love that I can shop at KidStyle knowing the materials are safe for my daughter's sensitive skin and also good for the planet. The quality is outstanding."
                  author="David L., Father of one"
                />
              </div>
            </motion.div>
            
            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-primary-50 p-8 rounded-xl text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Join Our Journey</h2>
              <p className="text-lg text-gray-700 mb-6">
                We're constantly growing and evolving, and we'd love for you to be part of our story. Follow us on social media for updates, behind-the-scenes content, and special offers.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link to="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors">
                  <span className="sr-only">Pinterest</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div className="mt-8">
                <Link to="/contact" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
const TimelineItem = ({ year, title, children }) => (
  <div className="relative mb-6">
    <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border-2 border-primary-500 bg-white flex items-center justify-center">
      <div className="h-3 w-3 rounded-full bg-primary-500"></div>
    </div>
    <div className="mb-1">
      <span className="text-sm font-bold inline-block px-2 py-1 rounded bg-primary-100 text-primary-800">{year}</span>
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-1">{children}</p>
  </div>
)

const TeamMember = ({ name, role, image }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
  >
    <img src={image} alt={name} className="w-full h-64 object-cover object-center" />
    <div className="p-4 text-center">
      <h3 className="font-bold text-lg text-gray-800">{name}</h3>
      <p className="text-primary-600">{role}</p>
    </div>
  </motion.div>
)

const Testimonial = ({ quote, author }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
  >
    <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
    <p className="text-gray-700 mb-4 italic">"{quote}"</p>
    <p className="text-sm font-medium text-primary-600">{author}</p>
  </motion.div>
)

export default AboutPage