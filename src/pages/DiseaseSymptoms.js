import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Activity,
  AlertTriangle,
  ThermometerSun,
  Wind,
  Droplet,
  AlertCircle,
  CheckCircle,
  Heart,
  Brain,
  Stethoscope,
  ArrowLeft,
  Search,
  Info,
} from 'lucide-react';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const DiseaseSymptoms = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // State Management
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [results, setResults] = useState(null);

  // Available Symptoms Database
  const symptomsList = [
    {
      id: 'fever',
      name: 'Fever',
      nameOd: 'ଜ୍ୱର',
      icon: ThermometerSun,
      category: 'general',
    },
    {
      id: 'headache',
      name: 'Headache',
      nameOd: 'ମୁଣ୍ଡବିନ୍ଧା',
      icon: Brain,
      category: 'general',
    },
    {
      id: 'cough',
      name: 'Cough',
      nameOd: 'କାଶ',
      icon: Wind,
      category: 'respiratory',
    },
    {
      id: 'cold',
      name: 'Cold/Runny Nose',
      nameOd: 'ଥଣ୍ଡା/ନାକ ପାଣି',
      icon: Droplet,
      category: 'respiratory',
    },
    {
      id: 'bodyache',
      name: 'Body Ache',
      nameOd: 'ଶରୀର ଯନ୍ତ୍ରଣା',
      icon: Activity,
      category: 'general',
    },
    {
      id: 'fatigue',
      name: 'Fatigue/Weakness',
      nameOd: 'ଥକାପଣ/ଦୁର୍ବଳତା',
      icon: Heart,
      category: 'general',
    },
    {
      id: 'nausea',
      name: 'Nausea/Vomiting',
      nameOd: 'ବାନ୍ତି',
      icon: AlertCircle,
      category: 'digestive',
    },
    {
      id: 'diarrhea',
      name: 'Diarrhea',
      nameOd: 'ଡାଇରିଆ',
      icon: Droplet,
      category: 'digestive',
    },
    {
      id: 'chills',
      name: 'Chills/Shivering',
      nameOd: 'ଥରି',
      icon: ThermometerSun,
      category: 'general',
    },
    {
      id: 'rash',
      name: 'Skin Rash',
      nameOd: 'ଚର୍ମ ଦାଗ',
      icon: AlertCircle,
      category: 'skin',
    },
    {
      id: 'breathing',
      name: 'Breathing Difficulty',
      nameOd: 'ନିଶ୍ୱାସ କଷ୍ଟ',
      icon: Wind,
      category: 'respiratory',
    },
    {
      id: 'chest',
      name: 'Chest Pain',
      nameOd: 'ଛାତି ଯନ୍ତ୍ରଣା',
      icon: Heart,
      category: 'cardiac',
    },
  ];

  // Disease Rules Database (Rule-based AI)
  const diseaseRules = [
    {
      disease: 'Malaria',
      diseaseOd: 'ମ୍ୟାଲେରିଆ',
      symptoms: ['fever', 'headache', 'chills', 'bodyache'],
      minMatch: 3,
      severity: 'high',
      description: 'Mosquito-borne disease common in tropical regions',
      descriptionOd: 'ଟ୍ରପିକାଲ୍ ଅଞ୍ଚଳରେ ସାଧାରଣ ମଶା ଜନିତ ରୋଗ',
      recommendation: 'Immediate blood test for malaria. Visit doctor urgently.',
      recommendationOd: 'ତୁରନ୍ତ ମ୍ୟାଲେରିଆ ପାଇଁ ରକ୍ତ ପରୀକ୍ଷା କରନ୍ତୁ। ଡାକ୍ତରଙ୍କୁ ଦେଖାନ୍ତୁ।',
      preventiveTips: [
        'Use mosquito nets while sleeping',
        'Apply mosquito repellent',
        'Keep surroundings clean and dry',
      ],
      preventiveTipsOd: [
        'ଶୋଇବା ସମୟରେ ମଶା ଜାଲ ବ୍ୟବହାର କରନ୍ତୁ',
        'ମଶା ନିବାରକ ପ୍ରୟୋଗ କରନ୍ତୁ',
        'ପରିବେଶ ପରିଷ୍କାର ଏବଂ ଶୁଷ୍କ ରଖନ୍ତୁ',
      ],
    },
    {
      disease: 'Dengue',
      diseaseOd: 'ଡେଙ୍ଗୁ',
      symptoms: ['fever', 'headache', 'bodyache', 'rash', 'fatigue'],
      minMatch: 3,
      severity: 'high',
      description: 'Viral disease transmitted by Aedes mosquito',
      descriptionOd: 'ଏଡିସ୍ ମଶା ଦ୍ୱାରା ସଂକ୍ରମିତ ଭାଇରାଲ୍ ରୋଗ',
      recommendation: 'Get platelet count checked. Drink plenty of fluids. Immediate medical attention needed.',
      recommendationOd: 'ପ୍ଲେଟଲେଟ୍ ଗଣନା ଯାଞ୍ଚ କରନ୍ତୁ। ଅଧିକ ତରଳ ପିଅନ୍ତୁ। ତୁରନ୍ତ ଚିକିତ୍ସା ଆବଶ୍ୟକ।',
      preventiveTips: [
        'Prevent mosquito breeding around home',
        'Wear full-sleeve clothes',
        'Use mosquito repellent',
      ],
      preventiveTipsOd: [
        'ଘର ଚାରିପାଖରେ ମଶା ପ୍ରଜନନ ରୋକନ୍ତୁ',
        'ପୂର୍ଣ୍ଣ ହାତର ପୋଷାକ ପିନ୍ଧନ୍ତୁ',
        'ମଶା ନିବାରକ ବ୍ୟବହାର କରନ୍ତୁ',
      ],
    },
    {
      disease: 'Tuberculosis (TB)',
      diseaseOd: 'ଯକ୍ଷ୍ମା (TB)',
      symptoms: ['cough', 'fatigue', 'fever', 'chest'],
      minMatch: 2,
      durationCheck: 14, // days
      severity: 'high',
      description: 'Bacterial infection affecting lungs - cough for more than 2 weeks is a warning sign',
      descriptionOd: 'ଫୁସଫୁସକୁ ପ୍ରଭାବିତ କରୁଥିବା ଜୀବାଣୁ ସଂକ୍ରମଣ - ୨ ସପ୍ତାହରୁ ଅଧିକ କାଶ ଏକ ସତର୍କତା ସଙ୍କେତ',
      recommendation: 'URGENT: Get sputum test for TB. Visit nearest health center immediately.',
      recommendationOd: 'ଜରୁରୀ: TB ପାଇଁ ଥୁକ ପରୀକ୍ଷା କରନ୍ତୁ। ତୁରନ୍ତ ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ପରିଦର୍ଶନ କରନ୍ତୁ।',
      preventiveTips: [
        'Cover mouth while coughing',
        'Maintain proper ventilation at home',
        'Complete full TB treatment course if diagnosed',
      ],
      preventiveTipsOd: [
        'କାଶିବା ସମୟରେ ପାଟି ଘୋଡ଼ାନ୍ତୁ',
        'ଘରେ ଉଚିତ ବାୟୁ ସଞ୍ଚାଳନ ବଜାୟ ରଖନ୍ତୁ',
        'ନିର୍ଣ୍ଣୟ ହେଲେ ସମ୍ପୂର୍ଣ୍ଣ TB ଚିକିତ୍ସା ସମାପ୍ତ କରନ୍ତୁ',
      ],
    },
    {
      disease: 'Common Cold/Flu',
      diseaseOd: 'ସାଧାରଣ ଥଣ୍ଡା/ଫ୍ଲୁ',
      symptoms: ['cold', 'cough', 'headache', 'bodyache'],
      minMatch: 2,
      severity: 'low',
      description: 'Viral infection of upper respiratory tract',
      descriptionOd: 'ଉପର ଶ୍ୱାସନଳୀର ଭାଇରାଲ୍ ସଂକ୍ରମଣ',
      recommendation: 'Rest, drink warm fluids, take steam inhalation. Usually resolves in 5-7 days.',
      recommendationOd: 'ବିଶ୍ରାମ ନିଅନ୍ତୁ, ଗରମ ତରଳ ପିଅନ୍ତୁ, ବାଷ୍ପ ନିଅନ୍ତୁ। ସାଧାରଣତଃ ୫-୭ ଦିନରେ ସମାଧାନ ହୁଏ।',
      preventiveTips: [
        'Wash hands frequently',
        'Avoid close contact with sick people',
        'Boost immunity with healthy diet',
      ],
      preventiveTipsOd: [
        'ବାରମ୍ବାର ହାତ ଧୋଇବା',
        'ରୋଗୀ ଲୋକଙ୍କ ସହିତ ନିକଟ ସଂସ୍ପର୍ଶରୁ ଦୂରେଇ ରୁହନ୍ତୁ',
        'ସୁସ୍ଥ ଖାଦ୍ୟ ସହିତ ପ୍ରତିରକ୍ଷା ବୃଦ୍ଧି କରନ୍ତୁ',
      ],
    },
    {
      disease: 'Typhoid',
      diseaseOd: 'ଟାଇଫଏଡ୍',
      symptoms: ['fever', 'headache', 'fatigue', 'diarrhea', 'bodyache'],
      minMatch: 3,
      severity: 'high',
      description: 'Bacterial infection from contaminated food/water',
      descriptionOd: 'ଦୂଷିତ ଖାଦ୍ୟ/ପାଣିରୁ ଜୀବାଣୁ ସଂକ୍ରମଣ',
      recommendation: 'Get Widal test done. Doctor consultation required. Drink only boiled water.',
      recommendationOd: 'ୱିଡାଲ୍ ପରୀକ୍ଷା କରନ୍ତୁ। ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ଆବଶ୍ୟକ। କେବଳ ଫୁଟାଇବା ପାଣି ପିଅନ୍ତୁ।',
      preventiveTips: [
        'Drink safe, boiled water',
        'Maintain hand hygiene',
        'Eat freshly cooked food',
      ],
      preventiveTipsOd: [
        'ସୁରକ୍ଷିତ, ଫୁଟାଇବା ପାଣି ପିଅନ୍ତୁ',
        'ହାତ ସ୍ୱଚ୍ଛତା ବଜାୟ ରଖନ୍ତୁ',
        'ତାଜା ରନ୍ଧା ଖାଦ୍ୟ ଖାଆନ୍ତୁ',
      ],
    },
    {
      disease: 'Gastroenteritis',
      diseaseOd: 'ଗ୍ୟାଷ୍ଟ୍ରୋଏଣ୍ଟେରାଇଟିସ୍',
      symptoms: ['diarrhea', 'nausea', 'fever', 'bodyache'],
      minMatch: 2,
      severity: 'medium',
      description: 'Stomach infection causing diarrhea and vomiting',
      descriptionOd: 'ପେଟ ସଂକ୍ରମଣ ଯାହା ଡାଇରିଆ ଏବଂ ବାନ୍ତି ସୃଷ୍ଟି କରେ',
      recommendation: 'Stay hydrated with ORS. Avoid oily food. See doctor if symptoms persist.',
      recommendationOd: 'ORS ସହିତ ହାଇଡ୍ରେଟେଡ୍ ରୁହନ୍ତୁ। ତେଲିଆ ଖାଦ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ। ଲକ୍ଷଣ ଜାରି ରହିଲେ ଡାକ୍ତର ଦେଖନ୍ତୁ।',
      preventiveTips: [
        'Wash hands before eating',
        'Drink clean water',
        'Avoid street food',
      ],
      preventiveTipsOd: [
        'ଖାଇବା ପୂର୍ବରୁ ହାତ ଧୋଇବା',
        'ପରିଷ୍କାର ପାଣି ପିଅନ୍ତୁ',
        'ରାସ୍ତା ଖାଦ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ',
      ],
    },
  ];

  // Toggle symptom selection
  const toggleSymptom = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  // Analyze symptoms using rule-based AI
  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    const matches = [];

    diseaseRules.forEach((disease) => {
      const matchCount = disease.symptoms.filter((s) =>
        selectedSymptoms.includes(s)
      ).length;

      // Check if minimum symptoms match
      if (matchCount >= disease.minMatch) {
        // Special check for TB - duration matters
        if (disease.disease === 'Tuberculosis (TB)' && selectedSymptoms.includes('cough')) {
          if (parseInt(duration) >= 14) {
            matches.push({
              ...disease,
              matchPercentage: Math.round((matchCount / disease.symptoms.length) * 100),
              matchCount,
            });
          }
        } else {
          matches.push({
            ...disease,
            matchPercentage: Math.round((matchCount / disease.symptoms.length) * 100),
            matchCount,
          });
        }
      }
    });

    // Sort by match percentage
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    setResults(matches);
  };

  // Reset form
  const resetForm = () => {
    setSelectedSymptoms([]);
    setDuration('');
    setSeverity('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-textDark mb-3">
            {language === 'od' ? 'ରୋଗ ଲକ୍ଷଣ ଯାଞ୍ଚକର୍ତ୍ତା' : 'Disease Symptom Checker'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'od'
              ? 'ଆପଣଙ୍କ ଲକ୍ଷଣ ଚିହ୍ନଟ କରନ୍ତୁ ଏବଂ ସମ୍ଭାବ୍ୟ ରୋଗ ବିଷୟରେ ଜାଣନ୍ତୁ'
              : 'Identify your symptoms and learn about possible conditions'}
          </p>

          {/* Disclaimer */}
          <Alert
            type="error"
            message={
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <strong>
                    {language === 'od' ? '⚠️ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଦାବି ପରିତ୍ୟାଗ:' : '⚠️ Important Disclaimer:'}
                  </strong>
                  <p className="mt-1">
                    {language === 'od'
                      ? 'ଏହି ଉପକରଣ ଏକ ଡାକ୍ତରଙ୍କ ବଦଳ ନୁହେଁ। ଏହା କେବଳ ସୂଚନା ଉଦ୍ଦେଶ୍ୟ ପାଇଁ। ଗମ୍ଭୀର ଲକ୍ଷଣ ପାଇଁ, ଦୟାକରି ତୁରନ୍ତ ଏକ ସ୍ୱାସ୍ଥ୍ୟସେବା ପେଶାଦାରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।'
                      : 'This tool is NOT a replacement for a doctor. It is for informational purposes only. For serious symptoms, please consult a healthcare professional immediately.'}
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {!results ? (
          // Symptom Selection Form
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Select Symptoms */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-textDark">
                  {language === 'od' ? 'ଆପଣଙ୍କ ଲକ୍ଷଣ ଚୟନ କରନ୍ତୁ' : 'Select Your Symptoms'}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {symptomsList.map((symptom) => {
                  const Icon = symptom.icon;
                  const isSelected = selectedSymptoms.includes(symptom.id);

                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          className={`w-8 h-8 ${
                            isSelected ? 'text-blue-600' : 'text-gray-400'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium text-center ${
                            isSelected ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          {language === 'od' ? symptom.nameOd : symptom.name}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedSymptoms.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-700 mb-2">
                    {language === 'od' ? 'ଚୟନିତ ଲକ୍ଷଣ:' : 'Selected Symptoms:'}{' '}
                    {selectedSymptoms.length}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((id) => {
                      const symptom = symptomsList.find((s) => s.id === id);
                      return (
                        <span
                          key={id}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {language === 'od' ? symptom.nameOd : symptom.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Duration & Severity */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-textDark mb-4">
                {language === 'od' ? 'ଅତିରିକ୍ତ ସୂଚନା' : 'Additional Information'}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'od' ? 'ଲକ୍ଷଣର ଅବଧି (ଦିନରେ)' : 'Duration of Symptoms (in days)'}
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="input-field"
                    placeholder={language === 'od' ? 'ଉଦାହରଣ: 3' : 'e.g., 3'}
                    min="1"
                  />
                  {selectedSymptoms.includes('cough') && parseInt(duration) >= 14 && (
                    <Alert
                      type="warning"
                      message={
                        language === 'od'
                          ? '⚠️ କାଶ 2 ସପ୍ତାହରୁ ଅଧିକ - TB ପାଇଁ ଯାଞ୍ଚ କରନ୍ତୁ'
                          : '⚠️ Cough for more than 2 weeks - Get checked for TB'
                      }
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'od' ? 'ଗମ୍ଭୀରତା' : 'Severity'}
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="input-field"
                  >
                    <option value="">
                      {language === 'od' ? 'ଚୟନ କରନ୍ତୁ' : 'Select'}
                    </option>
                    <option value="mild">
                      {language === 'od' ? 'ହାଲକା' : 'Mild'}
                    </option>
                    <option value="moderate">
                      {language === 'od' ? 'ମଧ୍ୟମ' : 'Moderate'}
                    </option>
                    <option value="severe">
                      {language === 'od' ? 'ଗମ୍ଭୀର' : 'Severe'}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={() => navigate(-1)}
              >
                {language === 'od' ? 'ପଛକୁ' : 'Back'}
              </Button>
              <Button
                variant="primary"
                icon={Search}
                iconPosition="right"
                onClick={analyzeSymptoms}
                className="flex-1"
                disabled={selectedSymptoms.length === 0}
              >
                {language === 'od' ? 'ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ କରନ୍ତୁ' : 'Analyze Symptoms'}
              </Button>
            </div>
          </div>
        ) : (
          // Results Display
          <div className="max-w-4xl mx-auto space-y-6 animate-slideUp">
            <Alert
              type="info"
              message={
                language === 'od'
                  ? `${results.length} ସମ୍ଭାବ୍ୟ ଅବସ୍ଥା ମିଳିଲା ଆପଣଙ୍କ ଲକ୍ଷଣ ସହିତ`
                  : `Found ${results.length} possible condition(s) matching your symptoms`
              }
            />

            {results.length === 0 ? (
              <div className="card p-12 text-center">
                <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">
                  {language === 'od'
                    ? 'କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ରୋଗ ମେଳ ମିଳିଲା ନାହିଁ'
                    : 'No specific disease match found'}
                </p>
                <p className="text-gray-500">
                  {language === 'od'
                    ? 'ଦୟାକରି ଏକ ସ୍ୱାସ୍ଥ୍ୟସେବା ପେଶାଦାରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ'
                    : 'Please consult a healthcare professional for proper diagnosis'}
                </p>
              </div>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className={`card p-6 border-l-4 ${
                    result.severity === 'high'
                      ? 'border-danger bg-red-50/30'
                      : result.severity === 'medium'
                      ? 'border-warning bg-yellow-50/30'
                      : 'border-success bg-green-50/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-textDark">
                          {language === 'od' ? result.diseaseOd : result.disease}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            result.severity === 'high'
                              ? 'bg-danger text-white'
                              : result.severity === 'medium'
                              ? 'bg-warning text-white'
                              : 'bg-success text-white'
                          }`}
                        >
                          {result.matchPercentage}% {language === 'od' ? 'ମେଳ' : 'Match'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {language === 'od' ? result.descriptionOd : result.description}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-textDark mb-2">
                          {language === 'od' ? 'ସୁପାରିଶ:' : 'Recommendation:'}
                        </h4>
                        <p className="text-gray-700">
                          {language === 'od'
                            ? result.recommendationOd
                            : result.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preventive Tips */}
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-textDark mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {language === 'od' ? 'ନିବାରକ ପରାମର୍ଶ:' : 'Preventive Tips:'}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'od'
                        ? result.preventiveTipsOd
                        : result.preventiveTips
                      ).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" icon={ArrowLeft} onClick={resetForm}>
                {language === 'od' ? 'ନୂଆ ଯାଞ୍ଚ' : 'New Check'}
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/find-asha')}
                className="flex-1"
              >
                {language === 'od' ? 'ASHA କର୍ମୀ ଖୋଜନ୍ତୁ' : 'Find ASHA Worker'}
              </Button>
            </div>

            {/* Emergency Contact */}
            <Alert
              type="error"
              message={
                <div>
                  <strong>
                    {language === 'od' ? 'ଜରୁରୀକାଳୀନ:' : 'Emergency:'}
                  </strong>{' '}
                  {language === 'od'
                    ? 'ଯଦି ଆପଣ ଗୁରୁତର ଲକ୍ଷଣ ଅନୁଭବ କରୁଛନ୍ତି, ତୁରନ୍ତ 108 କୁ କଲ୍ କରନ୍ତୁ କିମ୍ବା ନିକଟସ୍ଥ ହସ୍ପିଟାଲକୁ ଯାଆନ୍ତୁ।'
                    : 'If you are experiencing severe symptoms, call 108 immediately or visit the nearest hospital.'}
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseSymptoms;
