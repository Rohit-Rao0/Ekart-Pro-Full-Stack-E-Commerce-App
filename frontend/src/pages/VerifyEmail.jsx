import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();   // ✅ Correct

  const [status, setStatus] = useState("Verifying...");

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setStatus("Verification Complete ✅  You are redirected to Login Page");

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setStatus("Verification Failed ❌ You are redirected to SignUp Page ");
      setTimeout(() => {
          navigate("/signup");
        }, 5000);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 bg-white px-6 py-3 rounded-lg shadow-md">
      {status}
    </h3>
  </div>
  );
};

export default VerifyEmail;
