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
  const [coachingEnrollmentsCrashCourse, setCoachingEnrollmentsCrashCourse] = useState([]);
  const [videoData, setVideoData] = useState({ 
    title: '', 
    description: '', 
    videoId: '',       // YouTube ID
    meetingLink: '',   // Google Meet Link
    subject: 'Maths', 
    subSubject: '' 
  });
  const [crashvideoData, setCrashVideoData] = useState({ 
    title: '', 
    description: '', 
    videoId: '',
    meetingLink: '',
    subject: 'Maths', 
    subSubject: '' 
  });
  const [coachingVideos, setCoachingVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCrashEnrollmentModalOpen, setIsCrashEnrollmentModalOpen] = useState(false);
  const [crashVideos, setCrashVideos] = useState([]);
  const [isCrashVideoModalOpen, setIsCrashVideoModalOpen] = useState(false);
  const fetchCrashVideos = async () => {
  try {
    const response = await coachingAPI.getCrashCourseClasses();
    setCrashVideos(response.data);
    setIsCrashVideoModalOpen(true);
  } catch (error) {
    alert("Failed to load crash course videos");
  }
};

const handleDeleteCrashVideo = async (id) => {
  if (!window.confirm("Delete this crash course video?")) return;
  try {
    await coachingAPI.deleteCrashVideo(id);
    fetchCrashVideos(); // Refresh list
  } catch (error) {
    alert("Delete failed");
  }
};

const handleEditCrashVideo = (video) => {
  setCrashVideoData({
    id: video._id,
    title: video.title,
    description: video.description,
    videoId: video.videoId,
    meetingLink: video.meetingLink || '',
    subject: video.subject,
    subSubject: video.subSubject || ''
  });
  setIsCrashVideoModalOpen(false);
};

//   const fetchCoachingVideos = async () => {
//   try {
//     const response = await coachingAPI.getAllClasses();
//     setCoachingVideos(response.data);
//     setIsModalOpen(true); // Open modal after data is loaded
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     alert("Failed to load videos");
//   }
// };

const handleDeleteVideo = async (id) => {
  if (!window.confirm("Are you sure you want to delete this video?")) return;
  
  try {
    await coachingAPI.deleteVideo(id);
    alert("Video deleted successfully!");
    // Refresh the list after deletion
    const response = await coachingAPI.getAllClasses();
    setCoachingVideos(response.data);
  } catch (error) {
    console.error("Error deleting video:", error);
    alert("Failed to delete video");
  }
};

// NEW: Handle Video Edit (Loads data into the main form)
const handleEditVideo = (video) => {
  setVideoData({
    id: video._id,
    title: video.title,
    description: video.description,
    videoId: video.videoId,
    meetingLink: video.meetingLink || '', // Added for completeness
    subject: video.subject,               // ✅ Added
    subSubject: video.subSubject || ''    // ✅ Added
  });
  setIsModalOpen(false);
};

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
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

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


