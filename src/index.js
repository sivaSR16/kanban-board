import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ErrorBoundary to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('🛑 Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-600 py-6">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <p>Please refresh the page or check the console for details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Get the root element safely
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<div className="text-center py-6 text-gray-500">Loading Kanban Board...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  );

  console.log('✅ App rendered successfully');
} else {
  console.error('❌ Root element not found. Make sure your index.html has <div id="root"></div>');
}
