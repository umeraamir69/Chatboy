import React, { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';

// Card Component
const Card = ({ className, children }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

// CardHeader Component
const CardHeader = ({ className, children }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// CardTitle Component
const CardTitle = ({ className, children }) => (
  <h2 className={`text-2xl font-bold ${className}`}>
    {children}
  </h2>
);

// CardContent Component
const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CreditCardForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      });
    }, 1500);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  return (
    <div className="  flex  p-4">
      <Card className="w-full ">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-500" />
            Manage Your Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  cardNumber: formatCardNumber(e.target.value)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({
                    ...formData,
                    expiryDate: formatExpiryDate(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => setFormData({
                    ...formData,
                    cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) => setFormData({
                  ...formData,
                  cardholderName: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="John Doe"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={` py-2 px-4 rounded-md text-white font-medium transition duration-200 ${
                isSubmitting 
                  ? 'bg-green-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Check className="h-5 w-5" />
                    Card Added
                  </>
                ) : (
                  'Add Card'
                )}
              </span>
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditCardForm;