import { useState } from "react";
import { Bell, Plus, Trash2 } from "lucide-react";

export function SSLSettings() {
  const [defaultAlerts] = useState([
    { id: 1, days: 30, enabled: true },
    { id: 2, days: 15, enabled: true },
    { id: 3, days: 7, enabled: true },
  ]);

  const [customAlerts, setCustomAlerts] = useState<{ id: number; days: number }[]>([]);
  const [newAlertDays, setNewAlertDays] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(true);

  const addCustomAlert = () => {
    const days = parseInt(newAlertDays);
    if (days > 0) {
      setCustomAlerts([...customAlerts, { id: Date.now(), days }]);
      setNewAlertDays("");
    }
  };

  const removeCustomAlert = (id: number) => {
    setCustomAlerts(customAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>SSL Alert & Notification Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage SSL certificate expiry notifications and alert preferences
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            Default SSL Expiry Alerts
          </h2>
          <div className="space-y-3">
            {defaultAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{alert.days} days before expiry</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alert.enabled}
                    readOnly
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4">Custom Alert Timing</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={newAlertDays}
              onChange={(e) => setNewAlertDays(e.target.value)}
              placeholder="Enter days"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
            <button
              onClick={addCustomAlert}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Alert
            </button>
          </div>
          {customAlerts.length > 0 && (
            <div className="space-y-2">
              {customAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <span className="font-medium">{alert.days} days before expiry</span>
                  <button
                    onClick={() => removeCustomAlert(alert.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4">Notification Channels</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-600">
                  Receive alerts via email
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">Slack Notifications</div>
                <div className="text-sm text-gray-600">
                  Send alerts to Slack channel
                </div>
              </div>
              <input
                type="checkbox"
                checked={slackEnabled}
                onChange={(e) => setSlackEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">In-App Notifications</div>
                <div className="text-sm text-gray-600">
                  Show alerts in the application
                </div>
              </div>
              <input
                type="checkbox"
                checked={inAppEnabled}
                onChange={(e) => setInAppEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4">Recent Alert History</h2>
          <div className="space-y-2">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">example.com</div>
                  <div className="text-sm text-gray-600">SSL expires in 14 days</div>
                </div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">test-site.com</div>
                  <div className="text-sm text-gray-600">SSL expires in 5 days</div>
                </div>
                <div className="text-xs text-gray-500">1 day ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
