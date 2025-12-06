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
      const response = await slotsAPI.create({ slots: newSlots });
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your availability slots</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900 font-medium">{user?.displayName}</p>
              <p className="text-xs text-blue-600 font-semibold mb-2">Admin</p>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Create New Slots Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Availability Slots</h2>
          
          {newSlots.map((slot, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={slot.startTime}
                  onChange={(e) => updateSlotField(index, 'startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={slot.duration}
                  onChange={(e) => updateSlotField(index, 'duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={slot.price}
                  onChange={(e) => updateSlotField(index, 'price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => removeSlotField(index)}
                  disabled={newSlots.length === 1}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-4 mt-4">
            <button
              onClick={addSlotField}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              + Add Another Slot
            </button>
            
            <button
              onClick={handleCreateSlots}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'Creating...' : 'Create Slots'}
            </button>
          </div>
        </div>

        {/* Existing Slots Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Availability Slots</h2>
          
          {slots.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No slots created yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {slots.map((slot) => (
                    <tr key={slot._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(slot.startTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {slot.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ₹{slot.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          slot.status === 'free' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {slot.bookedBy || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {slot.status === 'free' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditingSlot(slot)}
                              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSlot(slot._id)}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        {slot.status !== 'free' && (
                          <span className="text-gray-400 text-xs">Cannot modify</span>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Edit Slot</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={editingSlot.startTime}
                    onChange={(e) => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={editingSlot.duration}
                    onChange={(e) => setEditingSlot({ ...editingSlot, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingSlot.price}
                    onChange={(e) => setEditingSlot({ ...editingSlot, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={cancelEditing}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSlot}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Update Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
