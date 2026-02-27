import React from 'react';
import { Bell } from 'lucide-react';

const Notices = () => {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">
            Notices & Announcements
          </h1>
          <p className="text-gray-600">Stay updated with latest health alerts and information</p>
        </div>

        <div className="card text-center py-16">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Notices Coming Soon</h2>
          <p className="text-gray-500">Important announcements and updates will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Notices;
