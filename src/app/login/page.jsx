"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Card,
  Separator,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: rememberMe,
    });

    setLoading(false);

    if (data) {
      router.push("/");
      router.refresh();
    } else {
      alert(error?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="mx-auto mt-10">
      <div className="mt-2">
        <h1 className="text-2xl text-center font-bold">
          Login to your account
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Start your adventure with Wanderlust
        </p>
      </div>
      <Card className="w-full max-w-md items-center rounded-none mt-6 p-12 border-2">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <div className="relative flex flex-col">
            <TextField
              isRequired
              minLength={8}
              name="password"
              type={isVisible ? "text" : "password"}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <FieldError />
            </TextField>
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
              />
              Remember me
            </label>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              className="rounded-none w-full bg-cyan-500 text-white"
              type="submit"
              isDisabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-2 my-6 w-full">
          <Separator />
          <div className="whitespace-nowrap text-xs text-gray-400">
            {" "}
            or sign in with{" "}
          </div>
          <Separator />
        </div>

        <div>
          <Button
            onClick={handleGoogleSignIn}
            className="w-sm rounded-none"
            variant="tertiary"
          >
            <Icon icon="devicon:google" />
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
