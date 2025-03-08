"use client";

import { useState } from "react";
import { MoreHorizontal, Download, Share, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const reports = [
  {
    id: 1,
    name: "Q4 Final Report",
    type: "PDF",
    size: "16MB",
    dateUploaded: "8 Jan 2025",
    lastUpdated: "8 Jan 2025",
    updatedBy: "John Doe",
  },
  {
    id: 2,
    name: "Marketing Strategy",
    type: "DOCX",
    size: "5.2MB",
    dateUploaded: "7 Jan 2025",
    lastUpdated: "7 Jan 2025",
    updatedBy: "Jane Smith",
  },
  {
    id: 3,
    name: "Financial Analysis",
    type: "XLSX",
    size: "3.8MB",
    dateUploaded: "6 Jan 2025",
    lastUpdated: "6 Jan 2025",
    updatedBy: "Mike Johnson",
  },
  {
    id: 4,
    name: "Project Timeline",
    type: "PDF",
    size: "2.1MB",
    dateUploaded: "5 Jan 2025",
    lastUpdated: "5 Jan 2025",
    updatedBy: "Sarah Williams",
  },
  {
    id: 5,
    name: "Customer Feedback",
    type: "CSV",
    size: "1.5MB",
    dateUploaded: "5 Jan 2025",
    lastUpdated: "5 Jan 2025",
    updatedBy: "Tom Brown",
  },
  {
    id: 6,
    name: "Product Roadmap",
    type: "PDF",
    size: "4.3MB",
    dateUploaded: "4 Jan 2025",
    lastUpdated: "4 Jan 2025",
    updatedBy: "Emily Davis",
  },
  {
    id: 7,
    name: "Team Performance",
    type: "PPTX",
    size: "8.7MB",
    dateUploaded: "4 Jan 2025",
    lastUpdated: "4 Jan 2025",
    updatedBy: "Chris Wilson",
  },
];

const ReportTable = () => {
  const [selectedReports, setSelectedReports] = useState<number[]>([]);

  const toggleReportSelection = (id: number) => {
    setSelectedReports((prev) =>
      prev.includes(id)
        ? prev.filter((reportId) => reportId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Generated Reports</h2>
        <Button
          variant="outline"
          className="bg-[#7F56D9] text-white hover:bg-[#7F56D9]/80"
        >
          Download All
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-2 text-left text-white">
              <Checkbox
                checked={selectedReports.length === reports.length}
                onCheckedChange={(checked) => {
                  setSelectedReports(checked ? reports.map((r) => r.id) : []);
                }}
                className="border-white"
              />
            </th>
            <th className="p-2 text-left text-white">File Name</th>
            <th className="p-2 text-left text-white">File Type</th>
            <th className="p-2 text-left text-white">File Size</th>
            <th className="p-2 text-left text-white">Date Uploaded</th>
            <th className="p-2 text-left text-white">Last Updated</th>
            <th className="p-2 text-left text-white">Updated By</th>
            <th className="p-2 text-left text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className={`${
                index % 2 === 0 ? "bg-white/5" : "bg-white/10"
              } hover:bg-white/20 transition-colors`}
            >
              <td className="p-2">
                <Checkbox
                  checked={selectedReports.includes(report.id)}
                  onCheckedChange={() => toggleReportSelection(report.id)}
                  className="border-white"
                />
              </td>
              <td className="p-2 font-medium text-white hover:underline cursor-pointer">
                {report.name}
              </td>
              <td className="p-2 text-white">{report.type}</td>
              <td className="p-2 text-white">{report.size}</td>
              <td className="p-2 text-white">{report.dateUploaded}</td>
              <td className="p-2 text-white">{report.lastUpdated}</td>
              <td className="p-2 text-white">{report.updatedBy}</td>
              <td className="p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white/10 backdrop-blur-md"
                  >
                    <DropdownMenuItem className="text-white hover:bg-white/20">
                      <Share className="mr-2 h-4 w-4" />
                      <span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/20">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/20">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/20">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
