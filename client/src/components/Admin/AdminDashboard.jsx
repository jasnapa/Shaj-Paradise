import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { getStats } from "../../Services/adminApi";
import AdminStats from "./AdminStats/AdminStats";
import Bar from "./Chart/Bar/Bar";
// import AdminStats from "./AdminStats/AdminStats";

const AdminDashboard = () => {
const[count,setCount]= useState()
const[monthlyRevenue,setMonthlyRevenue]=useState([])
  useEffect(() => { 
    try {
      (
        async function () {
        const { data } = await getStats()
        if (data.success) {
          setCount(data.count);
          setMonthlyRevenue(data.monthlyRevenue)
        }
      })()
    } catch (error) {
      console.log(error);
    }
  },[])
  return (
    <>

      <Sidebar />
    {count &&  <AdminStats count= {count}/>}
    <Bar monthlyRevenueData={monthlyRevenue}/>
    </>
  );
};

export default AdminDashboard;
