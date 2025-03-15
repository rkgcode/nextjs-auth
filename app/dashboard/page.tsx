"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in"); // Redirect if not logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
console.log(session);
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto mt-10 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to Your Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {session?.user?.firstName} {session?.user?.lastName}, you are successfully logged in!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
