import React from 'react';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';

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
          colorPrimary: '#1e3a8a',
          colorBackground: '#0f172a',
          colorInputBackground: '#cfd6e1ff',
          colorInputText: '#e2e8f0',
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8',
          borderRadius: '0.75rem',
        },
        elements: {
          // ✅ Primary Sign-in / Sign-up button
          formButtonPrimary:
            'bg-gradient-to-r from-blue-800 to-indigo-900 text-white',

          // ✅ Container card styling
          card:
            'bg-gradient-to-b from-slate-800 to-slate-900 shadow-xl border border-slate-700 text-white',

          headerTitle: 'text-white text-2xl font-semibold',
          headerSubtitle: 'text-slate-400 text-base',

          // ✅ Fully white Google/GitHub buttons (no dark hover/focus)
          socialButtonsBlockButton: `
            bg-white text-black 
            border border-gray-300 
            shadow-none 
            hover:bg-white hover:text-black 
            focus:bg-white focus:text-black 
            active:bg-white active:text-black 
            !important
          `,
          socialButtonsBlockButton__provider: `
            bg-white text-black 
            hover:bg-white focus:bg-white active:bg-white 
            hover:text-black focus:text-black active:text-black 
            !important
          `,

          // ✅ Input fields (dark mode friendly)
          formFieldInput:
            'bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500',

          // ✅ Link styling
          footerActionLink: 'text-blue-400',
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
