import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Bell, Wifi, WifiOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { language, toggleLanguage, t, isOffline } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/', label: t('home') },
    { key: 'about', path: '/about', label: t('about') },
    { key: 'notices', path: '/notices', label: t('notices') },
    { key: 'applyOnline', path: '/apply', label: t('applyOnline') },
    { key: 'knowYourAsha', path: '/find-asha', label: t('knowYourAsha') },
    { key: 'ashaLogin', path: '/asha-login', label: t('ashaLogin') },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-warning text-white py-2 px-4 text-center text-sm font-medium animate-slideIn">
          <div className="flex items-center justify-center gap-2">
            <WifiOff size={16} />
            <span>{t('workingOffline')}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold text-primary">SwasthyaSaathi</div>
              <div className="text-sm font-semibold text-secondary odia-text">
                ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-white'
                    : 'text-textDark hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors duration-200 shadow-md"
            >
              {language === 'en' ? 'ଓଡ଼ିଆ' : 'EN'}
            </button>

            {/* Notifications (Desktop) */}
            <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={24} className="text-textDark" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X size={28} className="text-textDark" />
              ) : (
                <Menu size={28} className="text-textDark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t animate-slideIn">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  isActivePath(item.path)
                    ? 'bg-primary text-white'
                    : 'text-textDark hover:bg-primary/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Notifications */}
            <div className="pt-2 border-t">
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg">
                <span className="font-medium text-textDark">Notifications</span>
                <div className="flex items-center gap-2">
                  <span className="badge-error">3 new</span>
                  <Bell size={20} />
                </div>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
