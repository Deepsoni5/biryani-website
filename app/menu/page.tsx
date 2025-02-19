"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useCart } from "@/context/CartContext"
import { BiryaniOrderDialog } from "@/components/BiryaniOrderDialog"
import { useRouter } from "next/navigation"
import { SkeletonCard } from "@/components/SkeletonCard"

const allBiryanis = [
  {
    id: 1,
    name: "Hyderabadi Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    price: 250,
    isVeg: false,
  },
  {
    id: 2,
    name: "Lucknowi Mutton Biryani",
    image:
      "https://images.unsplash.com/photo-1630851840633-f96999247032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 300,
    isVeg: false,
  },
  {
    id: 3,
    name: "Vegetable Dum Biryani",
    image:
      "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 200,
    isVeg: true,
  },
  {
    id: 4,
    name: "Kolkata Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 280,
    isVeg: false,
  },
  {
    id: 5,
    name: "Malabar Fish Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 320,
    isVeg: false,
  },
  {
    id: 6,
    name: "Paneer Biryani",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    price: 220,
    isVeg: true,
  },
]

export default function MenuPage() {
  const [vegMode, setVegMode] = useState(false)
  const { addToCart } = useCart()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBiryani, setSelectedBiryani] = useState<(typeof allBiryanis)[0] | null>(null)
  const [actionType, setActionType] = useState<"addToCart" | "orderNow">("addToCart")
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const filteredBiryanis = vegMode ? allBiryanis.filter((biryani) => biryani.isVeg) : allBiryanis

  const handleAddToCart = (biryani: (typeof allBiryanis)[0]) => {
    setSelectedBiryani(biryani)
    setActionType("addToCart")
    setIsDialogOpen(true)
  }

  const handleOrderNow = (biryani: (typeof allBiryanis)[0]) => {
    setSelectedBiryani(biryani)
    setActionType("orderNow")
    setIsDialogOpen(true)
  }

  const handleDialogConfirm = (quantity: number, spiceLevel: string) => {
    if (selectedBiryani) {
      if (actionType === "addToCart") {
        addToCart({ ...selectedBiryani, quantityKg: quantity, spiceLevel }, quantity, spiceLevel)
      } else {
        // Redirect to checkout page with the selected biryani
        router.push(
          `/checkout?item=${encodeURIComponent(
            JSON.stringify({
              ...selectedBiryani,
              quantity: 1,
              quantityKg: quantity,
              spiceLevel,
            }),
          )}`,
        )
      }
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-8 md:py-16 pb-16 md:pb-32">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#F2541B]"
        >
          Our Biryani Menu
        </motion.h1>
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center space-x-2">
            <Switch id="veg-mode" checked={vegMode} onCheckedChange={setVegMode} />
            <label htmlFor="veg-mode" className="text-[#F2541B]">
              Veg Only
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            : filteredBiryanis.map((biryani, index) => (
                <motion.div
                  key={biryani.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <Image
                        src={biryani.image || "/placeholder.svg"}
                        alt={biryani.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#F2541B]">{biryani.name}</h3>
                        <p className="text-base md:text-lg font-bold text-[#F2541B] mb-2">₹{biryani.price}</p>
                        <div className="flex space-x-2 mt-auto">
                          <Button
                            onClick={() => handleAddToCart(biryani)}
                            className="flex-1 bg-white hover:bg-[#F29422] hover:text-white text-black text-sm md:text-base"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleOrderNow(biryani)}
                            className="flex-1 bg-[#F29422] hover:bg-white hover:text-black  text-accent-foreground text-sm md:text-base"
                          >
                            Order Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
      {selectedBiryani && (
        <BiryaniOrderDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleDialogConfirm}
          biryaniName={selectedBiryani.name}
        />
      )}
    </div>
  )
}

