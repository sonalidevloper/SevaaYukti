import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('about'), path: '/about' },
    { label: t('notices'), path: '/notices' },
    { label: t('applyOnline'), path: '/apply' },
    { label: t('knowYourAsha'), path: '/find-asha' },
    { label: t('ashaLogin'), path: '/asha-login' },
  ];

  const supportLinks = [
    { label: t('helpSupport'), path: '/help' },
    { label: t('contactUs'), path: '/contact' },
    { label: t('privacyPolicy'), path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'FAQs', path: '/faq' },
  ];

  return (
    <footer className="bg-gradient-to-br from-secondary-dark to-secondary text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <div className="text-lg font-bold">SevaaYukti</div>
                <div className="text-sm odia-text">ସେବା ୟୁକ୍ତି</div>
              </div>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Empowering rural healthcare in Odisha through digital innovation and
              community health workers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-light">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-200 hover:text-primary-light transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-light rounded-full group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-light">
              {t('helpSupport')}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-200 hover:text-primary-light transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-light rounded-full group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-light">
              {t('contactUs')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-200">
                <MapPin size={18} className="flex-shrink-0 mt-1 text-primary-light" />
                <span>
                  National Health Mission
                  <br />
                  Bhubaneswar, Odisha 751001
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <Phone size={18} className="flex-shrink-0 text-primary-light" />
                <span>Helpline: 104 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <Mail size={18} className="flex-shrink-0 text-primary-light" />
                <span>support@sevaayukti.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Government Logos & Branding */}
        <div className="border-t border-white/20 pt-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-300">
                Government of Odisha
              </div>
              <div className="text-xs text-gray-400 mt-1">Health & Family Welfare</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-300">
                National Health Mission
              </div>
              <div className="text-xs text-gray-400 mt-1">Ministry of Health</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-300">Digital India</div>
              <div className="text-xs text-gray-400 mt-1">Initiative</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} SevaaYukti. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart size={16} className="text-error" fill="currentColor" />
              <span>for Rural Odisha</span>
            </div>
            <div className="text-center md:text-right">
              <span className="text-xs">
                Last Updated: {new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
