import React from 'react';
import { FcBusinessman, FcBusinesswoman, FcInTransit, FcStatistics } from "react-icons/fc";

const AdminStats = ({ count }) => {
  console.log(count, "km");
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-16 md:mt-0 md:ml-40 md:flex justify-center gap-4'>
        <div className="stats shadow-xl mt-4 md:mt-28">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div>
                  <FcStatistics size={42} />
                </div>
              </div>
            </div>
            <div className="stat-value">{count[2]}</div>
            <div className="stat-title">Total Bookings</div>
          </div>
        </div>
        <div className="stats mt-4 md:mt-28 shadow-xl">
          <div className="stat ">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div>
                  <FcBusinessman size={42} />
                </div>
              </div>
            </div>
            <div className="stat-value">{count[0]}</div>
            <div className="stat-title">Total Users</div>
          </div>
        </div>
        <div className="stats mt-4 md:mt-28 shadow-xl">
          <div className="stat ">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div>
                  <FcBusinesswoman size={42} />
                </div>
              </div>
            </div>
            <div className="stat-value">{count[1]}</div>
            <div className="stat-title">Registered Vendors</div>
          </div>
        </div>
        <div className="stats mt-4 md:mt-28 shadow-xl">
          <div className="stat ">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div>
                  <FcBusinessman size={42} />
                </div>
              </div>
            </div>
            <div className="stat-value">{count[3]}</div>
            <div className="stat-title">Registered Resorts</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminStats;
