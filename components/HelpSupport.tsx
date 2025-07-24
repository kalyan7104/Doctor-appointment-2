'use client';

import { useState } from 'react';

interface HelpSupportProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I book an appointment?',
      answer: 'To book an appointment, go to the "Book Appointment" tab, select your preferred doctor, choose an available time slot, and fill in your details. You will receive a confirmation with a token number.'
    },
    {
      id: '2',
      question: 'How can I cancel my appointment?',
      answer: 'Go to "My Appointments" tab, find your appointment, and click on it. In the appointment details, you will see a "Cancel Appointment" button. Click it to cancel your booking.'
    },
    {
      id: '3',
      question: 'How do I reschedule an appointment?',
      answer: 'In your appointment details, click "Reschedule Appointment". You can then select a new date and time slot. Your token number will remain the same.'
    },
    {
      id: '4',
      question: 'What is a token number?',
      answer: 'A token number is a unique identifier for your appointment. It helps the medical staff track your visit and ensures you are called in the correct order.'
    },
    {
      id: '5',
      question: 'Can I see my appointment history?',
      answer: 'Yes, go to "My Appointments" tab to view all your past, current, and upcoming appointments with their status and details.'
    },
    {
      id: '6',
      question: 'How far in advance can I book an appointment?',
      answer: 'You can book appointments up to 30 days in advance. The calendar will show available slots for each doctor.'
    },
    {
      id: '7',
      question: 'What should I bring to my appointment?',
      answer: 'Please bring a valid ID, your insurance card (if applicable), and any relevant medical records or test results related to your visit.'
    },
    {
      id: '8',
      question: 'How do I change my profile information?',
      answer: 'Go to your Profile page and click the "Edit" button. You can update your name and email address. Remember to save your changes.'
    }
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="!rounded-button w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <i className="ri-arrow-left-line text-gray-600 text-lg"></i>
        </button>
        <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('faq')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'faq'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'contact'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Contact Us
        </button>
      </div>

      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <i
                      className={`ri-arrow-down-s-line text-gray-400 transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeTab === 'contact' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-phone-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email Support</h3>
                  <p className="text-gray-600">support@medicare.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-line text-orange-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Office Address</h3>
                  <p className="text-gray-600">123 Healthcare Avenue</p>
                  <p className="text-gray-600">Medical District, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 text-lg"></i>
              </div>
              <div>
                <h3 className="font-medium text-red-900">Emergency</h3>
                <p className="text-red-700">For medical emergencies, call 911</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="!rounded-button bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 text-sm font-medium transition-colors">
                Call Support
              </button>
              <button className="!rounded-button bg-green-500 hover:bg-green-600 text-white py-3 px-4 text-sm font-medium transition-colors">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}