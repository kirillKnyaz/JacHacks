import { Link } from "react-router-dom"; // We import Link to create navigation links

function LoginPage() {
  return (
    <div className="bg-white p-8 rounded shadow-md w-80">
      {/* White box with padding, rounded corners, shadow, width 80 (tailwind style) */}

      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2> 
      {/* Title */}

      <form className="flex flex-col">
        {/* Form fields arranged vertically */}

        <input type="email" placeholder="Email" className="p-2 mb-4 border rounded" required />
        <input type="password" placeholder="Password" className="p-2 mb-4 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        {/* Blue button for login */}
      </form>

      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
      {/* Link to the Register page */}
    </div>
  );
}

export default LoginPage;
