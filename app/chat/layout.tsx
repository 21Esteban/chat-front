"use client";
import { Button } from "@/components/ui/button";
import ChatList from "./_components/chatList";
import { Input } from "@/components/ui/input";
import { Paperclip } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./_components/header";
import { ChatBubble } from "./_components/chatBuble";
import { useState } from "react";

// Datos de prueba para la lista de chats
// Datos de prueba para los chats
const chatData = [
  {
    id: 1,
    name: "Juan Pérez",
    messages: [
      {
        id: 1,
        message: "Hola, ¿cómo estás?",
        lastHour: "10:30 AM",
        isCurrentUser: false,
      },
      {
        id: 2,
        message: "Estoy bien, ¿y tú?",
        lastHour: "10:32 AM",
        isCurrentUser: true,
      },
      {
        id: 3,
        message: "Todo bien, gracias por preguntar.",
        lastHour: "10:35 AM",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: 2,
    name: "María López",
    messages: [
      {
        id: 1,
        message: "¿Nos vemos mañana?",
        lastHour: "9:15 AM",
        isCurrentUser: false,
      },
      {
        id: 2,
        message: "Claro, ¿a qué hora?",
        lastHour: "9:17 AM",
        isCurrentUser: true,
      },
      {
        id: 3,
        message: "A las 3 PM, en el parque.",
        lastHour: "9:20 AM",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: 3,
    name: "Carlos García",
    messages: [
      {
        id: 1,
        message: "¡Feliz cumpleaños!",
        lastHour: "8:00 AM",
        isCurrentUser: true,
      },
      {
        id: 2,
        message: "¡Gracias! 🎉",
        lastHour: "8:05 AM",
        isCurrentUser: false,
      },
      {
        id: 3,
        message: "Espero que tengas un gran día.",
        lastHour: "8:10 AM",
        isCurrentUser: true,
      },
    ],
  },
];

export default function ChatLayout() {
  const [selectedChat] = useState(chatData[0]); // Chat por defecto

  return (
    <main className="flex justify-center items-center p-10 h-screen antialiased text-foreground bg-customGray">
      <ChatList chats={chatData} chatSelected={0} />
      {selectedChat ? (
        <div className="flex flex-col flex-grow h-[90%] bg-card border border-border">
          {/* Header */}
          <Header userName={selectedChat.name} />

          {/* Chat Area */}
          <div className="flex flex-col h-full px-8 overflow-hidden">
            <ScrollArea className="flex-1 mb-4 mt-4">
              {selectedChat.messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  name={selectedChat.name}
                  lastHour={message.lastHour}
                  message={message.message}
                  isCurrentUser={message.isCurrentUser}
                />
              ))}
            </ScrollArea>

            {/* Input Area */}
            <div className="flex items-center space-x-2 mb-4">
              <Button type="submit" variant="secondary">
                <Paperclip />
              </Button>
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" variant="default">
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          Don&apos;t have any chat
        </div>
      )}
    </main>
  );
}
