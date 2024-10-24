// CustomBadge.js
const Badge = ({ children, variant = 'default' }) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      destructive: 'bg-red-100 text-red-800',
      secondary: 'bg-gray-100 text-gray-600',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
        {children}
      </span>
    );
  };
  
  // CustomAvatar.js
  const Avatar = ({ children, className = '' }) => {  // Added children prop here
    return (
      <div className={`relative inline-block ${className}`}>
        {children}
      </div>
    );
  };
  
  const AvatarImage = ({ src, alt }) => {
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    );
  };
  
  const AvatarFallback = ({ children }) => {
    return (
      <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-gray-600 font-medium uppercase">
        {children}
      </div>
    );
  };
  
  export { Badge, Avatar, AvatarImage, AvatarFallback };