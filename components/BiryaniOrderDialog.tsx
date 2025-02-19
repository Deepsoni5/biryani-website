import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface BiryaniOrderDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (quantity?: number, spiceLevel?: string) => void
  biryaniName: string
}

export function BiryaniOrderDialog({ isOpen, onClose, onConfirm, biryaniName }: BiryaniOrderDialogProps) {
  const [quantity, setQuantity] = useState(1)
  const [spiceLevel, setSpiceLevel] = useState("medium")

  const handleConfirm = () => {
    onConfirm(quantity, spiceLevel)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order {biryaniName}</DialogTitle>
          <DialogDescription>
            {biryaniName === "All Items"
              ? "Confirm your order for all items in the cart."
              : "Choose your preferred quantity and spice level."}
          </DialogDescription>
        </DialogHeader>
        {biryaniName !== "All Items" && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <select
                id="quantity"
                className="col-span-3"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                <option value={1}>1 kg</option>
                <option value={2}>2 kg</option>
                <option value={3}>3 kg</option>
                <option value={5}>5 kg</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="spice-level" className="text-right">
                Spice Level
              </Label>
              <RadioGroup
                id="spice-level"
                className="col-span-3 flex space-x-4"
                value={spiceLevel}
                onValueChange={setSpiceLevel}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spicy" id="spicy" />
                  <Label htmlFor="spicy">Spicy</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleConfirm}>
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

