import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const router = useRouter()
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity * item.quantityKg, 0)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-amber-800">Your Cart</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="text-amber-800" />
            </Button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-amber-800">Your cart is empty.</p>
          ) : (
            <>
              <div className="max-h-[60vh] overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.quantityKg}-${item.spiceLevel}`}
                    className="flex justify-between items-center mb-4 bg-amber-50 p-3 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-amber-800">{item.name}</h3>
                      <p className="text-amber-600">
                        ₹{item.price} x {item.quantity} ({item.quantityKg}kg, {item.spiceLevel})
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(0, item.quantity - 1), item.quantityKg, item.spiceLevel)
                        }
                        className="text-amber-600 border-amber-600 hover:bg-amber-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 text-amber-800">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.quantityKg, item.spiceLevel)}
                        className="text-amber-600 border-amber-600 hover:bg-amber-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id, item.quantityKg, item.spiceLevel)}
                        className="ml-2 text-red-500 hover:bg-red-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-amber-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-amber-800">Total:</span>
                  <span className="font-bold text-amber-800">₹{total}</span>
                </div>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => {
                    onClose()
                    router.push("/checkout")
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

