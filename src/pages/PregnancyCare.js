import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  Calendar,
  Apple,
  AlertTriangle,
  Bell,
  Pill,
  Baby,
  Activity,
  CheckCircle,
  Clock,
  Utensils,
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Droplet,
} from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const PregnancyCare = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // State Management
  const [step, setStep] = useState(1); // 1: Input, 2: Care Plan Display
  const [motherName, setMotherName] = useState('');
  const [lmpDate, setLmpDate] = useState(''); // Last Menstrual Period
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentMonth, setCurrentMonth] = useState(null);
  const [edd, setEdd] = useState(''); // Expected Delivery Date
  const [selectedTab, setSelectedTab] = useState('guidance'); // guidance, diet, danger, anc, supplements
  const [reminderEnabled, setReminderEnabled] = useState(false);

  // Month-wise Pregnancy Guidance
  const pregnancyGuidance = [
    {
      month: 1,
      monthOd: '୧ମ ମାସ',
      title: 'First Month - Conception & Early Development',
      titleOd: 'ପ୍ରଥମ ମାସ - ଗର୍ଭଧାରଣ ଏବଂ ପ୍ରାରମ୍ଭିକ ବିକାଶ',
      guidance: [
        'Take folic acid supplements (400-800 mcg daily)',
        'Avoid alcohol, smoking, and harmful medications',
        'Get adequate rest and sleep',
        'Stay hydrated - drink 8-10 glasses of water',
      ],
      guidanceOd: [
        'ଫୋଲିକ୍ ଏସିଡ୍ ସପ୍ଲିମେଣ୍ଟ ନିଅନ୍ତୁ (ପ୍ରତିଦିନ ୪୦୦-୮୦୦ mcg)',
        'ମଦ୍ୟପାନ, ଧୂମପାନ ଏବଂ କ୍ଷତିକାରକ ଔଷଧରୁ ଦୂରେଇ ରୁହନ୍ତୁ',
        'ପର୍ଯ୍ୟାପ୍ତ ବିଶ୍ରାମ ଏବଂ ନିଦ ନିଅନ୍ତୁ',
        'ହାଇଡ୍ରେଟେଡ୍ ରୁହନ୍ତୁ - ୮-୧୦ ଗ୍ଲାସ୍ ପାଣି ପିଅନ୍ତୁ',
      ],
      symptoms: 'Missed period, mild cramping, breast tenderness',
      symptomsOd: 'ମିସ୍ ପିରିୟଡ୍, ହାଲକା କ୍ରାମ୍ପିଂ, ସ୍ତନ କୋମଳତା',
    },
    {
      month: 2,
      monthOd: '୨ୟ ମାସ',
      title: 'Second Month - Major Organ Formation',
      titleOd: 'ଦ୍ୱିତୀୟ ମାସ - ମୁଖ୍ୟ ଅଙ୍ଗ ଗଠନ',
      guidance: [
        'Continue folic acid and prenatal vitamins',
        'Eat small, frequent meals to manage nausea',
        'Register for antenatal care',
        'Avoid heavy lifting and strenuous exercise',
      ],
      guidanceOd: [
        'ଫୋଲିକ୍ ଏସିଡ୍ ଏବଂ ପ୍ରସବପୂର୍ବ ଭିଟାମିନ୍ ଜାରି ରଖନ୍ତୁ',
        'ବାନ୍ତି ପରିଚାଳନା ପାଇଁ ଛୋଟ, ବାରମ୍ବାର ଖାଦ୍ୟ ଖାଆନ୍ତୁ',
        'ପ୍ରସବପୂର୍ବ ଯତ୍ନ ପାଇଁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
        'ଭାରୀ ଉଠାଇବା ଏବଂ କଠିନ ବ୍ୟାୟାମରୁ ଦୂରେଇ ରୁହନ୍ତୁ',
      ],
      symptoms: 'Morning sickness, fatigue, frequent urination',
      symptomsOd: 'ସକାଳ ରୋଗ, ଥକାପଣ, ବାରମ୍ବାର ପରିସ୍ରା',
    },
    {
      month: 3,
      monthOd: '୩ୟ ମାସ',
      title: 'Third Month - End of First Trimester',
      titleOd: 'ତୃତୀୟ ମାସ - ପ୍ରଥମ ତ୍ରୈମାସିକର ସମାପ୍ତି',
      guidance: [
        'First ultrasound scan',
        'Blood tests for infections and blood type',
        'Continue balanced diet with protein',
        'Light exercises like walking recommended',
      ],
      guidanceOd: [
        'ପ୍ରଥମ ଅଲଟ୍ରାସାଉଣ୍ଡ ସ୍କାନ',
        'ସଂକ୍ରମଣ ଏବଂ ରକ୍ତ ପ୍ରକାର ପାଇଁ ରକ୍ତ ପରୀକ୍ଷା',
        'ପ୍ରୋଟିନ୍ ସହିତ ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଜାରି ରଖନ୍ତୁ',
        'ଚାଲିବା ଭଳି ହାଲୁକା ବ୍ୟାୟାମ ସୁପାରିଶ କରାଯାଏ',
      ],
      symptoms: 'Nausea subsiding, increased energy',
      symptomsOd: 'ବାନ୍ତି କମିବା, ଶକ୍ତି ବୃଦ୍ଧି',
    },
    {
      month: 4,
      monthOd: '୪ର୍ଥ ମାସ',
      title: 'Fourth Month - Second Trimester Begins',
      titleOd: 'ଚତୁର୍ଥ ମାସ - ଦ୍ୱିତୀୟ ତ୍ରୈମାସିକ ଆରମ୍ଭ',
      guidance: [
        'Start iron and calcium supplements',
        'Baby bump becomes visible',
        'Feel baby movements (quickening)',
        'Attend antenatal classes',
      ],
      guidanceOd: [
        'ଲୌହ ଏବଂ କ୍ୟାଲସିୟମ୍ ସପ୍ଲିମେଣ୍ଟ ଆରମ୍ଭ କରନ୍ତୁ',
        'ଶିଶୁ ବମ୍ପ ଦୃଶ୍ୟମାନ ହୁଏ',
        'ଶିଶୁର ଗତିବିଧି ଅନୁଭବ କରନ୍ତୁ',
        'ପ୍ରସବପୂର୍ବ କକ୍ଷାରେ ଯୋଗ ଦିଅନ୍ତୁ',
      ],
      symptoms: 'Feeling baby move, reduced nausea',
      symptomsOd: 'ଶିଶୁର ଗତିବିଧି ଅନୁଭବ, ବାନ୍ତି କମ',
    },
    {
      month: 5,
      monthOd: '୫ମ ମାସ',
      title: 'Fifth Month - Mid-Pregnancy',
      titleOd: 'ପଞ୍ଚମ ମାସ - ମଧ୍ୟ ଗର୍ଭଧାରଣ',
      guidance: [
        'Anomaly scan (detailed ultrasound)',
        'Increase calorie intake (300-500 extra calories)',
        'Monitor weight gain',
        'Pelvic floor exercises',
      ],
      guidanceOd: [
        'ଅସଙ୍ଗତି ସ୍କାନ (ବିସ୍ତୃତ ଅଲଟ୍ରାସାଉଣ୍ଡ)',
        'କ୍ୟାଲୋରୀ ଗ୍ରହଣ ବୃଦ୍ଧି କରନ୍ତୁ (୩୦୦-୫୦୦ ଅତିରିକ୍ତ)',
        'ଓଜନ ବୃଦ୍ଧି ନିରୀକ୍ଷଣ କରନ୍ତୁ',
        'ପେଲଭିକ୍ ଫ୍ଲୋର ବ୍ୟାୟାମ',
      ],
      symptoms: 'Strong baby movements, back pain',
      symptomsOd: 'ଶକ୍ତିଶାଳୀ ଶିଶୁ ଗତିବିଧି, ପିଠି ଯନ୍ତ୍ରଣା',
    },
    {
      month: 6,
      monthOd: '୬ଷ୍ଠ ମାସ',
      title: 'Sixth Month - Rapid Growth',
      titleOd: 'ଷଷ୍ଠ ମାସ - ଦ୍ରୁତ ବୃଦ୍ଧି',
      guidance: [
        'Continue iron supplements',
        'Sleep on left side for better blood flow',
        'Watch for swelling in hands and feet',
        'Stay active but rest when needed',
      ],
      guidanceOd: [
        'ଲୌହ ସପ୍ଲିମେଣ୍ଟ ଜାରି ରଖନ୍ତୁ',
        'ଉନ୍ନତ ରକ୍ତ ପ୍ରବାହ ପାଇଁ ବାମ ପାର୍ଶ୍ୱରେ ଶୋଅନ୍ତୁ',
        'ହାତ ଏବଂ ପାଦରେ ଫୁଲା ପାଇଁ ଦେଖନ୍ତୁ',
        'ସକ୍ରିୟ ରୁହନ୍ତୁ କିନ୍ତୁ ଆବଶ୍ୟକ ସମୟରେ ବିଶ୍ରାମ ନିଅନ୍ତୁ',
      ],
      symptoms: 'Leg cramps, heartburn, back pain',
      symptomsOd: 'ଗୋଡ଼ କ୍ରାମ୍ପ, ହାର୍ଟବର୍ନ, ପିଠି ଯନ୍ତ୍ରଣା',
    },
    {
      month: 7,
      monthOd: '୭ମ ମାସ',
      title: 'Seventh Month - Third Trimester',
      titleOd: 'ସପ୍ତମ ମାସ - ତୃତୀୟ ତ୍ରୈମାସିକ',
      guidance: [
        'More frequent antenatal visits',
        'Monitor baby movements daily',
        'Prepare hospital bag',
        'Learn breathing techniques for labor',
      ],
      guidanceOd: [
        'ଅଧିକ ବାରମ୍ବାର ପ୍ରସବପୂର୍ବ ପରିଦର୍ଶନ',
        'ପ୍ରତିଦିନ ଶିଶୁର ଗତିବିଧି ନିରୀକ୍ଷଣ କରନ୍ତୁ',
        'ହସ୍ପିଟାଲ ବ୍ୟାଗ ପ୍ରସ୍ତୁତ କରନ୍ତୁ',
        'ପ୍ରସବ ପାଇଁ ନିଶ୍ୱାସ କୌଶଳ ଶିଖନ୍ତୁ',
      ],
      symptoms: 'Shortness of breath, frequent urination',
      symptomsOd: 'ନିଶ୍ୱାସ ପ୍ରଶ୍ୱାସରେ କଷ୍ଟ, ବାରମ୍ବାର ପରିସ୍ରା',
    },
    {
      month: 8,
      monthOd: '୮ମ ମାସ',
      title: 'Eighth Month - Preparing for Birth',
      titleOd: 'ଅଷ୍ଟମ ମାସ - ଜନ୍ମ ପାଇଁ ପ୍ରସ୍ତୁତି',
      guidance: [
        'Weekly antenatal check-ups begin',
        'Discuss birth plan with doctor',
        'Stock up on baby essentials',
        'Watch for signs of premature labor',
      ],
      guidanceOd: [
        'ସାପ୍ତାହିକ ପ୍ରସବପୂର୍ବ ଯାଞ୍ଚ ଆରମ୍ଭ',
        'ଡାକ୍ତରଙ୍କ ସହ ଜନ୍ମ ଯୋଜନା ଆଲୋଚନା କରନ୍ତୁ',
        'ଶିଶୁ ଜରୁରୀ ଜିନିଷ ଷ୍ଟକ୍ କରନ୍ତୁ',
        'ସମୟପୂର୍ବ ପ୍ରସବର ଲକ୍ଷଣ ଦେଖନ୍ତୁ',
      ],
      symptoms: 'Braxton Hicks contractions, fatigue',
      symptomsOd: 'ବ୍ରାକ୍ସଟନ୍ ହିକ୍ସ ସଂକୋଚନ, ଥକାପଣ',
    },
    {
      month: 9,
      monthOd: '୯ମ ମାସ',
      title: 'Ninth Month - Almost There!',
      titleOd: 'ନବମ ମାସ - ପ୍ରାୟ ସେଠାରେ!',
      guidance: [
        'Watch for labor signs (water breaking, contractions)',
        'Keep hospital bag ready',
        'Rest as much as possible',
        'Final preparations for baby arrival',
      ],
      guidanceOd: [
        'ପ୍ରସବ ଲକ୍ଷଣ ଦେଖନ୍ତୁ (ଜଳ ଭାଙ୍ଗିବା, ସଂକୋଚନ)',
        'ହସ୍ପିଟାଲ ବ୍ୟାଗ ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ',
        'ଯଥାସମ୍ଭବ ବିଶ୍ରାମ ନିଅନ୍ତୁ',
        'ଶିଶୁ ଆଗମନ ପାଇଁ ଅନ୍ତିମ ପ୍ରସ୍ତୁତି',
      ],
      symptoms: 'Lightning (baby drops), nesting instinct',
      symptomsOd: 'ଲାଇଟନିଂ (ଶିଶୁ ତଳକୁ ଖସିବା), ବସା ବନାଇବା ପ୍ରବୃତ୍ତି',
    },
  ];

  // Diet Suggestions
  const dietGuidance = [
    {
      category: 'Proteins',
      categoryOd: 'ପ୍ରୋଟିନ୍',
      foods: 'Dal, Eggs, Fish, Chicken, Paneer, Milk, Yogurt',
      foodsOd: 'ଡାଲି, ଅଣ୍ଡା, ମାଛ, ମୁରୁଗା, ପନିର, କ୍ଷୀର, ଦହି',
      benefit: 'Essential for baby\'s growth and tissue development',
      benefitOd: 'ଶିଶୁର ବୃଦ୍ଧି ଏବଂ ଟିସୁ ବିକାଶ ପାଇଁ ଜରୁରୀ',
      servings: '3-4 servings daily',
    },
    {
      category: 'Iron-Rich Foods',
      categoryOd: 'ଲୌହ ସମୃଦ୍ଧ ଖାଦ୍ୟ',
      foods: 'Spinach, Beetroot, Jaggery, Dates, Pomegranate',
      foodsOd: 'ପାଳଙ୍ଗ, ବିଟ୍, ଗୁଡ଼, ଖଜୁରୀ, ଡାଳିମ୍ବ',
      benefit: 'Prevents anemia, increases hemoglobin',
      benefitOd: 'ରକ୍ତହୀନତା ରୋକିବା, ହିମୋଗ୍ଲୋବିନ୍ ବୃଦ୍ଧି',
      servings: 'Daily intake',
    },
    {
      category: 'Calcium Sources',
      categoryOd: 'କ୍ୟାଲସିୟମ୍ ଉତ୍ସ',
      foods: 'Milk, Cheese, Ragi, Sesame Seeds, Green Leafy Vegetables',
      foodsOd: 'କ୍ଷୀର, ଚିଜ୍, ରାଗୀ, ତେଲ, ସବୁଜ ପତ୍ରଯୁକ୍ତ ପରିବା',
      benefit: 'Bone development for baby',
      benefitOd: 'ଶିଶୁ ପାଇଁ ହାଡ଼ ବିକାଶ',
      servings: '3-4 servings daily',
    },
    {
      category: 'Fruits & Vegetables',
      categoryOd: 'ଫଳ ଏବଂ ପରିବା',
      foods: 'Oranges, Apples, Bananas, Carrots, Tomatoes, Broccoli',
      foodsOd: 'କମଳା, ଆପଲ୍, କଦଳୀ, ଗାଜର, ଟମାଟୋ, ବ୍ରୋକୋଲି',
      benefit: 'Vitamins, minerals, and fiber',
      benefitOd: 'ଭିଟାମିନ୍, ମିନେରାଲ୍ ଏବଂ ଫାଇବର',
      servings: '5-7 servings daily',
    },
    {
      category: 'Whole Grains',
      categoryOd: 'ପୂର୍ଣ୍ଣ ଶସ୍ୟ',
      foods: 'Brown Rice, Wheat, Oats, Millets',
      foodsOd: 'ବ୍ରାଉନ୍ ଚାଉଳ, ଗହମ, ଓଟସ୍, ବାଜରା',
      benefit: 'Energy and fiber',
      benefitOd: 'ଶକ୍ତି ଏବଂ ଫାଇବର',
      servings: '6-8 servings daily',
    },
    {
      category: 'Hydration',
      categoryOd: 'ହାଇଡ୍ରେସନ୍',
      foods: 'Water, Coconut Water, Buttermilk, Fresh Juices',
      foodsOd: 'ପାଣି, ନଡ଼ିଆ ପାଣି, ଘୋଲ, ତାଜା ରସ',
      benefit: 'Prevents dehydration and constipation',
      benefitOd: 'ଡିହାଇଡ୍ରେସନ୍ ଏବଂ କବଜ ରୋକିବା',
      servings: '8-12 glasses daily',
    },
  ];

  // Danger Signs
  const dangerSigns = [
    {
      sign: 'Severe Abdominal Pain',
      signOd: 'ଗୁରୁତର ପେଟ ଯନ୍ତ୍ରଣା',
      description: 'Sharp, persistent pain that doesn\'t go away',
      descriptionOd: 'ତୀକ୍ଷ୍ଣ, ସ୍ଥାୟୀ ଯନ୍ତ୍ରଣା ଯାହା ଚାଲିଯାଏ ନାହିଁ',
      action: 'Contact doctor immediately',
      severity: 'high',
    },
    {
      sign: 'Heavy Vaginal Bleeding',
      signOd: 'ଭାରୀ ଯୋନୀ ରକ୍ତସ୍ରାବ',
      description: 'More than spotting, with or without pain',
      descriptionOd: 'ସ୍ପଟିଂରୁ ଅଧିକ, ଯନ୍ତ୍ରଣା ସହିତ କିମ୍ବା ବିନା',
      action: 'Rush to hospital',
      severity: 'high',
    },
    {
      sign: 'Severe Headache with Blurred Vision',
      signOd: 'ଅସ୍ପଷ୍ଟ ଦୃଷ୍ଟି ସହିତ ଗୁରୁତର ମୁଣ୍ଡବିନ୍ଧା',
      description: 'Could indicate pre-eclampsia',
      descriptionOd: 'ପ୍ରି-ଏକ୍ଲାମ୍ପସିଆ ସୂଚାଇପାରେ',
      action: 'Immediate medical attention',
      severity: 'high',
    },
    {
      sign: 'Reduced Baby Movements',
      signOd: 'ଶିଶୁର ଗତିବିଧି କମ',
      description: 'Less than 10 movements in 2 hours after 28 weeks',
      descriptionOd: '୨୮ ସପ୍ତାହ ପରେ ୨ ଘଣ୍ଟାରେ ୧୦ରୁ କମ ଗତିବିଧି',
      action: 'Contact doctor same day',
      severity: 'high',
    },
    {
      sign: 'Water Breaking Before 37 Weeks',
      signOd: '୩୭ ସପ୍ତାହ ପୂର୍ବରୁ ଜଳ ଭାଙ୍ଗିବା',
      description: 'Leaking amniotic fluid',
      descriptionOd: 'ଆମନିଓଟିକ୍ ତରଳ ଲିକ୍',
      action: 'Go to hospital immediately',
      severity: 'high',
    },
    {
      sign: 'Severe Vomiting & Unable to Keep Food Down',
      signOd: 'ଗୁରୁତର ବାନ୍ତି ଏବଂ ଖାଦ୍ୟ ରଖିବାରେ ଅସମର୍ଥ',
      description: 'Signs of hyperemesis gravidarum',
      descriptionOd: 'ହାଇପରମେସିସ୍ ଗ୍ରାଭିଡାରମ୍ ର ଲକ୍ଷଣ',
      action: 'Seek medical help',
      severity: 'medium',
    },
    {
      sign: 'Sudden Swelling of Face, Hands, or Feet',
      signOd: 'ମୁହଁ, ହାତ, କିମ୍ବା ପାଦର ହଠାତ୍ ଫୁଲା',
      description: 'May indicate high blood pressure',
      descriptionOd: 'ଉଚ୍ଚ ରକ୍ତଚାପ ସୂଚାଇପାରେ',
      action: 'Contact doctor',
      severity: 'medium',
    },
    {
      sign: 'Fever Above 100.4°F (38°C)',
      signOd: '୧୦୦.୪°F (୩୮°C) ରୁ ଅଧିକ ଜ୍ୱର',
      description: 'Could be infection',
      descriptionOd: 'ସଂକ୍ରମଣ ହୋଇପାରେ',
      action: 'Contact doctor',
      severity: 'medium',
    },
  ];

  // ANC Visit Schedule
  const ancSchedule = [
    { week: '8-12', visit: 1, visitOd: '୧', tests: 'Registration, Blood tests, BP, Weight, Urine test', testsOd: 'ପଞ୍ଜୀକରଣ, ରକ୍ତ ପରୀକ୍ଷା, BP, ଓଜନ, ପରିସ୍ରା ପରୀକ୍ଷା' },
    { week: '14-16', visit: 2, visitOd: '୨', tests: 'BP, Weight, Urine test, Baby heartbeat', testsOd: 'BP, ଓଜନ, ପରିସ୍ରା ପରୀକ୍ଷା, ଶିଶୁ ହୃଦସ୍ପନ୍ଦନ' },
    { week: '18-20', visit: 3, visitOd: '୩', tests: 'Anomaly scan, BP, Weight', testsOd: 'ଅସଙ୍ଗତି ସ୍କାନ, BP, ଓଜନ' },
    { week: '24-28', visit: 4, visitOd: '୪', tests: 'BP, Weight, Glucose test, Urine test', testsOd: 'BP, ଓଜନ, ଗ୍ଲୁକୋଜ ପରୀକ୍ଷା, ପରିସ୍ରା ପରୀକ୍ଷା' },
    { week: '32', visit: 5, visitOd: '୫', tests: 'BP, Weight, Baby position check', testsOd: 'BP, ଓଜନ, ଶିଶୁ ସ୍ଥିତି ଯାଞ୍ଚ' },
    { week: '36', visit: 6, visitOd: '୬', tests: 'BP, Weight, Prepare birth plan', testsOd: 'BP, ଓଜନ, ଜନ୍ମ ଯୋଜନା ପ୍ରସ୍ତୁତ କରନ୍ତୁ' },
    { week: '38', visit: 7, visitOd: '୭', tests: 'BP, Weight, Internal examination', testsOd: 'BP, ଓଜନ, ଆଭ୍ୟନ୍ତରୀଣ ପରୀକ୍ଷା' },
    { week: '40', visit: 8, visitOd: '୮', tests: 'BP, Weight, Discuss delivery', testsOd: 'BP, ଓଜନ, ପ୍ରସବ ଆଲୋଚନା' },
  ];

  // Supplement Schedule
  const supplementSchedule = [
    {
      supplement: 'Folic Acid',
      supplementOd: 'ଫୋଲିକ୍ ଏସିଡ୍',
      dose: '400-800 mcg daily',
      doseOd: 'ପ୍ରତିଦିନ ୪୦୦-୮୦୦ mcg',
      duration: 'Before conception to 12 weeks',
      durationOd: 'ଗର୍ଭଧାରଣ ପୂର୍ବରୁ ୧୨ ସପ୍ତାହ ପର୍ଯ୍ୟନ୍ତ',
      benefit: 'Prevents neural tube defects',
      benefitOd: 'ସ୍ନାୟୁ ନଳୀ ତ୍ରୁଟି ରୋକିବା',
    },
    {
      supplement: 'Iron',
      supplementOd: 'ଲୌହ',
      dose: '100 mg daily',
      doseOd: 'ପ୍ରତିଦିନ ୧୦୦ mg',
      duration: 'From 14 weeks until delivery',
      durationOd: '୧୪ ସପ୍ତାହରୁ ପ୍ରସବ ପର୍ଯ୍ୟନ୍ତ',
      benefit: 'Prevents anemia, supports baby growth',
      benefitOd: 'ରକ୍ତହୀନତା ରୋକିବା, ଶିଶୁ ବୃଦ୍ଧି ସମର୍ଥନ',
    },
    {
      supplement: 'Calcium',
      supplementOd: 'କ୍ୟାଲସିୟମ୍',
      dose: '500 mg twice daily',
      doseOd: 'ଦିନକୁ ଦୁଇଥର ୫୦୦ mg',
      duration: 'From 20 weeks until delivery',
      durationOd: '୨୦ ସପ୍ତାହରୁ ପ୍ରସବ ପର୍ଯ୍ୟନ୍ତ',
      benefit: 'Bone development, prevents eclampsia',
      benefitOd: 'ହାଡ଼ ବିକାଶ, ଏକ୍ଲାମ୍ପସିଆ ରୋକିବା',
    },
    {
      supplement: 'Vitamin D',
      supplementOd: 'ଭିଟାମିନ୍ D',
      dose: '400-600 IU daily',
      doseOd: 'ପ୍ରତିଦିନ ୪୦୦-୬୦୦ IU',
      duration: 'Throughout pregnancy',
      durationOd: 'ସମଗ୍ର ଗର୍ଭଧାରଣ ସମୟରେ',
      benefit: 'Bone health, immune support',
      benefitOd: 'ହାଡ଼ ସ୍ୱାସ୍ଥ୍ୟ, ପ୍ରତିରକ୍ଷା ସମର୍ଥନ',
    },
  ];

  // Calculate pregnancy details from LMP
  const calculatePregnancy = () => {
    const lmp = new Date(lmpDate);
    const today = new Date();
    const daysDiff = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(daysDiff / 7);
    const months = Math.floor(weeks / 4.33);

    // Calculate EDD (280 days from LMP)
    const eddDate = new Date(lmp);
    eddDate.setDate(eddDate.getDate() + 280);

    return {
      weeks,
      months: months > 0 ? months : 1,
      edd: eddDate.toLocaleDateString('en-IN'),
    };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motherName || !lmpDate || !phoneNumber) {
      alert('Please fill all required fields');
      return;
    }

    const pregDetails = calculatePregnancy();
    setCurrentMonth(pregDetails.months);
    setEdd(pregDetails.edd);
    setStep(2);
  };

  // Enable reminders
  const handleEnableReminders = () => {
    setReminderEnabled(true);
    alert(`Reminders enabled! You will receive SMS notifications for:\n- ANC visits\n- Iron/Calcium supplements\n- Important milestones\n\nNotifications will be sent to ${phoneNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-textDark mb-3">
            {language === 'od' ? 'ଗର୍ଭଧାରଣ ଯତ୍ନ' : 'Pregnancy Care'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'od'
              ? 'ମାସ-ଅନୁଯାୟୀ ମାର୍ଗଦର୍ଶନ, ଖାଦ୍ୟ ପରାମର୍ଶ ଏବଂ ସ୍ମାର୍ଟ ରିମାଇଣ୍ଡର୍'
              : 'Month-wise guidance, diet suggestions, and smart reminders for a healthy pregnancy'}
          </p>
        </div>

        {/* Step 1: Input Form */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="card p-8 animate-slideUp">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-8 h-8 text-pink-500" />
                <h2 className="text-2xl font-bold text-textDark">
                  {language === 'od' ? 'ମାତା ବିବରଣୀ' : 'Mother Information'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label={language === 'od' ? 'ମାତାଙ୍କ ନାମ' : 'Mother Name'}
                  required
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder={language === 'od' ? 'ନାମ ଲେଖନ୍ତୁ' : 'Enter name'}
                />

                <InputField
                  label={language === 'od' ? 'ଶେଷ ମାସିକ ତାରିଖ (LMP)' : 'Last Menstrual Period (LMP)'}
                  type="date"
                  required
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />

                <InputField
                  label={language === 'od' ? 'ଫୋନ୍ ନମ୍ବର' : 'Phone Number'}
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                />

                <Alert
                  type="info"
                  message={
                    language === 'od'
                      ? 'ଆମେ ଆପଣଙ୍କୁ ANC ଭିଜିଟ୍ ଏବଂ ସପ୍ଲିମେଣ୍ଟ ରିମାଇଣ୍ଡର୍ ପଠାଇବୁ'
                      : 'We will send you ANC visit and supplement reminders via SMS'
                  }
                />

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    icon={ArrowLeft}
                    onClick={() => navigate(-1)}
                  >
                    {language === 'od' ? 'ପଛକୁ' : 'Back'}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="flex-1"
                  >
                    {language === 'od' ? 'ଯତ୍ନ ଯୋଜନା ଦେଖନ୍ତୁ' : 'View Care Plan'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Care Plan Display */}
        {step === 2 && (
          <div className="animate-slideUp space-y-6">
            {/* Mother Info Card */}
            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-textDark">{motherName}</h3>
                    <p className="text-gray-600">
                      {language === 'od' ? 'ଗର୍ଭଧାରଣ' : 'Pregnancy'}: {language === 'od' ? `${currentMonth} ମାସ` : `Month ${currentMonth}`}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {language === 'od' ? 'ପ୍ରସବ ତାରିଖ' : 'Expected Delivery'}: {edd}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {!reminderEnabled ? (
                    <Button
                      variant="primary"
                      icon={Bell}
                      onClick={handleEnableReminders}
                    >
                      {language === 'od' ? 'ରିମାଇଣ୍ଡର୍ ସକ୍ରିୟ କରନ୍ତୁ' : 'Enable Reminders'}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-lg border border-success">
                      <Bell className="w-5 h-5" />
                      <span className="font-semibold">
                        {language === 'od' ? 'ରିମାଇଣ୍ଡର୍ ସକ୍ରିୟ' : 'Reminders Active'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="card p-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedTab === 'guidance' ? 'primary' : 'outline'}
                  size="small"
                  icon={Calendar}
                  onClick={() => setSelectedTab('guidance')}
                >
                  {language === 'od' ? 'ମାସିକ ମାର୍ଗଦର୍ଶନ' : 'Month-wise Guidance'}
                </Button>
                <Button
                  variant={selectedTab === 'diet' ? 'primary' : 'outline'}
                  size="small"
                  icon={Apple}
                  onClick={() => setSelectedTab('diet')}
                >
                  {language === 'od' ? 'ଖାଦ୍ୟ ପରାମର୍ଶ' : 'Diet Suggestions'}
                </Button>
                <Button
                  variant={selectedTab === 'danger' ? 'primary' : 'outline'}
                  size="small"
                  icon={AlertTriangle}
                  onClick={() => setSelectedTab('danger')}
                >
                  {language === 'od' ? 'ବିପଦ ସଙ୍କେତ' : 'Danger Signs'}
                </Button>
                <Button
                  variant={selectedTab === 'anc' ? 'primary' : 'outline'}
                  size="small"
                  icon={Activity}
                  onClick={() => setSelectedTab('anc')}
                >
                  {language === 'od' ? 'ANC ଭିଜିଟ୍' : 'ANC Visits'}
                </Button>
                <Button
                  variant={selectedTab === 'supplements' ? 'primary' : 'outline'}
                  size="small"
                  icon={Pill}
                  onClick={() => setSelectedTab('supplements')}
                >
                  {language === 'od' ? 'ସପ୍ଲିମେଣ୍ଟ' : 'Supplements'}
                </Button>
              </div>
            </div>

            {/* Month-wise Guidance */}
            {selectedTab === 'guidance' && (
              <div className="space-y-4">
                <Alert
                  type="info"
                  message={`You are currently in ${language === 'od' ? pregnancyGuidance[currentMonth - 1]?.monthOd : `Month ${currentMonth}`}`}
                />
                {pregnancyGuidance.map((month, index) => (
                  <div
                    key={index}
                    className={`card p-6 transition-all ${
                      month.month === currentMonth ? 'border-l-4 border-pink-500 bg-pink-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        month.month === currentMonth ? 'bg-pink-500' : 'bg-gray-200'
                      }`}>
                        <span className="text-white font-bold">{month.month}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-textDark mb-2">
                          {language === 'od' ? month.titleOd : month.title}
                        </h3>
                        <div className="bg-purple-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-700 font-semibold mb-1">
                            {language === 'od' ? 'ସାଧାରଣ ଲକ୍ଷଣ:' : 'Common Symptoms:'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === 'od' ? month.symptomsOd : month.symptoms}
                          </p>
                        </div>
                        <ul className="space-y-2">
                          {(language === 'od' ? month.guidanceOd : month.guidance).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Diet Suggestions */}
            {selectedTab === 'diet' && (
              <div className="space-y-4">
                <Alert
                  type="success"
                  message={language === 'od' ? 'ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଆପଣଙ୍କ ଏବଂ ଶିଶୁର ସ୍ୱାସ୍ଥ୍ୟ ପାଇଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ' : 'Balanced diet is crucial for both mother and baby health'}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  {dietGuidance.map((item, index) => (
                    <div key={index} className="card p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Utensils className="w-6 h-6 text-pink-500 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-textDark">
                            {language === 'od' ? item.categoryOd : item.category}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {language === 'od' ? item.foodsOd : item.foods}
                          </p>
                        </div>
                      </div>
                      <div className="bg-pink-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">{language === 'od' ? 'ଲାଭ:' : 'Benefit:'}</span>{' '}
                          {language === 'od' ? item.benefitOd : item.benefit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                        <Clock className="w-4 h-4" />
                        {item.servings}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Danger Signs */}
            {selectedTab === 'danger' && (
              <div className="space-y-4">
                <Alert
                  type="error"
                  message={language === 'od' ? 'ଯଦି ଆପଣ ଏହି ଲକ୍ଷଣଗୁଡ଼ିକ ଅନୁଭବ କରନ୍ତି, ତୁରନ୍ତ ଡାକ୍ତରଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ' : 'Contact doctor immediately if you experience these symptoms'}
                />
                {dangerSigns.map((item, index) => (
                  <div
                    key={index}
                    className={`card p-6 border-l-4 ${
                      item.severity === 'high' ? 'border-danger bg-red-50/30' : 'border-warning bg-yellow-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <AlertTriangle className={`w-8 h-8 ${
                        item.severity === 'high' ? 'text-danger' : 'text-warning'
                      }`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-textDark mb-2">
                          {language === 'od' ? item.signOd : item.sign}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {language === 'od' ? item.descriptionOd : item.description}
                        </p>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                          item.severity === 'high' ? 'bg-danger text-white' : 'bg-warning text-white'
                        }`}>
                          <Bell className="w-4 h-4" />
                          {item.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ANC Visit Schedule */}
            {selectedTab === 'anc' && (
              <div className="space-y-4">
                <Alert
                  type="info"
                  message={language === 'od' ? 'ନିୟମିତ ANC ଭିଜିଟ୍ ସୁସ୍ଥ ଗର୍ଭଧାରଣ ନିଶ୍ଚିତ କରେ' : 'Regular ANC visits ensure healthy pregnancy'}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  {ancSchedule.map((visit, index) => (
                    <div key={index} className="card p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold">{language === 'od' ? visit.visitOd : visit.visit}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-pink-500" />
                            <h3 className="text-lg font-bold text-textDark">
                              {language === 'od' ? `ସପ୍ତାହ ${visit.week}` : `Week ${visit.week}`}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'od' ? visit.testsOd : visit.tests}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supplement Schedule */}
            {selectedTab === 'supplements' && (
              <div className="space-y-4">
                <Alert
                  type="success"
                  message={language === 'od' ? 'ନିୟମିତ ସପ୍ଲିମେଣ୍ଟ ନିଅନ୍ତୁ - ଆପଣଙ୍କ ଶିଶୁର ସ୍ୱାସ୍ଥ୍ୟ ପାଇଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ' : 'Take supplements regularly - crucial for baby health'}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  {supplementSchedule.map((item, index) => (
                    <div key={index} className="card p-6 border-l-4 border-purple-500">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Pill className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-textDark mb-2">
                            {language === 'od' ? item.supplementOd : item.supplement}
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Droplet className="w-4 h-4 text-pink-500" />
                              <span className="font-semibold">{language === 'od' ? 'ମାତ୍ରା:' : 'Dose:'}</span>
                              <span className="text-gray-600">{language === 'od' ? item.doseOd : item.dose}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-purple-500" />
                              <span className="font-semibold">{language === 'od' ? 'ଅବଧି:' : 'Duration:'}</span>
                              <span className="text-gray-600">{language === 'od' ? item.durationOd : item.duration}</span>
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg mt-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">{language === 'od' ? 'ଲାଭ:' : 'Benefit:'}</span>{' '}
                              {language === 'od' ? item.benefitOd : item.benefit}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={() => {
                  setStep(1);
                  setMotherName('');
                  setLmpDate('');
                  setPhoneNumber('');
                  setReminderEnabled(false);
                }}
              >
                {language === 'od' ? 'ନୂଆ ସନ୍ଧାନ' : 'New Search'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PregnancyCare;
