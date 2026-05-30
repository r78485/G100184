import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, ShoppingCart, Package, Search, Edit, Trash2 } from "lucide-react"

const products = [
  { id: 1, name: "স্কুল ইউনিফর্ম (ছেলে)", price: 850, stock: 120, category: "Uniform", status: "In Stock" },
  { id: 2, name: "স্কুল ইউনিফর্ম (মেয়ে)", price: 900, stock: 95, category: "Uniform", status: "In Stock" },
  { id: 3, name: "স্কুল ব্যাগ", price: 450, stock: 50, category: "Accessories", status: "Low Stock" },
  { id: 4, name: "জুতা", price: 650, stock: 0, category: "Footwear", status: "Out of Stock" },
  { id: 5, name: "বই সেট - Class 10", price: 1200, stock: 80, category: "Books", status: "In Stock" },
  { id: 6, name: "খাতা (১২টি প্যাক)", price: 180, stock: 200, category: "Stationery", status: "In Stock" },
]

const statusColors: Record<string, string> = {
  "In Stock": "bg-primary/10 text-primary",
  "Low Stock": "bg-chart-3/10 text-chart-3",
  "Out of Stock": "bg-destructive/10 text-destructive",
}

export default function StorePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Online Store & POS</h1>
            <p className="text-muted-foreground">স্কুল স্টোর ও পয়েন্ট অব সেল</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              POS
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              নতুন প্রোডাক্ট
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">মোট প্রোডাক্ট</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳45,000</p>
                <p className="text-sm text-muted-foreground">এই মাসে বিক্রি</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">কম স্টক</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">স্টক আউট</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="প্রোডাক্ট খুঁজুন..." className="pl-10" />
          </div>
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল ক্যাটাগরি</option>
            <option>Uniform</option>
            <option>Books</option>
            <option>Stationery</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[product.status]}`}>
                  {product.status}
                </span>
              </div>
              <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary">৳{product.price}</span>
                <span className="text-sm text-muted-foreground">স্টক: {product.stock}</span>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
