// components/ThankYouComponent.js
import { useRouter } from "next/router";
import Button from "@/components/Button"; // Adjust to your button component

export default function ThankYouComponent() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Example: Redirect to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Thank You!</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Your submission has been received successfully.
      </p>
      <p className="text-lg text-gray-700 text-center mb-8">
        There are no pending actions remaining.
      </p>
      <Button onClick={handleGoBack}>Go Back to Dashboard</Button>
    </div>
  );
}
