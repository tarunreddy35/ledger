import { useState } from "react";
import { Plus, Filter, Calendar, Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const mockEntries = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Office Supplies Purchase",
    amount: -156.78,
    vendor: "OfficeMax",
    source: "email",
  },
  {
    id: 2,
    date: "2024-01-14",
    description: "Client Payment Received",
    amount: 2500.00,
    vendor: "ABC Corp",
    source: "manual",
  },
  {
    id: 3,
    date: "2024-01-12",
    description: "Software Subscription",
    amount: -99.00,
    vendor: "Software Inc",
    source: "csv",
  },
  {
    id: 4,
    date: "2024-01-10",
    description: "Marketing Campaign",
    amount: -450.00,
    vendor: "Ad Agency",
    source: "email",
  },
];

export const LedgerEntriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getSourceBadge = (source: string) => {
    const variants: Record<string, string> = {
      email: "status-success",
      csv: "status-warning",
      manual: "status-error",
    };
    return variants[source] || "status-success";
  };

  const filteredEntries = mockEntries.filter((entry) => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "all" || entry.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Ledger Entries</h2>
          <p className="text-muted-foreground">
            Manage and view all your transaction entries
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-[var(--shadow-glow)]">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" step="0.01" placeholder="0.00" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Transaction description" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Input id="vendor" placeholder="Vendor name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="source">Source</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="csv">CSV Import</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="gradient-primary text-white">
                  Add Entry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="csv">CSV Import</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entries Table */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg">
            Entries ({filteredEntries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {entry.description}
                  </TableCell>
                  <TableCell className={`font-mono font-semibold ${
                    entry.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(entry.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{entry.vendor}</TableCell>
                  <TableCell>
                    <Badge className={getSourceBadge(entry.source)}>
                      {entry.source}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};