"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";

interface CustomerResponse {
  totalCustomers: number;
  customers: Customer[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface AddCustomerForm {
  name: string;
  email: string;
}

export default function Customers() {
  const [customerData, setCustomerData] = useState<Customer[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCustomerForm>();

  const getCustomers = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setError("No authentication token available");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch customers: ${res.statusText}`);
      }

      const data: CustomerResponse = await res.json();
      setCustomerData(data.customers);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const deleteCustomer = async (id: string) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("No authentication token available");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete customer: ${res.statusText}`);
      }

      // Remove the deleted customer from the state
      setCustomerData((prevData) =>
        prevData ? prevData.filter((customer) => customer.id !== id) : null
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const addCustomer = async (data: AddCustomerForm) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("No authentication token available");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/customers/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Failed to add customer: ${res.statusText}`
        );
      }

      const newCustomer: Customer = await res.json();
      setCustomerData((prevData) =>
        prevData ? [...prevData, newCustomer] : [newCustomer]
      );
      setIsOpen(false);
      reset();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getCustomers();
    customerData;
  }, [customerData]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="bg-white text-blue-600">
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Customer</SheetTitle>
              <SheetDescription>
                Enter the details of the new customer below.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(addCustomer)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    className="col-span-3"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <SheetFooter>
                <Button type="submit">Add Customer</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-grow p-4 overflow-auto">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {!customerData ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer List</h2>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
              {customerData.map((customer) => (
                <li
                  key={customer.id}
                  className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  </div>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                    aria-label="Delete customer">
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}