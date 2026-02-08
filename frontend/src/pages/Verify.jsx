import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MailCheck } from "lucide-react";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MailCheck className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            Almost there! Just one more step.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-gray-700">
            We have sent a verification link to your email address.
          </p>

          <p className="text-sm text-gray-500">
            Please check your inbox (and spam folder) and click on the verification link to activate your account.
          </p>

          
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">Resend Verification Email</Button>

          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
