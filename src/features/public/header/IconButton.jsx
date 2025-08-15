const IconButton = ({ children, onClick, className, ...props }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center h-10 shrink-0 bg-white text-[#474b46] rounded-md  cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
