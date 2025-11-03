import React, { useState } from 'react';
import { Search, Filter, Sprout, Droplet, Bug, Home, X, CreditCard, Smartphone, Building2, Check, ShoppingCart, Trash2, Menu, Plus, Minus } from 'lucide-react';

const AgriRecommender = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({ cropType: '', soilType: '', climate: '', issue: '' });
  const [recommendations, setRecommendations] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const productImages = {
    seeds: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    fertilizers: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    pesticides: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400'
  };

  const products = [
    { id: 1, name: 'Premium Corn Seeds', category: 'seeds', crop: 'corn', description: 'High-yield hybrid corn seeds', price: 18000, rating: 4.8, image: productImages.seeds },
    { id: 2, name: 'Cassava Stem Cuttings', category: 'seeds', crop: 'cassava', description: 'Disease-free cassava varieties', price: 8500, rating: 4.9, image: productImages.seeds },
    { id: 3, name: 'Cocoa Seedlings Premium', category: 'seeds', crop: 'cocoa', description: 'High-yielding cocoa varieties', price: 15000, rating: 4.8, image: productImages.seeds },
    { id: 4, name: 'Oil Palm Seedlings', category: 'seeds', crop: 'oil palm', description: 'Tenera hybrid palm seedlings', price: 12000, rating: 4.7, image: productImages.seeds },
    { id: 5, name: 'Plantain Suckers Elite', category: 'seeds', crop: 'plantain', description: 'Fast-growing plantain varieties', price: 5500, rating: 4.6, image: productImages.seeds },
    { id: 6, name: 'Groundnut Seeds', category: 'seeds', crop: 'groundnut', description: 'High-oil content varieties', price: 9000, rating: 4.8, image: productImages.seeds },
    { id: 7, name: 'Mango Grafted Seedlings', category: 'seeds', crop: 'mango', description: 'Early fruiting mango varieties', price: 7500, rating: 4.9, image: productImages.seeds },
    { id: 8, name: 'Orange Tree Seedlings', category: 'seeds', crop: 'orange', description: 'Sweet orange varieties', price: 6500, rating: 4.7, image: productImages.seeds },
    { id: 9, name: 'NPK Fertilizer 15-15-15', category: 'fertilizers', crop: 'cassava', description: 'Balanced fertilizer for tubers', price: 25000, rating: 4.6, image: productImages.fertilizers },
    { id: 10, name: 'Cocoa Fertilizer Special', category: 'fertilizers', crop: 'cocoa', description: 'Specialized cocoa nutrition', price: 32000, rating: 4.8, image: productImages.fertilizers },
    { id: 11, name: 'Palm Fertilizer Pro', category: 'fertilizers', crop: 'oil palm', description: 'Potassium-rich palm blend', price: 28000, rating: 4.7, image: productImages.fertilizers },
    { id: 12, name: 'Organic Compost Plus', category: 'fertilizers', crop: 'plantain', description: '100% organic plant nutrition', price: 16000, rating: 4.8, image: productImages.fertilizers },
    { id: 13, name: 'Groundnut Booster', category: 'fertilizers', crop: 'groundnut', description: 'Phosphorus-rich formula', price: 22000, rating: 4.5, image: productImages.fertilizers },
    { id: 14, name: 'Fruit Tree Fertilizer', category: 'fertilizers', crop: 'mango', description: 'Complete fruit nutrition', price: 19000, rating: 4.7, image: productImages.fertilizers },
    { id: 15, name: 'Insect Guard Pro', category: 'pesticides', crop: 'cassava', description: 'Controls mealybugs and aphids', price: 20000, rating: 4.7, image: productImages.pesticides },
    { id: 16, name: 'Black Pod Control', category: 'pesticides', crop: 'cocoa', description: 'Fungicide for cocoa diseases', price: 24000, rating: 4.8, image: productImages.pesticides },
    { id: 17, name: 'Palm Weevil Killer', category: 'pesticides', crop: 'oil palm', description: 'Controls rhinoceros beetles', price: 26000, rating: 4.6, image: productImages.pesticides },
    { id: 18, name: 'Nematode Control', category: 'pesticides', crop: 'plantain', description: 'Soil nematode treatment', price: 18500, rating: 4.5, image: productImages.pesticides },
    { id: 19, name: 'Leaf Spot Fungicide', category: 'pesticides', crop: 'groundnut', description: 'Prevents leaf diseases', price: 21000, rating: 4.7, image: productImages.pesticides },
    { id: 20, name: 'Fruit Fly Trap', category: 'pesticides', crop: 'mango', description: 'Organic fruit fly control', price: 15500, rating: 4.8, image: productImages.pesticides }
  ];

  const quizQuestions = [
    { question: "What crop are you growing?", field: 'cropType', options: ['Cassava', 'Cocoa', 'Oil Palm', 'Plantain', 'Groundnut', 'Mango', 'Orange', 'Corn'] },
    { question: "What's your soil type?", field: 'soilType', options: ['Clay', 'Sandy', 'Loamy', 'Silty'] },
    { question: "What's your climate?", field: 'climate', options: ['Tropical', 'Temperate', 'Arid', 'Mediterranean'] },
    { question: "What's your main concern?", field: 'issue', options: ['Low Yield', 'Pests', 'Diseases', 'Soil Health'] }
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

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCart(false);
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (paymentMethod) {
      alert(`Payment of ₦${getTotalPrice().toLocaleString()} initiated via ${paymentMethod}! Order confirmed.`);
      setCart([]);
      setShowPayment(false);
      setPaymentMethod('');
    } else {
      alert('Please select a payment method');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
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

  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-yellow-50">
      <header className="bg-gradient-to-r from-green-800 via-green-700 to-amber-800 text-white p-4 md:p-6 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6 md:w-8 md:h-8" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold">AgriRecommend</h1>
              <p className="text-green-100 text-xs md:text-base hidden md:block">Smart recommendations for your farm</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative p-2 hover:bg-green-700 rounded-lg transition">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{getTotalItems()}</span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-green-700 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <nav className={`bg-white shadow-md sticky top-16 md:top-20 z-30 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row gap-2 md:gap-6">
          <button onClick={() => { setActiveTab('home'); resetQuiz(); setMobileMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'home' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50'}`}>
            <Home className="w-5 h-5" /><span>Home</span>
          </button>
          <button onClick={() => { setActiveTab('quiz'); resetQuiz(); setMobileMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'quiz' || activeTab === 'results' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50'}`}>
            Get Recommendations
          </button>
          <button onClick={() => { setActiveTab('browse'); setMobileMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'browse' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50'}`}>
            <Filter className="w-5 h-5" /><span>Browse Products</span>
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {activeTab === 'home' && (
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome to AgriRecommend</h2>
              <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8">Get personalized product recommendations for your farm</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="p-4 md:p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <Sprout className="w-10 h-10 md:w-12 md:h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-base md:text-lg mb-2">Quality Seeds</h3>
                  <p className="text-gray-600 text-sm">High-yield varieties for optimal growth</p>
                </div>
                <div className="p-4 md:p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <Droplet className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-base md:text-lg mb-2">Fertilizers</h3>
                  <p className="text-gray-600 text-sm">Nutrient solutions for healthy crops</p>
                </div>
                <div className="p-4 md:p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <Bug className="w-10 h-10 md:w-12 md:h-12 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-bold text-base md:text-lg mb-2">Pesticides</h3>
                  <p className="text-gray-600 text-sm">Effective crop protection solutions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Question {quizStep + 1} of {quizQuestions.length}</span>
                  <button onClick={resetQuiz} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}></div>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">{quizQuestions[quizStep].question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {quizQuestions[quizStep].options.map((option) => (
                  <button key={option} onClick={() => handleQuizAnswer(option)} className="p-3 md:p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left font-medium">{option}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Your Personalized Recommendations</h2>
              <p className="text-gray-600 mb-4">Based on your responses, here are the best products for you:</p>
              <button onClick={() => { setActiveTab('quiz'); resetQuiz(); }} className="text-green-600 hover:text-green-700 font-medium">← Take quiz again</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {recommendations.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">{getCategoryIcon(product.category)}</div>
                        <div>
                          <h3 className="font-bold text-base md:text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        </div>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                      <button onClick={() => addToCart(product)} className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="all">All Categories</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="pesticides">Pesticides</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">{getCategoryIcon(product.category)}</div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl md:text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                    </div>
                    <button onClick={() => addToCart(product)} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Shopping Cart ({getTotalItems()} items)</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-4 md:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <ShoppingCart className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button onClick={() => { setShowCart(false); setActiveTab('browse'); }} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">Browse Products</button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 md:p-4 border border-gray-200 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm md:text-base mb-1">{item.name}</h4>
                          <p className="text-xs md:text-sm text-gray-500 mb-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-gray-100 hover:bg-gray-200"><Minus className="w-4 h-4" /></button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-gray-100 hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-green-600">{formatPrice(item.price * item.quantity)}</span>
                              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Proceed to Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Complete Purchase</h3>
              <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-gray-600 mb-2">Total Amount:</p>
              <p className="text-3xl font-bold text-green-600">{formatPrice(getTotalPrice())}</p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-gray-700">Select Payment Method:</h4>
              <div className="space-y-3">
                <button onClick={() => setPaymentMethod('Card')} className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${paymentMethod === 'Card' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Debit/Credit Card</p>
                    <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or Verve</p>
                  </div>
                  {paymentMethod === 'Card' && <Check className="w-5 h-5 text-green-600" />}
                </button>
                <button onClick={() => setPaymentMethod('Bank Transfer')} className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${paymentMethod === 'Bank Transfer' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                  <Building2 className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank transfer</p>
                  </div>
                  {paymentMethod === 'Bank Transfer' && <Check className="w-5 h-5 text-green-600" />}
                </button>
                <button onClick={() => setPaymentMethod('Mobile Money')} className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${paymentMethod === 'Mobile Money' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Mobile Money</p>
                    <p className="text-sm text-gray-500">Pay with mobile wallet</p>
                  </div>
                  {paymentMethod === 'Mobile Money' && <Check className="w-5 h-5 text-green-600" />}
                </button>
              </div>
            </div>
            <button onClick={handlePayment} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriRecommender;