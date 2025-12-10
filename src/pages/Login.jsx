export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[350px] text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
          />

          <button className="bg-red-600 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
