const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseClasses = 'relative px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-2xl hover:shadow-purple-500/50 border-2 border-transparent hover:border-purple-400',
    secondary: 'glass-card text-white border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent text-white border-2 border-white/30 hover:border-purple-400 hover:bg-purple-500/10',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-2xl hover:shadow-red-500/50',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500 shadow-2xl hover:shadow-green-500/50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} btn-glow`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 -top-2 -bottom-2 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
    </button>
  );
};

export default Button;
