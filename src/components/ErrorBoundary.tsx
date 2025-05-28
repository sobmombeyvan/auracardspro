import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 p-8 rounded-lg glass-morphism border border-white/20"
          >
            <motion.h2 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-gradient"
            >
              Oops! Something went wrong
            </motion.h2>
            <p className="text-white/70">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple"
            >
              Refresh Page
            </Button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;