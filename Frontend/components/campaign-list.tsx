"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2Icon, MoreVertical, Trash2Icon } from "lucide-react";
import { CampaignDialog } from "./ui/campaign-dialog";

// Helper function to generate random campaign details
function generateCampaignDetails(campaign: any) {
  const startDate = new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28)
  );
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 6) + 1);

  return {
    ...campaign,
    budget: `$${(Math.random() * 100000).toFixed(2)}`,
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    goals: [
      "Increase brand awareness",
      "Drive website traffic",
      "Generate qualified leads",
      "Boost social media engagement",
    ].slice(0, Math.floor(Math.random() * 3) + 2),
    metrics: {
      impressions: Math.floor(Math.random() * 1000000),
      clicks: Math.floor(Math.random() * 100000),
      conversions: Math.floor(Math.random() * 10000),
    },
  };
}

const campaigns = [
  {
    id: 1,
    name: "Spring Deals",
    type: "Customer",
    focus: "Content curating app",
    description: "Brings all your news into one place",
    teamSize: 4,
  },
  {
    id: 2,
    name: "Referral Boost",
    type: "Churned",
    focus: "Design software",
    description: "Super lightweight design app",
    teamSize: 5,
  },
  {
    id: 3,
    name: "Referral Boost",
    type: "Churned",
    focus: "Design software",
    description: "Super lightweight design app",
    teamSize: 5,
  },
  {
    id: 4,
    name: "Referral Boost",
    type: "Churned",
    focus: "Design software",
    description: "Super lightweight design app",
    teamSize: 5,
  },
  {
    id: 5,
    name: "Referral Boost",
    type: "Churned",
    focus: "Design software",
    description: "Super lightweight design app",
    teamSize: 5,
  },
];

export function CampaignList() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  return (
    <div className="rounded-lg bg-white/10 backdrop-blur-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-white bg-white/5">
            Create Campaign
          </Button>
          <Button variant="outline" size="sm" className="text-white bg-white/5">
            US, AU, +4
          </Button>
          <Button variant="outline" size="sm" className="text-white bg-white/5">
            More filters
          </Button>
        </div>
        <input
          type="search"
          placeholder="Search"
          className="rounded-md bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-400"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-gray-300">Campaign Name</TableHead>
            <TableHead className="text-gray-300">Target audience</TableHead>
            <TableHead className="text-gray-300">Team members</TableHead>
            <TableHead className="text-gray-300">Campaign Focus</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id} className="border-gray-700">
              <TableCell>
                <button
                  onClick={() =>
                    setSelectedCampaign(generateCampaignDetails(campaign))
                  }
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  {campaign.name}
                </button>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400">
                  {campaign.type}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {[...Array(campaign.teamSize)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-gray-500 border-2 border-purple-900"
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-white">{campaign.focus}</div>
                <div className="text-sm text-gray-400">
                  {campaign.description}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit2Icon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          className="bg-white/5 text-white border-purple-500/20"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          className="bg-white/5 text-white border-purple-500/20"
        >
          Next
        </Button>
      </div>

      {selectedCampaign && (
        <CampaignDialog
          isOpen={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          campaign={selectedCampaign}
        />
      )}
    </div>
  );
}
