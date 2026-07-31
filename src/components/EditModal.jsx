"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { BiEditAlt } from "react-icons/bi";
import toast from "react-hot-toast";

export function EditModal({ destination }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    _id,
    destinationName,
    country,
    price,
    duration,
    imageUrl,
    description,
    category,
    departureDate,
  } = destination;

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);
    const updatedDestinationData = Object.fromEntries(formData.entries());
    console.log("Destination Data:", updatedDestinationData);

    try {
      const res = await fetch(`http://localhost:5050/destination/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include", // Crucial: Sends the auth cookie to Express backend
        body: JSON.stringify(updatedDestinationData),
      });

      if (!res.ok) {
        throw new Error("Failed to update destination");
      }

      const data = await res.json();
      console.log("Updated successfully:", data);

      toast.success("Destination updated successfully!");

      // Refresh data and navigate on the client side
      router.refresh();
      router.push("/destinations");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update destination.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal>
      <Button variant="outline" className="rounded-none cursor-pointer">
        <BiEditAlt /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Destination</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  className="w-full max-w-md mx-auto p-4 space-y-2"
                  onSubmit={onSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField
                        name="destinationName"
                        isRequired
                        defaultValue={destinationName}
                      >
                        <Label>Destination Name</Label>
                        <Input
                          placeholder="Bali Paradise"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField name="country" isRequired defaultValue={country}>
                      <Label>Country</Label>
                      <Input placeholder="Indonesia" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Category - Updated Select Component */}
                    <div>
                      <Select
                        name="category"
                        isRequired
                        className="w-full"
                        placeholder="Select category"
                        defaultValue={category}
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
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Mountain" textValue="Mountain">
                              Mountain
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="City" textValue="City">
                              City
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Adventure" textValue="Adventure">
                              Adventure
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Cultural" textValue="Cultural">
                              Cultural
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Luxury" textValue="Luxury">
                              Luxury
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price */}
                    <TextField
                      name="price"
                      type="number"
                      isRequired
                      defaultValue={price}
                    >
                      <Label>Price (USD)</Label>
                      <Input
                        type="number"
                        placeholder="1299"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField
                      name="duration"
                      isRequired
                      defaultValue={duration}
                    >
                      <Label>Duration</Label>
                      <Input
                        placeholder="7 Days / 6 Nights"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                      <TextField
                        name="departureDate"
                        type="date"
                        isRequired
                        defaultValue={departureDate}
                      >
                        <Label>Departure Date</Label>
                        <Input type="date" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        name="imageUrl"
                        isRequired
                        defaultValue={imageUrl}
                      >
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
                      <TextField
                        name="description"
                        isRequired
                        defaultValue={description}
                      >
                        <Label>Description</Label>
                        <TextArea
                          placeholder="Describe the travel experience..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Buttons */}
                  <Modal.Footer>
                    <Button slot="close" variant="secondary" type="button">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
