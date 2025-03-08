"use client";

import { useState } from "react";
import { Header } from "./header";
import ReportTable from "./reporttable";

const ReportDashboard = () => {
  const [activeTab, setActiveTab] = useState("REPORT");

  return (
    <div className="w-[1200px] h-[650px] bg-gray-100/10 backdrop-blur-md rounded-3xl p-6 flex flex-col">
      <Header/>
      <div className="flex-grow mt-6">
        <ReportTable />
      </div>
    </div>
  );
};

export default ReportDashboard;
