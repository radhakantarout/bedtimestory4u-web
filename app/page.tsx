export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">BedtimeStory4U</h1>
      <p className="mt-2 text-gray-300">Welcome to your mobile-first bedtime story app.</p>

      <div className="mt-6 flex flex-col gap-4">
        <a
          href="/auth/login"
          className="bg-blue-600 p-3 rounded text-center"
        >
          Login
        </a>

        <a
          href="/auth/signup"
          className="bg-green-600 p-3 rounded text-center"
        >
          Create Account
        </a>
      </div>
    </div>
  );
}