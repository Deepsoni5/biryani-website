import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#F29422] text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="md:text-left">
            <h3 className="text-xl font-bold mb-4">Biryani Paradise</h3>
            <p className="mb-4">Bringing royal flavors to your doorstep</p>
            <div className="flex justify-start space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
          <div className="md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-accent transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>123 Biryani Street</p>
            <p>Flavortown, SP 12345</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@biryaniparadise.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted text-center">
          <p>&copy; 2023 Biryani Paradise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

