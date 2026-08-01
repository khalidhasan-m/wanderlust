"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Camera,
  MapPin,
  Calendar,
  Globe,
  DollarSign,
  TrendingUp,
  Edit3,
  User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Modal,
  Button,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Surface,
} from "@heroui/react";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { data: session, isPending, refetch } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // User object derived from session
  const user = {
    userId: session?.user?.id || "",
    name: session?.user?.name || "Traveler",
    email: session?.user?.email || "",
    image:
      session?.user?.image ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    location: "San Francisco, CA",
    memberSince: session?.user?.createdAt
      ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Mar 2024",
    nationality: "United States",
  };

  useEffect(() => {
    if (!user.userId) return;

    async function fetchBookings() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/${user.userId}`,
          {
            credentials: "include", // Crucial: Sends auth cookie to Express
          },
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoadingBookings(false);
      }
    }

    fetchBookings();
  }, [user.userId]);

  // Handle Profile Update submit (Name, Image, and Email)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);
    const newName = formData.get("name");
    const newEmail = formData.get("email");
    const newImage = formData.get("image");

    try {
      // 1. Update Name and Image using updateUser
      if (newName !== user.name || newImage !== user.image) {
        const { error } = await authClient.updateUser({
          name: newName,
          image: newImage,
        });
        if (error) throw error;
      }

      // 2. Update Email if it has changed (using Better Auth's changeEmail method)
      if (newEmail && newEmail !== user.email) {
        const { error } = await authClient.changeEmail({
          newEmail: newEmail,
          callbackURL: "/profile", // Where to redirect after any verification if required
        });
        if (error) {
          throw new Error(error.message || "Failed to update email");
        } else {
          toast.success("Verification email sent to your new address!");
        }
      }

      toast.success("Profile updated successfully!");

      // Refetch session so UI updates immediately
      if (refetch) {
        await refetch();
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // Dynamically calculated stats
  const currentDate = new Date();
  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter(
    (b) => new Date(b.departureDate) > currentDate,
  ).length;
  const totalSpent = bookings.reduce(
    (acc, curr) => acc + (Number(curr.price) || 0),
    0,
  );
  const uniqueCountries = new Set(bookings.map((b) => b.country)).size;

  const stats = {
    totalBookings: totalBookings,
    countriesVisited: uniqueCountries || 18,
    upcomingTrips: upcomingTrips,
    totalSpent: `$${totalSpent.toLocaleString()}`,
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fa] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111]">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account settings and travel preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white border border-[#e1e8ed] rounded shadow-sm p-6 flex flex-col items-center text-center">
            <div className="relative mb-4 w-28 h-28">
              <Image
                src={user.image}
                alt={user.name}
                fill
                sizes="112px"
                className="rounded-full object-cover border-2 border-white shadow-md"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="absolute bottom-0 right-0 z-10 bg-[#0095ff] text-white p-2 rounded-full shadow hover:bg-[#007acc] transition cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#111]">{user.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>

            <div className="w-full border-t border-gray-100 my-6"></div>

            <div className="w-full text-sm space-y-3 text-left px-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Member since</span>
                <span className="font-medium text-[#111]">
                  {user.memberSince}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nationality</span>
                <span className="font-medium text-[#111]">
                  {user.nationality}
                </span>
              </div>
            </div>

            <div className="w-full mt-6">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full py-2.5 px-4 bg-[#0095ff] hover:bg-[#007acc] text-white font-medium rounded transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Travel Statistics Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-[#111]">Travel Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#e1e8ed] rounded p-5 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Bookings
                  </p>
                  <p className="text-3xl font-bold text-[#111] mt-1">
                    {loadingBookings ? "..." : stats.totalBookings}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-50 text-[#0095ff] flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#e1e8ed] rounded p-5 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Countries Visited
                  </p>
                  <p className="text-3xl font-bold text-[#111] mt-1">
                    {loadingBookings ? "..." : stats.countriesVisited}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#137333] flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#e1e8ed] rounded p-5 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upcoming Trips
                  </p>
                  <p className="text-3xl font-bold text-[#111] mt-1">
                    {loadingBookings ? "..." : stats.upcomingTrips}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#e1e8ed] rounded p-5 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold text-[#111] mt-1">
                    {loadingBookings ? "..." : stats.totalSpent}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero UI Modal with Centered Container Pattern */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-white p-2">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-cyan-50 text-[#0095ff]">
                  <User className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Edit Profile</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-gray-500">
                  Update your account information below.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <Form
                    onSubmit={handleUpdateProfile}
                    className="flex flex-col gap-4"
                  >
                    <TextField
                      className="w-full"
                      name="name"
                      type="text"
                      defaultValue={user.name}
                      variant="secondary"
                      isRequired
                    >
                      <Label>Name</Label>
                      <Input placeholder="Enter your full name" />
                      <FieldError />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="email"
                      type="email"
                      defaultValue={user.email}
                      variant="secondary"
                      isRequired
                    >
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                      <FieldError />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="image"
                      type="url"
                      defaultValue={user.image}
                      variant="secondary"
                    >
                      <Label>Image URL</Label>
                      <Input placeholder="Enter your image URL" />
                      <FieldError />
                    </TextField>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="secondary"
                        onPress={() => setIsOpen(false)}
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-[#0095ff] text-white" type="submit">
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </Form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
