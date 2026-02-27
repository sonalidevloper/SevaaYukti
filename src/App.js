import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import ApplyCard from './pages/ApplyCard';
import FindAsha from './pages/FindAsha';
import AshaLogin from './pages/AshaLogin';
import AshaDashboard from './pages/AshaDashboard';
import About from './pages/About';
import Notices from './pages/Notices';
import OfflineDataCollection from './pages/OfflineDataCollection';
import VaccinationSchedule from './pages/VaccinationSchedule';
import PregnancyCare from './pages/PregnancyCare';
import DiseaseSymptoms from './pages/DiseaseSymptoms';
import EmergencyHelp from './pages/EmergencyHelp';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/apply" element={<ApplyCard />} />
              <Route path="/find-asha" element={<FindAsha />} />
              <Route path="/asha-login" element={<AshaLogin />} />
              <Route path="/asha-dashboard" element={<AshaDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/offline-data" element={<OfflineDataCollection />} />
              <Route path="/vaccination-schedule" element={<VaccinationSchedule />} />
              <Route path="/pregnancy-care" element={<PregnancyCare />} />
              <Route path="/disease-symptoms" element={<DiseaseSymptoms />} />
              <Route path="/emergency-help" element={<EmergencyHelp />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
