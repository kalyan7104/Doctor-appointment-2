
'use client';

import { useState } from 'react';
import DoctorSelection from './DoctorSelection';
import DoctorProfile from './DoctorProfile';
import TimeSlotSelection from './TimeSlotSelection';
import BookingConfirmation from './BookingConfirmation';
import AppointmentList from './AppointmentList';
import AppointmentDetail from './AppointmentDetail';
import UserProfile from './UserProfile';

interface User {
  name: string;
  email: string;
  profileImage?: string;
}

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

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  available: boolean;
}

interface Appointment {
  id: string;
  tokenNumber: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  fee: number;
}

interface DoctorBookingProps {
  user: User | null;
  onLogout: () => void;
}

export default function DoctorBooking({ user, onLogout }: DoctorBookingProps) {
  const [currentView, setCurrentView] = useState<'booking' | 'appointments' | 'profile'>('booking');
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorProfile(false);
    setCurrentStep(2);
  };

  const handleDoctorProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorProfile(true);
  };

  const handleBookAppointment = (doctor: Doctor, service?: Service) => {
    setSelectedDoctor(doctor);
    setShowDoctorProfile(false);
    setCurrentStep(2);
  };

  const handleTimeSelect = (date: string, timeSlot: TimeSlot) => {
    setSelectedDate(date);
    setSelectedTime(timeSlot);
    setCurrentStep(3);
  };

  const handleBookingConfirm = (appointmentData: Appointment) => {
    setAppointments(prev => [...prev, appointmentData]);
    setConfirmedAppointment(appointmentData);
    setBookingConfirmed(true);
  };

  const handleNewBooking = () => {
    setCurrentStep(1);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime(null);
    setBookingConfirmed(false);
    setShowDoctorProfile(false);
    setConfirmedAppointment(null);
  };

  const handleViewAppointments = () => {
    setCurrentView('appointments');
    setSelectedAppointment(null);
  };

  const handleBackToBooking = () => {
    setCurrentView('booking');
    handleNewBooking();
  };

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleBackToAppointments = () => {
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === selectedAppointment.id
            ? { ...apt, status: 'cancelled' as const }
            : apt
        )
      );
      setSelectedAppointment(null);
    }
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleBackFromProfile = () => {
    setCurrentView('booking');
  };

  const handleUpdateUser = (userData: User) => {
    setCurrentUser(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <i className="ri-hospital-line text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MediCare</h1>
              <p className="text-sm text-gray-600">Hello, {currentUser?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleViewProfile}
              className="!rounded-button w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <i className="ri-user-line text-gray-600 text-lg"></i>
            </button>
            <button
              onClick={onLogout}
              className="!rounded-button bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Hide for profile view */}
      {currentView !== 'profile' && (
        <div className="max-w-md mx-auto p-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-6">
            <button
              onClick={handleBackToBooking}
              className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                currentView === 'booking'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={handleViewAppointments}
              className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                currentView === 'appointments'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Appointments ({appointments.length})
            </button>
          </div>
        </div>
      )}

      {/* Progress Indicator - Only show for booking flow */}
      {currentView === 'booking' && !showDoctorProfile && (
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`h-1 w-8 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`h-1 w-8 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">
        {currentView === 'profile' && (
          <UserProfile
            user={currentUser}
            onBack={handleBackFromProfile}
            onUpdateUser={handleUpdateUser}
            onLogout={onLogout}
          />
        )}

        {currentView === 'booking' && (
          <>
            {showDoctorProfile && selectedDoctor && (
              <DoctorProfile
                doctor={selectedDoctor}
                onBookAppointment={handleBookAppointment}
                onBack={() => setShowDoctorProfile(false)}
              />
            )}

            {!showDoctorProfile && currentStep === 1 && (
              <DoctorSelection
                onDoctorSelect={handleDoctorSelect}
                onDoctorProfile={handleDoctorProfile}
              />
            )}

            {!showDoctorProfile && currentStep === 2 && selectedDoctor && (
              <TimeSlotSelection
                doctor={selectedDoctor}
                onTimeSelect={handleTimeSelect}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {!showDoctorProfile && currentStep === 3 && selectedDoctor && selectedTime && (
              <BookingConfirmation
                doctor={selectedDoctor}
                date={selectedDate}
                timeSlot={selectedTime}
                user={user}
                onConfirm={handleBookingConfirm}
                onBack={() => setCurrentStep(2)}
                isConfirmed={bookingConfirmed}
                onNewBooking={handleNewBooking}
                tokenNumber={confirmedAppointment?.tokenNumber}
              />
            )}
          </>
        )}

        {currentView === 'appointments' && (
          <>
            {selectedAppointment ? (
              <AppointmentDetail
                appointment={selectedAppointment}
                onBack={handleBackToAppointments}
                onCancel={handleCancelAppointment}
                onReschedule={() => {
                  // Handle reschedule logic here
                  console.log('Reschedule appointment');
                }}
              />
            ) : (
              <AppointmentList
                appointments={appointments}
                onAppointmentSelect={handleAppointmentSelect}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
