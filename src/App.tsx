import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#2563EB',
          colorBackground: '#FFFFFF',
          colorInputBackground: '#F9FAFB',
          colorInputText: '#111827',
          colorText: '#111827',
          colorTextSecondary: '#6B7280',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transform hover:scale-105 transition-all',
          card: 'bg-white shadow-2xl border border-gray-200',
          headerTitle: 'text-gray-900 font-bold',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-2 border-gray-200 hover:border-blue-300 transition-colors',
          formFieldInput: 'border-2 border-gray-200 focus:border-blue-500 transition-colors',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
      }}
    >
      <div className="min-h-screen">
        <SignedOut>
          <LandingPage />
        </SignedOut>
        <SignedIn>
          <ChatInterface />
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}

export default App;