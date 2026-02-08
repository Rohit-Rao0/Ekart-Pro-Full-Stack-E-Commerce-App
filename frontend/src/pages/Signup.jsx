import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    })
  )
};

const handleSubmit=async (event)=>{
  event.preventDefault();
  setLoading(true)
  console.log(formData);
  // Make API call to backend to register the user
 try {
       const res = await axios.post("http://localhost:8000/api/v1/user/register", formData,{
    headers: {
      "Content-Type": "application/json",
      
    },
      })
      
      if (res.data.success === true) {
        console.log("User registered successfully:", res.data);
        // Optionally, you can redirect the user to the login page or home page
         navigate("/verify");
        toast.success(res.data.message,{duration:1000})
      } else {
        console.error("Registration failed:", res.data);
       

      }
 } catch (error) {
  if (error.response?.status === 409) {
  console.log("User already exists");
  toast.error(error.response.data.message,{duration:1000});
} 

  console.error("Error during registration:", error);
  
 } finally {
  setLoading(false)
}

}



 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Create your new account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          
            <div className="flex flex-col gap-6">
              {/* GRID CHANGED HERE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pr-10"
                    />

                    <span className="absolute right-3 top-3 cursor-pointer text-gray-500">
                      {showPassword ? (
                        <EyeOff onClick={() => setShowPassword(false)} />
                      ) : (
                        <Eye onClick={() => setShowPassword(true)} />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            {loading ? <><Loader2/> Please Wait...</> : "Signup"}
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;



