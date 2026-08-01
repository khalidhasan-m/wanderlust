import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";

const AddDestinationPage = async () => {
  // 1. Secure the page: block unauthenticated users right away
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // 2. Define the Server Action
  async function handleAddDestination(formData) {
    "use server";

    // Double-verify session on submission for security
    const serverSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!serverSession) {
      throw new Error("Unauthorized");
    }

    const destination = {
      destinationName: formData.get("destinationName"),
      country: formData.get("country"),
      category: formData.get("category"),
      price: formData.get("price"),
      duration: formData.get("duration"),
      departureDate: formData.get("departureDate"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      userId: serverSession.user.id, // Attach verified user ID
    };

    // Grab the incoming request headers to forward cookies to Express
    const requestHeaders = await headers();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Forward the cookies/authorization headers from Next.js to Express
        cookie: requestHeaders.get("cookie") || "",
      },
      body: JSON.stringify(destination),
    });

    if (res.ok) {
      redirect("/destinations");
    } else {
      const errorData = await res.json();
      console.error("Failed to add destination:", errorData);
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Add Destination Page</h1>
      {/* Pass the server action to the form's action attribute */}
      <form
        action={handleAddDestination}
        className="w-7xl mx-auto p-10 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Destination Name */}
          <div className="md:col-span-2">
            <TextField name="destinationName" isRequired>
              <Label>Destination Name</Label>
              <Input placeholder="Bali Paradise" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Country */}
          <TextField name="country" isRequired>
            <Label>Country</Label>
            <Input placeholder="Indonesia" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Category */}
          <div>
            <Select
              name="category"
              isRequired
              className="w-full"
              placeholder="Select category"
            >
              <Label>Category</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Beach" textValue="Beach">
                    Beach
                  </ListBox.Item>
                  <ListBox.Item id="Mountain" textValue="Mountain">
                    Mountain
                  </ListBox.Item>
                  <ListBox.Item id="City" textValue="City">
                    City
                  </ListBox.Item>
                  <ListBox.Item id="Adventure" textValue="Adventure">
                    Adventure
                  </ListBox.Item>
                  <ListBox.Item id="Cultural" textValue="Cultural">
                    Cultural
                  </ListBox.Item>
                  <ListBox.Item id="Luxury" textValue="Luxury">
                    Luxury
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Price */}
          <TextField name="price" type="number" isRequired>
            <Label>Price (USD)</Label>
            <Input type="number" placeholder="1299" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Duration */}
          <TextField name="duration" isRequired>
            <Label>Duration</Label>
            <Input placeholder="7 Days / 6 Nights" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Departure Date */}
          <div className="md:col-span-2">
            <TextField name="departureDate" type="date" isRequired>
              <Label>Departure Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label>Image URL</Label>
              <Input
                type="url"
                placeholder="https://example.com/bali-paradise.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea
                placeholder="Describe the travel experience..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        <Button
          type="submit"
          variant="outline"
          className="rounded-none bg-cyan-500 text-white"
        >
          Add Destination
        </Button>
      </form>
    </div>
  );
};

export default AddDestinationPage;
