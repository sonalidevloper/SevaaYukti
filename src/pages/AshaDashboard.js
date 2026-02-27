import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Users,
  Calendar,
  Syringe,
  AlertTriangle,
  RefreshCw,
  Plus,
  Activity,
  Clock,
  CheckCircle,
  Wifi,
  WifiOff,
  FileText,
  User as UserIcon,
  LogOut,
  Bell,
  Home,
  Baby,
  TrendingUp,
  ClipboardList,
  Phone,
  Truck,
  BookOpen,
  Settings,
  MapPin,
  Search,
  Filter,
  Eye,
  Edit,
  Send,
  Package,
  Video,
  HelpCircle,
  BarChart3,
  Download,
} from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import EmptyState from '../components/EmptyState';
import RegisterPatientModal from '../components/RegisterPatientModal';
import RecordVisitModal from '../components/RecordVisitModal';
import LogVaccinationModal from '../components/LogVaccinationModal';

const AshaDashboard = () => {
  const { t, language, isOffline, setIsOffline } = useLanguage();
  
  // ASHA Worker Profile (Empty - to be filled by backend/user input)
  const [ashaProfile, setAshaProfile] = useState({
    name: '',
    id: '',
    coveredVillages: '',
    photo: null,
    phone: '',
    email: ''
  });

  // UI State
  const [lastSynced, setLastSynced] = useState(null); // null means never synced
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal States
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showVaccinationModal, setShowVaccinationModal] = useState(false);

  // Data State - ALL EMPTY (Backend Ready)
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Patient Handlers
  const handleSavePatient = (patient) => {
    setPatients(prev => [...prev, patient]);
    showToast('Patient registered successfully!');
    setPendingSyncCount(prev => prev + 1);
  };

  // Visit Handlers
  const handleSaveVisit = (visit) => {
    setVisits(prev => [...prev, visit]);
    showToast('Home visit recorded successfully!');
    setPendingSyncCount(prev => prev + 1);
    
    // Update patient's last visit and next visit
    setPatients(prev => prev.map(p => 
      p.id === visit.patientId 
        ? { ...p, lastVisit: visit.visitDate, nextVisit: visit.nextVisitDate }
        : p
    ));
  };

  // Vaccination Handlers
  const handleSaveVaccination = (vaccination) => {
    setVaccinations(prev => [...prev, vaccination]);
    showToast('Vaccination logged successfully!');
    setPendingSyncCount(prev => prev + 1);
  };

  // Sync Handler
  const handleSync = () => {
    setIsSyncing(true);
    // Simulate sync
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced('Just now');
      setPendingSyncCount(0);
      showToast('All data synced successfully!');
    }, 2000);
  };

  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
  };

  // All Empty Data Arrays (Backend Ready) - Must be defined before todayStats
  const vaccinationsDue = [];
  const highRiskCases = [];
  const performanceStats = [];
  const medicineStock = [];
  const recentActivities = [];

  // Today's Overview Stats (Dynamic - shows 0 when no data)
  const todayStats = [
    { label: "Today's Visits", labelOd: 'ଆଜିର ପରିଦର୍ଶନ', value: visits.length, icon: Home, color: 'bg-accent' },
    { label: 'Pending Vaccinations', labelOd: 'ବାକି ଟୀକାକରଣ', value: vaccinationsDue.length, icon: Syringe, color: 'bg-warning' },
    { label: 'High Risk Cases', labelOd: 'ଉଚ୍ଚ ବିପଦ', value: patients.filter(p => p.isHighRisk).length, icon: AlertTriangle, color: 'bg-error' },
    { label: 'Data Pending Sync', labelOd: 'ସିଙ୍କ୍ ବାକି', value: pendingSyncCount, icon: RefreshCw, color: 'bg-primary' },
  ];

  // Quick Actions with handlers
  const quickActions = [
    { title: 'Register New Patient', titleOd: 'ନୂତନ ରୋଗୀ', icon: Plus, color: 'bg-primary', onClick: () => setShowRegisterModal(true) },
    { title: 'Record Home Visit', titleOd: 'ଘର ପରିଦର୍ଶନ', icon: Home, color: 'bg-accent', onClick: () => setShowVisitModal(true) },
    { title: 'Log Vaccination', titleOd: 'ଟୀକାକରଣ', icon: Syringe, color: 'bg-success', onClick: () => setShowVaccinationModal(true) },
    { title: 'Update ANC Visit', titleOd: 'ANC ଅପଡେଟ୍', icon: Baby, color: 'bg-warning', onClick: () => showToast('ANC module coming soon', 'warning') },
    { title: 'Record Child Growth', titleOd: 'ଶିଶୁ ବୃଦ୍ଧି', icon: TrendingUp, color: 'bg-secondary', onClick: () => showToast('Growth module coming soon', 'warning') },
    { title: 'Sync Data Now', titleOd: 'ସିଙ୍କ୍ କରନ୍ତୁ', icon: RefreshCw, color: 'bg-primary', onClick: handleSync },
  ];

  // Filter patients based on search and tab
  let filteredPatients = patients;
  
  if (searchQuery) {
    filteredPatients = filteredPatients.filter(p =>
      p.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mobile?.includes(searchQuery) ||
      p.id?.toString().includes(searchQuery)
    );
  }

  if (activeTab !== 'all') {
    filteredPatients = filteredPatients.filter(p => p.category === activeTab);
  }

  return (
    <div className="min-h-screen bg-cream pb-8">
      {/* Enhanced Dashboard Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          {/* Top Row: Profile & Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              {/* Profile Photo */}
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              
              {/* Profile Info */}
              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  ନମସ୍କାର, {ashaProfile.name || 'ASHA Worker'}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-white/90">
                  <span className="flex items-center gap-1">
                    <FileText size={14} />
                    ID: {ashaProfile.id || 'Not assigned'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {ashaProfile.coveredVillages || 'No villages assigned'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Logout */}
              <Link to="/asha-login">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                  <LogOut size={18} />
                  <span className="hidden md:inline text-sm">Logout</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Sync Status Row */}
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                Last Synced: {lastSynced || 'Never'}
              </span>
              <span className="flex items-center gap-2">
                <FileText size={16} />
                Pending: {pendingSyncCount} records
              </span>
            </div>
            <Button
              variant="ghost"
              size="small"
              icon={RefreshCw}
              onClick={handleSync}
              loading={isSyncing}
              className="!text-white hover:!bg-white/20"
            >
              Sync
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {/* Today's Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {todayStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-textDark">{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'en' ? stat.label : stat.labelOd}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
            <Activity className="text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-all flex flex-col items-center gap-2 text-center`}
              >
                <action.icon size={24} />
                <span className="text-sm font-medium">
                  {language === 'en' ? action.title : action.titleOd}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* My Patients Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-textDark flex items-center gap-2">
              <Users className="text-primary" />
              My Patients
            </h2>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, ID, village..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b">
            {[
              { key: 'all', label: 'All Patients', count: patients.length },
              { key: 'pregnant', label: 'Pregnant Women', count: patients.filter(p => p.category === 'pregnant').length },
              { key: 'children', label: 'Children (0-5)', count: patients.filter(p => p.category === 'children').length },
              { key: 'highrisk', label: 'High-Risk', count: patients.filter(p => p.isHighRisk).length },
              { key: 'recent', label: 'Recent', count: patients.filter(p => p.recent).length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Patient List */}
          <div className="space-y-4">
            {filteredPatients.length === 0 ? (
              <EmptyState
                icon="👥"
                title="No Patients Registered Yet"
                message="Start by registering your first patient to begin tracking their health journey"
                actionButton="Register Patient"
                onAction={() => setShowRegisterModal(true)}
                type="default"
              />
            ) : (
              filteredPatients.map((patient) => (
                <div key={patient.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Photo */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {patient.photo ? (
                        <img src={patient.photo} alt={patient.fullName} className="w-full h-full rounded-lg object-cover" />
                      ) : (
                        <UserIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-textDark">{patient.fullName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                        <span>Age: {patient.age}</span>
                        <span>Village: {patient.village}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          {patient.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Next Visit: {patient.nextVisit}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="primary" size="small" icon={Eye} onClick={() => showToast('Patient profile coming soon', 'warning')}>
                        View
                      </Button>
                      <Button variant="outline" size="small" icon={ClipboardList} onClick={() => setShowVisitModal(true)}>
                        Visit
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Vaccination Due */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Syringe className="text-warning" />
              Vaccination Due
            </h2>
            {vaccinationsDue.length === 0 ? (
              <EmptyState
                iconComponent={Syringe}
                title="No Pending Vaccinations"
                message="All children are up-to-date with their vaccinations"
                type="success"
                size="small"
              />
            ) : (
              <div className="space-y-3">
                {vaccinationsDue.map((vac, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      vac.status === 'overdue'
                        ? 'bg-error/5 border-error'
                        : vac.status === 'thisweek'
                        ? 'bg-warning/5 border-warning'
                        : 'bg-accent/5 border-accent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-textDark">{vac.child}</h4>
                        <p className="text-sm text-gray-600">Age: {vac.age}</p>
                        <p className="text-sm font-medium mt-1">{vac.vaccine}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {vac.dueDate}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="small" icon={Send} className="flex-1">
                        Remind
                      </Button>
                      <Button variant="primary" size="small" icon={CheckCircle} className="flex-1">
                        Done
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* High-Risk Cases */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <AlertTriangle className="text-error" />
              High-Risk Cases
            </h2>
            {highRiskCases.length === 0 ? (
              <EmptyState
                iconComponent={CheckCircle}
                title="No High-Risk Cases"
                message="Great! No urgent cases requiring attention at the moment"
                type="success"
                size="small"
              />
            ) : (
              <>
                <div className="bg-error/5 border-l-4 border-error p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-error flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Urgent Attention Required
                  </h3>
                </div>
                <div className="space-y-3">
                  {highRiskCases.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <item.icon className="text-error flex-shrink-0" size={20} />
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
            <BarChart3 className="text-primary" />
            My Performance (Monthly)
          </h2>
          {performanceStats.length === 0 ? (
            <EmptyState
              iconComponent={BarChart3}
              title="No Performance Data Yet"
              message="Your performance statistics will appear here once you start recording visits and activities"
              type="default"
              size="small"
            />
          ) : (
            <div className="space-y-4">
              {performanceStats.map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">{stat.label}</span>
                    <span className="font-bold text-primary">
                      {stat.value}/{stat.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${(stat.value / stat.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Medicine & Stock */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
              <Package className="text-secondary" />
              Medicine Stock
            </h2>
            {medicineStock.length === 0 ? (
              <EmptyState
                iconComponent={Package}
                title="No Stock Data"
                message="Medicine inventory information will appear here"
                actionButton="Request Supplies"
                onAction={() => showToast('Stock management coming soon', 'warning')}
                type="default"
                size="small"
              />
            ) : (
              <>
                <div className="space-y-3">
                  {medicineStock.map((med, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{med.name}</span>
                      <span className={`font-bold ${med.low ? 'text-error' : 'text-success'}`}>
                        {med.count}
                        {med.low && ' ⚠️'}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" fullWidth className="mt-4" icon={Package}>
                  Request Supplies
                </Button>
              </>
            )}
          </div>

          {/* Emergency & Support */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
              <Phone className="text-error" />
              Emergency
            </h2>
            <div className="space-y-2">
              <Button variant="primary" fullWidth icon={Truck} className="!bg-error hover:!bg-error/90">
                Ambulance (108)
              </Button>
              <Button variant="outline" fullWidth icon={Phone}>
                PHC Contact
              </Button>
              <Button variant="outline" fullWidth icon={Phone}>
                Medical Officer
              </Button>
              <Button variant="outline" fullWidth icon={HelpCircle}>
                Helpline
              </Button>
            </div>
          </div>

          {/* Knowledge Resources */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
              <BookOpen className="text-accent" />
              Resources
            </h2>
            <div className="space-y-2">
              <Button variant="outline" fullWidth icon={FileText}>
                Treatment Protocols
              </Button>
              <Button variant="outline" fullWidth icon={Download}>
                Disease Guidelines
              </Button>
              <Button variant="outline" fullWidth icon={Video}>
                Video Tutorials
              </Button>
              <Button variant="outline" fullWidth icon={HelpCircle}>
                FAQs (Odia)
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-primary/10 rounded-lg transition-colors">
              <Users className="text-primary" />
              <span className="text-xs font-medium">Patients</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-primary/10 rounded-lg transition-colors">
              <ClipboardList className="text-primary" />
              <span className="text-xs font-medium">Forms</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-primary/10 rounded-lg transition-colors">
              <Bell className="text-primary" />
              <span className="text-xs font-medium">Alerts</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-primary/10 rounded-lg transition-colors">
              <BarChart3 className="text-primary" />
              <span className="text-xs font-medium">Reports</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-primary/10 rounded-lg transition-colors">
              <Settings className="text-primary" />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RegisterPatientModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSave={handleSavePatient}
      />

      <RecordVisitModal
        isOpen={showVisitModal}
        onClose={() => setShowVisitModal(false)}
        onSave={handleSaveVisit}
        patients={patients}
      />

      <LogVaccinationModal
        isOpen={showVaccinationModal}
        onClose={() => setShowVaccinationModal(false)}
        onSave={handleSaveVaccination}
        patients={patients}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default AshaDashboard;
