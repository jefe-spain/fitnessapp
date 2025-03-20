import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function SignUpPage() {
  const user = await currentUser();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }
  
  // Custom sign-up page with DaisyUI and Tailwind
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex flex-col justify-center items-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Fitness Admin</h1>
            <p className="text-base-content opacity-70 mt-2">Create an account to use the fitness app</p>
          </div>
          
          <div className="divider">New Account</div>
          
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "btn btn-primary w-full",
                formFieldInput: "input input-bordered w-full",
                card: "shadow-none"
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
} 