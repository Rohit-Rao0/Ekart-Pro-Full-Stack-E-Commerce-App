import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { toast } from 'sonner';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const {user}=useSelector(store=>store.user)

  const accessToken=localStorage.getItem("accessToken")
  

  const logoutHandler = async ()=>{
    try {
      if(!accessToken){
        toast("no token",{duration:1000})
      }
      const res=await axios.post("http://localhost:8000/api/v1/user/logout",{},{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    if(res.data.success){
      toast.success(res.data.message,{duration:1000})
      
      
    }
    localStorage.removeItem("accessToken")
    dispatch(clearUser());

    } catch (error) {
      console.log(error)
      
      
    }
  }
  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <div>
        <img src="/logo.png" alt="Logo" className="h-6 w-16" />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link className="hover:text-blue-600" to="/Home">
          Home
        </Link>
        <Link className="hover:text-blue-600" to="/products">
          Products
        </Link>
        <Link
          to="/cart"
          className="relative flex items-center gap-1 hover:text-blue-600"
        >
          <ShoppingCart className="h-5 w-5" />

          <span
            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold 
                   h-5 w-5 flex items-center justify-center rounded-full"
          >
            0
          </span>
        </Link>

        {/* if user then show this  */}
        {user && (
          <Link className="text-green-600 font-semibold" to="/profile">
            Hello, {user.firstName}
          </Link>
        )}
      </div>

      {/* Login / Logout Button */}
      <div>{user ? <Button onClick={logoutHandler}
      >Logout</Button> :
       <Button 
       onClick={()=>{navigate("/login")}} >Login</Button>}</div>
    </div>
  );
};

export default Navbar;
