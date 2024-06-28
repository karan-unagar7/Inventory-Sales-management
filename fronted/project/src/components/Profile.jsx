import { FaCamera } from "react-icons/fa";
import useAuth from "../context/AuthProvider";

function Profile() {
  const { user } = useAuth();
  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Profile
        </h1>
        <div className="relative mb-8">
          {user.image && (
            <img
              src={user.image}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full"
            />
          )}
          <button
            className="absolute bottom-2 right-[-4px] bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
          >
            <FaCamera />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Gender:
              </label>
              <p className="text-gray-700">{user.gender}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone:
              </label>
              <p className="text-gray-700">{user.phone}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Address:
              </label>
              <p className="text-gray-700">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
