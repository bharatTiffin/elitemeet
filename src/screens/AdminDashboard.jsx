import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getAuthenticatedUser } from '../utils/authHelper';
import { slotsAPI, mentorshipAPI, coachingAPI } from '../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthenticatedUser);
  const [slots, setSlots] = useState([]);
  const [newSlots, setNewSlots] = useState([{ startTime: '', duration: 30, price: 500 }]);
  const [loading, setLoading] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [mentorshipProgram, setMentorshipProgram] = useState(null);
  const [editingProgram, setEditingProgram] = useState(null);
  const [creatingProgram, setCreatingProgram] = useState(false);
  const [coachingEnrollments, setCoachingEnrollments] = useState([]);
  const [videoData, setVideoData] = useState({ title: '', description: '', videoId: '' });
  const [crashvideoData, setCrashVideoData] = useState({ title: '', description: '', videoId: '' });
  const [newProgram, setNewProgram] = useState({
    name: 'Full Mentor Guidance Program',
    description: 'Get comprehensive mentorship with Happy, regular feedback, sessions, and full commitment',
    price: 14999,
    totalSeats: 6,
    isActive: true,
    features: [
      'full mentor guidance with Happy',
      'Regular feedback and guidance',
      'Personalized sessions',
      'Full commitment',
      'Dedicated support',
    ],
  });
  const [enrollments, setEnrollments] = useState([]);

  const [enrollmentForm, setEnrollmentForm] = useState({
    fullName: "",
    fatherName: "",
    mobile: "",
    password: "",
    email: "",
    amount: ""
  });

  const [crashenrollmentForm, setcrashEnrollmentForm] = useState({
    fullName: "",
    fatherName: "",
    mobile: "",
    password: "",
    email: "",
    amount: ""
  });
  const [addingcrashEnrollment, setcrashAddingEnrollment] = useState(false);

  const [addingEnrollment, setAddingEnrollment] = useState(false);

  // Add this with your other handler functions
