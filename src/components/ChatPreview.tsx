import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Mic, Settings } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.jpg";

const ChatPreview = () => {
  const messages = [
    { 
      id: 1, 
      sender: "user", 
      text: "Hey! How was your day?", 
      time: "2:30 PM" 
    },
    { 
      id: 2, 
      sender: "clone", 
      text: "Omg hiiii! 😊 My day was pretty good actually, just finished that project I was stressing about lol. How about you?? 💕", 
      time: "2:32 PM" 
    },
    { 
      id: 3, 
      sender: "user", 
      text: "That's awesome! I knew you'd nail it 🔥", 
      time: "2:33 PM" 
    },
    { 
      id: 4, 
      sender: "clone", 
      text: "Aww you're the sweetest!! 🥺 Miss our random convos like this ngl", 
      time: "2:35 PM" 
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Chat with Perfect <span className="bg-gradient-primary bg-clip-text text-transparent">AI Clones</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience conversations that feel completely natural. Our AI captures every nuance - 
            from emoji usage to inside jokes and unique speech patterns.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface */}
          <div className="order-2 lg:order-1">
            <Card className="p-0 shadow-card overflow-hidden bg-white/80 backdrop-blur-sm">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-primary/5">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatarPlaceholder} alt="Clone Avatar" />
                    <AvatarFallback>EX</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Alex's Clone</h3>
                    <p className="text-xs text-muted-foreground">Active now • 98% accuracy</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-xs">
                      {message.sender === "clone" && (
                        <Avatar className="w-6 h-6 mb-1">
                          <AvatarImage src={avatarPlaceholder} alt="Clone" />
                          <AvatarFallback className="text-xs">EX</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`px-3 py-2 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-gradient-primary text-white rounded-br-sm"
                              : "bg-muted text-foreground rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-1">
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-gradient-secondary/20">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-full bg-white/50">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-none outline-none text-sm"
                    />
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="icon" className="rounded-full">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2 space-y-8">
            <h3 className="text-2xl font-semibold">
              Incredibly realistic conversations
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Perfect Personality Match",
                  description: "Captures tone, humor, and emotional patterns from your chat history",
                  icon: "🎭",
                },
                {
                  title: "Emoji & Slang Recognition",
                  description: "Learns unique texting style including favorite emojis and expressions",
                  icon: "😊",
                },
                {
                  title: "Voice Cloning (Premium)",
                  description: "Upload voice messages to get spoken responses in their actual voice",
                  icon: "🎙️",
                },
                {
                  title: "Memory & Context",
                  description: "Remembers previous conversations and maintains consistent personality",
                  icon: "🧠",
                },
              ].map((feature) => (
                <Card key={feature.title} className="p-6 hover:shadow-card transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="hero" size="lg" className="w-full">
              Try Chat Preview
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;