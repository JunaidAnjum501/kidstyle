import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Trash2, 
  ChevronLeft,
  User,
  Clock,
  CheckCircle,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const MessagesPage = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
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
        // Mock data - for users, we'll have fewer conversations, typically with support/admin
        const mockConversations = [
          {
            id: 'conv-1',
            title: 'Order #12345 Inquiry',
            supportAgent: {
              name: 'Customer Support',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            lastMessage: {
              text: 'Your order has been shipped and should arrive within 3-5 business days.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
              isRead: true
            },
            unreadCount: 0
          },
          {
            id: 'conv-2',
            title: 'Product Availability',
            supportAgent: {
              name: 'Product Specialist',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            lastMessage: {
              text: 'Yes, the item will be back in stock next week. Would you like me to notify you?',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
              isRead: false
            },
            unreadCount: 2
          },
          {
            id: 'conv-3',
            title: 'Return Request',
            supportAgent: {
              name: 'Returns Department',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
            lastMessage: {
              text: 'Your return has been approved. Please use the provided shipping label.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
              isRead: true
            },
            unreadCount: 0
          }
        ]
        
        setConversations(mockConversations)
        setLoading(false)
      }, 800)
    }

    fetchConversations()
  }, [])

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation => {
    return conversation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conversation.supportAgent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conversation.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Load messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      // Simulate API call to fetch messages
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        let mockMessages = []
        
        if (selectedConversation.id === 'conv-1') {
          // Order inquiry conversation
          const date = new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
          mockMessages = [
            {
              id: 'msg-1',
              text: 'Hello, I wanted to check on the status of my order #12345.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 5).toISOString(),
              isCustomer: true,
              isRead: true
            },
            {
              id: 'msg-2',
              text: 'Hi there! Let me check that for you right away.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 10).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-3',
              text: 'I can see that your order has been processed and is now being prepared for shipping.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 12).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-4',
              text: 'When can I expect it to be delivered?',
              timestamp: new Date(date.getTime() + 1000 * 60 * 20).toISOString(),
              isCustomer: true,
              isRead: true
            },
            {
              id: 'msg-5',
              text: 'Your order has been shipped and should arrive within 3-5 business days.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 25).toISOString(),
              isCustomer: false,
              isRead: true
            }
          ]
        } else if (selectedConversation.id === 'conv-2') {
          // Product availability conversation
          const date = new Date(Date.now() - 1000 * 60 * 60 * 36) // 1.5 days ago
          mockMessages = [
            {
              id: 'msg-1',
              text: 'I am interested in the Blue Striped T-shirt in size 6, but it seems to be out of stock. Will it be available soon?',
              timestamp: new Date(date.getTime() + 1000 * 60 * 5).toISOString(),
              isCustomer: true,
              isRead: true
            },
            {
              id: 'msg-2',
              text: 'Let me check our inventory system for you.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 15).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-3',
              text: 'I have checked with our warehouse team. That particular item is currently being restocked.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 20).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-4',
              text: 'Do you know when it will be available?',
              timestamp: new Date(date.getTime() + 1000 * 60 * 25).toISOString(),
              isCustomer: true,
              isRead: true
            },
            {
              id: 'msg-5',
              text: 'Yes, the item will be back in stock next week. Would you like me to notify you?',
              timestamp: new Date(date.getTime() + 1000 * 60 * 30).toISOString(),
              isCustomer: false,
              isRead: false
            }
          ]
        } else if (selectedConversation.id === 'conv-3') {
          // Return request conversation
          const date = new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
          mockMessages = [
            {
              id: 'msg-1',
              text: 'I did like to return the red dress I purchased. It does not fit properly.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 5).toISOString(),
              isCustomer: true,
              isRead: true
            },
            {
              id: 'msg-2',
              text: 'I am sorry to hear that. I do be happy to help you with the return process.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 20).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-3',
              text: 'Could you please provide your order number?',
              timestamp: new Date(date.getTime() + 1000 * 60 * 22).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-4',
              text: 'My order number is #54321.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 30).toISOString(),
              isCustomer: true,
              isRead: true
            },
            {
              id: 'msg-5',
              text: 'Thank you. I have processed your return request.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 45).toISOString(),
              isCustomer: false,
              isRead: true
            },
            {
              id: 'msg-6',
              text: 'Your return has been approved. Please use the provided shipping label.',
              timestamp: new Date(date.getTime() + 1000 * 60 * 50).toISOString(),
              isCustomer: false,
              isRead: true
            }
          ]
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
      isCustomer: true,
      isRead: false
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
            isRead: false
          }
        }
      }
      return conv
    }))

    // Simulate response after a delay (in a real app, this would come from the server)
    setTimeout(() => {
      const responseMsg = {
        id: `msg-${selectedConversation.id}-${messages.length + 1}`,
        text: "Thank you for your message. Our team will get back to you shortly.",
        timestamp: new Date().toISOString(),
        isCustomer: false,
        isRead: true
      }
      
      setMessages(prevMessages => [...prevMessages, responseMsg])
    }, 1000)
  }

  // Delete conversation
  const handleDeleteConversation = (conversationId) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setConversations(conversations.filter(conv => conv.id !== conversationId))
      if (selectedConversation && selectedConversation.id === conversationId) {
        setSelectedConversation(null)
        setMessages([])
      }
    }
  }

  // Start new conversation
  const handleStartNewConversation = () => {
    const newConversation = {
      id: `conv-${conversations.length + 1}`,
      title: 'New Support Request',
      supportAgent: {
        name: 'Customer Support',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      lastMessage: {
        text: 'How can we help you today?',
        timestamp: new Date().toISOString(),
        isRead: true
      },
      unreadCount: 0
    }
    
    setConversations([newConversation, ...conversations])
    setSelectedConversation(newConversation)
  }

  // Empty state - no conversations
  if (!loading && conversations.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="bg-gray-100 rounded-full p-6 inline-block mb-4">
                <MessageSquare className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold mb-4">No Messages Yet</h1>
              <p className="text-gray-600 mb-8">Start a conversation with our support team for any questions or assistance.</p>
              <button 
                onClick={handleStartNewConversation}
                className="btn-primary inline-flex items-center"
              >
                <span>Start New Conversation</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Messages</h1>
          <p className="text-gray-600">View and manage your conversations with our team</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row h-[calc(100vh-200px)]">
            {/* Conversations sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-gray-800">Conversations</h2>
                  <button 
                    onClick={handleStartNewConversation}
                    className="text-sm px-3 py-1 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                  >
                    New
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search messages"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                          src={conversation.supportAgent.avatar} 
                          alt={conversation.supportAgent.name}
                          className="h-10 w-10 rounded-full mr-3 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {conversation.title}
                            </h3>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteConversation(conversation.id)
                              }}
                              className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {conversation.supportAgent.name}
                          </p>
                          <p className={`text-sm ${conversation.lastMessage.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'} truncate mt-1`}>
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
                        src={selectedConversation.supportAgent.avatar} 
                        alt={selectedConversation.supportAgent.name}
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {selectedConversation.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {selectedConversation.supportAgent.name}
                        </p>
                      </div>
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
                            className={`flex ${message.isCustomer ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isCustomer ? 'bg-primary-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <div className={`text-xs mt-1 flex items-center ${message.isCustomer ? 'text-primary-200' : 'text-gray-500'}`}>
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimestamp(message.timestamp)}
                                {message.isRead && (
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
                    Select a conversation from the sidebar or start a new one to get help from our team.
                  </p>
                  <button 
                    onClick={handleStartNewConversation}
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </button>
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
                <button 
                  onClick={handleStartNewConversation}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start New Conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage