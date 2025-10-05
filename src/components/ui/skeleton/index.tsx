export const CardSkeleton: React.FC = () => (
  <div className="bg-gray-50 rounded-xl overflow-hidden card-shadow animate-pulse" role="presentation">
    <div className="w-full h-56 bg-gray-300" />
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded mb-2" />
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-16 bg-gray-300 rounded mb-4" />
      <div className="h-10 bg-gray-300 rounded" />
    </div>
  </div>
);
