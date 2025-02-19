import { Card, CardContent } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full h-48 bg-gray-200 animate-pulse" />
        <div className="p-4 space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

