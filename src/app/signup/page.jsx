"use client";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
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
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    setLoading(false);

    if (data) {
      router.push("/");
      router.refresh();
    } else {
      alert(error?.message || "Registration failed. Please try again.");
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
        <h1 className="text-2xl text-center font-bold">Create Account</h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Start your adventure with Wanderlust
        </p>
      </div>
      <Card className="w-full max-w-md items-center rounded-none mt-6 p-12 border-2">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
          <TextField name="image" type="url">
            <Label>Image Url</Label>
            <Input placeholder="Enter your image url" />
            <FieldError />
          </TextField>
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
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
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

          <div className="flex justify-center gap-2">
            <Button
              className="rounded-none w-full bg-cyan-500 text-white"
              type="submit"
              isDisabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-2 my-6 w-full">
          <Separator />
          <div className="whitespace-nowrap text-xs text-gray-400">
            {" "}
            or sign up with{" "}
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

export default SignupPage;
