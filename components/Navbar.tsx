"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartModal from "@/components/CartModal"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-[#F29422] text-primary-foreground py-2 px-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-31%20at%2019.50.07_bfb5d406.jpg-Cs2twcTXKxlbYbnmzktBOCSlyoKkXH.jpeg"
            alt="Aha Biriyani Logo"
            width={60}
            height={30}
            className="object-contain"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="nav-link hover:text-accent-foreground transition-colors">
            Home
          </Link>
          <Link href="/menu" className="nav-link hover:text-accent-foreground transition-colors">
            Menu
          </Link>
          <Link href="/contact-us" className="nav-link hover:text-accent-foreground transition-colors">
            Contact Us
          </Link>
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="ghost"
            className="relative hover:bg-accent/20 text-primary-foreground"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 items-end">
          <Link href="/" className="w-full text-right hover:text-accent-foreground transition-colors py-2">
            Home
          </Link>
          <Link href="/menu" className="w-full text-right hover:text-accent-foreground transition-colors py-2">
            Menu
          </Link>
          <Link href="/contact-us" className="w-full text-right hover:text-accent-foreground transition-colors py-2">
            Contact Us
          </Link>
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="ghost"
            className="w-full justify-end hover:bg-accent/20 text-primary-foreground py-2"
          >
            Cart ({cartItemCount})
            <ShoppingCart className="h-6 w-6 ml-2" />
          </Button>
        </div>
      )}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}

