import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Search, MoreVertical, Clock, CalendarIcon, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";

export default function ProgramsPage() {
  // Sample featured programs
  const featuredPrograms = [
    { 
      id: 1, 
      title: "12-Week Weight Loss", 
      clients: 24, 
      sessions: 36, 
      completion: 85,
      updated: "2 days ago",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop"
    },
    { 
      id: 2, 
      title: "Muscle Building Pro", 
      clients: 18, 
      sessions: 48, 
      completion: 72,
      updated: "3 days ago",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669&auto=format&fit=crop"
    },
    { 
      id: 3, 
      title: "Marathon Prep", 
      clients: 12, 
      sessions: 60, 
      completion: 90,
      updated: "1 day ago",
      image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2670&auto=format&fit=crop"
    },
  ];

  // Sample recent programs
  const recentPrograms = [
    { id: 1, title: "HIIT Workout", type: "Cardio", clients: 8, created: "Yesterday" },
    { id: 2, title: "Strength Basics", type: "Strength", clients: 5, created: "2 days ago" },
    { id: 3, title: "Yoga for Beginners", type: "Flexibility", clients: 10, created: "3 days ago" },
    { id: 4, title: "Core Conditioning", type: "Strength", clients: 7, created: "1 week ago" },
    { id: 5, title: "Advanced Cycling", type: "Cardio", clients: 6, created: "1 week ago" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Programs</h1>
          <p className="text-muted-foreground">Create and manage your training programs</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </div>

      {/* Search and tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search programs..." className="pl-8 w-full" />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex">
            <TabsTrigger value="all">All Programs</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6 mt-6">
            {/* Featured Programs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden bg-white">
                    <div className="h-40 overflow-hidden relative">
                      <Image 
                        src={program.image} 
                        alt={program.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="text-xs font-normal">
                          {program.clients} Clients
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">
                          Updated {program.updated}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{program.sessions} Sessions</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span>Completion</span>
                          <Badge variant="outline" className="ml-1">{program.completion}%</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="default" size="sm" className="gap-1">
                        View
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Programs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Programs</h2>
              <Card className="bg-white">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentPrograms.map((program) => (
                      <div key={program.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{program.title}</h3>
                            <p className="text-sm text-muted-foreground">{program.type} • {program.clients} clients</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right text-sm text-muted-foreground hidden md:block">
                            Created {program.created}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/programs/${program.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Assignments */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Assignments</h2>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Program Assignments</CardTitle>
                  <CardDescription>Recently assigned programs to clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center font-medium">
                              {["SJ", "MS", "ED"][i-1]}
                            </div>
                          </Avatar>
                          <div>
                            <p className="font-medium">{["Sarah Johnson", "Michael Smith", "Emma Davis"][i-1]}</p>
                            <p className="text-sm text-muted-foreground">
                              Assigned to <span className="font-medium">{["12-Week Weight Loss", "Muscle Building Pro", "Marathon Prep"][i-1]}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {["2 days ago", "1 week ago", "Yesterday"][i-1]}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline" className="w-full">View All Assignments</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Active Programs View</h3>
                <p className="text-muted-foreground">This section will display active programs</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Draft Programs View</h3>
                <p className="text-muted-foreground">This section will display draft programs</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="archived" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Archived Programs View</h3>
                <p className="text-muted-foreground">This section will display archived programs</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 