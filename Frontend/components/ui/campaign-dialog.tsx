"use client"

import { useState } from "react"
import { Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CampaignDetails {
  name: string
  type: string
  focus: string
  description: string
  teamSize: number
  budget: string
  startDate: string
  endDate: string
  goals: string[]
  metrics: {
    impressions: number
    clicks: number
    conversions: number
  }
}

interface CampaignDialogProps {
  isOpen: boolean
  onClose: () => void
  campaign: CampaignDetails
}

export function CampaignDialog({ isOpen, onClose, campaign }: CampaignDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const details = `
Campaign: ${campaign.name}
Type: ${campaign.type}
Focus: ${campaign.focus}
Description: ${campaign.description}
Team Size: ${campaign.teamSize}
Budget: ${campaign.budget}
Duration: ${campaign.startDate} - ${campaign.endDate}
Goals: ${campaign.goals.join(", ")}
Metrics:
- Impressions: ${campaign.metrics.impressions.toLocaleString()}
- Clicks: ${campaign.metrics.clicks.toLocaleString()}
- Conversions: ${campaign.metrics.conversions.toLocaleString()}
    `.trim()

    navigator.clipboard.writeText(details)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#1a1a2f]/90 backdrop-blur-xl text-white border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{campaign.name}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {campaign.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 mt-6">
          {/* Campaign Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-lg bg-purple-900/20 overflow-hidden"
              >
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Campaign visual ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Campaign Type</h3>
                <p className="mt-1">{campaign.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Budget</h3>
                <p className="mt-1">{campaign.budget}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Duration</h3>
                <p className="mt-1">{campaign.startDate} - {campaign.endDate}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Goals</h3>
                <ul className="mt-1 list-disc list-inside">
                  {campaign.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Key Metrics</h3>
                <dl className="mt-1 grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Impressions:</dt>
                    <dd>{campaign.metrics.impressions.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Clicks:</dt>
                    <dd>{campaign.metrics.clicks.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Conversions:</dt>
                    <dd>{campaign.metrics.conversions.toLocaleString()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            className="bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy Details"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

