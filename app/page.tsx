export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 py-12 sm:px-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl">
            Secure & Scalable Authentication with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Next.js</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A full-stack authentication system using **NextAuth.js** with **Google & Credentials Auth**, powered by **TypeScript & MongoDB**.
          </p>
        </div>
      </div>
    </div>
  );
}
