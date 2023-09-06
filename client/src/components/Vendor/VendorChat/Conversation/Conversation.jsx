import React, { useEffect, useState } from 'react';
import { getUser, getVendor } from '../../../../Services/chatApi';

const Conversation = ({ data, currentUser,online }) => {

  const [userData, setUserData] = useState();

  
  useEffect(() => {
      try {
      const othersId = data.members.find((id) => id !== currentUser);
      (async function () {
        const { data } = await getUser(othersId);
        console.log(data);
        setUserData(data.user)
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);



  return (
    <div>
      {userData ? (
        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
          <div>
            <img
              className="h-12 w-12 rounded-full"
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              alt=" Avatar"
            />
          </div>
          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div className="flex items-bottom justify-between">
              <p className="text-black">{userData?.name}</p>
              {/* <p className="text-xs text-grey-darkest">12:45 pm</p> */}
            </div>
            { online ?
            <p className="text-green-500 mt-1 text-sm">Online</p>:
            <p className="text-red-600 mt-1 text-sm">offline</p>
}          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Conversation;