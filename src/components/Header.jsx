const Header = ({ name, email, logoutHandler }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">
          Review Management
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-gray-500">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs">{email}</div>
          </div>
          <button
            className="px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
