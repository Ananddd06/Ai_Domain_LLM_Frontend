import React from 'react';
import { SignInButton, SignUpButton, useClerk } from '@clerk/clerk-react';
import { Brain, FileText, Image, Zap, ArrowRight, Sparkles, Target, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DomainAI
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={() => openSignIn()}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors"
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
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm sm:text-base text-blue-700 font-medium">Domain-Specific Intelligence</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight px-4">
              AI That Truly
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Understands
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
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
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl text-base sm:text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
              Why Choose Domain-Specific AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Unlike general AI models, our specialized intelligence understands your field deeply, 
              providing contextual insights that accelerate your workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Brain className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Smart Reasoning</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Advanced logical reasoning capabilities that understand complex technical concepts, 
                mathematical relationships, and domain-specific patterns.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <FileText className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">File Understanding</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Intelligent analysis of documents, code, data files, and technical specifications 
                with deep contextual understanding of content structure.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
                <Image className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Visual Intelligence</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Advanced image understanding for diagrams, charts, technical drawings, 
                and visual data with precise interpretation of technical details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-blue-100 text-sm sm:text-base lg:text-lg">Accuracy on Domain Tasks</div>
            </div>
            <div className="text-white">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">10x</div>
              <div className="text-purple-100 text-sm sm:text-base lg:text-lg">Faster Problem Solving</div>
            </div>
            <div className="text-white">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100 text-sm sm:text-base lg:text-lg">Supported File Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
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
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DomainAI
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            © 2025 DomainAI. Empowering professionals with specialized artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;