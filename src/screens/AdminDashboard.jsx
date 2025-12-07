// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../config/firebase';
// import { slotsAPI } from '../services/api';

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(auth.currentUser);
//   const [slots, setSlots] = useState([]);
//   const [newSlots, setNewSlots] = useState([{ startTime: '', duration: 30, price: 500 }]);
//   const [loading, setLoading] = useState(false);
//   const [editingSlot, setEditingSlot] = useState(null);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const fetchAllSlots = async () => {
//     try {
//       const response = await slotsAPI.getAll();
//       setSlots(response.data);
//     } catch (error) {
//       console.error('Error fetching slots:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAllSlots();
//   }, []);

//   const addSlotField = () => {
//     setNewSlots([...newSlots, { startTime: '', duration: 30, price: 500 }]);
//   };

//   const updateSlotField = (index, field, value) => {
//     const updated = [...newSlots];
//     updated[index][field] = value;
//     setNewSlots(updated);
//   };

//   const removeSlotField = (index) => {
//     setNewSlots(newSlots.filter((_, i) => i !== index));
//   };

//   const handleCreateSlots = async () => {
//     if (newSlots.some(s => !s.startTime || !s.duration)) {
//       alert('Please fill all required fields');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       // Convert datetime-local strings to ISO with proper IST handling
//       const slotsToSend = newSlots.map(slot => ({
//         ...slot,
//         // Append IST timezone offset to make it explicit
//         startTime: slot.startTime + ':00+05:30'  // This tells backend it's IST time
//       }));
      
//       const response = await slotsAPI.create({ slots: slotsToSend });
//       alert(`Successfully created ${response.data.length} slots!`);
//       setNewSlots([{ startTime: '', duration: 30, price: 500 }]);
//       fetchAllSlots();
//     } catch (error) {
//       console.error('Error creating slots:', error);
//       alert(error.response?.data?.error || 'Failed to create slots');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleDeleteSlot = async (slotId) => {
//     if (!confirm('Are you sure you want to delete this slot?')) return;

//     try {
//       await slotsAPI.delete(slotId);
//       alert('Slot deleted successfully!');
//       fetchAllSlots();
//     } catch (error) {
//       console.error('Error deleting slot:', error);
//       alert(error.response?.data?.error || 'Failed to delete slot');
//     }
//   };

//   const startEditingSlot = (slot) => {
//     setEditingSlot({
//       ...slot,
//       startTime: new Date(slot.startTime).toISOString().slice(0, 16),
//     });
//   };

//   const cancelEditing = () => {
//     setEditingSlot(null);
//   };

//   const handleUpdateSlot = async () => {
//     if (!editingSlot.startTime || !editingSlot.duration) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       await slotsAPI.update(editingSlot._id, {
//         startTime: editingSlot.startTime,
//         duration: editingSlot.duration,
//         price: editingSlot.price,
//       });
//       alert('Slot updated successfully!');
//       setEditingSlot(null);
//       fetchAllSlots();
//     } catch (error) {
//       console.error('Error updating slot:', error);
//       alert(error.response?.data?.error || 'Failed to update slot');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//               <p className="text-gray-600 mt-1">Manage your availability slots</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-900 font-medium">{user?.displayName}</p>
//               <p className="text-xs text-blue-600 font-semibold mb-2">Admin</p>
//               <button
//                 onClick={handleSignOut}
//                 className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Create New Slots Section */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Create Availability Slots</h2>
          
//           {newSlots.map((slot, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Start Time <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={slot.startTime}
//                   onChange={(e) => updateSlotField(index, 'startTime', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Duration (minutes) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   min="15"
//                   step="15"
//                   value={slot.duration}
//                   onChange={(e) => updateSlotField(index, 'duration', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={slot.price}
//                   onChange={(e) => updateSlotField(index, 'price', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="flex items-end">
//                 <button
//                   onClick={() => removeSlotField(index)}
//                   disabled={newSlots.length === 1}
//                   className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={addSlotField}
//               className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
//             >
//               + Add Another Slot
//             </button>
            
//             <button
//               onClick={handleCreateSlots}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
//             >
//               {loading ? 'Creating...' : 'Create Slots'}
//             </button>
//           </div>
//         </div>

//         {/* Existing Slots Section */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Your Availability Slots</h2>
          
//           {slots.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">No slots created yet</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {slots.map((slot) => (
//                     <tr key={slot._id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(slot.startTime).toLocaleString('en-IN', { 
//                           timeZone: 'Asia/Kolkata',
//                           day: '2-digit',
//                           month: 'short',
//                           year: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit',
//                           hour12: true
//                         })}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {slot.duration} min
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         ₹{slot.price}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           slot.status === 'free' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {slot.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {slot.bookedBy || '-'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         {slot.status === 'free' && (
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => startEditingSlot(slot)}
//                               className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteSlot(slot._id)}
//                               className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                         {slot.status !== 'free' && (
//                           <span className="text-gray-400 text-xs">Cannot modify</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Edit Modal */}
//         {editingSlot && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//               <h3 className="text-xl font-semibold mb-4">Edit Slot</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Time <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={editingSlot.startTime}
//                     onChange={(e) => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Duration (minutes) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     min="15"
//                     step="15"
//                     value={editingSlot.duration}
//                     onChange={(e) => setEditingSlot({ ...editingSlot, duration: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Price (₹) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={editingSlot.price}
//                     onChange={(e) => setEditingSlot({ ...editingSlot, price: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={cancelEditing}
//                   className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateSlot}
//                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                 >
//                   Update Slot
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { slotsAPI } from '../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [slots, setSlots] = useState([]);
  const [newSlots, setNewSlots] = useState([{ startTime: '', duration: 30, price: 500 }]);
  const [loading, setLoading] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
  }, []);

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
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
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
                        {slot.bookedBy || '—'}
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