export default function LegacyDashboardPage() {
  return (
    <div className="flex-1 w-full h-full min-h-[calc(100vh-64px)]">
      <iframe 
        src="/legacy/index.html" 
        className="w-full h-full min-h-[calc(100vh-64px)] border-none bg-white block"
        title="Legacy App"
      />
    </div>
  );
}
