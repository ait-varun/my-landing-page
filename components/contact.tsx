"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(15, "Name is too long"),
  email: z.string().email("Invalid email address").regex(/@/, "Invalid email"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ContactFormInputs) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
      // Uncomment the following line when you have an actual API endpoint
      // await axios.post('/api/contact', data);

      reset();
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });
      // router.push("/thank-you");
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center px-4"
      id="contact">
      <div className="border-2 border-white rounded-lg p-4 md:p-8 flex flex-col items-center justify-center w-full max-w-md">
        <h2 className="reveal-text text-2xl md:text-3xl font-bold mb-4 text-white">
          Contact
        </h2>
        <form className="reveal-text w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mb-4">{errors.name.message}</p>
          )}
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mb-4">{errors.email.message}</p>
          )}
          <textarea
            {...register("message")}
            placeholder="Message"
            className="w-full p-2 mb-4 border rounded h-32"
          />
          {errors.message && (
            <p className="text-red-600 text-sm mb-4">
              {errors.message.message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full disabled:bg-blue-300">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Sending </span>
                <span
                  style={{
                    borderTopColor: "transparent",
                  }}
                  className="w-6 h-6 border-4 border-white border-solid rounded-full animate-spin inline-block"
                />
              </div>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