const handleAdminAddEnrollment = async () => {
  // Validation
  if (!enrollmentForm.fullName || !enrollmentForm.fatherName || 
      !enrollmentForm.mobile || !enrollmentForm.password || !enrollmentForm.email) {
    alert("Please fill all required fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(enrollmentForm.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Mobile validation (Indian format)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(enrollmentForm.mobile)) {
    alert("Please enter a valid 10-digit mobile number starting with 6-9");
    return;
  }

  setAddingEnrollment(true);
  try {
    await coachingAPI.adminAddEnrollment(enrollmentForm);
    alert("Student enrolled successfully!");
    
    // Reset form
    setEnrollmentForm({
      fullName: "",
      fatherName: "",
      mobile: "",
      password: "",
      email: "",
      amount: ""
    });
    
    // Refresh enrollments list
    fetchCoachingEnrollments();
  } catch (error) {
    console.error("Error adding enrollment:", error);
    alert(error.response?.data?.message || "Failed to add enrollment");
  } finally {
    setAddingEnrollment(false);
  }
};



const handleAdminCrashAddEnrollment = async () => {
  // Validation
  if (!crashenrollmentForm.fullName || !crashenrollmentForm.fatherName || 
      !crashenrollmentForm.mobile || !crashenrollmentForm.password || !crashenrollmentForm.email) {
    alert("Please fill all required fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(crashenrollmentForm.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Mobile validation (Indian format)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(crashenrollmentForm.mobile)) {
    alert("Please enter a valid 10-digit mobile number starting with 6-9");
    return;
  }

  setAddingEnrollment(true);
  try {
    await coachingAPI.admincrashAddEnrollment(crashenrollmentForm);
    alert("Student enrolled successfully!");
    
    // Reset form
    setEnrollmentForm({
      fullName: "",
      fatherName: "",
      mobile: "",
      password: "",
      email: "",
      amount: ""
    });
    
    // Refresh enrollments list
    fetchCoachingEnrollments();
  } catch (error) {
    console.error("Error adding enrollment:", error);
    alert(error.response?.data?.message || "Failed to add enrollment");
  } finally {
    setAddingEnrollment(false);
  }
};

  const handleCreateVideo = async () => {
    if (!videoData.title || !videoData.videoId) {
      alert("Please provide at least a title and Video ID");
      return;
    }
    try {
      await coachingAPI.createVideo(videoData);
      alert("Coaching video updated successfully!");
      setVideoData({ title: '', description: '', videoId: '' });
    } catch (error) {
      console.error("Error creating video:", error);
      alert("Failed to upload video");
    }
  };


    const handleCrashCreateVideo = async () => {
    if (!crashvideoData.title || !crashvideoData.videoId) {
      alert("Please provide at least a title and Video ID");
      return;
    }
    try {
      await coachingAPI.createcrashVideo(crashvideoData);
      alert("Coaching video updated successfully!");
      setCrashVideoData({ title: '', description: '', videoId: '' });
    } catch (error) {
      console.error("Error creating video:", error);
      alert("Failed to upload video");
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('🚪 Sign out initiated...');
      
      // Clear all localStorage tokens
      localStorage.removeItem('manualAuthToken');
      localStorage.removeItem('manualAuthEmail');
      localStorage.removeItem('enrollMentorship');
      
      // Clear Firebase auth
      await signOut(auth);
      
      console.log('✅ Sign out successful');
      
      // Force page refresh to clear all state
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  const fetchAllSlots = async () => {
    try {
      const response = await slotsAPI.getAll();
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };


  
  useEffect(() => {
    fetchAllSlots();
    fetchMentorshipProgram();
    fetchEnrollments();
    fetchCoachingEnrollments();
  }, []);

  const fetchMentorshipProgram = async () => {
    try {
      const response = await mentorshipAPI.getProgram();
      if (response.data && response.data.program) {
        setMentorshipProgram(response.data.program);
      } else {
        setMentorshipProgram(null);
      }
    } catch (error) {
      console.error('Error fetching mentorship program:', error);
      // If program doesn't exist or error occurs, allow creation
      setMentorshipProgram(null);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await mentorshipAPI.getAllEnrollments();
      setEnrollments(response.data.enrollments || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const startEditingProgram = () => {
    if (mentorshipProgram) {
      setEditingProgram({
        name: mentorshipProgram.name,
        description: mentorshipProgram.description,
        price: mentorshipProgram.price,
        totalSeats: mentorshipProgram.totalSeats,
        isActive: mentorshipProgram.isActive,
        features: [...mentorshipProgram.features],
      });
    }
  };

  const cancelEditingProgram = () => {
    setEditingProgram(null);
  };

  const handleCreateProgram = async () => {
    if (!newProgram.name || !newProgram.description || !newProgram.price || !newProgram.totalSeats) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // First, get the program (this will auto-create with defaults if it doesn't exist)
      await mentorshipAPI.getProgram();
      
      // Then update it with the provided values
      const response = await mentorshipAPI.updateProgram(newProgram);
      setMentorshipProgram(response.data.program);
      setCreatingProgram(false);
      alert('Mentorship program created successfully!');
    } catch (error) {
      console.error('Error creating program:', error);
      alert(error.response?.data?.error || 'Failed to create program');
    }
  };

  const handleUpdateProgram = async () => {
    if (!editingProgram) return;

    try {
      const response = await mentorshipAPI.updateProgram(editingProgram);
      setMentorshipProgram(response.data.program);
      setEditingProgram(null);
      alert('Program updated successfully!');
    } catch (error) {
      console.error('Error updating program:', error);
      alert(error.response?.data?.error || 'Failed to update program');
    }
  };

  const addSlotField = () => {
    setNewSlots([...newSlots, { startTime: '', duration: 30, price: 500 }]);
  };

  const updateSlotField = (index, field, value) => {
    const updated = [...newSlots];
    updated[index][field] = value;
    setNewSlots(updated);
  };

  const removeSlotField = (index) => {
    setNewSlots(newSlots.filter((_, i) => i !== index));
  };

  const handleCreateSlots = async () => {
    if (newSlots.some(s => !s.startTime || !s.duration)) {
      alert('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    try {
      const slotsToSend = newSlots.map(slot => ({
        ...slot,
        startTime: slot.startTime + ':00+05:30'
      }));
      
      const response = await slotsAPI.create({ slots: slotsToSend });
      alert(`Successfully created ${response.data.length} slots!`);
      setNewSlots([{ startTime: '', duration: 30, price: 500 }]);
      fetchAllSlots();
    } catch (error) {
      console.error('Error creating slots:', error);
      alert(error.response?.data?.error || 'Failed to create slots');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!confirm('Are you sure you want to delete this slot?')) return;

    try {
      await slotsAPI.delete(slotId);
      alert('Slot deleted successfully!');
      fetchAllSlots();
    } catch (error) {
      console.error('Error deleting slot:', error);
      alert(error.response?.data?.error || 'Failed to delete slot');
    }
  };

  const startEditingSlot = (slot) => {
    setEditingSlot({
      ...slot,
      startTime: new Date(slot.startTime).toISOString().slice(0, 16),
    });
  };

  const cancelEditing = () => {
    setEditingSlot(null);
  };

const fetchCoachingEnrollments = async () => {
  try {
    const response = await coachingAPI.getAllEnrollments();
    // Your API returns { success: true, users: [...] }
    if (response.data && response.data.users) {
      setCoachingEnrollments(response.data.users);
    }
  } catch (error) {
    console.error('Error fetching coaching enrollments:', error);
  }
};

  const handleUpdateSlot = async () => {
    if (!editingSlot.startTime || !editingSlot.duration) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await slotsAPI.update(editingSlot._id, {
        startTime: editingSlot.startTime,
        duration: editingSlot.duration,
        price: editingSlot.price,
      });
      alert('Slot updated successfully!');
      setEditingSlot(null);
      fetchAllSlots();
    } catch (error) {
      console.error('Error updating slot:', error);
      alert(error.response?.data?.error || 'Failed to update slot');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                📅 Manage your availability slots
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  👤 {user?.displayName}
                </div>
                <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full border border-blue-500/30">
                  Admin Access
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="group flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
              >
                🚪 <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        

{/* Coaching Video Management Section */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
      🎥
    </div>
    <h2 className="text-2xl font-bold">Complete Online Coaching for Punjab Government Exams</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <input
      type="text"
      placeholder="Video Title"
      value={videoData.title}
      onChange={(e) => setVideoData({...videoData, title: e.target.value})}
      className="px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
    />
    <input
      type="text"
      placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
      value={videoData.videoId}
      onChange={(e) => setVideoData({...videoData, videoId: e.target.value})}
      className="px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
    />
    <button
      onClick={handleCreateVideo}
      className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg font-bold transition-all"
    >
      🚀 Update Video
    </button>
  </div>
  <textarea
    placeholder="Video Description"
    value={videoData.description}
    onChange={(e) => setVideoData({...videoData, description: e.target.value})}
    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
    rows="2"
  />
</div>


{/* Admin Add Enrollment Section */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
      {/* Icon */}
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
    <div>
      <h2 className="text-2xl font-bold">Add Student Manually for Complete Online Coaching for Punjab Government Exams</h2>
      <p className="text-sm text-gray-400">Enroll student without payment (Admin only)</p>
    </div>
  </div>

  <div className="space-y-4">
    {/* Row 1: Full Name and Father Name */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter student's full name"
          value={enrollmentForm.fullName}
          onChange={(e) => setEnrollmentForm({...enrollmentForm, fullName: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Father's Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter father's name"
          value={enrollmentForm.fatherName}
          onChange={(e) => setEnrollmentForm({...enrollmentForm, fatherName: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
    </div>

    {/* Row 2: Email and Mobile */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          placeholder="student@example.com"
          value={enrollmentForm.email}
          onChange={(e) => setEnrollmentForm({...enrollmentForm, email: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Mobile Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          placeholder="9876543210"
          maxLength="10"
          value={enrollmentForm.mobile}
          onChange={(e) => setEnrollmentForm({...enrollmentForm, mobile: e.target.value.replace(/\D/g, '')})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
    </div>

    {/* Row 3: Password and Amount */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          App Password <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Set login password"
          value={enrollmentForm.password}
          onChange={(e) => setEnrollmentForm({...enrollmentForm, password: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Amount (Optional)
        </label>
        <input
          type="number"
          placeholder="Default: 4999"
          value={enrollmentForm.amount}
          onChange={(e) => setEnrollmentForm({...enrollmentForm, amount: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
    </div>

    {/* Submit Button */}
    <button
      onClick={handleAdminAddEnrollment}
      disabled={addingEnrollment}
      className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {addingEnrollment ? "Adding Student..." : "➕ Add Student"}
    </button>
  </div>
</div>


{/* Crash course batch */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
      🎥
    </div>
    <h2 className="text-2xl font-bold">Crash Course Coaching</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <input
      type="text"
      placeholder="Video Title"
      value={crashvideoData.title}
      onChange={(e) => setCrashVideoData({...crashvideoData, title: e.target.value})}
      className="px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
    />
    <input
      type="text"
      placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
      value={crashvideoData.videoId}
      onChange={(e) => setCrashVideoData({...crashvideoData, videoId: e.target.value})}
      className="px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
    />
    <button
      onClick={handleCrashCreateVideo}
      className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg font-bold transition-all"
    >
      🚀 Update Video
    </button>
  </div>
  <textarea
    placeholder="Video Description"
    value={crashvideoData.description}
    onChange={(e) => setCrashVideoData({...crashvideoData, description: e.target.value})}
    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
    rows="2"
  />
</div>


{/* Admin Add Enrollment Section */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
    <div>
      <h2 className="text-2xl font-bold">Add Student Manually for Crash Course Coaching</h2>
      <p className="text-sm text-gray-400">Enroll student without payment (Admin only)</p>
    </div>
  </div>

  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter student's full name"
          value={crashenrollmentForm.fullName}
          onChange={(e) => setcrashEnrollmentForm({...crashenrollmentForm, fullName: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Father's Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter father's name"
          value={crashenrollmentForm.fatherName}
          onChange={(e) => setcrashEnrollmentForm({...crashenrollmentForm, fatherName: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          placeholder="student@example.com"
          value={crashenrollmentForm.email}
          onChange={(e) => setcrashEnrollmentForm({...crashenrollmentForm, email: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Mobile Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          placeholder="9876543210"
          maxLength="10"
          value={crashenrollmentForm.mobile}
          onChange={(e) => setcrashEnrollmentForm({...crashenrollmentForm, mobile: e.target.value.replace(/\D/g, '')})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          App Password <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Set login password"
          value={crashenrollmentForm.password}
          onChange={(e) => setcrashEnrollmentForm({...crashenrollmentForm, password: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Amount (Optional)
        </label>
        <input
          type="number"
          placeholder="Default: 4999"
          value={crashenrollmentForm.amount}
          onChange={(e) => setcrashEnrollmentForm({...crashenrollmentForm, amount: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>
    </div>

    <button
      onClick={handleAdminCrashAddEnrollment}
      disabled={addingcrashEnrollment}
      className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {addingcrashEnrollment ? "Adding Student..." : "➕ Add Student"}
    </button>
  </div>
</div>


{/* end */}

        {/* Create New Slots Section */}
        <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
              ➕
            </div>
            <h2 className="text-2xl font-bold">Create Availability Slots</h2>
          </div>
          
          <div className="space-y-4">
            {newSlots.map((slot, index) => (
              // {[...slots].reverse().map((slot, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      🕐 Start Time <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={slot.startTime}
                      onChange={(e) => updateSlotField(index, 'startTime', e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      ⏱️ Duration (min) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="15"
                      step="15"
                      value={slot.duration}
                      onChange={(e) => updateSlotField(index, 'duration', e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      💰 Price (₹) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={slot.price}
                      onChange={(e) => updateSlotField(index, 'price', e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => removeSlotField(index)}
                      disabled={newSlots.length === 1}
                      className="w-full px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={addSlotField}
              className="group relative px-6 py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/50 hover:to-gray-500/50 rounded-lg font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                ➕ Add Another Slot
              </span>
            </button>
            
            <button
              onClick={handleCreateSlots}
              disabled={loading}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? '⏳ Creating...' : '✨ Create Slots'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>


        {/* Coaching Enrollments Section */}
{/* Coaching Enrollments Section */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.28s'}}>
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
        🎓
      </div>
      <div>
        <h2 className="text-2xl font-bold">Online Coaching Students</h2>
        <p className="text-sm text-gray-400">Manage students enrolled in full coaching</p>
      </div>
    </div>
    <div className="px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 text-sm font-bold">
      Total: {coachingEnrollments.length}
    </div>
  </div>
  
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-white/10">
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">👤 Student Details</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">📱 Contact</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">💳 Payment ID</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">📅 Enrolled On</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {coachingEnrollments.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
              No coaching enrollments found.
            </td>
          </tr>
        ) : (
          coachingEnrollments.map((student) => (
            <tr key={student._id} className="hover:bg-white/5 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  {/* CHANGED: student.userName -> student.fullName */}
                  <div className="text-sm font-medium text-white">{student.fullName}</div>
                  <div className="text-xs text-gray-400">Father: {student.fatherName || 'N/A'}</div>
                  <div className="text-[10px] text-blue-400/70 mt-1 uppercase tracking-tighter">UID: {student._id.slice(-6)}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* CHANGED: student.userEmail -> student.email */}
                <div className="text-sm text-gray-300">{student.email}</div>
                {/* CHANGED: student.mobileNumber -> student.mobile */}
                <div className="text-xs text-green-400">{student.mobile}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {/* CHANGED: student.amountPaid -> student.amount */}
                    Paid ₹{student.amount?.toLocaleString('en-IN')}
                  </span>
                  <div className="text-[10px] text-gray-500 mt-1">{student.razorpayPaymentId}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {new Date(student.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
        {/* Create Mentorship Program Section - Shows when no program exists */}
        {!mentorshipProgram && !creatingProgram && (
          <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  ⭐
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Create Mentorship Program</h2>
                  <p className="text-sm text-gray-400">Set up your Full Mentor Guidance Program</p>
                </div>
              </div>
              <button
                onClick={() => setCreatingProgram(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-bold transition-all duration-300"
              >
                ➕ Create Program
              </button>
            </div>
            <div className="text-center py-8 text-gray-400">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-lg">No mentorship program has been created yet.</p>
              <p className="text-sm mt-2">Click "Create Program" to get started.</p>
            </div>
          </div>
        )}

        {/* Create Program Form */}
        {!mentorshipProgram && creatingProgram && (
          <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                ⭐
              </div>
              <h2 className="text-2xl font-bold">Create Mentorship Program</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📝 Program Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  placeholder="Full Mentor Guidance Program"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📄 Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all resize-none"
                  placeholder="Get comprehensive mentorship with Happy, regular feedback, sessions, and full commitment"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    💰 Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newProgram.price}
                    onChange={(e) => setNewProgram({ ...newProgram, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    🪑 Total Seats <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newProgram.totalSeats}
                    onChange={(e) => setNewProgram({ ...newProgram, totalSeats: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <input
                    type="checkbox"
                    checked={newProgram.isActive}
                    onChange={(e) => setNewProgram({ ...newProgram, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  Program Active
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ✨ Features (one per line)
                </label>
                <textarea
                  value={newProgram.features.join('\n')}
                  onChange={(e) => setNewProgram({ 
                    ...newProgram, 
                    features: e.target.value.split('\n').filter(f => f.trim()) 
                  })}
                  rows={5}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all resize-none"
                  placeholder="full mentor guidance with Happy&#10;Regular feedback and guidance&#10;Personalized sessions&#10;full commitment&#10;Dedicated support"
                />
                <p className="text-xs text-gray-500 mt-1">Enter each feature on a new line</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCreatingProgram(false);
                    setNewProgram({
                      name: 'Full Mentor Guidance Program',
                      description: 'Get comprehensive mentorship with Happy, regular feedback, sessions, and full commitment',
                      price: 14999,
                      totalSeats: 6,
                      isActive: true,
                      features: [
                        'full mentor guidance with Happy',
                        'Regular feedback and guidance',
                        'Personalized sessions',
                        'Full commitment',
                        'Dedicated support',
                      ],
                    });
                  }}
                  className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg font-semibold transition-all duration-300 border border-gray-600/50"
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={handleCreateProgram}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all duration-300"
                >
                  ✅ Create Program
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mentorship Program Management Section */}
        {mentorshipProgram && (
          <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  ⭐
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Mentorship Program</h2>
                  <p className="text-sm text-gray-400">Manage Full Mentor Guidance Program</p>
                </div>
              </div>
              {!editingProgram && (
                <button
                  onClick={startEditingProgram}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-500/50 font-medium"
                >
                  ✏️ Edit Program
                </button>
              )}
            </div>

            {editingProgram ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    📝 Program Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingProgram.name}
                    onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    📄 Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={editingProgram.description}
                    onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      💰 Price (₹) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingProgram.price}
                      onChange={(e) => setEditingProgram({ ...editingProgram, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      🪑 Total Seats <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min={mentorshipProgram.enrolledCount}
                      value={editingProgram.totalSeats}
                      onChange={(e) => setEditingProgram({ ...editingProgram, totalSeats: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Currently enrolled: {mentorshipProgram.enrolledCount}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ✨ Features (one per line)
                  </label>
                  <textarea
                    value={editingProgram.features.join('\n')}
                    onChange={(e) => setEditingProgram({ 
                      ...editingProgram, 
                      features: e.target.value.split('\n').filter(f => f.trim()) 
                    })}
                    rows={5}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter each feature on a new line</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <input
                      type="checkbox"
                      checked={editingProgram.isActive}
                      onChange={(e) => setEditingProgram({ ...editingProgram, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                    />
                    Program Active
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={cancelEditingProgram}
                    className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg font-semibold transition-all duration-300 border border-gray-600/50"
                  >
                    ❌ Cancel
                  </button>
                  <button
                    onClick={handleUpdateProgram}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all duration-300"
                  >
                    ✅ Update Program
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-gray-400 mb-1">Price</div>
                  <div className="text-2xl font-bold text-green-400">₹{mentorshipProgram.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-gray-400 mb-1">Enrolled</div>
                  <div className="text-2xl font-bold text-blue-400">{mentorshipProgram.enrolledCount} / {mentorshipProgram.totalSeats}</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-gray-400 mb-1">Status</div>
                  <div className={`text-lg font-bold ${mentorshipProgram.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {mentorshipProgram.isActive ? '✅ Active' : '❌ Inactive'}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enrollments List */}
        {enrollments.length > 0 && (
          <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.25s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                📋
              </div>
              <h2 className="text-2xl font-bold">Mentorship Enrollments</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">👤 Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">💰 Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">📊 Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">📅 Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment._id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{enrollment.userName}</div>
                          <div className="text-xs text-gray-400">{enrollment.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="font-semibold text-green-400">₹{enrollment.amount.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          enrollment.status === 'confirmed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : enrollment.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {enrollment.status === 'confirmed' ? '✅ Confirmed' : enrollment.status === 'pending' ? '⏳ Pending' : '❌ Cancelled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(enrollment.createdAt).toLocaleDateString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Existing Slots Section */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
              📋
            </div>
            <h2 className="text-2xl font-bold">Your Availability Slots</h2>
          </div>
          
          {slots.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-400 text-lg">No slots created yet</p>
              <p className="text-gray-500 text-sm mt-2">Create your first availability slot above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">📅 Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">⏱️ Duration</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">💰 Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">📊 Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">👤 Booked By</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">⚙️ Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {slots.map((slot, index) => (
                    <tr key={slot._id} className="group hover:bg-white/5 transition-colors duration-200" style={{animationDelay: `${index * 50}ms`}}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(slot.startTime).toLocaleString('en-IN', { 
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {slot.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="font-semibold text-green-400">₹{slot.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          slot.status === 'free' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {slot.status === 'free' ? '✅ Free' : '🔒 Booked'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        <div>
                            <div className="text-sm font-medium text-white">
                              {slot.bookedByName || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {slot.bookedByEmail || '—'}
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {slot.status === 'free' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditingSlot(slot)}
                              className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-500/50 font-medium"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSlot(slot._id)}
                              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500/50 font-medium"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">🔒 Cannot modify</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingSlot && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                  ✏️
                </div>
                <h3 className="text-2xl font-bold">Edit Slot</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    🕐 Start Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={editingSlot.startTime}
                    onChange={(e) => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    ⏱️ Duration (minutes) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={editingSlot.duration}
                    onChange={(e) => setEditingSlot({ ...editingSlot, duration: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    💰 Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingSlot.price}
                    onChange={(e) => setEditingSlot({ ...editingSlot, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={cancelEditing}
                  className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg font-semibold transition-all duration-300 border border-gray-600/50"
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={handleUpdateSlot}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all duration-300"
                >
                  ✅ Update Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out backwards;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;