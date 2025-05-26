import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Star, 
  Trash2, 
  ChevronDown,
  User,
  Clock,
  CheckCircle,
  MessageSquare,
  Mail,
  Phone,
  Filter
} from 'lucide-react'

const MessagesPage = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, unread, starred
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Simulate API call to fetch conversations
    const fetchConversations = () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        const mockConversations = Array.from({ length: 15 }, (_, i) => {
          const date = new Date()
          date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60 * 24)) // Random time in last 24 hours
          
          return {
            id: `conv-${i}`,
            customer: {
              name: `${['John', 'Jane', 'Michael', 'Emma', 'David'][Math.floor(Math.random() * 5)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
              email: `customer${i}@example.com`,
              avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${i + 10}.jpg`
            },
            lastMessage: {
              text: [
                'Hello, I have a question about my order.',
                'When will my order be shipped?',
                'Do you have this in a different size?',
                'I need to change my shipping address.',
                'Is this product in stock?'
              ][Math.floor(Math.random() * 5)],
              timestamp: date.toISOString(),
              isRead: Math.random() > 0.3
            },
            isStarred: Math.random() > 0.7,
            unreadCount: Math.floor(Math.random() * 5)
          }
        })
        
        setConversations(mockConversations)
        setLoading(false)
      }, 800)
    }

    fetchConversations()
  }, [])

  // Filter conversations based on search term and filter
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'unread') {
      return matchesSearch && conversation.unreadCount > 0
    } else if (filter === 'starred') {
      return matchesSearch && conversation.isStarred
    }
    
    return matchesSearch
  })

  // Load messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      // Simulate API call to fetch messages
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        const mockMessages = []
        const messageCount = Math.floor(Math.random() * 10) + 5
        
        let date = new Date()
        date.setHours(date.getHours() - messageCount)
        
        for (let i = 0; i < messageCount; i++) {
          const isCustomer = i % 2 === 0
          date.setMinutes(date.getMinutes() + Math.floor(Math.random() * 30) + 5)
          
          mockMessages.push({
            id: `msg-${selectedConversation.id}-${i}`,
            text: isCustomer ? [
              'Hello, I have a question about my order.',
              'When will my order be shipped?',
              'Do you have this in a different size?',
              'I need to change my shipping address.',
              'Is this product in stock?',
              'Thank you for your help!',
              'Can I get a refund?'
            ][Math.floor(Math.random() * 7)] : [
              'Hello! How can I help you today?',
              'Your order will be shipped within 2 business days.',
              'Yes, we have that in medium and large sizes.',
              'I can update your shipping address. Whats the new address?',
              'Yes, the product is currently in stock',
              'You are welcome! Let me know if you have any other questions.',
              'Yes, I can process a refund for you. Please provide your order number.'
            ][Math.floor(Math.random() * 7)],
            timestamp: date.toISOString(),
            isCustomer,
            isRead: true
          })
        }
        
        setMessages(mockMessages)
        setLoading(false)
        
        // Mark conversation as read
        setConversations(conversations.map(conv => {
          if (conv.id === selectedConversation.id) {
            return { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
          }
          return conv
        }))
        
        // Scroll to bottom of messages
        scrollToBottom()
      }, 800)
    }
  }, [selectedConversation])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) {
      return 'Just now'
    } else if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Send new message
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (newMessage.trim() === '') return
    
    const newMsg = {
      id: `msg-${selectedConversation.id}-${messages.length}`,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isCustomer: false,
      isRead: true
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
    
    // Update last message in conversation
    setConversations(conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: {
            text: newMessage,
            timestamp: new Date().toISOString(),
            isRead: true
          }
        }
      }
      return conv
    }))
  }

  // Star/unstar conversation
  const toggleStar = (conversationId) => {
    setConversations(conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, isStarred: !conv.isStarred }
      }
      return conv
    }))
  }

  // Delete conversation
  const deleteConversation = (conversationId) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setConversations(conversations.filter(conv => conv.id !== conversationId))
      if (selectedConversation && selectedConversation.id === conversationId) {
        setSelectedConversation(null)
        setMessages([])
      }
    }
  }

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Messages</h1>
        <p className="text-gray-600">Manage customer inquiries and support</p>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Conversations sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${filter === 'all' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${filter === 'unread' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('starred')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${filter === 'starred' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Starred
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {loading && !selectedConversation ? (
              <div className="p-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''}`}
                >
                  <div className="flex items-start">
                    <img 
                      src={conversation.customer.avatar} 
                      alt={conversation.customer.name}
                      className="h-10 w-10 rounded-full mr-3 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {conversation.customer.name}
                        </h3>
                        <div className="flex items-center">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStar(conversation.id)
                            }}
                            className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                          >
                            <Star className={`h-4 w-4 ${conversation.isStarred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteConversation(conversation.id)
                            }}
                            className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className={`text-sm ${conversation.lastMessage.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'} truncate`}>
                        {conversation.lastMessage.text}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(conversation.lastMessage.timestamp)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-600 text-xs font-medium text-white">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Messages area */}
        <div className="hidden md:flex md:flex-1 flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={selectedConversation.customer.avatar} 
                    alt={selectedConversation.customer.name}
                    className="h-10 w-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {selectedConversation.customer.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <Mail className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <User className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.isCustomer ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isCustomer ? 'bg-white text-gray-800 border border-gray-200' : 'bg-primary-600 text-white'}`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className={`text-xs mt-1 flex items-center ${message.isCustomer ? 'text-gray-500' : 'text-primary-200'}`}>
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimestamp(message.timestamp)}
                            {!message.isCustomer && (
                              <CheckCircle className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-end">
                  <div className="flex-1 relative">
                    <textarea
                      rows="3"
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <button 
                        type="button"
                        className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button 
                        type="button"
                        className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      >
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="p-6 rounded-full bg-gray-100 mb-4">
                <MessageSquare className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
              <p className="text-gray-500 max-w-md">
                Select a conversation from the sidebar to view messages or start a new conversation.
              </p>
            </div>
          )}
        </div>

        {/* Mobile view - no conversation selected */}
        {!selectedConversation && (
          <div className="md:hidden flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="p-6 rounded-full bg-gray-100 mb-4">
              <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
            <p className="text-gray-500 max-w-md">
              Select a conversation from the list to view messages.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage