import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData)
    
    // Simulate form submission
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Contact Us</h1>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <ContactCard 
                icon={<Phone className="h-6 w-6" />}
                title="Phone"
                content="(123) 456-7890"
                subtitle="Mon-Fri, 9am-5pm EST"
              />
              <ContactCard 
                icon={<Mail className="h-6 w-6" />}
                title="Email"
                content="hello@kidstyle.com"
                subtitle="We'll respond within 24 hours"
              />
              <ContactCard 
                icon={<MapPin className="h-6 w-6" />}
                title="Address"
                content="123 Kids Street"
                subtitle="Playful City, PC 12345"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 bg-primary-50">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <p className="text-gray-700 mb-6">
                    Have a question about our products, shipping, or returns? We're here to help! Fill out the form and we'll get back to you as soon as possible.
                  </p>
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Customer Service Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 9am - 5pm EST</p>
                    <p className="text-gray-700">Saturday: 10am - 2pm EST</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                        <span className="sr-only">Facebook</span>
                        {/* Facebook icon */}
                      </a>
                      <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                        <span className="sr-only">Instagram</span>
                        {/* Instagram icon */}
                      </a>
                      <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                        <span className="sr-only">Twitter</span>
                        {/* Twitter icon */}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full flex items-center justify-center gap-2 btn-primary"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    
                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg"
                      >
                        Thank you for your message! We'll get back to you soon.
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const ContactCard = ({ icon, title, content, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-900 font-medium mb-1">{content}</p>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  )
}

export default ContactPage