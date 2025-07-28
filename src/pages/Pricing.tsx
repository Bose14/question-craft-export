
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft, Menu } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "Generate up to 5 question papers per month",
        "Basic question templates",
        "PDF export",
        "Standard support"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      description: "Ideal for teachers and small institutions",
      features: [
        "Generate unlimited question papers",
        "Custom header upload",
        "PDF & Word export",
        "Advanced question templates",
        "Syllabus AI analysis",
        "Priority support",
        "Question bank access"
      ],
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      name: "Institution",
      price: "₹999",
      period: "per month",
      description: "Best for schools and colleges",
      features: [
        "Everything in Pro",
        "Multiple user accounts (up to 50)",
        "Institution branding",
        "Advanced analytics",
        "Bulk question generation",
        "API access",
        "Dedicated support",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Back link */}
            <Link to="/" className="flex items-center space-x-2 text-slate-900 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Right - Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/vinathaal%20logo.png"
                alt="Vinathaal Logo"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            Choose the perfect plan for your question paper generation needs. 
            Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-slate-900 shadow-xl scale-105' : 'border-slate-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 sm:pb-8">
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-2 text-sm sm:text-base">/{plan.period}</span>
                </div>
                <p className="text-slate-600 text-sm sm:text-base">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-600 hover:bg-slate-700'}`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                Can I change plans anytime?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                Is there a free trial for Pro plans?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Yes, we offer a 14-day free trial for all Pro and Institution plans.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                We accept all major credit cards, debit cards, and UPI payments.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                Do you offer educational discounts?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Yes, we offer special discounts for educational institutions. Contact us for details.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-900 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of educators who are already using our AI-powered question paper generator 
            to save time and create better assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
