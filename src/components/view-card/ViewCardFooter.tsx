
import React from 'react';
import { Link } from 'react-router-dom';

const ViewCardFooter: React.FC = () => {
  return (
    <footer className="py-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ConnectCard. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <Link to="/features" className="text-white/70 hover:text-white text-sm">
              Fonctionnalités
            </Link>
            <Link to="/pricing" className="text-white/70 hover:text-white text-sm">
              Tarifs
            </Link>
            <Link to="/dashboard" className="text-white/70 hover:text-white text-sm">
              Mon compte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ViewCardFooter;
