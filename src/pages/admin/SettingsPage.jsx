import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'KidClothe',
    storeEmail: 'contact@kidclothe.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion Street, New York, NY 10001',
    currency: 'USD',
    language: 'en',
    timezone: 'America/New_York'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    stockAlerts: true,
    customerMessages: true,
    reviewNotifications: true,
    securityAlerts: true,
    marketingEmails: false
  })

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    applePay: false,
    googlePay: false,
    bankTransfer: false
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '50',
    defaultShippingRate: '5.99',
    internationalShipping: true,
    localPickup: false
  })

  const [taxSettings, setTaxSettings] = useState({
    automaticTaxCalculation: true,
    defaultTaxRate: '8.5',
    taxIncludedInPrice: false
  })

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handlePaymentToggle = (setting) => {
    setPaymentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleShippingSettingsChange = (e) => {
    const { name, value } = e.target
    setShippingSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleShippingToggle = (setting) => {
    setShippingSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleTaxSettingsChange = (e) => {
    const { name, value } = e.target
    setTaxSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTaxToggle = (setting) => {
    setTaxSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const saveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', {
      generalSettings,
      notificationSettings,
      paymentSettings,
      shippingSettings,
      taxSettings
    })
    // Show success message
    alert('Settings saved successfully!')
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Store Settings</h1>
        <p className="text-gray-500">Manage your store configuration and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your store's basic information and regional settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={generalSettings.storeEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={generalSettings.storePhone}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Textarea
                    id="storeAddress"
                    name="storeAddress"
                    value={generalSettings.storeAddress}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={generalSettings.currency} 
                    onValueChange={(value) => setGeneralSettings({...generalSettings, currency: value})}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={generalSettings.language} 
                    onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={generalSettings.timezone} 
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure which notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderNotifications" className="font-medium">Order Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                  </div>
                  <Switch
                    id="orderNotifications"
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={() => handleNotificationToggle('orderNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stockAlerts" className="font-medium">Stock Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                  </div>
                  <Switch
                    id="stockAlerts"
                    checked={notificationSettings.stockAlerts}
                    onCheckedChange={() => handleNotificationToggle('stockAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="customerMessages" className="font-medium">Customer Messages</Label>
                    <p className="text-sm text-gray-500">Receive notifications for new customer messages</p>
                  </div>
                  <Switch
                    id="customerMessages"
                    checked={notificationSettings.customerMessages}
                    onCheckedChange={() => handleNotificationToggle('customerMessages')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reviewNotifications" className="font-medium">Review Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified when customers leave reviews</p>
                  </div>
                  <Switch
                    id="reviewNotifications"
                    checked={notificationSettings.reviewNotifications}
                    onCheckedChange={() => handleNotificationToggle('reviewNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts" className="font-medium">Security Alerts</Label>
                    <p className="text-sm text-gray-500">Receive notifications about security events</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={() => handleNotificationToggle('securityAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails" className="font-medium">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive marketing tips and promotional ideas</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and options for your store.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stripeEnabled" className="font-medium">Stripe</Label>
                    <p className="text-sm text-gray-500">Accept credit card payments via Stripe</p>
                  </div>
                  <Switch
                    id="stripeEnabled"
                    checked={paymentSettings.stripeEnabled}
                    onCheckedChange={() => handlePaymentToggle('stripeEnabled')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paypalEnabled" className="font-medium">PayPal</Label>
                    <p className="text-sm text-gray-500">Accept payments via PayPal</p>
                  </div>
                  <Switch
                    id="paypalEnabled"
                    checked={paymentSettings.paypalEnabled}
                    onCheckedChange={() => handlePaymentToggle('paypalEnabled')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="applePay" className="font-medium">Apple Pay</Label>
                    <p className="text-sm text-gray-500">Accept Apple Pay payments</p>
                  </div>
                  <Switch
                    id="applePay"
                    checked={paymentSettings.applePay}
                    onCheckedChange={() => handlePaymentToggle('applePay')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="googlePay" className="font-medium">Google Pay</Label>
                    <p className="text-sm text-gray-500">Accept Google Pay payments</p>
                  </div>
                  <Switch
                    id="googlePay"
                    checked={paymentSettings.googlePay}
                    onCheckedChange={() => handlePaymentToggle('googlePay')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bankTransfer" className="font-medium">Bank Transfer</Label>
                    <p className="text-sm text-gray-500">Accept direct bank transfer payments</p>
                  </div>
                  <Switch
                    id="bankTransfer"
                    checked={paymentSettings.bankTransfer}
                    onCheckedChange={() => handlePaymentToggle('bankTransfer')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure shipping options and rates for your store.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeShippingThreshold"
                    name="freeShippingThreshold"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={handleShippingSettingsChange}
                  />
                  <p className="text-sm text-gray-500">Orders above this amount qualify for free shipping</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultShippingRate">Default Shipping Rate ($)</Label>
                  <Input
                    id="defaultShippingRate"
                    name="defaultShippingRate"
                    type="number"
                    step="0.01"
                    value={shippingSettings.defaultShippingRate}
                    onChange={handleShippingSettingsChange}
                  />
                  <p className="text-sm text-gray-500">Standard shipping rate for orders</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="internationalShipping" className="font-medium">International Shipping</Label>
                    <p className="text-sm text-gray-500">Enable shipping to international addresses</p>
                  </div>
                  <Switch
                    id="internationalShipping"
                    checked={shippingSettings.internationalShipping}
                    onCheckedChange={() => handleShippingToggle('internationalShipping')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="localPickup" className="font-medium">Local Pickup</Label>
                    <p className="text-sm text-gray-500">Allow customers to pick up orders locally</p>
                  </div>
                  <Switch
                    id="localPickup"
                    checked={shippingSettings.localPickup}
                    onCheckedChange={() => handleShippingToggle('localPickup')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tax Settings */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>
                Configure tax calculation options for your store.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="automaticTaxCalculation" className="font-medium">Automatic Tax Calculation</Label>
                    <p className="text-sm text-gray-500">Automatically calculate taxes based on location</p>
                  </div>
                  <Switch
                    id="automaticTaxCalculation"
                    checked={taxSettings.automaticTaxCalculation}
                    onCheckedChange={() => handleTaxToggle('automaticTaxCalculation')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                  <Input
                    id="defaultTaxRate"
                    name="defaultTaxRate"
                    type="number"
                    step="0.1"
                    value={taxSettings.defaultTaxRate}
                    onChange={handleTaxSettingsChange}
                  />
                  <p className="text-sm text-gray-500">Applied when automatic calculation is disabled</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="taxIncludedInPrice" className="font-medium">Tax Included in Price</Label>
                    <p className="text-sm text-gray-500">Display product prices with tax included</p>
                  </div>
                  <Switch
                    id="taxIncludedInPrice"
                    checked={taxSettings.taxIncludedInPrice}
                    onCheckedChange={() => handleTaxToggle('taxIncludedInPrice')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage