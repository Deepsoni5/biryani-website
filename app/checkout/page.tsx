"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BiryaniOrderDialog } from "@/components/BiryaniOrderDialog"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedCart = localStorage.getItem("biryaniCart")
    if (!storedCart || JSON.parse(storedCart).items.length === 0) {
      router.push("/menu")
    }
  }, [router])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity * item.quantityKg, 0)

  const handleOrderNow = () => {
    setIsDialogOpen(true)
  }

  const handleDialogConfirm = () => {
    console.log("Order confirmed for all items")
    setIsDialogOpen(false)
    router.push("/order-confirmation")
  }

  if (cartItems.length === 0) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-200 py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-amber-800"
        >
          Your Order
        </motion.h1>
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.quantityKg}-${item.spiceLevel}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-amber-800 mb-2">{item.name}</h3>
                  <p className="text-amber-600 mb-1">
                    {item.quantityKg}kg, {item.spiceLevel}
                  </p>
                  <p className="text-amber-600 mb-4">
                    Quantity: {item.quantity} x ₹{item.price} = ₹{item.price * item.quantity * item.quantityKg}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 md:mt-12 bg-white rounded-lg shadow-lg p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-amber-800 mb-2 md:mb-0">Order Summary</h2>
            <p className="text-xl md:text-2xl font-bold text-amber-800">Total: ₹{total.toFixed(2)}</p>
          </div>
          <Button
            onClick={handleOrderNow}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white text-base md:text-lg py-2 md:py-3 rounded-full transition-all duration-300"
          >
            Order Now
          </Button>
        </motion.div>
      </div>
      <BiryaniOrderDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDialogConfirm}
        biryaniName="All Items"
      />
    </div>
  )
}

