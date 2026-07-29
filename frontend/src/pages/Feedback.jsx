// src/pages/Feedback.jsx

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MessageSquare } from "lucide-react";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Feedback submitted successfully");
    setFeedback("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <Toaster position="top-right" />

      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <MessageSquare size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Share your feedback</h1>
            <p className="text-gray-500 text-sm">Help us improve HostelHub</p>
          </div>
        </div>

        <div className="border-t border-gray-100 mb-6" />

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Share your suggestions, report issues, or tell us about your experience
          using the platform. We read every submission.
        </p>

        {/* RATING */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Overall Experience
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-all duration-150 hover:scale-110 ${
                  star <= rating ? "text-yellow-400" : "text-gray-200"
                }`}
              >
                ★
              </button>
            ))}
            {rating > 0 && (
              <span className="text-gray-400 text-xs ml-2">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </span>
            )}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Your Feedback
            </label>
            <textarea
              rows={6}
              placeholder="Write your feedback, suggestions, or report an issue..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed resize-none transition"
            />
            <p className="text-gray-400 text-xs mt-1.5 text-right">
              {feedback.length} characters
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all duration-200 shadow-sm"
            >
              Submit Feedback
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Feedback;