import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Info, Target, Users, Heart } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-textDark mb-4">
            About SevaaYukti
          </h1>
          <p className="text-lg text-gray-600 odia-text">
            ସେବା ୟୁକ୍ତି ବିଷୟରେ
          </p>
        </div>

        <div className="space-y-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-textDark">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              SevaaYukti is an innovative offline-first digital health platform
              designed to empower ASHA workers and improve healthcare delivery in
              rural Odisha. We bridge the gap between technology and grassroots
              healthcare, ensuring that even the most remote villages have access to
              quality health services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-2">Vision</h3>
              <p className="text-sm text-gray-600">
                A healthier rural Odisha with accessible, technology-enabled
                healthcare for all
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Empowering 12,500+ ASHA workers serving 8,400+ villages across
                Odisha
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-2">Impact</h3>
              <p className="text-sm text-gray-600">
                450,000+ patients registered, 125,000+ vaccinations tracked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
