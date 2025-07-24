'use client';

import { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';

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

interface TimeSlotSelectionProps {
  doctor: Doctor;
  onTimeSelect: (date: string, timeSlot: TimeSlot) => void;
  onBack: () => void;
}

export default function TimeSlotSelection({ doctor, onTimeSelect, onBack }: TimeSlotSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'calendar' | 'quick'>('calendar');

  // Generate next 7 days for quick selection
  const generateQuickDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        isToday: i === 0
      });
    }
    return dates;
  };

  const quickDates = generateQuickDates();

  // Sample time slots
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00 AM', available: true },
    { id: '2', time: '09:30 AM', available: false },
    { id: '3', time: '10:00 AM', available: true },
    { id: '4', time: '10:30 AM', available: true },
    { id: '5', time: '11:00 AM', available: false },
    { id: '6', time: '11:30 AM', available: true },
    { id: '7', time: '02:00 PM', available: true },
    { id: '8', time: '02:30 PM', available: true },
    { id: '9', time: '03:00 PM', available: false },
    { id: '10', time: '03:30 PM', available: true },
    { id: '11', time: '04:00 PM', available: true },
    { id: '12', time: '04:30 PM', available: true },
  ];

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (timeSlot.available && selectedDate) {
      onTimeSelect(selectedDate, timeSlot);
    }
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
        <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
      </div>

      {/* Doctor Info */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover object-top"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-blue-600 text-sm font-medium">{doctor.specialty}</p>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1">
                <i className="ri-star-fill text-yellow-400 text-sm"></i>
                <span className="text-sm text-gray-600">{doctor.rating}</span>
              </div>
              <span className="text-sm text-gray-600">{doctor.experience} exp</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setViewMode('calendar')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            viewMode === 'calendar'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Calendar View
        </button>
        <button
          onClick={() => setViewMode('quick')}
          className={`!rounded-button flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            viewMode === 'quick'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Quick Select
        </button>
      </div>

      {/* Date Selection */}
      {viewMode === 'calendar' ? (
        <AppointmentCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="grid grid-cols-7 gap-2">
            {quickDates.map((dateObj) => (
              <button
                key={dateObj.date}
                onClick={() => setSelectedDate(dateObj.date)}
                className={`!rounded-button p-3 text-center transition-colors ${
                  selectedDate === dateObj.date
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                } ${dateObj.isToday ? 'border-blue-300' : ''}`}
              >
                <div className="text-xs font-medium">
                  {dateObj.display.split(' ')[0]}
                </div>
                <div className="text-sm font-bold">
                  {dateObj.display.split(' ')[2]}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-center space-x-2">
            <i className="ri-calendar-check-line text-blue-600"></i>
            <span className="text-blue-800 font-medium">
              Selected Date: {formatSelectedDate(selectedDate)}
            </span>
          </div>
        </div>
      )}

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleTimeSlotSelect(slot)}
                disabled={!slot.available}
                className={`!rounded-button p-3 text-sm font-medium transition-colors ${
                  slot.available
                    ? 'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {!selectedDate && (
        <div className="text-center py-8">
          <i className="ri-calendar-line text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-600">Please select a date to see available time slots.</p>
        </div>
      )}
    </div>
  );
}