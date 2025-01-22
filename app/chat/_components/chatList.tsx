"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Settings } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import customAxios from "@/app/_lib/customAxios";
import { Chat } from "../_interfaces/chat-inteface";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CreateChatSchema, createChatSchema } from "../_schemas/chatSchemas";

interface ChatListProps {
  chats: Chat[];
  chatSelected: number;
}

export default function ChatList({ chats, chatSelected }: ChatListProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [backMessage, setBackMessage] = useState("");

  const form = useForm<CreateChatSchema>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      chatName: "",
      phoneNumberContact: "",
    },
  });

  async function createChat(values: CreateChatSchema) {
    try {
      setIsLoading(true);
      const backResponse = await customAxios.post("/chat", values);
      setBackMessage(backResponse.data.message);
    } catch (error) {
      setBackMessage( error?.response?.data?.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className="h-[90%] w-80 bg-card text-card-foreground flex flex-col border border-border">
      {/* Encabezado */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h1 className="text-lg font-semibold">Chats</h1>
        <div className="flex gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("authentication");
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="p-4">
        <Input
          placeholder="Buscar..."
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de Chats */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {chats.map((chat: Chat, index: number) => (
            <li key={chat.id}>
              <Button
                variant={chatSelected == index ? "secondary" : "ghost"}
                className="w-full h-14 flex items-center rounded-lg hover:bg-muted"
              >
                <Avatar className="mr-3">
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{chat.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Pie de página */}
      <div className="p-4 border-border">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Nuevo Chat
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new chat</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription></AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(createChat)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="chatName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>chat name</FormLabel>
                      <FormControl>
                        <Input placeholder="juan" {...field} />
                      </FormControl>
                      <FormDescription>This is chat name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumberContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="302 3240 ..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your contact phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
            {isLoading ? <p>Buscando Chat ...</p> : <p>{backMessage}</p>}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
}
