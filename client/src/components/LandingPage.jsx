import React from "react";
import {
  Leaf,
  Heart,
  Calendar,
  TrendingUp,
  Bell,
  Users,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Effortless therapy session management with intelligent calendar integration",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Real-time wellness metrics and detailed recovery analytics",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Bell,
      title: "Care Reminders",
      description: "Personalized pre and post-therapy care notifications",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: Heart,
      title: "Holistic Wellness",
      description: "Complete mind-body healing tracking and optimization",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const benefits = [
    "Streamlined Panchakarma therapy management",
    "Real-time progress monitoring and analytics",
    "Automated care reminders and guidelines",
    "Patient-practitioner collaboration tools",
    "Comprehensive wellness tracking",
    "Mobile-responsive design for on-the-go access",
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Ayurveda Practitioner",
      text: "AyurSutra has revolutionized how I manage my patients' Panchakarma journeys. The progress tracking is incredibly detailed.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Patient",
      text: "The care reminders and wellness tracking helped me stay committed to my healing journey. Highly recommended!",
      rating: 5,
    },
    {
      name: "Dr. Meera Patel",
      role: "Wellness Center Director",
      text: "Our center has seen 40% better patient compliance since implementing AyurSutra. It's a game-changer.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Testimonials
              </a>
            </nav>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="text-gray-800">Panchakarma Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The most comprehensive Panchakarma management system that bridges
              ancient Ayurvedic wisdom with modern technology for optimal
              healing outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-gray-700 hover:text-green-600 font-medium text-lg flex items-center">
                Watch Demo
                <div className="ml-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="w-0 h-0 border-l-[6px] border-l-green-600 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                </div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>500+ Practitioners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>10,000+ Patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Complete Care
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every tool you need to manage, track, and optimize Panchakarma
              therapy sessions for better patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Why Choose
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  AyurSutra?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the perfect blend of traditional Ayurvedic practices
                and cutting-edge technology designed for modern wellness
                management.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={onGetStarted}
                className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Wellness Progress
                    </div>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Next Session
                    </div>
                    <div className="font-medium">Abhyanga</div>
                    <div className="text-xs text-gray-600">Sep 8, 10:00 AM</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Wellness Score
                    </div>
                    <div className="font-medium">8.5/10</div>
                    <div className="text-xs text-green-600">
                      ↗ +0.8 this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Trusted by
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join practitioners and patients who have transformed their
              Panchakarma experience with AyurSutra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of practitioners and patients who trust AyurSutra for
            their Panchakarma journey. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
          <div className="mt-8 text-green-100">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>30-day Free Trial</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AyurSutra</span>
              </div>
              <p className="text-gray-400 mb-4">
                Integrating traditional wisdom with modern technology for
                optimal wellness outcomes.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Training
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 AyurSutra. All rights reserved. Made with ❤️ for the
              Ayurvedic community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
