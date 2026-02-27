import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Mic,
  Send,
  Volume2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  User,
  Bot,
  Trash2,
  ChevronLeft,
  Sparkles,
  Phone,
  Baby,
  Heart,
  Shield,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  Bell,
  MapPin,
  Truck,
} from 'lucide-react';
import VoiceButton from '../components/VoiceButton';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: language === 'en' 
        ? "Namaste! I'm your SevaaYukti AI Health Assistant. How can I help you today?" 
        : "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ସେବା ୟୁକ୍ତି AI ସହାୟକ | ମୁଁ ଆଜି ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);
  const [featureData, setFeatureData] = useState({});

  const quickTopics = [
    { 
      id: 'maternal',
      label: 'Maternal Care', 
      labelOd: 'ମାତୃ ଯତ୍ନ',
      icon: '🤰', 
      color: 'bg-pink-500',
      description: 'Pregnancy care & guidance',
      descriptionOd: 'ଗର୍ଭାବସ୍ଥା ଯତ୍ନ ଏବଂ ମାର୍ଗଦର୍ଶନ'
    },
    { 
      id: 'child',
      label: 'Child Health', 
      labelOd: 'ଶିଶୁ ସ୍ୱାସ୍ଥ୍ୟ',
      icon: '👶', 
      color: 'bg-blue-500',
      description: 'Child care & nutrition',
      descriptionOd: 'ଶିଶୁ ଯତ୍ନ ଏବଂ ପୋଷଣ'
    },
    { 
      id: 'vaccination',
      label: 'Vaccination', 
      labelOd: 'ଟୀକାକରଣ',
      icon: '💉', 
      color: 'bg-green-500',
      description: 'Vaccine schedule & tracking',
      descriptionOd: 'ଟୀକା ସୂଚୀ ଏବଂ ଟ୍ରାକିଂ'
    },
    { 
      id: 'prevention',
      label: 'Disease Prevention', 
      labelOd: 'ରୋଗ ପ୍ରତିରୋଧ',
      icon: '🛡️', 
      color: 'bg-purple-500',
      description: 'Stay healthy & prevent disease',
      descriptionOd: 'ସୁସ୍ଥ ରୁହନ୍ତୁ ଏବଂ ରୋଗ ପ୍ରତିରୋଧ କରନ୍ତୁ'
    },
    { 
      id: 'emergency',
      label: 'Emergency', 
      labelOd: 'ଜରୁରୀକାଳୀନ',
      icon: '🚨', 
      color: 'bg-red-500',
      description: 'Urgent help & contacts',
      descriptionOd: 'ଜରୁରୀ ସହାୟତା ଏବଂ ଯୋଗାଯୋଗ'
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: language === 'en'
          ? "I understand your question. For accurate medical advice, I recommend consulting with a healthcare professional. However, I can provide general information about symptoms, preventive measures, and when to seek medical help. Would you like me to proceed?"
          : "ମୁଁ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ବୁଝିପାରୁଛି | ସଠିକ୍ ଚିକିତ୍ସା ପରାମର୍ଶ ପାଇଁ, ମୁଁ ଜଣେ ସ୍ୱାସ୍ଥ୍ୟସେବା ବୃତ୍ତିଗତଙ୍କ ସହିତ ପରାମର୍ଶ କରିବାକୁ ସୁପାରିଶ କରେ | କିନ୍ତୁ, ମୁଁ ଲକ୍ଷଣ, ପ୍ରତିରୋଧକ ବ୍ୟବସ୍ଥା ଏବଂ କେବେ ଚିକିତ୍ସା ସହାୟତା ନେବା ବିଷୟରେ ସାଧାରଣ ସୂଚନା ପ୍ରଦାନ କରିପାରିବି |",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(language === 'en' 
        ? 'Voice recognition is not supported in your browser. Please use Chrome or Edge.' 
        : 'ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ସ୍ୱର ସ୍ୱୀକୃତି ସମର୍ଥିତ ନୁହେଁ | ଦୟାକରି Chrome କିମ୍ବା Edge ବ୍ୟବହାର କରନ୍ତୁ |');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition for multi-language support
    recognition.lang = language === 'en' ? 'en-IN' : 'or-IN'; // English (India) or Odia (India)
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTranscript(language === 'en' ? 'Listening...' : 'ଶୁଣୁଛି...');
    };

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setVoiceTranscript(transcript);
      
      // If it's a final result, set it as input
      if (event.results[event.results.length - 1].isFinal) {
        setInput(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = language === 'en' 
        ? 'Voice recognition error: ' + event.error 
        : 'ସ୍ୱର ସ୍ୱୀକୃତି ତ୍ରୁଟି: ' + event.error;
      
      if (event.error === 'no-speech') {
        errorMessage = language === 'en' 
          ? 'No speech detected. Please try again.' 
          : 'କୌଣସି ବକ୍ତବ୍ୟ ଚିହ୍ନଟ ହେଲା ନାହିଁ | ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |';
      } else if (event.error === 'audio-capture') {
        errorMessage = language === 'en' 
          ? 'Microphone not found. Please check your microphone.' 
          : 'ମାଇକ୍ରୋଫୋନ୍ ମିଳିଲା ନାହିଁ | ଦୟାକରି ଆପଣଙ୍କ ମାଇକ୍ରୋଫୋନ୍ ଯାଞ୍ଚ କରନ୍ତୁ |';
      } else if (event.error === 'not-allowed') {
        errorMessage = language === 'en' 
          ? 'Microphone access denied. Please allow microphone access in browser settings.' 
          : 'ମାଇକ୍ରୋଫୋନ୍ ପ୍ରବେଶ ପ୍ରତ୍ୟାଖ୍ୟାନ | ଦୟାକରି ବ୍ରାଉଜର ସେଟିଂରେ ମାଇକ୍ରୋଫୋନ୍ ପ୍ରବେଶ ଅନୁମତି ଦିଅନ୍ତୁ |';
      }
      
      setVoiceTranscript(errorMessage);
      setTimeout(() => setVoiceTranscript(''), 3000);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-submit if we have content
      if (input.trim()) {
        setTimeout(() => {
          handleSendMessage();
        }, 500);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleQuickTopic = (topic) => {
    setActiveFeature(topic.id);
    
    // For emergency, show direct options without asking questions
    if (topic.id === 'emergency') {
      const emergencyMessage = {
        id: messages.length + 1,
        type: 'feature',
        featureType: 'emergency',
        text: language === 'en' ? 'Emergency Help' : 'ଜରୁରୀକାଳୀନ ସହାୟତା',
        timestamp: new Date(),
      };
      setMessages([...messages, emergencyMessage]);
      return;
    }

    // For other features, add AI message asking for input
    let questionText = '';
    switch(topic.id) {
      case 'maternal':
        questionText = language === 'en' 
          ? "I'll help you with maternal care guidance. Please select or enter the month of pregnancy (1-9):"
          : "ମୁଁ ଆପଣଙ୍କୁ ମାତୃ ଯତ୍ନ ମାର୍ଗଦର୍ଶନରେ ସାହାଯ୍ୟ କରିବି | ଦୟାକରି ଗର୍ଭାବସ୍ଥା ମାସ (1-9) ଚୟନ କରନ୍ତୁ:";
        break;
      case 'child':
        questionText = language === 'en'
          ? "I'll provide child health guidance. Please enter child's age (in months or years):"
          : "ମୁଁ ଶିଶୁ ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରିବି | ଦୟାକରି ଶିଶୁର ବୟସ ପ୍ରବେଶ କରନ୍ତୁ:";
        break;
      case 'vaccination':
        questionText = language === 'en'
          ? "I'll show vaccination status. Please enter child's date of birth (DD/MM/YYYY):"
          : "ମୁଁ ଟୀକାକରଣ ସ୍ଥିତି ଦେଖାଇବି | ଦୟାକରି ଶିଶୁର ଜନ୍ମ ତାରିଖ ପ୍ରବେଶ କରନ୍ତୁ (DD/MM/YYYY):";
        break;
      case 'prevention':
        questionText = language === 'en'
          ? "I'll share disease prevention tips. Here's important health information:"
          : "ମୁଁ ରୋଗ ପ୍ରତିରୋଧ ଟିପ୍ସ ଅଂଶୀଦାର କରିବି | ଏଠାରେ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଅଛି:";
        break;
      default:
        break;
    }

    const aiMessage = {
      id: messages.length + 1,
      type: 'feature',
      featureType: topic.id,
      text: questionText,
      timestamp: new Date(),
    };
    
    setMessages([...messages, aiMessage]);
  };

  const handleFeatureInput = (featureType, value) => {
    setFeatureData({ ...featureData, [featureType]: value });
    
    // Add user response
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: value,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate feature response
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        type: 'feature-response',
        featureType: featureType,
        data: value,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
      setActiveFeature(null);
    }, 1000);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          text: language === 'en'
            ? "Namaste! I'm your SevaaYukti AI Health Assistant. How can I help you today?"
            : "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ସେବା ୟୁକ୍ତି AI ସହାୟକ |",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex bg-cream">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } bg-white border-r transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-textDark mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Quick Topics
          </h2>
          <p className="text-sm text-gray-600">Select a topic to get started</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {quickTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleQuickTopic(topic)}
              className="w-full text-left p-4 bg-cream hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${topic.color} rounded-full flex items-center justify-center text-2xl`}>
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-textDark group-hover:text-primary transition-colors">
                    {language === 'en' ? topic.label : topic.labelOd}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {language === 'en' ? topic.description : topic.descriptionOd}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            fullWidth
            icon={Trash2}
            onClick={handleClearChat}
            className="!text-error hover:!bg-error/10"
          >
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
            </button>
            <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-textDark">
                  SevaaYukti AI Assistant
                </h1>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Volume2 className="w-5 h-5 text-textDark" />
            </button>
            <button
              onClick={t.switchLanguage}
              className="px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors font-semibold text-sm"
            >
              {language === 'en' ? 'English | ଓଡ଼ିଆ' : 'ଓଡ଼ିଆ | English'}
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'feature' && message.featureType === 'emergency' ? (
                <EmergencyFeature language={language} navigate={navigate} />
              ) : message.type === 'feature' && message.featureType === 'maternal' ? (
                <MaternalCareFeature language={language} message={message} onSubmit={handleFeatureInput} />
              ) : message.type === 'feature' && message.featureType === 'child' ? (
                <ChildHealthFeature language={language} message={message} onSubmit={handleFeatureInput} />
              ) : message.type === 'feature' && message.featureType === 'vaccination' ? (
                <VaccinationFeature language={language} message={message} onSubmit={handleFeatureInput} />
              ) : message.type === 'feature' && message.featureType === 'prevention' ? (
                <PreventionFeature language={language} message={message} />
              ) : message.type === 'feature-response' ? (
                <FeatureResponse message={message} language={language} navigate={navigate} />
              ) : (
                <div
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } animate-slideUp`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-accent'
                        : 'bg-gradient-to-br from-primary to-primary-dark'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`max-w-[70%] ${
                      message.type === 'user' ? 'items-end' : 'items-start'
                    } flex flex-col gap-2`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-accent text-white rounded-tr-sm'
                          : 'bg-white shadow-md rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>

                    {/* Message Actions */}
                    <div className="flex items-center gap-2 px-2">
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {message.type === 'ai' && (
                        <>
                          <button
                            onClick={() => handleCopyMessage(message.text)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy message"
                          >
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <ThumbsUp className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <ThumbsDown className="w-4 h-4 text-gray-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-slideUp">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white shadow-md px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t px-6 py-4">
          {isListening && (
            <div className="mb-4 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-primary font-semibold animate-pulse flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  {language === 'en' ? '🎙️ Listening in ' + (language === 'en' ? 'English' : 'Odia') + '...' : '🎙️ ' + (language === 'en' ? 'ଇଂରାଜୀ' : 'ଓଡିଆ') + 'ରେ ଶୁଣୁଛି...'}
                </p>
                <button
                  onClick={() => recognitionRef.current?.stop()}
                  className="text-sm text-error hover:underline"
                >
                  {language === 'en' ? 'Stop' : 'ବନ୍ଦ କରନ୍ତୁ'}
                </button>
              </div>
              {voiceTranscript && (
                <div className="p-2 bg-white rounded border border-primary/20 text-sm">
                  <span className="text-gray-500">{language === 'en' ? 'Detected:' : 'ଚିହ୍ନଟ:'}</span> {voiceTranscript}
                </div>
              )}
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-wave"
                    style={{
                      height: Math.random() * 30 + 10 + 'px',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {language === 'en' 
                  ? 'Speak clearly about your health concern, symptoms, or questions...' 
                  : 'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟା, ଲକ୍ଷଣ କିମ୍ବା ପ୍ରଶ୍ନ ବିଷୟରେ ସ୍ପଷ୍ଟ ଭାବରେ କୁହନ୍ତୁ...'}
              </p>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-3">
            <VoiceButton
              isListening={isListening}
              onClick={handleVoiceToggle}
              size="small"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'en' 
                ? '🎤 Click mic to speak or type your health question...' 
                : '🎤 କଥା କହିବାକୁ ମାଇକ୍ କ୍ଲିକ୍ କରନ୍ତୁ କିମ୍ବା ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ ଟାଇପ୍ କରନ୍ତୁ...'}
              className="input-field flex-1"
            />
            <Button type="submit" icon={Send} disabled={!input.trim()}>
              Send
            </Button>
          </form>

          <p className="text-xs text-gray-400 mt-3 text-center">
            {language === 'en' 
              ? '💡 Voice works in English & Odia | AI can make mistakes. Verify important health information with professionals.' 
              : '💡 ସ୍ୱର ଇଂରାଜୀ ଏବଂ ଓଡିଆରେ କାମ କରେ | AI ଭୁଲ କରିପାରେ | ବୃତ୍ତିଗତଙ୍କ ସହିତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଯାଞ୍ଚ କରନ୍ତୁ |'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Feature Components
const MaternalCareFeature = ({ language, message, onSubmit }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    onSubmit('maternal', month);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-lg">{message.text}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(month => (
          <button
            key={month}
            onClick={() => handleMonthSelect(`Month ${month}`)}
            className="p-3 bg-cream hover:bg-pink-100 rounded-lg font-semibold transition-colors"
          >
            {language === 'en' ? `Month ${month}` : `${month} ମାସ`}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChildHealthFeature = ({ language, message, onSubmit }) => {
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age.trim()) {
      onSubmit('child', age);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Baby className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-lg">{message.text}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder={language === 'en' ? "e.g., 6 months or 2 years" : "ଉଦାହରଣ: 6 ମାସ କିମ୍ବା 2 ବର୍ଷ"}
          className="input-field w-full"
        />
        <Button type="submit" fullWidth disabled={!age.trim()}>
          {language === 'en' ? 'Submit' : 'ଦାଖଲ କରନ୍ତୁ'}
        </Button>
      </form>
    </div>
  );
};

const VaccinationFeature = ({ language, message, onSubmit }) => {
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dob.trim()) {
      onSubmit('vaccination', dob);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-2xl">
          💉
        </div>
        <h3 className="font-bold text-lg">{message.text}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="DD/MM/YYYY"
          className="input-field w-full"
        />
        <Button type="submit" fullWidth disabled={!dob.trim()}>
          {language === 'en' ? 'Check Status' : 'ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ'}
        </Button>
      </form>
    </div>
  );
};

const PreventionFeature = ({ language, message }) => {
  const tips = [
    {
      icon: '💧',
      title: language === 'en' ? 'Clean Water' : 'ପରିଷ୍କାର ପାଣି',
      desc: language === 'en' ? 'Always drink boiled or purified water' : 'ସର୍ବଦା ଫୁଟାଯାଇଥିବା କିମ୍ବା ଶୁଦ୍ଧ ପାଣି ପିଅନ୍ତୁ'
    },
    {
      icon: '🦟',
      title: language === 'en' ? 'Mosquito Prevention' : 'ମଶା ପ୍ରତିରୋଧ',
      desc: language === 'en' ? 'Use mosquito nets, especially during monsoon' : 'ବିଶେଷକରି ବର୍ଷା ସମୟରେ ମଶା ଜାଲ ବ୍ୟବହାର କରନ୍ତୁ'
    },
    {
      icon: '🧼',
      title: language === 'en' ? 'Hand Hygiene' : 'ହାତ ପରିଷ୍କାର',
      desc: language === 'en' ? 'Wash hands before meals and after toilet' : 'ଖାଇବା ପୂର୍ବରୁ ଏବଂ ଶୌଚାଳୟ ପରେ ହାତ ଧୁଅନ୍ତୁ'
    },
    {
      icon: '🌡️',
      title: language === 'en' ? 'Seasonal Diseases' : 'ମୌସୁମୀ ରୋଗ',
      desc: language === 'en' ? 'Dengue & Malaria alert during rainy season' : 'ବର୍ଷା ଋତୁରେ ଡେଙ୍ଗୁ ଏବଂ ମ୍ୟାଲେରିଆ ସତର୍କତା'
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-lg">{message.text}</h3>
      </div>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="p-4 bg-cream rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-semibold text-textDark mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmergencyFeature = ({ language, navigate }) => {
  const emergencyContacts = [
    {
      name: language === 'en' ? '108 Ambulance' : '108 ଆମ୍ବୁଲାନ୍ସ',
      number: '108',
      icon: <Truck className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      name: language === 'en' ? 'Call ASHA Worker' : 'ASHA କର୍ମୀଙ୍କୁ କଲ୍ କରନ୍ତୁ',
      action: () => navigate('/find-asha'),
      icon: <Phone className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      name: language === 'en' ? 'Nearby PHC' : 'ନିକଟସ୍ଥ PHC',
      action: () => navigate('/emergency-help'),
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-lg text-red-600">
          {language === 'en' ? '🚨 Emergency Help' : '🚨 ଜରୁରୀକାଳୀନ ସହାୟତା'}
        </h3>
      </div>
      
      <div className="space-y-3">
        {emergencyContacts.map((contact, index) => (
          <button
            key={index}
            onClick={() => contact.number ? window.location.href = `tel:${contact.number}` : contact.action()}
            className={`w-full p-4 ${contact.color} hover:opacity-90 text-white rounded-lg transition-all flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              {contact.icon}
              <span className="font-semibold">{contact.name}</span>
            </div>
            {contact.number && <span className="text-2xl font-bold">{contact.number}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

const FeatureResponse = ({ message, language, navigate }) => {
  const { featureType, data } = message;

  if (featureType === 'maternal') {
    const monthNum = parseInt(data.split(' ')[1]);
    const dietTips = language === 'en' 
      ? [
          '🥛 Drink plenty of milk and water',
          '🥗 Eat green leafy vegetables',
          '🍊 Include fruits rich in vitamin C',
          '🥜 Consume protein-rich foods'
        ]
      : [
          '🥛 ପ୍ରଚୁର କ୍ଷୀର ଏବଂ ପାଣି ପିଅନ୍ତୁ',
          '🥗 ସବୁଜ ପତ୍ରଯୁକ୍ତ ପନିପରିବା ଖାଆନ୍ତୁ',
          '🍊 ଭିଟାମିନ୍ C ଯୁକ୍ତ ଫଳ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ',
          '🥜 ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ଖାଦ୍ୟ ଖାଆନ୍ତୁ'
        ];

    const donts = language === 'en'
      ? [
          '❌ Don\'t skip meals',
          '❌ Avoid heavy lifting',
          '❌ No smoking or alcohol',
          '❌ Don\'t take medicines without doctor'
        ]
      : [
          '❌ ଖାଦ୍ୟ ଛାଡନ୍ତୁ ନାହିଁ',
          '❌ ଭାରୀ ଜିନିଷ ଉଠାଇବା ଠାରୁ ଦୂରେଇ ରୁହନ୍ତୁ',
          '❌ ଧୂମପାନ କିମ୍ବା ମଦ୍ୟପାନ ନକରନ୍ତୁ',
          '❌ ଡାକ୍ତରଙ୍କ ବିନା ଔଷଧ ନିଅନ୍ତୁ ନାହିଁ'
        ];

    const dangerSigns = language === 'en'
      ? [
          '⚠️ Heavy bleeding',
          '⚠️ Severe headache',
          '⚠️ High fever',
          '⚠️ Swelling in face/hands'
        ]
      : [
          '⚠️ ଅତ୍ୟଧିକ ରକ୍ତସ୍ରାବ',
          '⚠️ ଗମ୍ଭୀର ମୁଣ୍ଡବିନ୍ଧା',
          '⚠️ ଉଚ୍ଚ ଜ୍ୱର',
          '⚠️ ମୁହଁ/ହାତରେ ଫୁଲା'
        ];

    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
        <h3 className="font-bold text-lg mb-4 text-pink-600">
          {language === 'en' ? `Maternal Care - ${data}` : `ମାତୃ ଯତ୍ନ - ${data}`}
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              🍽️ {language === 'en' ? 'Diet Tips' : 'ଖାଦ୍ୟ ପରାମର୍ଶ'}
            </h4>
            <ul className="space-y-1 text-sm">
              {dietTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              ✅ {language === 'en' ? 'Do\'s & Don\'ts' : 'କରନ୍ତୁ ଏବଂ କରନ୍ତୁ ନାହିଁ'}
            </h4>
            <ul className="space-y-1 text-sm">
              {donts.map((dont, i) => <li key={i}>{dont}</li>)}
            </ul>
          </div>

          <div className="p-3 bg-red-50 rounded-lg">
            <h4 className="font-semibold mb-2 text-red-600 flex items-center gap-2">
              🚨 {language === 'en' ? 'Danger Signs - Call Doctor Immediately' : 'ବିପଦ ଚିହ୍ନ - ତୁରନ୍ତ ଡାକ୍ତରଙ୍କୁ କଲ୍ କରନ୍ତୁ'}
            </h4>
            <ul className="space-y-1 text-sm">
              {dangerSigns.map((sign, i) => <li key={i}>{sign}</li>)}
            </ul>
          </div>

          <Button
            fullWidth
            icon={Phone}
            onClick={() => navigate('/find-asha')}
            className="!bg-pink-500 hover:!bg-pink-600"
          >
            📞 {language === 'en' ? 'Call ASHA' : 'ASHA କୁ କଲ୍ କରନ୍ତୁ'}
          </Button>
        </div>
      </div>
    );
  }

  if (featureType === 'child') {
    const tips = language === 'en'
      ? {
          illness: [
            '🌡️ Monitor temperature regularly',
            '💊 Give ORS for diarrhea',
            '🤧 Steam inhalation for cold',
            '🏥 Visit doctor if fever persists'
          ],
          nutrition: [
            '🥛 Milk 2-3 times daily',
            '🍌 Fresh fruits daily',
            '🥚 Protein-rich foods',
            '🥦 Green vegetables'
          ],
          milestones: [
            '👶 Sits without support (6-8 months)',
            '👣 Walks independently (12-15 months)',
            '🗣️ Speaks 2-3 words (12 months)',
            '✋ Wave bye-bye (9-12 months)'
          ]
        }
      : {
          illness: [
            '🌡️ ନିୟମିତ ତାପମାତ୍ରା ଯାଞ୍ଚ କରନ୍ତୁ',
            '💊 ଡାଇରିଆ ପାଇଁ ORS ଦିଅନ୍ତୁ',
            '🤧 ଥଣ୍ଡା ପାଇଁ ବାଷ୍ପ ନିଶ୍ୱାସ',
            '🏥 ଜ୍ୱର ରହିଲେ ଡାକ୍ତରଙ୍କୁ ଦେଖାନ୍ତୁ'
          ],
          nutrition: [
            '🥛 ଦିନକୁ 2-3 ଥର କ୍ଷୀର',
            '🍌 ପ୍ରତିଦିନ ତାଜା ଫଳ',
            '🥚 ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ଖାଦ୍ୟ',
            '🥦 ସବୁଜ ପନିପରିବା'
          ],
          milestones: [
            '👶 ସହାୟତା ବିନା ବସିବା (6-8 ମାସ)',
            '👣 ସ୍ୱାଧୀନ ଭାବରେ ଚାଲିବା (12-15 ମାସ)',
            '🗣️ 2-3 ଶବ୍ଦ କହିବା (12 ମାସ)',
            '✋ ବିଦାୟ ହଲାଇବା (9-12 ମାସ)'
          ]
        };

    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
        <h3 className="font-bold text-lg mb-4 text-blue-600">
          {language === 'en' ? `Child Health - Age: ${data}` : `ଶିଶୁ ସ୍ୱାସ୍ଥ୍ୟ - ବୟସ: ${data}`}
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">
              🏥 {language === 'en' ? 'Common Illness Advice' : 'ସାଧାରଣ ରୋଗ ପରାମର୍ଶ'}
            </h4>
            <ul className="space-y-1 text-sm">
              {tips.illness.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">
              🍽️ {language === 'en' ? 'Nutrition Tips' : 'ପୋଷଣ ପରାମର୍ଶ'}
            </h4>
            <ul className="space-y-1 text-sm">
              {tips.nutrition.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-600">
              📊 {language === 'en' ? 'Growth Milestones' : 'ବୃଦ୍ଧି ମାଇଲଷ୍ଟୋନ୍'}
            </h4>
            <ul className="space-y-1 text-sm">
              {tips.milestones.map((milestone, i) => <li key={i}>{milestone}</li>)}
            </ul>
          </div>

          <Button
            fullWidth
            icon={CheckCircle}
            onClick={() => navigate('/vaccination-schedule')}
            className="!bg-blue-500 hover:!bg-blue-600"
          >
            💉 {language === 'en' ? 'Check Vaccination Status' : 'ଟୀକାକରଣ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ'}
          </Button>
        </div>
      </div>
    );
  }

  if (featureType === 'vaccination') {
    // Parse the DOB and calculate vaccines
    const completedVaccines = [
      { name: 'BCG', date: 'At birth', status: 'completed' },
      { name: 'OPV-0', date: 'At birth', status: 'completed' },
      { name: 'Hepatitis B-1', date: 'At birth', status: 'completed' },
      { name: 'DPT-1', date: '6 weeks', status: 'completed' },
      { name: 'OPV-1', date: '6 weeks', status: 'completed' },
    ];

    const upcomingVaccines = [
      { name: 'DPT-2', date: '10 weeks', status: 'upcoming' },
      { name: 'OPV-2', date: '10 weeks', status: 'upcoming' },
      { name: 'DPT-3', date: '14 weeks', status: 'upcoming' },
    ];

    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl animate-slideUp">
        <h3 className="font-bold text-lg mb-4 text-green-600">
          💉 {language === 'en' ? `Vaccination Status - DOB: ${data}` : `ଟୀକାକରଣ ସ୍ଥିତି - ଜନ୍ମ ତାରିଖ: ${data}`}
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-green-600 flex items-center gap-2">
              ✔️ {language === 'en' ? 'Completed Vaccines' : 'ସମ୍ପୂର୍ଣ୍ଣ ଟୀକା'}
            </h4>
            <div className="space-y-2">
              {completedVaccines.map((vaccine, i) => (
                <div key={i} className="p-3 bg-green-50 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{vaccine.name}</div>
                    <div className="text-xs text-gray-500">{vaccine.date}</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-orange-600 flex items-center gap-2">
              ⏳ {language === 'en' ? 'Next Vaccines' : 'ପରବର୍ତ୍ତୀ ଟୀକା'}
            </h4>
            <div className="space-y-2">
              {upcomingVaccines.map((vaccine, i) => (
                <div key={i} className="p-3 bg-orange-50 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{vaccine.name}</div>
                    <div className="text-xs text-gray-500">{vaccine.date}</div>
                  </div>
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              fullWidth
              icon={Bell}
              className="!bg-green-500 hover:!bg-green-600"
            >
              🔔 {language === 'en' ? 'Set Reminder' : 'ସ୍ମାରକ ସେଟ୍ କରନ୍ତୁ'}
            </Button>
            <Button
              fullWidth
              icon={Calendar}
              onClick={() => navigate('/vaccination-schedule')}
              variant="outline"
            >
              {language === 'en' ? 'Full Schedule' : 'ସମ୍ପୂର୍ଣ୍ଣ ସୂଚୀ'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Chatbot;
