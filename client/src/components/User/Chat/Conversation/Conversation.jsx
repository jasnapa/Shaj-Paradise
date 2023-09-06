import React, { useEffect, useState } from 'react';
import { getVendor } from '../../../../Services/chatApi';

const Conversation = ({ data, currentUser , online }) => {

  const [vendorData, setVendorData] = useState();

  
  useEffect(() => {
      try {
      const othersId = data.members.find((id) => id !== currentUser);
      (async function () {
        const { data } = await getVendor(othersId);
        console.log(data);
        setVendorData(data.vendor)
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);



  return (
    <div>
      {vendorData ? (
        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
          <div>
            <img
              className="h-12 w-12 rounded-full"
              src="https://static.wikia.nocookie.net/avatar/images/0/02/Republic_City_Four_Elements.png/revision/latest?cb=20151006072820"
              alt=" Avatar"
            />
          </div>
          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div className="flex items-bottom justify-between">
              <p className="text-black">{vendorData?.vendorName}</p>
              {/* <p className="text-xs text-grey-darkest">12:45 pm</p> */}
            </div>
            { online ?
            <p className="text-green-500 mt-1 text-sm">Online</p>:
            <p className="text-red-600 mt-1 text-sm">offline</p>
}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Conversation;