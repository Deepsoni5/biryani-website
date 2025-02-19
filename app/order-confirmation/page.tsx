"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function OrderConfirmationPage() {
  const router = useRouter();

  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("biryaniCart");
    if (!storedCart || JSON.parse(storedCart).items.length === 0) {
      router.push("/menu");
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulating Order Data
    console.log("Order data:", { ...formData, cartItems });

    const merchantId = "REACTSPONLINE"; // Your Merchant ID
    const transactionId = `TXN${Date.now()}`; // Unique Transaction ID
    const amount = 100; // Amount in paise (₹100 = 10000 paise)
    const callbackUrl = encodeURIComponent(
      `${window.location.origin}/payment-status`
    ); // Callback after payment

    // Construct PhonePe DeepLink
    const phonePeUrl = `phonepe://pay?merchantId=${merchantId}&transactionId=${transactionId}&amount=${amount}&callbackUrl=${callbackUrl}`;

    // Redirect user to PhonePe app for payment
    window.location.href = phonePeUrl;

    //clearCart();
    toast({
      title: "Redirecting to PhonePe...",
      description: "Please complete the payment in the PhonePe app.",
    });

    // 🚀 (Optional) Redirect User to Order Confirmation Page
    //router.push("/order-confirmation");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * item.quantityKg,
    0
  );

  if (cartItems.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F29422] to-[#F2A922] py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-white"
        >
          Order Confirmation
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                WhatsApp Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Delivery Address
              </label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full"
                rows={3}
              />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.quantityKg}-${item.spiceLevel}`}
                  className="flex justify-between mb-2"
                >
                  <span>
                    {item.name} ({item.quantityKg}kg, {item.spiceLevel}) x{" "}
                    {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity * item.quantityKg}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-2">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-[#F2541B] hover:bg-[#F29422] text-white"
            >
              Proceed with PhonePe Payment
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
