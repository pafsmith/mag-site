"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { signIn, signUp } from "~/server/actions/authentication";

export default function SingInUp() {
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signInSuccess, setSignInSuccess] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  return (
    <div className="container mx-auto mt-24 flex min-h-screen justify-center">
      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card className="border-t-4 border-orange-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Sign In
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <form
              action={async (formData) => {
                setSignInError(null);
                setSignInSuccess(false);
                const result = await signIn(formData);
                if (result.error) {
                  setSignInError(result.error);
                } else {
                  setSignInSuccess(true);
                }
              }}
            >
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                {signInError && (
                  <p className="text-sm text-red-500">{signInError}</p>
                )}
                {signInSuccess && (
                  <p className="text-sm text-orange-500">Sign in successful!</p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                >
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="border-t-4 border-orange-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Sign Up
              </CardTitle>
              <CardDescription>
                Create a new account to join our organization.
              </CardDescription>
            </CardHeader>
            <form
              action={async (formData) => {
                setSignUpError(null);
                setSignUpSuccess(false);
                const result = await signUp(formData);
                if (result.error) {
                  setSignUpError(result.error);
                } else {
                  setSignUpSuccess(true);
                }
              }}
            >
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="signup-name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                {signUpError && (
                  <p className="text-sm text-red-500">{signUpError}</p>
                )}
                {signUpSuccess && (
                  <p className="text-sm text-orange-500">Sign up successful!</p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                >
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
