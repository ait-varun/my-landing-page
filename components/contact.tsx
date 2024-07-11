"use client";
import { useState } from "react";
import { z, ZodFormattedError } from "zod";

// Define the validation schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data
    const result = schema.safeParse({ name, email, message });

    if (!result.success) {
      // Extract errors and set them to state
      const errorMessages: FormErrors = {};
      if (result.error.format().name?._errors)
        errorMessages.name = result.error.format().name?._errors?.[0];
      if (result.error.format().email?._errors)
        errorMessages.email = result.error.format().email?._errors?.[0];
      if (result.error.format().message?._errors)
        errorMessages.message = result.error.format().message?._errors?.[0];

      setErrors(errorMessages);
      setSuccess("");
      // Mark all fields as touched
      setTouched({ name: true, email: true, message: true });
      return;
    }

    // If validation passes, clear errors and handle form submission
    setErrors({});
    setLoading(true);
    setSuccess("");

    console.log(name, email, message);

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setLoading(false);
    setSuccess("Your message has been sent successfully!");

    // Reset touched state
    setTouched({ name: false, email: false, message: false });
    // Reset Success state
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setSuccess("");
  };

  const handleInputChange = (field: keyof FormValues, value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);

    // Validate the specific field on change
    const result = schema.safeParse({ name, email, message });
    if (result.success) {
      setErrors({});
    } else {
      const errorMessages: FormErrors = {};
      if (result.error.format().name?._errors)
        errorMessages.name = result.error.format().name?._errors?.[0];
      if (result.error.format().email?._errors)
        errorMessages.email = result.error.format().email?._errors?.[0];
      if (result.error.format().message?._errors)
        errorMessages.message = result.error.format().message?._errors?.[0];

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessages[field],
      }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center px-4"
      id="contact">
      <div className="border-2 border-white rounded-lg p-4 md:p-8 flex flex-col items-center justify-center w-full max-w-md">
        <h2 className="reveal-text text-2xl md:text-3xl font-bold mb-4 text-white">
          Contact
        </h2>
        <form className="reveal-text w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className="w-full p-2 mb-4 border rounded"
          />
          {touched.name && errors.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className="w-full p-2 mb-4 border rounded"
          />
          {touched.email && errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
          <textarea
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            className="w-full p-2 mb-4 border rounded h-32"></textarea>
          {touched.message && errors.message && (
            <p className="text-red-500">{errors.message}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Loading </span>
                <span
                  style={{
                    borderTopColor: "transparent",
                  }}
                  className="w-6 h-6 border-4 border-white border-solid rounded-full animate-spin inline-block"></span>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </form>
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </section>
  );
}
