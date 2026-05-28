import { Link } from "react-router";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Settings as SettingsIcon,
  Bell,
  Clock,
  Globe,
  Lock,
  Mail,
  Slack,
  ChevronRight
} from "lucide-react";
import { Separator } from "./ui/separator";

export function Settings() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Monitoring Settings</h1>
        <p className="text-slate-500 mt-1">Configure how your domain monitoring works</p>
      </div>

      {/* Quick Settings Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <SettingsIcon className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Quick Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Monitoring Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Enable Monitoring</h3>
                <p className="text-sm text-slate-600">
                  Activate continuous security monitoring for all domains
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          {/* Auto-Scan Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Automatic Scanning</Label>
              <p className="text-sm text-slate-600 mt-1">
                Run security scans automatically at scheduled intervals
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          {/* Real-time Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Real-time Alerts</Label>
              <p className="text-sm text-slate-600 mt-1">
                Receive instant notifications for critical security events
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Scan Frequency */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Scan Frequency</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="scan-interval">Scan Interval</Label>
            <select
              id="scan-interval"
              className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-md"
            >
              <option>Every 30 minutes</option>
              <option>Every hour</option>
              <option>Every 6 hours</option>
              <option>Every 12 hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">
              How often to run automated security scans
            </p>
          </div>

          <div>
            <Label htmlFor="ssl-check">SSL Check Frequency</Label>
            <select
              id="ssl-check"
              className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-md"
            >
              <option>Every hour</option>
              <option>Every 6 hours</option>
              <option>Every 12 hours</option>
              <option>Daily</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">
              How often to check SSL certificate status
            </p>
          </div>

          <div>
            <Label htmlFor="dns-check">DNS Verification Frequency</Label>
            <select
              id="dns-check"
              className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-md"
            >
              <option>Every 6 hours</option>
              <option>Every 12 hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">
              How often to verify domain ownership via DNS/TSS
            </p>
          </div>
        </div>
      </Card>

      {/* SSL Alert Preferences */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Lock className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">SSL Alert Preferences</h2>
          </div>
          <Link to="/settings/ssl">
            <Button variant="outline" size="sm">
              Advanced Settings
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>30-Day Expiry Alert</Label>
              <p className="text-sm text-slate-600 mt-1">
                Alert when SSL expires in 30 days
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>15-Day Expiry Alert</Label>
              <p className="text-sm text-slate-600 mt-1">
                Alert when SSL expires in 15 days
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>7-Day Critical Alert</Label>
              <p className="text-sm text-slate-600 mt-1">
                Critical alert when SSL expires in 7 days
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Notification Channels</h2>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-600" />
                <Label className="text-base">Email Notifications</Label>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="ml-8">
              <Input
                type="email"
                placeholder="your.email@example.com"
                defaultValue="admin@example.com"
              />
              <p className="text-xs text-slate-500 mt-2">
                Primary email for security alerts
              </p>
            </div>
          </div>

          <Separator />

          {/* Slack Notifications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Slack className="h-5 w-5 text-slate-600" />
                <Label className="text-base">Slack Notifications</Label>
              </div>
              <Switch />
            </div>
            <div className="ml-8">
              <Button variant="outline" size="sm">
                Connect Slack Workspace
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                Send alerts to your Slack channel
              </p>
            </div>
          </div>

          <Separator />

          {/* In-App Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-600" />
              <div>
                <Label className="text-base">In-App Notifications</Label>
                <p className="text-sm text-slate-600 mt-1">
                  Show notifications in the dashboard
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Domain Ownership Monitoring */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Globe className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Domain Ownership Monitoring</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Monitor DNS Changes</Label>
              <p className="text-sm text-slate-600 mt-1">
                Track changes to DNS records and ownership
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>TSS Record Verification</Label>
              <p className="text-sm text-slate-600 mt-1">
                Verify domain ownership via TSS records
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Alert on Ownership Changes</Label>
              <p className="text-sm text-slate-600 mt-1">
                Immediate alert if domain ownership changes
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
