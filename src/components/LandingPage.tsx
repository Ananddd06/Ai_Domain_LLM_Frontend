import React, { useEffect, useState } from 'react';
import { SignInButton, SignUpButton, useClerk } from '@clerk/clerk-react';
import {
  Brain, FileText, Image, Zap, ArrowRight,
  Sparkles
} from 'lucide-react';
import logo from '../Images/bedrock.png'; 

// Theme toggle button
const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

const LandingPage: React.FC = () => {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DomainAI
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <button
                onClick={() => openSignIn()}
                className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => openSignUp()}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <span className="text-sm sm:text-base text-blue-700 dark:text-blue-200 font-medium">
                Domain-Specific Intelligence
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent leading-tight px-4">
              AI That Truly
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Understands
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Experience the power of domain-specific AI with advanced reasoning,
              file understanding, and specialized knowledge tailored for technical professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <button
                onClick={() => openSignUp()}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-base sm:text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start Chatting</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-base sm:text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-4">
              Why Choose Domain-Specific AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Unlike general AI models, our specialized intelligence understands your field deeply,
              providing contextual insights that accelerate your workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: <Brain className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />,
                title: "Smart Reasoning",
                desc: "Advanced logical reasoning capabilities that understand complex technical concepts, mathematical relationships, and domain-specific patterns.",
                bg: "bg-blue-100",
                hover: "group-hover:bg-blue-600"
              },
              {
                icon: <FileText className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />,
                title: "File Understanding",
                desc: "Intelligent analysis of documents, code, data files, and technical specifications with deep contextual understanding of content structure.",
                bg: "bg-purple-100",
                hover: "group-hover:bg-purple-600"
              },
              {
                icon: <Image className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />,
                title: "Visual Intelligence",
                desc: "Advanced image understanding for diagrams, charts, technical drawings, and visual data with precise interpretation of technical details.",
                bg: "bg-green-100",
                hover: "group-hover:bg-green-600"
              }
            ].map((f, i) => (
              <div key={i} className={`group p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all`}>
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-6 ${f.hover} transition-all`}>
                  {f.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { value: "95%", label: "Accuracy on Domain Tasks" },
              { value: "10x", label: "Faster Problem Solving" },
              { value: "50+", label: "Supported File Types" }
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm sm:text-base lg:text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Join thousands of professionals who are already using domain-specific AI
            to accelerate their work and unlock new insights.
          </p>
          <button
            onClick={() => openSignUp()}
            className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg sm:text-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-3 mx-auto"
          >
            <span>Get Started Free</span>
            <Zap className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DomainAI
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
            © 2025 DomainAI. Empowering professionals with specialized artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
