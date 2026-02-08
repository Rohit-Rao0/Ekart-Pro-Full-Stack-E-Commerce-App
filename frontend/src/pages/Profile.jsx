import Navbar from '@/components/Navbar'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"




const Profile = () => {
  return (
  
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">

        <Tabs defaultValue="profile" className="w-full">

          {/* TAB BUTTONS */}
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* LEFT: PROFILE PHOTO */}
              <div className="flex flex-col items-center">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-pink-500 object-cover"
                />
                <Button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white">
                  Change Picture
                </Button>
              </div>

              {/* RIGHT: FORM */}
              <Card className="md:col-span-2 p-6 shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="john@example.com" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="Enter your contact number" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input placeholder="Enter your address" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">City</label>
                    <Input placeholder="Enter your city" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Zip Code</label>
                    <Input placeholder="Enter your zip code" />
                  </div>

                </div>

                <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white">
                  Update Profile
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p>• Order #12345 — Delivered</p>
                <p>• Order #12346 — In Transit</p>
                <p>• Order #12347 — Processing</p>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
    </>
  );
};

export default Profile;
