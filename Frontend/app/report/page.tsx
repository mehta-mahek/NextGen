import ReportDashboard from "@/components/ui/reportdashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#100425] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl">
        <ReportDashboard />
      </div>
    </main>
  );
}
