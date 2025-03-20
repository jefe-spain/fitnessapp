"use client"

import Link from "next/link";
import { PlusCircle, Search, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

export default function ClientsPage() {
  // Sample clients data
  const allClients = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", program: "Weight Loss", status: "Active", progress: 75 },
    { id: 2, name: "Michael Smith", email: "michael@example.com", program: "Muscle Building", status: "Active", progress: 45 },
    { id: 3, name: "Emma Davis", email: "emma@example.com", program: "Cardio", status: "On Hold", progress: 30 },
    { id: 4, name: "David Wilson", email: "david@example.com", program: "Flexibility", status: "Completed", progress: 100 },
    { id: 5, name: "Olivia Brown", email: "olivia@example.com", program: "Weight Loss", status: "Active", progress: 60 },
    { id: 6, name: "James Martinez", email: "james@example.com", program: "Muscle Building", status: "On Hold", progress: 25 },
    { id: 7, name: "Sophia Taylor", email: "sophia@example.com", program: "Cardio", status: "Completed", progress: 100 },
    { id: 8, name: "Daniel Anderson", email: "daniel@example.com", program: "Flexibility", status: "Active", progress: 80 },
  ];
  
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredClients, setFilteredClients] = useState(allClients);
  
  // Apply filters whenever any filter changes
  useEffect(() => {
    let results = allClients;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(client => 
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
      );
    }
    
    // Apply program filter
    if (programFilter !== "all") {
      results = results.filter(client => {
        const normalizedProgram = client.program.toLowerCase().replace(/\s+/g, '-');
        return normalizedProgram === programFilter;
      });
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter(client => {
        const normalizedStatus = client.status.toLowerCase().replace(/\s+/g, '-');
        return normalizedStatus === statusFilter;
      });
    }
    
    setFilteredClients(results);
  }, [searchQuery, programFilter, statusFilter, allClients]);
  
  // Get unique programs and statuses for filter options
  const programs = Array.from(new Set(allClients.map(client => client.program)));
  const statuses = Array.from(new Set(allClients.map(client => client.status)));

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage and view all client information</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search clients..." 
            className="pl-8 w-full" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 md:flex gap-4">
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Programs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {programs.map(program => (
                <SelectItem 
                  key={program} 
                  value={program.toLowerCase().replace(/\s+/g, '-')}
                >
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(status => (
                <SelectItem 
                  key={status} 
                  value={status.toLowerCase().replace(/\s+/g, '-')}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clients table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.program}</TableCell>
                    <TableCell>
                      <Badge variant={
                        client.status === "Active" ? "default" :
                        client.status === "On Hold" ? "secondary" :
                        "outline"
                      }>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{client.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/clients/${client.id}`}>
                            View
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No clients found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
} 