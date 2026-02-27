import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import {
  Search,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Calendar,
  User,
  Languages as LanguagesIcon,
} from 'lucide-react';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const FindAsha = () => {
  const { t } = useLanguage();
  
  // Location hierarchy state
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [villages, setVillages] = useState([]);
  
  // Selected values
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedPinCode, setSelectedPinCode] = useState('');
  
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Load districts on component mount
  React.useEffect(() => {
    loadDistricts();
  }, []);

  const loadDistricts = async () => {
    try {
      const response = await api.get('/ashas/locations/districts');
      if (response.success) {
        setDistricts(response.data);
      }
    } catch (error) {
      console.error('Error loading districts:', error);
    }
  };

  // Load blocks when district is selected
  const handleDistrictChange = async (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedVillage('');
    setSelectedPinCode('');
    setBlocks([]);
    setPanchayats([]);
    setVillages([]);
    setSearchResults([]);

    if (district) {
      setIsLoading(true);
      try {
        const response = await api.get(`/ashas/locations/blocks?district=${encodeURIComponent(district)}`);
        if (response.success) {
          setBlocks(response.data);
        }
      } catch (error) {
        console.error('Error loading blocks:', error);
        setToast({ type: 'error', message: 'Error loading blocks' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Load panchayats when block is selected
  const handleBlockChange = async (e) => {
    const block = e.target.value;
    setSelectedBlock(block);
    setSelectedPanchayat('');
    setSelectedVillage('');
    setSelectedPinCode('');
    setPanchayats([]);
    setVillages([]);
    setSearchResults([]);

    if (block && selectedDistrict) {
      setIsLoading(true);
      try {
        const response = await api.get(`/ashas/locations/panchayats?district=${encodeURIComponent(selectedDistrict)}&block=${encodeURIComponent(block)}`);
        if (response.success) {
          setPanchayats(response.data);
        }
      } catch (error) {
        console.error('Error loading panchayats:', error);
        setToast({ type: 'error', message: 'Error loading gram panchayats' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Load villages when panchayat is selected
  const handlePanchayatChange = async (e) => {
    const panchayat = e.target.value;
    setSelectedPanchayat(panchayat);
    setSelectedVillage('');
    setSelectedPinCode('');
    setVillages([]);
    setSearchResults([]);

    if (panchayat && selectedDistrict && selectedBlock) {
      setIsLoading(true);
      try {
        const response = await api.get(`/ashas/locations/villages?district=${encodeURIComponent(selectedDistrict)}&block=${encodeURIComponent(selectedBlock)}&panchayat=${encodeURIComponent(panchayat)}`);
        if (response.success) {
          setVillages(response.data);
        }
      } catch (error) {
        console.error('Error loading villages:', error);
        setToast({ type: 'error', message: 'Error loading villages' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!selectedDistrict) {
      setToast({ type: 'error', message: 'Please select at least a district' });
      return;
    }

    setIsSearching(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedDistrict) params.append('district', selectedDistrict);
      if (selectedBlock) params.append('block', selectedBlock);
      if (selectedPanchayat) params.append('panchayat', selectedPanchayat);
      if (selectedVillage) params.append('village', selectedVillage);
      if (selectedPinCode) params.append('pincode', selectedPinCode);

      const response = await api.get(`/ashas/search?${params.toString()}`);
      
      if (response.success) {
        setSearchResults(response.data);
        if (response.data.length === 0) {
          setToast({ 
            type: 'info', 
            message: 'No ASHA workers found for the selected location' 
          });
        } else {
          setToast({ 
            type: 'success', 
            message: `Found ${response.data.length} ASHA worker(s)` 
          });
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setToast({ 
        type: 'error', 
        message: error.response?.data?.message || 'Error searching for ASHA workers' 
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCallAsha = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
            {t('knowYourAsha')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your local ASHA health worker and connect for healthcare support
          </p>
          <p className="text-base text-gray-600 odia-text mt-2">
            ଆପଣଙ୍କର ସ୍ଥାନୀୟ ଆଶା ସ୍ୱାସ୍ଥ୍ୟ କର୍ମୀ ଖୋଜନ୍ତୁ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟସେବା ସହାୟତା ପାଇଁ ସଂଯୋଗ କରନ୍ତୁ
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-textDark">Select Location</h2>
                <p className="text-sm text-gray-600 mt-1">State: Odisha (ଓଡ଼ିଶା)</p>
              </div>

              {/* Cascading Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* District Selection */}
                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    District (ଜିଲ୍ଲା) *
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Block Selection */}
                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Block (ବ୍ଲକ)
                  </label>
                  <select
                    value={selectedBlock}
                    onChange={handleBlockChange}
                    disabled={!selectedDistrict || isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Block</option>
                    {blocks.map((block) => (
                      <option key={block} value={block}>
                        {block}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gram Panchayat Selection */}
                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Gram Panchayat (ଗ୍ରାମ ପଞ୍ଚାୟତ)
                  </label>
                  <select
                    value={selectedPanchayat}
                    onChange={handlePanchayatChange}
                    disabled={!selectedBlock || isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Gram Panchayat</option>
                    {panchayats.map((panchayat) => (
                      <option key={panchayat} value={panchayat}>
                        {panchayat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Village Selection */}
                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Village (ଗାଁ)
                  </label>
                  <select
                    value={selectedVillage}
                    onChange={handleVillageChange}
                    disabled={!selectedPanchayat || isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Village</option>
                    {villages.map((village) => (
                      <option key={village} value={village}>
                        {village}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PIN Code (Optional Input) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    PIN Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={selectedPinCode}
                    onChange={(e) => setSelectedPinCode(e.target.value)}
                    placeholder="Enter PIN Code (e.g., 751010)"
                    maxLength="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex gap-3 justify-center">
                <Button
                  type="submit"
                  icon={Search}
                  disabled={!selectedDistrict || isSearching}
                  loading={isSearching}
                  className="px-8"
                >
                  {isSearching ? 'Searching...' : 'Find ASHA Workers'}
                </Button>
              </div>

              {isLoading && (
                <div className="text-center text-sm text-gray-600">
                  <LoadingSpinner size="small" /> Loading options...
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Search Results */}
        {isSearching ? (
          <div className="text-center py-12">
            <LoadingSpinner size="large" text="Searching for ASHA workers..." />
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-textDark">
                Found {searchResults.length} ASHA Worker{searchResults.length !== 1 && 's'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {searchResults.map((asha) => (
                <div key={asha.id} className="card animate-slideUp">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center mx-auto md:mx-0">
                        {asha.photo ? (
                          <img
                            src={asha.photo}
                            alt={asha.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-12 h-12 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-textDark">
                          {asha.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">
                            {asha.experience} years experience
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin size={16} className="flex-shrink-0 mt-0.5 text-primary" />
                          <span>
                            <strong>Village:</strong> {asha.village}
                            {asha.gramPanchayat && (
                              <>
                                <br />
                                <strong>GP:</strong> {asha.gramPanchayat}
                              </>
                            )}
                            {asha.district && (
                              <>
                                <br />
                                <strong>District:</strong> {asha.district}
                              </>
                            )}
                            {asha.pinCode && (
                              <>
                                <br />
                                <strong>PIN:</strong> {asha.pinCode}
                              </>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} className="flex-shrink-0 text-primary" />
                          <span>{asha.phone}</span>
                        </div>

                        {asha.languages && asha.languages.length > 0 && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <LanguagesIcon
                              size={16}
                              className="flex-shrink-0 text-primary"
                            />
                            <span>{asha.languages.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button
                          variant="primary"
                          size="small"
                          icon={Phone}
                          onClick={() => handleCallAsha(asha.phone)}
                        >
                          Call Now
                        </Button>
                        <Button variant="outline" size="small" icon={Calendar}>
                          Book Visit
                        </Button>
                        <Button variant="ghost" size="small" icon={MessageCircle}>
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedDistrict && !isSearching && searchResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-textDark mb-2">
              No ASHA Workers Found
            </h3>
            <p className="text-gray-600 mb-4">
              Try selecting a different location
            </p>
          </div>
        ) : null}

        {/* Info Section */}
        {!selectedDistrict && (
          <div className="mt-12">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-textDark mb-4 text-center">
                About ASHA Workers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-textDark mb-2">Community Link</h3>
                  <p className="text-sm text-gray-600">
                    ASHA workers are your trusted community health workers
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-textDark mb-2">Always Available</h3>
                  <p className="text-sm text-gray-600">
                    Available during working hours for health consultations
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-textDark mb-2">Local Support</h3>
                  <p className="text-sm text-gray-600">
                    Serving your village and surrounding areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default FindAsha;
