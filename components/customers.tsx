"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
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
import axios from "axios";

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
  const [addNewError, setAddNewError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

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
      const res = await axios.get("http://localhost:4000/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Add this line if your API requires cookies
      });

      if (res.status !== 200) {
        throw new Error(`Failed to fetch customers: ${res.status}`);
      }

      const data: CustomerResponse = await res.data;
      setCustomerData(data.customers);
      console.log(data);
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
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Add this line if your API requires cookies
        }
      );

      if (res.status !== 200) {
        throw new Error(`Failed to delete customer: ${res.status}`);
      }

      // Remove the deleted customer from the state
      setCustomerData((prevData) =>
        prevData ? prevData.filter((customer) => customer.id !== id) : null
      );

      toast({
        title: `${res.data.message}!`,
        description: "Customer deleted successfully",
      });
    } catch (error: any) {
      setError(error.response?.data?.message);
    }
  };

  const addCustomer = async (data: AddCustomerForm) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("No authentication token available");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/customers/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Add this line if your API requires cookies
        }
      );
      setIsOpen(false);
      toast({
        title: `Added new customer: ${data.name}`,
        description: "Customer added successfully",
      });
      getCustomers();
      reset();
    } catch (error: any) {
      setAddNewError(error.response?.data?.message);

      setTimeout(() => {
        setAddNewError(null);
      }, 5000);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

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
              {addNewError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6"
                  role="alert">
                  <span className="block sm:inline"> {addNewError}</span>
                </div>
              )}
            </form>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-grow p-4 overflow-auto">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4"
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

              {customerData.length === 0 && (
                <div className="flex justify-center items-center h-full my-10">
                  <h2 className="text-xl font-semibold my-4">
                    No Customers Found
                  </h2>
                </div>
              )}
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
