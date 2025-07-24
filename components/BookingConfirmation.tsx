'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
  fee: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface User {
  name: string;
  email: string;
}

interface BookingFormData {
  reason: string;
  notes?: string;
  phone: string;
}

interface BookingConfirmationProps {
  doctor: Doctor;
  date: string;
  timeSlot: TimeSlot;
  user: User | null;
  onConfirm: (appointmentData: any) => void;
  onBack: () => void;
  isConfirmed: boolean;
  onNewBooking: () => void;
  tokenNumber?: string;
}

export default function BookingConfirmation({
  doctor,
  date,
  timeSlot,
  user,
  onConfirm,
  onBack,
  isConfirmed,
  onNewBooking,
  tokenNumber
}: BookingConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormData>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateTokenNumber = () => {
    const prefix = doctor.specialty.substring(0, 2).toUpperCase();
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${number}`;
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const appointmentData = {
      id: Date.now().toString(),
      tokenNumber: generateTokenNumber(),
      patientName: user?.name || '',
      patientEmail: user?.email || '',
      patientPhone: data.phone,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: date,
      time: timeSlot.time,
      reason: data.reason,
      notes: data.notes,
      status: 'scheduled' as const,
      fee: doctor.fee
    };
    
    onConfirm(appointmentData);
    setIsSubmitting(false);
  };

  if (isConfirmed) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
          <i className="ri-check-line text-green-600 text-4xl"></i>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your appointment has been successfully booked.</p>
        </div>

        {/* Token Number Display */}
        {tokenNumber && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{tokenNumber}</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Your Token Number</h3>
                <p className="text-blue-100">Please remember this number</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-medium">{doctor.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formatDate(date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{timeSlot.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fee:</span>
              <span className="font-medium">${doctor.fee}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onNewBooking}
            className="!rounded-button w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 font-medium transition-colors"
          >
            Book Another Appointment
          </button>
          
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to {user?.email}
          </p>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Appointment Summary</h3>
        
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover object-top"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
            <p className="text-blue-600 text-sm font-medium">{doctor.specialty}</p>
            <div className="flex items-center space-x-1 mt-1">
              <i className="ri-star-fill text-yellow-400 text-sm"></i>
              <span className="text-sm text-gray-600">{doctor.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{formatDate(date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{timeSlot.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Fee:</span>
            <span className="font-medium">${doctor.fee}</span>
          </div>
        </div>
      </div>

      {/* Patient Information Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[+]?[\d\s\-()]+$/,
                    message: 'Invalid phone number'
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <input
                type="text"
                {...register('reason', { required: 'Reason for visit is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g., Regular checkup, chest pain, etc."
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Any additional information you'd like to share..."
              />
              <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="!rounded-button w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Confirming Booking...
            </div>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </form>
    </div>
  );
}