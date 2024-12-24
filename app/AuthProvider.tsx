'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string,
  role?: 'passenger' | 'driver'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  updateUserRole: (newRole: 'passenger' | 'driver') => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const updateUserRole = (newRole: 'passenger' | 'driver') => {
    if (user) {
      const updatedUser = { ...user, role: newRole }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      router.push(`/tabs/${newRole}/home`)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid credentials')
      }

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0]
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      router.push('/role-select') // Redirect to role selector after login
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid credentials')
      }

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      router.push('/role-select') // Redirect to role selector after signup
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/sign-in')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    updateUserRole
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}