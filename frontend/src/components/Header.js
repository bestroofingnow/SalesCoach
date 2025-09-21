import React from 'react';
import { Video, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-primary-600" />
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Video Creator
              </h1>
              <p className="text-sm text-gray-600">
                Powered by OpenAI & Google Veo 3
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Beta
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;