const handleCreateVideo = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Create a copy of the data to clean it up before sending
    const payload = {
      ...videoData,
      // If subject isn't General Studies, force subSubject to null
      subSubject: videoData.subject === 'General Studies' ? videoData.subSubject : null
    };

    await coachingAPI.createVideo(payload);
    alert("Lecture Published Successfully!");
    
    // Reset form
    setVideoData({ title: '', description: '', videoId: '', meetingLink: '', subject: 'Maths', subSubject: '' });
    fetchCoachingVideos(); 
  } catch (error) {
    console.error("Error creating lecture:", error);
    alert("Failed to publish lecture.");
  } finally {
    setLoading(false);
  }
};

  const handleCrashCreateVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create a copy of the data to clean it up before sending
      const payload = {
        ...crashvideoData,
        // If subject isn't General Studies, force subSubject to null
        subSubject: crashvideoData.subject === 'General Studies' ? crashvideoData.subSubject : null
      };

      if (crashvideoData.id) {
        await coachingAPI.updateCrashVideo(crashvideoData.id, payload);
        alert("Crash Course Lecture Updated Successfully!");
      } else {
        await coachingAPI.createCrashVideo(payload);
        alert("Crash Course Lecture Published Successfully!");
      }
      
      // Reset form
      setCrashVideoData({ title: '', description: '', videoId: '', meetingLink: '', subject: 'Maths', subSubject: '' });
      fetchCrashVideos(); 
    } catch (error) {
      console.error("Error creating crash course lecture:", error);
      alert("Failed to publish crash course lecture.");
    } finally {
      setLoading(false);
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

  const [adminFilter, setAdminFilter] = useState(""); // State for filtering the list

const fetchCoachingVideos = async () => {
  try {
    const res = await coachingAPI.getAllClasses(adminFilter);
    setCoachingVideos(res.data);
    // setIsModalOpen(true); // Add this line to show the modal
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};
// Re-fetch when the filter changes
useEffect(() => {
  fetchCoachingVideos();
}, [adminFilter]);


  
  useEffect(() => {
    fetchAllSlots();
    fetchMentorshipProgram();
    fetchEnrollments();
    fetchCoachingEnrollments();
    fetchCoachingEnrollmentsCrashCourse();
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


const fetchCoachingEnrollmentsCrashCourse = async () => {
  try {
    const response = await coachingAPI.getAllEnrollmentsCrashCourse();
    // Your API returns { success: true, users: [...] }
    if (response.data && response.data.users) {
      setCoachingEnrollmentsCrashCourse(response.data.users);
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
    <h2 className="text-2xl font-bold">5 Month Complete Online Coaching for Punjab Government Exams</h2>
      <button
    onClick={() => {
      fetchCoachingVideos();
      setIsModalOpen(true); // ✅ Add this here to open it only on click
    }}
    className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 transition-all text-sm font-bold"
  >
    📋 View All Classes
  </button>
  </div>



  <form onSubmit={handleCreateVideo} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Subject Selection */}
    <select
      value={videoData.subject}
      onChange={(e) => setVideoData({ ...videoData, subject: e.target.value, subSubject: '' })}
      className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
      required
    >
      {["Maths", "Reasoning", "English", "Punjabi GK", "Punjabi Grammar", "General Knowledge", "Computer", "Current Affairs", "General Studies"].map(sub => (
        <option key={sub} value={sub} className="bg-gray-900">{sub}</option>
      ))}
    </select>

    {/* Sub-Subject Selection (Only shows if General Studies is picked) */}
    {videoData.subject === 'General Studies' && (
  <div className="flex flex-col gap-2 animate-fade-in">
    <label className="text-white/60 text-sm ml-1">GS Topic (Sub-Subject)</label>
    <select
      value={videoData.subSubject}
      onChange={(e) => setVideoData({ ...videoData, subSubject: e.target.value })}
      className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
      required
    >
      <option value="" className="bg-gray-900">Select GS Topic</option> 
      {["Polity", "Economics", "Geography", "Environment", "Science", "Modern-History", "Ancient-History", "Medieval-History"].map(topic => (
        <option key={topic} value={topic} className="bg-gray-900">{topic}</option>
      ))}
    </select>
  </div>
)}
      </div>
      
      {/* Live Link vs YouTube Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Google Meet Link (Live)"
          value={videoData.meetingLink}
          onChange={(e) => setVideoData({ ...videoData, meetingLink: e.target.value })}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        />
        <input
          type="text"
          placeholder="YouTube Video ID (Recorded)"
          value={videoData.videoId}
          onChange={(e) => setVideoData({ ...videoData, videoId: e.target.value })}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        />
      </div>
      
      <input
        type="text"
        placeholder="Lecture Title"
        value={videoData.title}
        onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        required
      />

      <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">
        {loading ? "Publishing..." : "Publish Lecture"}
      </button>
    </form>
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
      <h2 className="text-2xl font-bold">Add Student Manually for 5 Month Complete Online Coaching for Punjab Government Exams</h2>
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
    <h2 className="text-2xl font-bold">3 Month Crash Course Coaching</h2>

<button
  onClick={fetchCrashVideos}
  className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 transition-all text-sm font-bold"
>
  📋 View All Classes
</button>

  </div>

  <form onSubmit={handleCrashCreateVideo} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Subject Selection */}
    <select
      value={crashvideoData.subject}
      onChange={(e) => setCrashVideoData({ ...crashvideoData, subject: e.target.value, subSubject: '' })}
      className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
      required
    >
      {["Maths", "Reasoning", "English", "Punjabi GK", "Punjabi Grammar", "General Knowledge", "Computer", "Current Affairs", "General Studies"].map(sub => (
        <option key={sub} value={sub} className="bg-gray-900">{sub}</option>
      ))}
    </select>

    {/* Sub-Subject Selection (Only shows if General Studies is picked) */}
    {crashvideoData.subject === 'General Studies' && (
  <div className="flex flex-col gap-2 animate-fade-in">
    <label className="text-white/60 text-sm ml-1">GS Topic (Sub-Subject)</label>
    <select
      value={crashvideoData.subSubject}
      onChange={(e) => setCrashVideoData({ ...crashvideoData, subSubject: e.target.value })}
      className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
      required
    >
      <option value="" className="bg-gray-900">Select GS Topic</option> 
      {["Polity", "Economics", "Geography", "Environment", "Science", "Modern-History", "Ancient-History", "Medieval-History"].map(topic => (
        <option key={topic} value={topic} className="bg-gray-900">{topic}</option>
      ))}
    </select>
  </div>
)}
      </div>
      
      {/* Live Link vs YouTube Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Google Meet Link (Live)"
          value={crashvideoData.meetingLink}
          onChange={(e) => setCrashVideoData({ ...crashvideoData, meetingLink: e.target.value })}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        />
        <input
          type="text"
          placeholder="YouTube Video ID (Recorded)"
          value={crashvideoData.videoId}
          onChange={(e) => setCrashVideoData({ ...crashvideoData, videoId: e.target.value })}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        />
      </div>
      
      <input
        type="text"
        placeholder="Lecture Title"
        value={crashvideoData.title}
        onChange={(e) => setCrashVideoData({ ...crashvideoData, title: e.target.value })}
        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        required
      />

      <textarea
        placeholder="Lecture Description"
        value={crashvideoData.description}
        onChange={(e) => setCrashVideoData({ ...crashvideoData, description: e.target.value })}
        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white"
        rows="3"
      />

      <button type="submit" className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl font-bold">
        {loading ? "Publishing..." : (crashvideoData.id ? "Update Crash Lecture" : "Publish Crash Lecture")}
      </button>
    </form>
</div>

{/* Admin Add Enrollment Section for Crash Course */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
    <div>
      <h2 className="text-2xl font-bold">Add Student Manually for 3 Month Crash Course Coaching</h2>
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


{/* Crash Course Enrollments Section */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.3s'}}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
        🎓
      </div>
      <div>
        <h2 className="text-2xl font-bold">3 Month Crash Course Students</h2>
        <p className="text-sm text-gray-400">Manage students enrolled in crash course</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 text-sm font-bold">
        Total: {coachingEnrollmentsCrashCourse.length}
      </div>
      <button 
        onClick={() => setIsCrashEnrollmentModalOpen(true)}
        className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 transition-all text-sm font-bold"
      >
        👁️ View All Students
      </button>
    </div>
  </div>
</div>

{/* end */}

        {/* Create New Slots Section */}



        {/* Coaching Enrollments Section */}
{/* Coaching Enrollments Section */}
{/* Coaching Enrollments Section */}
<div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.28s'}}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
        🎓
      </div>
      <div>
        <h2 className="text-2xl font-bold">5 Month Online Coaching Students</h2>
        <p className="text-sm text-gray-400">Manage students enrolled in full coaching</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 text-sm font-bold">
        Total: {coachingEnrollments.length}
      </div>
      <button 
        onClick={() => setIsEnrollmentModalOpen(true)}
        className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 transition-all text-sm font-bold"
      >
        👁️ View All Students
      </button>
    </div>
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
        {/* {mentorshipProgram && (
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
        )} */}

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

        {/* Coaching Videos Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-800/50">
                <h3 className="text-xl font-bold">All Uploaded Classes</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="grid gap-4">
                  {coachingVideos.map((video) => (
                  <div key={video._id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center hover:bg-white/10 transition-all">
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-400">{video.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-1">{video.description}</p>
                    </div>
                                    
                    <div className="flex gap-2">
                      {/* VIEW BUTTON - Opens YouTube in new tab */}
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 text-xs"
                      >
                        👁️ View
                      </a>
                                    
                      {/* EDIT BUTTON */}
                      <button 
                        onClick={() => handleEditVideo(video)}
                        className="p-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 text-xs"
                      >
                        ✏️ Edit
                      </button>
                                    
                      {/* DELETE BUTTON */}
                      <button 
                        onClick={() => handleDeleteVideo(video._id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 text-xs"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    </div>
                  ))}
                  {coachingVideos.length === 0 && <p className="text-center text-gray-500 py-10">No videos found.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enrollment Students Modal */}
{isEnrollmentModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
      {/* Modal Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-800/50">
        <h3 className="text-xl font-bold">Enrolled Students (5 Month Program)</h3>
        <button 
          onClick={() => setIsEnrollmentModalOpen(false)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <div className="overflow-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">👤 Student</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">📱 Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">💳 Payment</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">📅 Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">AddedByAdmin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {coachingEnrollments.map((student) => (
                  <tr key={student._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{student.fullName}</div>
                      <div className="text-xs text-gray-400">Father: {student.fatherName || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{student.email}</div>
                      <div className="text-xs text-green-400">{student.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        ₹{student.amount?.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(student.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {student?.addedByAdmin ? "Yes" : "--"}
                    </td>
                  </tr>
                ))}
                </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Crash Course Enrollment List Modal */}
{isCrashEnrollmentModalOpen && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-800/50">
        <h3 className="text-xl font-bold text-orange-400">3 Month Crash Course - Enrolled Students</h3>
        <button onClick={() => setIsCrashEnrollmentModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-gray-400 text-sm">
              <th className="px-6 py-4 font-medium">Student Details</th>
              <th className="px-6 py-4 font-medium">Mobile</th>
              <th className="px-6 py-4 font-medium">Payment ID</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Admin Add</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {coachingEnrollmentsCrashCourse.map((student) => (
              <tr key={student._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{student.fullName}</div>
                  <div className="text-xs text-gray-500">{student.email}</div>
                  <div className="text-[10px] text-gray-600">F: {student.fatherName}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{student.mobile}</td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                    {student.razorpayPaymentId || "MANUAL"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-green-400">₹{student.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(student.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                    {student?.addedByAdmin ? "✅ Yes" : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {coachingEnrollmentsCrashCourse.length === 0 && (
          <div className="py-20 text-center text-gray-500 italic">No students found in this course.</div>
        )}
      </div>
    </div>
  </div>
)}

{/* --- MODAL FOR CRASH COURSE CLASSES --- */}
{isCrashVideoModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-800/50">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          📋 All Crash Course Classes ({crashVideos.length})
        </h3>
        <button 
          onClick={() => setIsCrashVideoModalOpen(false)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-4">
          {crashVideos.map((video) => (
            <div key={video._id} className="p-4 bg-gray-800/50 border border-white/5 rounded-xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
              <div>
                <h4 className="font-bold text-blue-400">{video.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-1">{video.description}</p>
                <code className="text-xs text-gray-500 mt-1 block">ID: {video.videoId}</code>
              </div>
              <div className="flex gap-2">

                <a 
                  href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 text-xs"
                >
                  👁️ View
                </a>
                <button
                  onClick={() => handleEditCrashVideo(video)}
                  className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/20 transition-all"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteCrashVideo(video._id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
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