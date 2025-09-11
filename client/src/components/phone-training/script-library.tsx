import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ScriptLibrary } from "@shared/schema";

export default function ScriptLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLeadType, setSelectedLeadType] = useState("all");
  const [selectedScript, setSelectedScript] = useState<ScriptLibrary | null>(null);

  // Build dynamic query parameters for API
  const queryParams = new URLSearchParams();
  if (selectedCategory !== "all") queryParams.set("category", selectedCategory);
  if (selectedLeadType !== "all") queryParams.set("leadType", selectedLeadType);
  const queryString = queryParams.toString();

  const { data: scripts = [] } = useQuery<ScriptLibrary[]>({
    queryKey: queryString 
      ? [`/api/phone-training/scripts?${queryString}`]
      : ["/api/phone-training/scripts"]
  });

  const categories = [
    { id: "all", label: "All Scripts", icon: "fas fa-list", type: "category" },
    { id: "opening", label: "Opening Scripts", icon: "fas fa-play", type: "category" },
    { id: "objection_response", label: "Objection Handling", icon: "fas fa-shield-alt", type: "category" },
    { id: "closing", label: "Closing Scripts", icon: "fas fa-handshake", type: "category" },
    { id: "storm_lead", label: "Storm Leads", icon: "fas fa-bolt", type: "leadType" },
    { id: "aged_roof", label: "Aged Roofs", icon: "fas fa-home", type: "leadType" },
    { id: "referral", label: "Referrals", icon: "fas fa-users", type: "leadType" },
  ];

  // Apply client-side search filtering to API results
  const filteredScripts = scripts.filter(script => {
    if (!searchTerm) return true;
    return script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           script.scriptContent.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const popularScripts = [
    {
      title: "Master Storm Lead Opener",
      category: "opening",
      leadType: "storm_lead",
      content: `Hi [Name], this is [Your Name] from Best Roofing Now here in Charlotte. How are you doing today?

Great! The reason I'm calling is we've been helping homeowners in your neighborhood who had roof damage from that hail storm two weeks ago. A lot of folks don't realize they have insurance-covered damage until it's too late to file a claim.

Did you notice any damage to your roof after the storm?`,
      successRate: 85,
      difficulty: "beginner"
    },
    {
      title: "Not Interested Objection Response",
      category: "objection_response",
      leadType: "all_leads",
      content: `I totally understand. Most folks aren't interested in roof work until they have a problem. That's exactly why I'm calling - to help you catch any issues before they become expensive emergencies.

The inspection is completely free, so there's no risk. What if we found a small problem that could save you thousands down the road?

I have an inspector in your area tomorrow - would morning or afternoon work better for you?`,
      successRate: 78,
      difficulty: "intermediate"
    },
    {
      title: "Assumptive Appointment Close",
      category: "closing",
      leadType: "all_leads",
      content: `Based on what you're telling me, it sounds like you could really benefit from this inspection. Let me get someone out there to take a look.

I have two options for you: I can have our senior inspector out there tomorrow to do a comprehensive assessment, or if you prefer, I can schedule our regular inspector for next week.

Which would work better for you?`,
      successRate: 82,
      difficulty: "advanced"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-search mr-2 text-blue-500"></i>
            Script Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search scripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search-scripts"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const isActive = category.type === "category" 
                  ? selectedCategory === category.id
                  : selectedLeadType === category.id;
                  
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (category.type === "category") {
                        setSelectedCategory(category.id);
                      } else {
                        setSelectedLeadType(category.id);
                      }
                    }}
                    data-testid={`filter-${category.id}`}
                  >
                    <i className={`${category.icon} mr-1`}></i>
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="popular" className="space-y-4">
        <TabsList>
          <TabsTrigger value="popular">Popular Scripts</TabsTrigger>
          <TabsTrigger value="all">All Scripts</TabsTrigger>
          <TabsTrigger value="custom">My Custom Scripts</TabsTrigger>
        </TabsList>

        {/* Popular Scripts */}
        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularScripts.map((script, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{script.title}</CardTitle>
                    <Badge variant="secondary">{script.successRate}% Success</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{script.category}</Badge>
                    <Badge variant="outline">{script.leadType}</Badge>
                    <Badge variant="outline">{script.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {script.content.substring(0, 120)}...
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <i className="fas fa-eye mr-1"></i>
                            View Full Script
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{script.title}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-96">
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <Badge>{script.category}</Badge>
                                <Badge>{script.leadType}</Badge>
                                <Badge>{script.difficulty}</Badge>
                                <Badge variant="secondary">{script.successRate}% Success</Badge>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <pre className="whitespace-pre-wrap font-sans text-sm">
                                  {script.content}
                                </pre>
                              </div>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                      
                      <Button size="sm" variant="outline">
                        <i className="fas fa-copy mr-1"></i>
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* All Scripts */}
        <TabsContent value="all">
          <div className="space-y-4">
            {filteredScripts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <i className="fas fa-file-text text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Scripts Found</h3>
                  <p className="text-gray-500">
                    {searchTerm || selectedCategory !== "all" 
                      ? "Try adjusting your search or filters" 
                      : "No scripts available yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredScripts.map((script) => (
                  <Card key={script.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">{script.title}</h3>
                            {script.successRate && (
                              <Badge variant="secondary">{script.successRate}% Success</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{script.category}</Badge>
                            {script.leadType && <Badge variant="outline">{script.leadType}</Badge>}
                            <Badge variant="outline">{script.difficulty}</Badge>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {script.scriptContent.substring(0, 200)}...
                          </p>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <i className="fas fa-eye mr-1"></i>
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{script.title}</DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="max-h-96">
                                <div className="space-y-4">
                                  <div className="flex gap-2">
                                    <Badge>{script.category}</Badge>
                                    {script.leadType && <Badge>{script.leadType}</Badge>}
                                    <Badge>{script.difficulty}</Badge>
                                    {script.successRate && (
                                      <Badge variant="secondary">{script.successRate}% Success</Badge>
                                    )}
                                  </div>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <pre className="whitespace-pre-wrap font-sans text-sm">
                                      {script.scriptContent}
                                    </pre>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                          
                          <Button size="sm" variant="outline">
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Custom Scripts */}
        <TabsContent value="custom">
          <Card>
            <CardContent className="text-center py-12">
              <i className="fas fa-plus-circle text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create Custom Scripts</h3>
              <p className="text-gray-500 mb-4">
                Build your own scripts based on what works best for you
              </p>
              <Button>
                <i className="fas fa-plus mr-2"></i>
                Create New Script
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center">
            <i className="fas fa-lightbulb mr-2"></i>
            Script Usage Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Personalization</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Replace [Name] with prospect's actual name</li>
                <li>• Reference specific neighborhood or area</li>
                <li>• Mention recent local weather events</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Delivery</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Practice until scripts sound natural</li>
                <li>• Match your energy to the prospect's</li>
                <li>• Pause for their responses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}