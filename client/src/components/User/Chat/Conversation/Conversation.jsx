import React, { useEffect, useState } from 'react';

const Conversation = ({ data, currentUser }) => {

  const [userData, setUserData] = useState();

  
  useEffect(() => {
      try {
      const othersId = data.members.find((id) => id !== currentUser);
      (async function () {
        const { data } = await getUsers(othersId);
        setUserData(...data.users)
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);



  return (
    <div>
      {userData && userData.name ? (
        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
          <div>
            <img
              className="h-12 w-12 rounded-full"
              src=""
              alt="User Avatar"
            />
          </div>
          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div className="flex items-bottom justify-between">
              <p className="text-black">{userData?.name}</p>
              <p className="text-xs text-grey-darkest">12:45 pm</p>
            </div>
            <p className="text-grey-dark mt-1 text-sm">I'll be back</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Conversation;