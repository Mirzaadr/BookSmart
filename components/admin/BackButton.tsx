"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button className="back-btn hover:shadow-sm" onClick={() => router.back()}>
      <ArrowLeft />
      Go Back
    </Button>
  );
};

export default BackButton;
