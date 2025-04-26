import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form className="flex flex-col">
        <input type="text" placeholder="Name" className="p-2 mb-4 border rounded" required />
        <input type="email" placeholder="Email" className="p-2 mb-4 border rounded" required />
        <input type="password" placeholder="Password" className="p-2 mb-4 border rounded" required />
        <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
        {/* Green button for register */}
      </form>

      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-green-500">Login</Link>
      </p>
      {/* Link back to Login page */}
    </div>
  );
}

export default RegisterPage;
