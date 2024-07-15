import Login from "@/components/login";
import SignUp from "@/components/signup";

export default function Auth() {
  return (
    <>
      <div className="container mx-auto p-4">
        <Login />
        <SignUp />
      </div>
    </>
  );
}
