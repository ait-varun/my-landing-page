"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface CustomerResponse {
  totalCustomers: number;
  customers: Customer[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

export default function Customers() {
  const [customerData, setCustomerData] = useState<Customer[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  const getCustomers = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setError("No authentication token available");
      setIsLoggedIn(false);
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

  useEffect(() => {
    getCustomers();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setCustomerData(null);
    setError(null);
    setIsLoggedIn(false);
    router.push("/auth");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Logout
          </button>
        )}
      </header>

      <main className="flex-grow p-4 overflow-auto">
        {!isLoggedIn ? (
          <div className="text-center">
            <p className="text-xl">
              You have been logged out. Please log in again.
            </p>
          </div>
        ) : error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : !customerData ? (
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
                  <span>{customer.name}</span>
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
