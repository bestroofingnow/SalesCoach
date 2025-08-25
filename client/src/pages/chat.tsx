import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Plus, 
  Bot, 
  User, 
  FileText, 
  Mail,
  Edit3,
  Sparkles,
  Menu,
  X,
  ArrowLeft 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ChatConversation, ChatMessage } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunicationDraftForm {
  type: string;
  purpose: string;
  recipient: string;
  details: string;
}

export default function Chat() {
  const { toast } = useToast();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [showNewConversationDialog, setShowNewConversationDialog] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draftForm, setDraftForm] = useState<CommunicationDraftForm>({
    type: "",
    purpose: "",
    recipient: "",
    details: ""
  });
  const [generatedDraft, setGeneratedDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery<ChatConversation[]>({
    queryKey: ["/api/chat/conversations"],
  });

  // Fetch messages for selected conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/conversations", selectedConversationId, "messages"],
    enabled: !!selectedConversationId,
  });

  // Create new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await apiRequest("POST", "/api/chat/conversations", { title });
      return await response.json();
    },
    onSuccess: (newConversation) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/conversations"] });
      setSelectedConversationId(newConversation.id);
      setShowNewConversationDialog(false);
      setNewConversationTitle("");
      toast({
        title: "Conversation created",
        description: "Your new conversation is ready.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedConversationId) throw new Error("No conversation selected");
      const response = await apiRequest("POST", `/api/chat/conversations/${selectedConversationId}/messages`, { content });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["/api/chat/conversations", selectedConversationId, "messages"] 
      });
      queryClient.invalidateQueries({ queryKey: ["/api/chat/conversations"] });
      setNewMessage("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Generate communication draft mutation
  const generateDraftMutation = useMutation({
    mutationFn: async (formData: CommunicationDraftForm) => {
      const response = await apiRequest("POST", "/api/chat/draft-communication", formData);
      return await response.json();
    },
    onSuccess: (data) => {
      setGeneratedDraft(data.draft);
      toast({
        title: "Draft generated",
        description: "Your communication draft is ready.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error generating draft",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Select first conversation by default
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversationId) {
      sendMessageMutation.mutate(newMessage.trim());
    }
  };

  const handleCreateConversation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newConversationTitle.trim()) {
      createConversationMutation.mutate(newConversationTitle.trim());
    }
  };

  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (draftForm.type && draftForm.purpose && draftForm.recipient && draftForm.details) {
      generateDraftMutation.mutate(draftForm);
    }
  };

  const copyDraftToClipboard = () => {
    navigator.clipboard.writeText(generatedDraft);
    toast({
      title: "Copied to clipboard",
      description: "The draft has been copied to your clipboard.",
    });
  };

  return (
    <div className="h-screen flex relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-card border-r transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0 lg:w-80 xl:w-96
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI Assistant
            </h2>
            <div className="flex items-center gap-2">
              <Dialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="h-9 w-9">
                    <FileText className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Draft Communication</DialogTitle>
                    <DialogDescription>
                      Generate a professional email, letter, or other communication for your roofing business.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleGenerateDraft} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select value={draftForm.type} onValueChange={(value) => setDraftForm({...draftForm, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="letter">Business Letter</SelectItem>
                            <SelectItem value="estimate">Estimate</SelectItem>
                            <SelectItem value="report">Report</SelectItem>
                            <SelectItem value="proposal">Proposal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input
                          value={draftForm.recipient}
                          onChange={(e) => setDraftForm({...draftForm, recipient: e.target.value})}
                          placeholder="e.g., Customer, Insurance Company, Supplier"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input
                        value={draftForm.purpose}
                        onChange={(e) => setDraftForm({...draftForm, purpose: e.target.value})}
                        placeholder="e.g., Follow up on estimate, Claim documentation, Service inquiry"
                      />
                    </div>
                    <div>
                      <Label htmlFor="details">Details</Label>
                      <Textarea
                        value={draftForm.details}
                        onChange={(e) => setDraftForm({...draftForm, details: e.target.value})}
                        placeholder="Provide specific details about the situation, project, or request..."
                        rows={4}
                      />
                    </div>
                    {generatedDraft && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Generated Draft</Label>
                          <Button type="button" size="sm" variant="outline" onClick={copyDraftToClipboard}>
                            Copy to Clipboard
                          </Button>
                        </div>
                        <Textarea
                          value={generatedDraft}
                          onChange={(e) => setGeneratedDraft(e.target.value)}
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </div>
                    )}
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <Button 
                        type="submit" 
                        disabled={generateDraftMutation.isPending || !draftForm.type || !draftForm.purpose || !draftForm.recipient || !draftForm.details}
                        className="w-full sm:w-auto"
                      >
                        {generateDraftMutation.isPending ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Draft
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={showNewConversationDialog} onOpenChange={setShowNewConversationDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-9 w-9">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Conversation</DialogTitle>
                    <DialogDescription>
                      Start a new conversation with the AI assistant.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateConversation}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Conversation Title</Label>
                        <Input
                          id="title"
                          value={newConversationTitle}
                          onChange={(e) => setNewConversationTitle(e.target.value)}
                          placeholder="e.g., Questions about commercial roofing"
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <Button 
                        type="submit" 
                        disabled={createConversationMutation.isPending || !newConversationTitle.trim()}
                        className="w-full sm:w-auto"
                      >
                        {createConversationMutation.isPending ? "Creating..." : "Create Conversation"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden h-9 w-9" 
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sidebar Content */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          {conversationsLoading ? (
            <div className="p-4">Loading conversations...</div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="font-medium">No conversations yet</p>
              <p className="text-sm">Start a new conversation to begin</p>
            </div>
          ) : (
            <div className="p-3">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`p-4 mb-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    selectedConversationId === conversation.id
                      ? "bg-primary/10 border-primary shadow-sm"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setSelectedConversationId(conversation.id);
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                >
                  <div className="font-medium truncate mb-1">{conversation.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {conversation.updatedAt ? new Date(conversation.updatedAt).toLocaleDateString() : 'New'}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {selectedConversationId ? (
          <>
            {/* Mobile Chat Header with Menu */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="lg:hidden h-9 w-9" 
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      {conversations.find(c => c.id === selectedConversationId)?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      AI Assistant powered by training content
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  <Bot className="h-3 w-3" />
                  Online
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messagesLoading ? (
                <div className="text-center text-muted-foreground py-8">
                  <div className="animate-pulse">Loading messages...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2">Start the conversation!</p>
                  <p className="text-sm max-w-md mx-auto">Ask me anything about roofing, training content, or request help with communications.</p>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
                        <AvatarFallback>
                          {message.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex-1 max-w-[85%] sm:max-w-[75%] ${
                          message.role === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm sm:text-base ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 px-1">
                          {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Now'}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Message Input - Enhanced for Mobile */}
            <div className="p-4 border-t bg-card">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask me about roofing techniques, training content, or help with professional communications..."
                  disabled={sendMessageMutation.isPending}
                  className="flex-1 h-11 text-base"
                />
                <Button 
                  type="submit" 
                  disabled={sendMessageMutation.isPending || !newMessage.trim()}
                  size="icon"
                  className="h-11 w-11 flex-shrink-0"
                >
                  {sendMessageMutation.isPending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Mobile header for when no conversation is selected */}
            <div className="p-4 border-b bg-card lg:hidden">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 w-9" 
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <h2 className="font-semibold">AI Assistant</h2>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground p-6">
              <div className="max-w-md">
                <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-50" />
                <h3 className="text-xl font-semibold mb-3">Welcome to AI Assistant</h3>
                <p className="mb-6 text-muted-foreground">Select a conversation or create a new one to get started.</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-left">
                    <div className="text-2xl">✨</div>
                    <p>Ask questions about roofing techniques and training content</p>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="text-2xl">📧</div>
                    <p>Get help drafting professional communications</p>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="text-2xl">🎯</div>
                    <p>Access company-specific guidance and best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}