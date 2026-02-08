import React from 'react'
import { Button } from "@/components/ui/button"
import { useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import axios from 'axios';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch= useDispatch();
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
       const res = await axios.post("http://localhost:8000/api/v1/user/login", formData,{
    headers: {
      "Content-Type": "application/json",
      
    },
      })
      
      if (res.data.success) {
        console.log("User registered successfully:", res.data);
          localStorage.setItem("accessToken", res.data.accessToken);
        // Optionally, you can redirect the user to the login page or home page
        dispatch(setUser(res.data.user))
         navigate("/");
        toast.success(res.data.message,{duration:1000})
      } else {
        console.error("Registration failed:", res.data);
        toast.error("error",{duration:1000})
       

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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          
            <div className="flex flex-col gap-6">
              {/* GRID CHANGED HERE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            

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
            {loading ? <><Loader2/> Please Wait...</> : "Login"}
          </Button>
          <p className="text-sm text-center">
            Do not have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login