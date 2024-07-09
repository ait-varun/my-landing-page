export default function Contact() {
  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center px-4"
      id="contact">
      <div className="border-2 border-white rounded-lg p-4 md:p-8 flex flex-col items-center justify-center w-full max-w-md">
        <h2 className="reveal-text text-2xl md:text-3xl font-bold mb-4 text-white">
          Contact
        </h2>
        <form className="reveal-text w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            name="message"
            placeholder="Message"
            className="w-full p-2 mb-4 border rounded h-32"></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
