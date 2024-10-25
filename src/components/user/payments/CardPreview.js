import React, { useState } from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';

// Dialog Components
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div>
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 ${className}`}>
    {children}
  </div>
);

const DialogHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">
    {children}
  </h2>
);

// Button Component
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-200 bg-white hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-8",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component
const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Label Component
const Label = ({ children, className = "", ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

// Card Title Component
const CardTitle = ({ className, children }) => (
  <h2 className={`text-2xl font-bold ${className}`}>
    {children}
  </h2>
);

// Main Card Preview Component
const CardPreview = () => {
  const [showModal, setShowModal] = useState(false);
  const [cardData, setCardData] = useState({
    name: "Karthik P",
    cardNumber: "4642 3489 9867 7632",
    valid: "11/15",
    expiry: "03/25",
    cvv: "***"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    // Here you would typically handle the update in your backend
  };

  const handleDelete = () => {
    // Handle delete logic here
    alert("Delete functionality would go here");
  };

  return (
    <div className="bg-white p-8 mx-4 rounded-md mb-5">
      <CardTitle className="flex items-center gap-2">
        Save Cards Preview
      </CardTitle>

      <div className="flex justify-center items-center mt-10">
        <div className="space-y-16">
          <div className="max-w-screen-sm sm:w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
            {/* Overlay buttons */}
            <div className="absolute top-4 right-4 space-x-2 z-10">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={() => setShowModal(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-red-500/30"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <img 
              className="relative object-cover w-full h-full rounded-xl" 
              src="https://i.imgur.com/kGkSg1v.png"
              alt="Card background"
            />

            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div>
                  <p className="font-light">Name</p>
                  <p className="font-medium tracking-widest">{cardData.name}</p>
                </div>
                <img 
                  className="w-14 h-14" 
                  src="https://i.imgur.com/bbPHJVe.png"
                  alt="Card logo"
                />
              </div>

              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <p className="font-medium tracking-more-wider">{cardData.cardNumber}</p>
              </div>

              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div>
                    <p className="font-light text-xs">Valid</p>
                    <p className="font-medium tracking-wider text-sm">{cardData.valid}</p>
                  </div>
                  <div>
                    <p className="font-light text-xs">Expiry</p>
                    <p className="font-medium tracking-wider text-sm">{cardData.expiry}</p>
                  </div>
                  <div>
                    <p className="font-light text-xs">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm">{cardData.cvv}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="min-w-[300px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Edit Card Details
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setShowModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                placeholder="Enter cardholder name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardData.cardNumber}
                onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                placeholder="Enter card number"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valid">Valid From</Label>
                <Input
                  id="valid"
                  value={cardData.valid}
                  onChange={(e) => setCardData({ ...cardData, valid: e.target.value })}
                  placeholder="MM/YY"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  placeholder="MM/YY"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  placeholder="***"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save 
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardPreview;