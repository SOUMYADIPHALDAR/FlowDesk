"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ActivateUserAction from "@/action/activateUser.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserActivationFormProps {
  token?: string;
}

export default function UserActivationForm({ token }: UserActivationFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsPending(true);

    try{
        const { error} = await ActivateUserAction({token, password, confirmPassword});
        if(error) {
            toast.error(error);
        } else {
            toast.success("User has been activated..");
            router.push("/signin");
        }
    } finally {
        setIsPending(false);
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <Card className="w-full max-w-md">
          <CardContent className="py-10 text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Invalid Invitation
            </h2>

            <p className="mt-3 text-muted-foreground">
              This activation link is invalid.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Activate Your Account
          </CardTitle>

          <p className="text-center text-muted-foreground">
            Create your password to activate your FlowDesk account.
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Hidden Token */}
            <input type="hidden" name="token" value={token} />

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>

              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#036EFF] hover:bg-[#0257d6]"
            >
              Activate Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
