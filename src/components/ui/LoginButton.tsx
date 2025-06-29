import React from 'react';

const LoginButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div 
      aria-label="User Login Button" 
      tabIndex={0} 
      role="button" 
      className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 ease-out bg-gradient-to-br from-blue-500 to-transparent bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] focus:outline-none focus:bg-blue-500/70 focus:shadow-[0_0_10px_rgba(46,142,255,0.5)]"
      onClick={onClick}
    >
      <div className="w-[127px] h-[47px] rounded-[13px] bg-[#1a1a1a] flex items-center justify-center text-white font-semibold">
        <p>Get Started</p>
      </div>
    </div>
  );
};

export default LoginButton; 