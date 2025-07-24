
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import HelpSupport from './HelpSupport';

interface User {
  name: string;
  email: string;
  profileImage?: string;
}

interface UserProfileProps {
  user: User | null;
  onBack: () => void;
  onUpdateUser: (userData: User) => void;
  onLogout: () => void;
}

export default function UserProfile({ user, onBack, onUpdateUser, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: { name: string; email: string }) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onUpdateUser({ ...data, profileImage: profileImage || undefined });
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  if (showHelp) {
    return <HelpSupport onBack={() => setShowHelp(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="!rounded-button w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <i className="ri-arrow-left-line text-gray-600 text-lg"></i>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="!rounded-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white text-2xl"></i>
              </div>
            )}
            {isEditing && (
              <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <i className="ri-camera-line text-white text-xs"></i>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="!rounded-button flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="!rounded-button flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Member Since</span>
              <span className="text-gray-900 font-medium">January 2024</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Appointments</span>
              <span className="text-gray-900 font-medium">12</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Account Status</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowHelp(true)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="ri-question-line text-blue-600 text-lg"></i>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Help & Support</h3>
              <p className="text-sm text-gray-600">FAQ and contact information</p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-gray-400 text-lg"></i>
        </button>

        <div className="border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-logout-circle-line text-red-600 text-lg"></i>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Logout</h3>
                <p className="text-sm text-gray-600">Sign out of your account</p>
              </div>
            </div>
            <i className="ri-arrow-right-s-line text-gray-400 text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
