"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCart } from "@/context/CartContext"
import { BiryaniOrderDialog } from "@/components/BiryaniOrderDialog"
import { useRouter } from "next/navigation"

const biryanis = [
  {
    id: 1,
    name: "Hyderabadi Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    price: 250,
  },
  {
    id: 2,
    name: "Lucknowi Mutton Biryani",
    image:
      "https://images.unsplash.com/photo-1630851840633-f96999247032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 300,
  },
  {
    id: 3,
    name: "Vegetable Dum Biryani",
    image:
      "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 200,
  },
]

const heroImages = [
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1630851840633-f96999247032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
]

const spiceImages = [
  "https://png.pngtree.com/png-clipart/20230114/original/pngtree-spice-chili-powder-png-image_8910611.png",
  "https://png.pngtree.com/png-clipart/20230113/original/pngtree-spice-cinnamon-stick-png-image_8906517.png",
  "https://png.pngtree.com/png-clipart/20230113/original/pngtree-spice-cardamom-png-image_8906518.png",
  "https://png.pngtree.com/png-clipart/20230113/original/pngtree-spice-star-anise-png-image_8906520.png",
  "https://png.pngtree.com/png-clipart/20230114/original/pngtree-spice-black-pepper-png-image_8910612.png",
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { addToCart } = useCart()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBiryani, setSelectedBiryani] = useState<(typeof biryanis)[0] | null>(null)
  const [actionType, setActionType] = useState<"addToCart" | "orderNow">("addToCart")
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const nextButton = document.querySelector("[data-carousel-next]") as HTMLButtonElement
      if (nextButton) {
        nextButton.click()
      }
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (biryani: (typeof biryanis)[0]) => {
    setSelectedBiryani(biryani)
    setActionType("addToCart")
    setIsDialogOpen(true)
  }

  const handleOrderNow = (biryani: (typeof biryanis)[0]) => {
    setSelectedBiryani(biryani)
    setActionType("orderNow")
    setIsDialogOpen(true)
  }

  const handleDialogConfirm = (quantity: number, spiceLevel: string) => {
    if (selectedBiryani) {
      if (actionType === "addToCart") {
        addToCart({ ...selectedBiryani, quantityKg: quantity, spiceLevel }, quantity, spiceLevel)
      } else {
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
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary to-muted">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[50vh] md:h-screen flex items-center justify-center overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full">
                <div className="relative w-full h-full">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Delicious Biryani ${index + 1}`}
                    className="w-full h-full object-cover filter brightness-50"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="text-center text-foreground z-10 px-4"
                    >
                      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-white">
                        Savor the Legacy of Royal Flavours
                      </h1>
                      <p className="text-lg md:text-xl text-white mb-4 md:mb-8">Discover the taste of tradition</p>
                      <Link href="/menu">
                        <Button
                          size="lg"
                          className="bg-[#F29422] hover:bg-white hover:text-black text-primary-foreground px-4 md:px-8 py-2 md:py-3 rounded-full text-base md:text-xl button-hover"
                        >
                          Explore Our Menu
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 left-4 right-4 z-20 flex justify-between transform -translate-y-1/2">
  {/* Left Button */}
  <CarouselPrevious 
    className="carousel-nav-button" 
    style={{
      left: "5%", // Slightly offset to the left
      position: "absolute", // Ensure it stays in the correct position
    }} 
  />
  
  {/* Right Button */}
  <CarouselNext 
    className="carousel-nav-button" 
    style={{
      right: "5%", // Slightly offset to the right
      position: "absolute", // Ensure it stays in the correct position
    }} 
  />
</div>

        </Carousel>
      </section>

      {/* Floating Spices Animation */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {isLoaded &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.img
              key={i}
              src={spiceImages[i % spiceImages.length]}
              alt="Spice"
              className="w-8 h-8 absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
              }}
            />
          ))}
      </div>

      {/* About Our Biryani Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#F2541B]"
          >
            Our Biryani Story
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0"
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Biryani Preparation"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our biryani is a labor of love, crafted with century-old recipes passed down through generations. We use
                only the finest Basmati rice, aromatic spices, and tender meat to create a symphony of flavors that
                dance on your palate. Each pot of biryani is slow-cooked to perfection, ensuring that every grain of
                rice is infused with the essence of our carefully selected spices.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Biryani Showcase */}
      <section className="py-16 bg-gradient-to-b from-secondary to-muted">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center  text-[#F2541B]"
          >
            Our Signature Biryanis
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {biryanis.map((biryani) => (
              <motion.div
                key={biryani.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="overflow-hidden card-hover bg-card">
                  <CardContent className="p-0">
                    <Image
                      src={biryani.image || "/placeholder.svg"}
                      alt={biryani.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{biryani.name}</h3>
                      <p className="text-lg font-bold text-primary mb-2">₹{biryani.price}</p>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1 button-hover hover:bg-[#F29422]"
                          onClick={() => handleAddToCart(biryani)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className="flex-1 bg-[#F29422] hover:bg-white  text-primary-foreground button-hover hover:text-black"
                          onClick={() => handleOrderNow(biryani)}
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
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-primary hover:bg-accent text-primary-foreground px-8 py-3 rounded-full text-xl button-hover bg-[#F29422]"
              >
                View All Biryanis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-[#F2A922] text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#F2541B]"
          >
            What Our Customers Say
          </motion.h2>
          <Carousel className="max-w-xl mx-auto" opts={{ loop: true, align: "start" }}>
            <CarouselContent>
              {[
                { name: "Rahul S.", quote: "The best biryani I've ever tasted! The flavors are out of this world." },
                { name: "Priya M.", quote: "Absolutely delicious! Every bite is a journey through aromatic spices." },
                { name: "Ahmed K.", quote: "Reminds me of my grandmother's biryani. Authentic and full of love." },
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-card/10 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <p className="text-lg mb-4">"{testimonial.quote}"</p>
                      <p className="font-semibold">- {testimonial.name}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black" />
            <CarouselNext className="text-black" />
          </Carousel>
        </div>
      </section>
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

