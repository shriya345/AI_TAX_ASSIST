import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl mb-6">AI Tax Assistant</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/">Chat Assistant</Link>
        <Link to="/tax">Tax Suggestion</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
