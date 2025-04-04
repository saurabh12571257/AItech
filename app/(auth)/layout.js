const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] mt-16">
      {children}
    </div>
  );
};

export default AuthLayout; 