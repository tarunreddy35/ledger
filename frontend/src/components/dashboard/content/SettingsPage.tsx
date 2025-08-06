import { useState } from "react";
import { Settings, Moon, Sun, Mail, CreditCard, AlertTriangle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

export const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [syncInterval, setSyncInterval] = useState("15");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Manage your preferences and account settings
        </p>
      </div>

      {/* User Preferences */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            User Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Setting */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme appearance
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>

          <Separator />

          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates for reconciliation results
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          {/* Sync Interval */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Email Sync Interval</Label>
              <p className="text-sm text-muted-foreground">
                How often to check for new receipts
              </p>
            </div>
            <Select value={syncInterval} onValueChange={setSyncInterval}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Every 5 minutes</SelectItem>
                <SelectItem value="15">Every 15 minutes</SelectItem>
                <SelectItem value="30">Every 30 minutes</SelectItem>
                <SelectItem value="60">Every hour</SelectItem>
                <SelectItem value="manual">Manual only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg">Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email Account */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Gmail Account</p>
                <p className="text-sm text-muted-foreground">user@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="status-success">Connected</Badge>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
            </div>
          </div>

          {/* Stripe Account */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Stripe Account</p>
                <p className="text-sm text-muted-foreground">Payment processing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="status-warning">Not Connected</Badge>
              <Button 
                variant="outline" 
                size="sm"
                className="gradient-primary text-white border-none"
              >
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="card-elevated border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Clear Ledger */}
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
            <div>
              <p className="font-medium text-red-800 dark:text-red-200">Clear Ledger</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                Remove all ledger entries. This action cannot be undone.
              </p>
            </div>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete all your
                    ledger entries and remove all data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive">
                    Yes, delete everything
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Disconnect Email */}
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
            <div>
              <p className="font-medium text-red-800 dark:text-red-200">Disconnect Email</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                Remove email integration and stop automatic receipt parsing.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};