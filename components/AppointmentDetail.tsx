'use client';

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

interface AppointmentDetailProps {
  appointment: Appointment;
  onBack: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
}

export default function AppointmentDetail({ 
  appointment, 
  onBack, 
  onCancel, 
  onReschedule 
}: AppointmentDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
        <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
      </div>

      {/* Token Number Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">{appointment.tokenNumber}</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Token Number</h3>
            <p className="text-blue-100">Your appointment reference</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Status:</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>

      {/* Doctor Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Doctor Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-blue-600"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900">{appointment.doctorName}</p>
              <p className="text-sm text-blue-600">{appointment.specialty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <i className="ri-calendar-line text-gray-400"></i>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium text-gray-900">{formatDate(appointment.date)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <i className="ri-time-line text-gray-400"></i>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium text-gray-900">{appointment.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <i className="ri-money-dollar-circle-line text-gray-400"></i>
            <div>
              <p className="text-sm text-gray-600">Consultation Fee</p>
              <p className="font-medium text-gray-900">${appointment.fee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <i className="ri-user-line text-gray-400"></i>
            <div>
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="font-medium text-gray-900">{appointment.patientName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <i className="ri-mail-line text-gray-400"></i>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{appointment.patientEmail}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <i className="ri-phone-line text-gray-400"></i>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{appointment.patientPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Visit Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Reason for Visit</p>
            <p className="font-medium text-gray-900">{appointment.reason}</p>
          </div>
          {appointment.notes && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Additional Notes</p>
              <p className="text-gray-700">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {appointment.status === 'scheduled' && (
        <div className="space-y-3">
          {onReschedule && (
            <button
              onClick={onReschedule}
              className="!rounded-button w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 font-medium transition-colors"
            >
              Reschedule Appointment
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="!rounded-button w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 font-medium transition-colors"
            >
              Cancel Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
}