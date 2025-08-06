import { useState } from "react";
import { Upload, File, Calendar, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockStatements = [
  {
    id: 1,
    name: "Chase_Statement_January_2024.csv",
    uploadDate: "2024-01-20",
    rows: 45,
    processed: true,
  },
  {
    id: 2,
    name: "Chase_Statement_December_2023.csv",
    uploadDate: "2024-01-02",
    rows: 52,
    processed: true,
  },
];

const mockCSVData = [
  {
    date: "2024-01-15",
    description: "AUTOMATIC PAYMENT - THANK YOU",
    amount: -156.78,
    balance: 2543.22,
  },
  {
    date: "2024-01-14",
    description: "DEPOSIT - MOBILE CHECK",
    amount: 2500.00,
    balance: 2700.00,
  },
  {
    date: "2024-01-12",
    description: "SUBSCRIPTION PAYMENT",
    amount: -99.00,
    balance: 200.00,
  },
  {
    date: "2024-01-10",
    description: "PAYMENT - ONLINE TRANSFER",
    amount: -450.00,
    balance: 299.00,
  },
];

export const BankStatementsPage = () => {
  const [selectedStatement, setSelectedStatement] = useState<number | null>(1);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Bank Statements</h2>
        <p className="text-muted-foreground">
          Upload and manage your bank statement CSV files
        </p>
      </div>

      {/* Upload Area */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Bank Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop your CSV file here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports CSV files up to 10MB
            </p>
            <Button className="gradient-primary text-white">
              Select File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Statements */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg">Uploaded Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statement Name</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Rows</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStatements.map((statement) => (
                <TableRow key={statement.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-primary" />
                      {statement.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Date(statement.uploadDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{statement.rows}</TableCell>
                  <TableCell>
                    <Badge className={statement.processed ? "status-success" : "status-warning"}>
                      {statement.processed ? "Processed" : "Processing"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStatement(statement.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CSV Preview */}
      {selectedStatement && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Statement Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">File:</span>
                  <p className="font-medium">Chase_Statement_January_2024.csv</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Upload Date:</span>
                  <p className="font-medium">Jan 20, 2024</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Rows:</span>
                  <p className="font-medium">45</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="status-success">Processed</Badge>
                </div>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCSVData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell className={`font-mono font-semibold ${
                      row.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${row.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="font-mono">
                      ${row.balance.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};