"use client";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div
      className="w-full h-[calc(100vh-200px)] md:h-[calc(100vh-280px)] items-center"
      id="not-found"
    >
      <h4 className="">Something Happened</h4>
      <p className="">An error occurred. Please try again later.</p>
      <Button
        className="not-found-btn"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </div>
  );
};

export default ErrorPage;
