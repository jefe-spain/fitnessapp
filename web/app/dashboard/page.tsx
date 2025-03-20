import { currentUser } from "@clerk/nextjs/server";
import { 
  BarChart3, 
  Users, 
  ClipboardCheck, 
  DollarSign, 
  ArrowUp, 
  CalendarRange, 
  PlusCircle,
  UserPlus,
  ClipboardEdit,
  MessageSquare,
  FileBarChart
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export default async function DashboardPage() {
  const user = await currentUser();
  
  // Sample quick stats
  const quickStats = [
    { name: "Total Clients", value: "42", change: "+8%", icon: Users },
    { name: "Active Programs", value: "18", change: "+4", icon: ClipboardCheck },
    { name: "Completion Rate", value: "89%", change: "+5%", icon: BarChart3 },
    { name: "Monthly Revenue", value: "$3,845", change: "+15%", icon: DollarSign },
  ];
  
  // Upcoming sessions
  const upcomingSessions = [
    { id: 1, client: "Sarah Johnson", program: "Weight Loss", time: "10:30 AM", date: "Today" },
    { id: 2, client: "Michael Smith", program: "Strength Training", time: "2:00 PM", date: "Today" },
    { id: 3, client: "Emma Davis", program: "HIIT Training", time: "8:15 AM", date: "Tomorrow" },
    { id: 4, client: "David Wilson", program: "Flexibility", time: "11:00 AM", date: "Tomorrow" },
  ];
  
  // Weekly activity
  const weeklyActivity = [
    { day: "Mon", sessions: 8 },
    { day: "Tue", sessions: 12 },
    { day: "Wed", sessions: 10 },
    { day: "Thu", sessions: 15 },
    { day: "Fri", sessions: 9 },
    { day: "Sat", sessions: 5 },
    { day: "Sun", sessions: 2 },
  ];
  
  // Client goals
  const clientGoals = [
    { client: "Sarah J.", goal: "Weight Loss", progress: 65, remaining: "2 weeks" },
    { client: "Michael S.", goal: "Muscle Gain", progress: 40, remaining: "5 weeks" },
    { client: "Emma D.", goal: "Marathon Prep", progress: 85, remaining: "1 week" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message and date */}
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Welcome, {user?.firstName || "Trainer"}</h2>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>
      
      {/* Quick stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center text-sm text-emerald-600 font-medium mt-1">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Two column layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity chart */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Sessions completed this week</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">This Week</Button>
                <Button variant="outline" size="sm">Last Week</Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="h-[240px]">
                <div className="flex items-end h-[200px] gap-2">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center">
                      <span className="text-xs text-muted-foreground mb-1">{day.sessions}</span>
                      <div 
                        className="w-full bg-primary/80 rounded-t-sm"
                        style={{ height: `${(day.sessions / 15) * 100}%` }}
                      ></div>
                      <span className="text-xs font-medium mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-xl font-bold">61</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-xl font-bold">94%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                  <p className="text-xl font-bold">4.8/5</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {/* Client goals */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Client Goals</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {clientGoals.map((client) => (
                  <div key={client.client} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary/10 text-primary font-medium">
                          <span>{client.client.charAt(0)}</span>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.client}</p>
                          <p className="text-xs text-muted-foreground">{client.goal}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{client.progress}%</p>
                        <p className="text-xs text-muted-foreground">{client.remaining} left</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-primary" 
                        style={{ width: `${client.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar content - 1 column */}
        <div className="space-y-6">
          {/* Calendar mini */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Calendar</CardTitle>
              <Button variant="ghost" size="sm">
                <CalendarRange className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent>
              <div className="text-center mb-4">
                <p className="font-bold">June 2023</p>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs font-medium text-muted-foreground">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center">
                {[...Array(31)].map((_, i) => {
                  const isToday = i + 1 === new Date().getDate();
                  const hasEvent = [3, 8, 15, 22, 27].includes(i + 1);
                  
                  return (
                    <div 
                      key={i} 
                      className={`py-1 text-sm rounded-full relative ${
                        isToday ? 'bg-primary text-primary-foreground font-bold' : ''
                      } ${hasEvent && !isToday ? 'font-medium' : ''}`}
                    >
                      {i + 1}
                      {hasEvent && !isToday && (
                        <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming sessions */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Upcoming Sessions</CardTitle>
              <Button variant="ghost" size="sm">Full Schedule</Button>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-1 h-10 bg-primary rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{session.client}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.program}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{session.time}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full">
                + Add New Session
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick actions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "New Client", icon: UserPlus },
                  { name: "New Program", icon: ClipboardEdit },
                  { name: "Message", icon: MessageSquare },
                  { name: "Reports", icon: FileBarChart }
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button 
                      key={action.name}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-center gap-2"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium">{action.name}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 