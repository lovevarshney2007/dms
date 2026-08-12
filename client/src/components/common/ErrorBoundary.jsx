import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-12">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-orange-100 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h1 className="font-serif text-3xl text-stone-900 mb-4">Oops! Something went wrong.</h1>
            <p className="text-stone-600 mb-8">We're sorry, an unexpected error has occurred on this page. Our team has been notified.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
              >
                Refresh Page
              </button>
              <Link 
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 rounded-full bg-stone-100 text-stone-800 font-bold hover:bg-stone-200 transition"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
