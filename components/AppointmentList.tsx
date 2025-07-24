'use client';

import { useState } from 'react';

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

interface AppointmentListProps {
  appointments: Appointment[];
  onAppointmentSelect: (appointment: Appointment) => void;
}

export default function AppointmentList({ appointments, onAppointmentSelect }: AppointmentListProps) {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

  const filteredAppointments = appointments.filter(appointment => 
    selectedStatus === 'all' || appointment.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
        <div className="flex items-center space-x-2">
          <i className="ri-calendar-line text-gray-400"></i>
          <span className="text-sm text-gray-600">{appointments.length} total</span>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'scheduled', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status as any)}
            className={`!rounded-button px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              selectedStatus === status
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => onAppointmentSelect(appointment)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{appointment.tokenNumber}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                  <p className="text-sm text-blue-600">{appointment.specialty}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-calendar-line text-gray-400"></i>
                <span className="text-gray-600">{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-gray-400"></i>
                <span className="text-gray-600">{appointment.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-user-line text-gray-400"></i>
                <span className="text-gray-600">{appointment.patientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-money-dollar-circle-line text-gray-400"></i>
                <span className="text-gray-600">${appointment.fee}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Reason:</span> {appointment.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8">
          <i className="ri-calendar-line text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-600">No appointments found for the selected status.</p>
        </div>
      )}
    </div>
  );
}