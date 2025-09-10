import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Users, DollarSign, TrendingUp, Building, Search, AlertCircle, Check, X } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { formatDistanceToNow } from "date-fns";

interface CompanyBilling {
  id: string;
  name: string;
  subscriptionStatus: string;
  userCount: number;
  platformFee: number;
  perUserFee: number;
  totalMonthly: number;
  lastPayment?: string;
  nextBilling?: string;
  paymentMethod?: string;
}

interface BillingStats {
  totalRevenue: number;
  totalCompanies: number;
  activeSubscriptions: number;
  totalUsers: number;
  monthlyRecurring: number;
  averagePerCompany: number;
}

export default function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for demonstration
  const mockCompanies: CompanyBilling[] = [
    {
      id: "1",
      name: "Demo Roofing Co",
      subscriptionStatus: "active",
      userCount: 15,
      platformFee: 99,
      perUserFee: 20,
      totalMonthly: 399,
      lastPayment: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      nextBilling: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Visa ****4242"
    },
    {
      id: "2",
      name: "Summit Roofing Services",
      subscriptionStatus: "active",
      userCount: 8,
      platformFee: 99,
      perUserFee: 20,
      totalMonthly: 259,
      lastPayment: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      nextBilling: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Mastercard ****8765"
    },
    {
      id: "3",
      name: "Elite Restoration LLC",
      subscriptionStatus: "trial",
      userCount: 5,
      platformFee: 0,
      perUserFee: 0,
      totalMonthly: 0,
      nextBilling: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Not set"
    },
    {
      id: "4",
      name: "ProRoof Solutions",
      subscriptionStatus: "past_due",
      userCount: 12,
      platformFee: 99,
      perUserFee: 20,
      totalMonthly: 339,
      lastPayment: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Visa ****1234"
    }
  ];

  const mockStats: BillingStats = {
    totalRevenue: 12450,
    totalCompanies: 4,
    activeSubscriptions: 2,
    totalUsers: 40,
    monthlyRecurring: 997,
    averagePerCompany: 249.25
  };

  // Filter companies based on search and status
  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || company.subscriptionStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "trial":
        return <Badge className="bg-blue-500">Trial</Badge>;
      case "past_due":
        return <Badge variant="destructive">Past Due</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Billing Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage company subscriptions and billing
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Recurring
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${mockStats.monthlyRecurring}</p>
              <p className="text-xs text-muted-foreground">From {mockStats.activeSubscriptions} active subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Companies
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{mockStats.totalCompanies}</p>
              <p className="text-xs text-muted-foreground">{mockStats.activeSubscriptions} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
              <p className="text-xs text-muted-foreground">${mockStats.totalUsers * 20}/mo in user fees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Per Company
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${mockStats.averagePerCompany}</p>
              <p className="text-xs text-muted-foreground">Per month</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Info */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Current Pricing:</strong> $99/month platform fee + $20/user per month
          </AlertDescription>
        </Alert>

        {/* Company Subscriptions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Company Subscriptions</CardTitle>
                <CardDescription>Manage billing for all companies</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                    data-testid="input-search-companies"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={filterStatus} onValueChange={setFilterStatus}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="trial">Trial</TabsTrigger>
                <TabsTrigger value="past_due">Past Due</TabsTrigger>
              </TabsList>

              <TabsContent value={filterStatus}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Platform Fee</TableHead>
                      <TableHead>User Fees</TableHead>
                      <TableHead>Total Monthly</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{getStatusBadge(company.subscriptionStatus)}</TableCell>
                        <TableCell>{company.userCount}</TableCell>
                        <TableCell>${company.platformFee}</TableCell>
                        <TableCell>${company.userCount * company.perUserFee}</TableCell>
                        <TableCell className="font-semibold">${company.totalMonthly}</TableCell>
                        <TableCell>
                          {company.nextBilling
                            ? formatDistanceToNow(new Date(company.nextBilling), { addSuffix: true })
                            : "-"}
                        </TableCell>
                        <TableCell>{company.paymentMethod}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              data-testid={`button-view-${company.id}`}
                            >
                              View
                            </Button>
                            {company.subscriptionStatus === "past_due" && (
                              <Button 
                                size="sm" 
                                variant="destructive"
                                data-testid={`button-charge-${company.id}`}
                              >
                                Charge
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No companies found matching your criteria
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common billing operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Process All Payments
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Update User Counts
              </Button>
              <Button variant="outline" className="justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Export Billing Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}