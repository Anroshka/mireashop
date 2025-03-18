
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 px-4 md:px-6">
      <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-xl font-semibold tracking-tight transition-colors"
          >
            MINIMALIST
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                } link-hover`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-medium">
                {currentUser?.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-sm font-medium"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden md:flex"
            >
              <User size={20} />
            </Button>
          )}

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-black rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white z-30 border-b border-gray-100 shadow-sm animate-fade-in">
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium">
                  {currentUser?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="justify-start text-sm font-medium p-0 h-auto"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="justify-start text-sm font-medium p-0 h-auto"
              >
                Login / Register
              </Button>
            )}
          </nav>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
