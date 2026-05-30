import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Search, Phone, Video, MoreVertical, Check, CheckCheck } from "lucide-react"

const contacts = [
  { id: 1, name: "রাহাত হোসেনের অভিভাবক", phone: "+880 1712345678", lastMessage: "ধন্যবাদ স্যার", time: "10:30 AM", unread: 0 },
  { id: 2, name: "ফাতেমা আক্তারের অভিভাবক", phone: "+880 1812345678", lastMessage: "আজকের হোমওয়ার্ক কি?", time: "9:45 AM", unread: 2 },
  { id: 3, name: "মোঃ আব্দুল্লাহর অভিভাবক", phone: "+880 1912345678", lastMessage: "ছুটির আবেদন করতে চাই", time: "গতকাল", unread: 1 },
  { id: 4, name: "সাবিনা খাতুনের অভিভাবক", phone: "+880 1612345678", lastMessage: "ফলাফল কবে দিবেন?", time: "গতকাল", unread: 0 },
]

const messages = [
  { id: 1, sender: "parent", text: "স্যার, আমার মেয়ের আজকের হোমওয়ার্ক কি?", time: "9:30 AM" },
  { id: 2, sender: "school", text: "আজকে গণিত বইয়ের Exercise 5.2 এর ১-১০ নম্বর অংক করতে হবে।", time: "9:35 AM" },
  { id: 3, sender: "parent", text: "আচ্ছা স্যার, জমা দেওয়ার তারিখ কবে?", time: "9:40 AM" },
  { id: 4, sender: "school", text: "আগামীকাল জমা দিতে হবে। কোন সমস্যা হলে জানাবেন।", time: "9:42 AM" },
  { id: 5, sender: "parent", text: "আজকের হোমওয়ার্ক কি?", time: "9:45 AM" },
]

export default function WhatsAppPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">WhatsApp</h1>
          <p className="text-muted-foreground">অভিভাবকদের সাথে WhatsApp যোগাযোগ</p>
        </div>

        {/* Chat Interface */}
        <div className="bg-card border border-border rounded-xl overflow-hidden h-[600px] flex">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-10" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 p-4 hover:bg-secondary/50 cursor-pointer border-b border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground text-sm truncate">{contact.name}</h4>
                      <span className="text-xs text-muted-foreground">{contact.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">ফাতেমা আক্তারের অভিভাবক</h4>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "school" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-xl ${
                      msg.sender === "school"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border border-border text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === "school" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      <span className="text-xs">{msg.time}</span>
                      {msg.sender === "school" && <CheckCheck className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
