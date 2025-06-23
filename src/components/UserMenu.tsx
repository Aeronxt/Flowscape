import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const menuItems = [
    { icon: <User className="w-4 h-4" />, label: 'Profile', action: () => {} },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', action: () => {} },
    { icon: <CreditCard className="w-4 h-4" />, label: 'Billing', action: () => {} },
    { icon: <LogOut className="w-4 h-4" />, label: 'Sign Out', action: handleSignOut },
  ]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-white text-sm font-medium hidden md:block">
          {user.user_metadata?.full_name || user.email?.split('@')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 border-b border-white/10">
                <div className="text-sm font-medium text-white">
                  {user.user_metadata?.full_name || 'User'}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user.email}
                </div>
              </div>
              
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}