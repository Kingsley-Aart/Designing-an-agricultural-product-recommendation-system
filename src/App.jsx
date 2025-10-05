import React, { useState } from 'react';
import { Search, Filter, Sprout, Droplet, Bug, ChevronRight, Home, X, CreditCard, Smartphone, Building2, Check } from 'lucide-react';

const AgriRecommender = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({
    cropType: '',
    soilType: '',
    climate: '',
    issue: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const products = [
    { id: 1, name: 'Premium Corn Seeds', category: 'seeds', crop: 'corn', description: 'High-yield hybrid corn seeds', price: '₦18,000', rating: 4.8 },
    { id: 2, name: 'Cassava Stem Cuttings', category: 'seeds', crop: 'cassava', description: 'Disease-free cassava varieties', price: '₦8,500', rating: 4.9 },
    { id: 3, name: 'Cocoa Seedlings Premium', category: 'seeds', crop: 'cocoa', description: 'High-yielding cocoa varieties', price: '₦15,000', rating: 4.8 },
    { id: 4, name: 'Oil Palm Seedlings', category: 'seeds', crop: 'oil palm', description: 'Tenera hybrid palm seedlings', price: '₦12,000', rating: 4.7 },
    { id: 5, name: 'Plantain Suckers Elite', category: 'seeds', crop: 'plantain', description: 'Fast-growing plantain varieties', price: '₦5,500', rating: 4.6 },
    { id: 6, name: 'Groundnut Seeds', category: 'seeds', crop: 'groundnut', description: 'High-oil content varieties', price: '₦9,000', rating: 4.8 },
    { id: 7, name: 'Mango Grafted Seedlings', category: 'seeds', crop: 'mango', description: 'Early fruiting mango varieties', price: '₦7,500', rating: 4.9 },
    { id: 8, name: 'Orange Tree Seedlings', category: 'seeds', crop: 'orange', description: 'Sweet orange varieties', price: '₦6,500', rating: 4.7 },
    { id: 9, name: 'NPK Fertilizer 15-15-15', category: 'fertilizers', crop: 'cassava', description: 'Balanced fertilizer for tubers', price: '₦25,000', rating: 4.6 },
    { id: 10, name: 'Cocoa Fertilizer Special', category: 'fertilizers', crop: 'cocoa', description: 'Specialized cocoa nutrition', price: '₦32,000', rating: 4.8 },
    { id: 11, name: 'Palm Fertilizer Pro', category: 'fertilizers', crop: 'oil palm', description: 'Potassium-rich palm blend', price: '₦28,000', rating: 4.7 },
    { id: 12, name: 'Organic Compost Plus', category: 'fertilizers', crop: 'plantain', description: '100% organic plant nutrition', price: '₦16,000', rating: 4.8 },
    { id: 13, name: 'Groundnut Booster', category: 'fertilizers', crop: 'groundnut', description: 'Phosphorus-rich formula', price: '₦22,000', rating: 4.5 },
    { id: 14, name: 'Fruit Tree Fertilizer', category: 'fertilizers', crop: 'mango', description: 'Complete fruit nutrition', price: '₦19,000', rating: 4.7 },
    { id: 15, name: 'Insect Guard Pro', category: 'pesticides', crop: 'cassava', description: 'Controls mealybugs and aphids', price: '₦20,000', rating: 4.7 },
    { id: 16, name: 'Black Pod Control', category: 'pesticides', crop: 'cocoa', description: 'Fungicide for cocoa diseases', price: '₦24,000', rating: 4.8 },
    { id: 17, name: 'Palm Weevil Killer', category: 'pesticides', crop: 'oil palm', description: 'Controls rhinoceros beetles', price: '₦26,000', rating: 4.6 },
    { id: 18, name: 'Nematode Control', category: 'pesticides', crop: 'plantain', description: 'Soil nematode treatment', price: '₦18,500', rating: 4.5 },
    { id: 19, name: 'Leaf Spot Fungicide', category: 'pesticides', crop: 'groundnut', description: 'Prevents leaf diseases', price: '₦21,000', rating: 4.7 },
    { id: 20, name: 'Fruit Fly Trap', category: 'pesticides', crop: 'mango', description: 'Organic fruit fly control', price: '₦15,500', rating: 4.8 }
  ];

  const quizQuestions = [
    {
      question: "What crop are you growing?",
      field: 'cropType',
      options: ['Cassava', 'Cocoa', 'Oil Palm', 'Plantain', 'Groundnut', 'Mango', 'Orange', 'Corn']
    },
    {
      question: "What's your soil type?",
      field: 'soilType',
      options: ['Clay', 'Sandy', 'Loamy', 'Silty']
    },
    {
      question: "What's your climate?",
      field: 'climate',
      options: ['Tropical', 'Temperate', 'Arid', 'Mediterranean']
    },
    {
      question: "What's your main concern?",
      field: 'issue',
      options: ['Low Yield', 'Pests', 'Diseases', 'Soil Health']
    }
  ];

  const handleQuizAnswer = (value) => {
    const currentField = quizQuestions[quizStep].field;
    setQuizData({ ...quizData, [currentField]: value });
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      generateRecommendations(value);
    }
  };

  const generateRecommendations = (lastAnswer) => {
    const updatedData = { ...quizData, [quizQuestions[quizStep].field]: lastAnswer };
    const crop = updatedData.cropType.toLowerCase();
    
    let recs = [];
    recs.push(products.find(p => p.category === 'seeds' && p.crop === crop));
    
    if (updatedData.issue === 'Low Yield' || updatedData.issue === 'Soil Health') {
      recs.push(products.find(p => p.category === 'fertilizers' && p.crop === crop));
    }
    
    if (updatedData.issue === 'Pests' || updatedData.issue === 'Diseases') {
      recs.push(products.find(p => p.category === 'pesticides' && p.crop === crop));
    } else {
      recs.push(products.find(p => p.category === 'fertilizers' && p.crop === crop));
    }
    
    setRecommendations(recs.filter(Boolean));
    setActiveTab('results');
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizData({ cropType: '', soilType: '', climate: '', issue: '' });
    setRecommendations([]);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (paymentMethod) {
      alert(`Payment initiated via ${paymentMethod} for ${selectedProduct.name}!`);
      setShowPayment(false);
      setPaymentMethod('');
      setSelectedProduct(null);
    } else {
      alert('Please select a payment method');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'seeds': return <Sprout className="w-5 h-5" />;
      case 'fertilizers': return <Droplet className="w-5 h-5" />;
      case 'pesticides': return <Bug className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 via-green-700 to-amber-800 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sprout className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AgriRecommend</h1>
          </div>
          <p className="text-green-100">Smart recommendations for your farm's success</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-6">
          <button
            onClick={() => { setActiveTab('home'); resetQuiz(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'home' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50'
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={() => { setActiveTab('quiz'); resetQuiz(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'quiz' || activeTab === 'results' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50'
            }`}
          >
            Get Recommendations
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'browse' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Browse Products
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to AgriRecommend</h2>
              <p className="text-gray-600 text-lg mb-8">Get personalized product recommendations for your farm</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <Sprout className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Quality Seeds</h3>
                  <p className="text-gray-600 text-sm">High-yield varieties for optimal growth</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <Droplet className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Fertilizers</h3>
                  <p className="text-gray-600 text-sm">Nutrient solutions for healthy crops</p>
                </div>
                <div className="p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <Bug className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Pesticides</h3>
                  <p className="text-gray-600 text-sm">Effective crop protection solutions</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold mb-1">Answer Questions</p>
                    <p className="text-green-100 text-sm">Tell us about your crop and needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold mb-1">Get Recommendations</p>
                    <p className="text-green-100 text-sm">Receive personalized suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold mb-1">Boost Your Yield</p>
                    <p className="text-green-100 text-sm">Apply the right products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Question {quizStep + 1} of {quizQuestions.length}</span>
                  <button onClick={resetQuiz} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {quizQuestions[quizStep].question}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {quizQuestions[quizStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuizAnswer(option)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Personalized Recommendations</h2>
              <p className="text-gray-600 mb-4">Based on your responses, here are the best products for you:</p>
              <button
                onClick={() => { setActiveTab('quiz'); resetQuiz(); }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Take quiz again
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        {getCategoryIcon(product.category)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2" onClick={() => handleBuyNow(product)}>
                      Buy Now <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="pesticides">Pesticides</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      {getCategoryIcon(product.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition" onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Complete Purchase</h3>
              <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {selectedProduct && (
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-bold text-lg mb-1">{selectedProduct.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{selectedProduct.description}</p>
                <p className="text-2xl font-bold text-green-600">{selectedProduct.price}</p>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-gray-700">Select Payment Method:</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('Card')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                    paymentMethod === 'Card' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Debit/Credit Card</p>
                    <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or Verve</p>
                  </div>
                  {paymentMethod === 'Card' && <Check className="w-5 h-5 text-green-600" />}
                </button>

                <button
                  onClick={() => setPaymentMethod('Bank Transfer')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                    paymentMethod === 'Bank Transfer' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Building2 className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank transfer</p>
                  </div>
                  {paymentMethod === 'Bank Transfer' && <Check className="w-5 h-5 text-green-600" />}
                </button>

                <button
                  onClick={() => setPaymentMethod('Mobile Money')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                    paymentMethod === 'Mobile Money' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Mobile Money</p>
                    <p className="text-sm text-gray-500">Pay with mobile wallet</p>
                  </div>
                  {paymentMethod === 'Mobile Money' && <Check className="w-5 h-5 text-green-600" />}
                </button>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriRecommender;