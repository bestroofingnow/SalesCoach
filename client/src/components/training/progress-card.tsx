interface ProgressCardProps {
  title: string;
  completed: number;
  total: number;
  color: 'blue' | 'orange' | 'purple' | 'green';
  icon: string;
}

export default function ProgressCard({ title, completed, total, color, icon }: ProgressCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-500',
    orange: 'bg-orange-100 text-orange-500',
    purple: 'bg-purple-100 text-purple-500',
    green: 'bg-green-100 text-green-500',
  };

  const progressClasses = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm text-gray-600">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{completed}/{total}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${progressClasses[color]} rounded-full h-2 transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
