"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  quantityKg: number
  spiceLevel: string
  image?: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number, quantityKg: number, spiceLevel: string) => void
  updateQuantity: (id: number, quantity: number, quantityKg: number, spiceLevel: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("biryaniCart")
    if (storedCart) {
      try {
        const { items, expiration } = JSON.parse(storedCart)
        if (new Date().getTime() < expiration) {
          setCartItems(items)
        } else {
          localStorage.removeItem("biryaniCart")
        }
      } catch (error) {
        console.error("Error parsing stored cart:", error)
        localStorage.removeItem("biryaniCart")
      }
    }
  }, [])

  useEffect(() => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    localStorage.setItem(
      "biryaniCart",
      JSON.stringify({
        items: cartItems,
        expiration: expirationDate.getTime(),
      }),
    )
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.quantityKg === item.quantityKg && cartItem.spiceLevel === item.spiceLevel,
      )
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.quantityKg === item.quantityKg && cartItem.spiceLevel === item.spiceLevel
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number, quantityKg: number, spiceLevel: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.quantityKg === quantityKg && item.spiceLevel === spiceLevel)),
    )
  }

  const updateQuantity = (id: number, quantity: number, quantityKg: number, spiceLevel: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantityKg === quantityKg && item.spiceLevel === spiceLevel
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("biryaniCart")
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

