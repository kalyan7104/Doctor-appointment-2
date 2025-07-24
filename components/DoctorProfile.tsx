'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
  fee: number;
  education: string;
  hospital: string;
  languages: string[];
  about: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  available: boolean;
}

interface DoctorProfileProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor, service?: Service) => void;
  onBack: () => void;
}

export default function DoctorProfile({ doctor, onBookAppointment, onBack }: DoctorProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const services: Service[] = [
    {
      id: '1',
      name: 'General Consultation',
      description: 'Comprehensive health checkup and consultation',
      duration: '30 min',
      price: doctor.fee,
      available: true
    },
    {
      id: '2',
      name: 'Follow-up Visit',
      description: 'Follow-up consultation for ongoing treatment',
      duration: '20 min',
      price: Math.round(doctor.fee * 0.7),
      available: true
    },
    {
      id: '3',
      name: 'Emergency Consultation',
      description: 'Urgent medical consultation',
      duration: '45 min',
      price: Math.round(doctor.fee * 1.5),
      available: false
    },
    {
      id: '4',
      name: 'Specialized Treatment',
      description: `Advanced ${doctor.specialty.toLowerCase()} treatment`,
      duration: '60 min',
      price: Math.round(doctor.fee * 2),
      available: true
    }
  ];

  const availableHours = [
    { day: 'Monday', time: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', time: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', time: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', time: '9:00 AM - 5:00 PM' },
    { day: 'Friday', time: '9:00 AM - 3:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="!rounded-button bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 transition-colors"
        >
          <i className="ri-arrow-left-line"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Doctor Profile</h2>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover object-top"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <i className="ri-star-fill text-yellow-400"></i>
                <span className="text-sm text-gray-600">{doctor.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-time-line text-gray-400"></i>
                <span className="text-sm text-gray-600">{doctor.experience}</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">{doctor.education}</p>
              <p className="text-sm text-gray-600">{doctor.hospital}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {doctor.languages.map((lang, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'services'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('availability')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'availability'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Availability
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3">About Doctor</h4>
          <p className="text-gray-600 leading-relaxed">
            {doctor.about}
          </p>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <i className="ri-time-line text-gray-400 text-sm"></i>
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-money-dollar-circle-line text-gray-400 text-sm"></i>
                      <span className="text-sm font-medium text-gray-900">${service.price}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onBookAppointment(doctor, service)}
                  disabled={!service.available}
                  className={`!rounded-button px-4 py-2 text-sm font-medium transition-colors ${
                    service.available
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {service.available ? 'Book' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'availability' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-4">Available Hours</h4>
          <div className="space-y-3">
            {availableHours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{schedule.day}</span>
                <span className={`font-medium ${
                  schedule.time === 'Closed' ? 'text-red-500' : 'text-gray-900'
                }`}>
                  {schedule.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Book Button */}
      <button
        onClick={() => onBookAppointment(doctor)}
        className="!rounded-button w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 font-medium transition-colors"
      >
        Book Appointment
      </button>
    </div>
  );
}