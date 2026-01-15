'use client';
import { ArrowRight } from 'lucide-react';
import { useWaitlistForm } from '@/hooks/useWaitlistForm';

export default function ModernWaitlistForm() {
  const {
    formData,
    handleChange,
    submit,
    isLoading,
    error,
    isSuccess,
  } = useWaitlistForm({ endpoint: '/api/waitlist' });

  const handleSubmit = async () => {
    try {
      await submit();
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="max-w-xl">

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 mb-6 leading-snug max-w-lg">
        If you want to finally boost your personal brand, sign up today for the waiting list to receive the Kleinecke Effekt newsletter free of charge every day for two weeks.
        </p>


      {/* Form */}
      {!isSuccess ? (
        <div className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="First name"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
          />

          <input
            type="text"
            name="apellido"
            placeholder="Last name"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
          />

          <input
            type="tel"
            name="telefono"
            placeholder="Phone number"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              'Submitting...'
            ) : (
              <>
                Get started
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            You're on the list!
          </h3>
          <p className="text-green-700">
            We'll notify you when early access is ready. Check your inbox for confirmation.
          </p>
        </div>
      )}

      {/* Trust indicators */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=200&auto=format&fit=crop"
            alt="User 1"
            className="w-14 h-14 rounded-full object-cover grayscale"
          />
          <img
            src="https://images.unsplash.com/photo-1594903833720-f9a68102aae1?q=80&w=200&auto=format&fit=crop"
            alt="User 2"
            className="w-16 h-16 rounded-full object-cover grayscale -ml-4"
          />
          <img
            src="https://images.unsplash.com/photo-1735754920734-1447bd4117f3?q=80&w=200&auto=format&fit=crop"
            alt="User 3"
            className="w-14 h-14 rounded-full object-cover grayscale -ml-4"
          />
        </div>

        <p className="mt-3 text-gray-500 text-sm font-medium">
          Already trust us
        </p>
      </div>
    </div>
  );
}
