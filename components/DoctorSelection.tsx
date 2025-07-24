'use client';

import { useState } from 'react';

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

interface DoctorSelectionProps {
  onDoctorSelect: (doctor: Doctor) => void;
  onDoctorProfile: (doctor: Doctor) => void;
}

export default function DoctorSelection({ onDoctorSelect, onDoctorProfile }: DoctorSelectionProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = [
    'All',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Neurology',
    'Orthopedics'
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20doctor%20in%20white%20coat%2C%20medical%20portrait%2C%20clean%20background%2C%20realistic%20photo%2C%20confident%20smile%2C%20stethoscope%20around%20neck%2C%20hospital%20setting%2C%20bright%20lighting%2C%20healthcare%20professional&width=300&height=300&seq=doc1&orientation=squarish',
      rating: 4.8,
      experience: '12 years',
      fee: 150,
      education: 'MD, Harvard Medical School',
      hospital: 'City General Hospital',
      languages: ['English', 'Spanish', 'French'],
      about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and has published numerous research papers on cardiovascular health.'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      image: 'https://readdy.ai/api/search-image?query=professional%20male%20doctor%20in%20white%20coat%2C%20medical%20portrait%2C%20clean%20background%2C%20realistic%20photo%2C%20confident%20smile%2C%20stethoscope%20around%20neck%2C%20hospital%20setting%2C%20bright%20lighting%2C%20healthcare%20professional&width=300&height=300&seq=doc2&orientation=squarish',
      rating: 4.9,
      experience: '8 years',
      fee: 120,
      education: 'MD, Johns Hopkins University',
      hospital: 'Skin Care Medical Center',
      languages: ['English', 'Mandarin'],
      about: 'Dr. Michael Chen is a dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and is known for his gentle approach to patient care.'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20pediatrician%20in%20white%20coat%2C%20medical%20portrait%2C%20clean%20background%2C%20realistic%20photo%2C%20warm%20smile%2C%20stethoscope%20around%20neck%2C%20hospital%20setting%2C%20bright%20lighting%2C%20healthcare%20professional&width=300&height=300&seq=doc3&orientation=squarish',
      rating: 4.7,
      experience: '15 years',
      fee: 130,
      education: 'MD, Stanford University',
      hospital: 'Children\'s Medical Center',
      languages: ['English', 'Spanish'],
      about: 'Dr. Emily Rodriguez is a pediatrician with 15 years of experience in child healthcare. She is passionate about preventive care and has a special interest in developmental pediatrics.'
    },
    {
      id: '4',
      name: 'Dr. David Thompson',
      specialty: 'Neurology',
      image: 'https://readdy.ai/api/search-image?query=professional%20male%20neurologist%20in%20white%20coat%2C%20medical%20portrait%2C%20clean%20background%2C%20realistic%20photo%2C%20confident%20smile%2C%20stethoscope%20around%20neck%2C%20hospital%20setting%2C%20bright%20lighting%2C%20healthcare%20professional&width=300&height=300&seq=doc4&orientation=squarish',
      rating: 4.6,
      experience: '20 years',
      fee: 200,
      education: 'MD, Mayo Clinic',
      hospital: 'Neurological Institute',
      languages: ['English'],
      about: 'Dr. David Thompson is a neurologist with 20 years of experience in treating neurological disorders. He specializes in epilepsy and movement disorders and is actively involved in clinical research.'
    },
    {
      id: '5',
      name: 'Dr. Lisa Wang',
      specialty: 'Orthopedics',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20orthopedic%20surgeon%20in%20white%20coat%2C%20medical%20portrait%2C%20clean%20background%2C%20realistic%20photo%2C%20confident%20smile%2C%20stethoscope%20around%20neck%2C%20hospital%20setting%2C%20bright%20lighting%2C%20healthcare%20professional&width=300&height=300&seq=doc5&orientation=squarish',
      rating: 4.8,
      experience: '10 years',
      fee: 180,
      education: 'MD, UCLA Medical School',
      hospital: 'Orthopedic Surgery Center',
      languages: ['English', 'Korean'],
      about: 'Dr. Lisa Wang is an orthopedic surgeon specializing in sports medicine and joint replacement. She has helped numerous athletes return to their sports and is known for her innovative surgical techniques.'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Doctor</h2>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Specialty Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`!rounded-button px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSpecialty === specialty
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover object-top"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <button
                    onClick={() => onDoctorProfile(doctor)}
                    className="!rounded-button bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 transition-colors"
                  >
                    <i className="ri-information-line"></i>
                  </button>
                </div>
                <p className="text-blue-600 text-sm font-medium">{doctor.specialty}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                    <span className="text-sm text-gray-600">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-time-line text-gray-400 text-sm"></i>
                    <span className="text-sm text-gray-600">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-hospital-line text-gray-400 text-sm"></i>
                    <span className="text-sm text-gray-600">{doctor.hospital}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">${doctor.fee}</p>
                <p className="text-sm text-gray-600">Consultation</p>
              </div>
              <button
                onClick={() => onDoctorSelect(doctor)}
                className="!rounded-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm font-medium transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <i className="ri-user-search-line text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-600">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}