import React from "react";

function ProfileHeader({ user }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user?.displayName}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
