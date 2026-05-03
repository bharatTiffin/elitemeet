import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pyqsAPI } from '../services/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PyqsBookPurchase() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ fullName: '', fatherName: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await pyqsAPI.getInfo();
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openPurchase = async () => {
    // validation
    if (!form.fullName || !form.fatherName || !form.email || !form.mobile || !form.password) {
      alert('Please fill all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay');
        setProcessing(false);
        return;
      }

      const response = await pyqsAPI.createOrder(form);
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy - PYQs Book',
        description: 'PYQs Book Access',
        order_id: order.id,
        handler: function (razorpayResponse) {
          alert('Payment successful! Please check your email in 5 minutes for access details.');
          setShowModal(false);
        },
        prefill: {
          name: form.fullName,
          email: form.email,
        },
        theme: { color: '#3b82f6' },
        modal: { ondismiss: function() { setProcessing(false); } }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed.');
        setProcessing(false);
      });
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert('Could not create order.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const price = info?.price || 0;
  const strikePrice = Number(price) + 200;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">PYQs Book — Subjectwise & Topicwise</h1>
      <p className="mb-4">More than 20,000 previous-year questions across all relevant subjects for Punjab exams.</p>

      <div className="bg-white p-6 rounded-lg shadow mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Full PYQs Collection</h2>
          <ul className="mt-2 text-sm text-gray-600">
            <li>Maths</li>
            <li>Reasoning</li>
            <li>Punjab Grammar</li>
            <li>Punjabi GK</li>
            <li>English</li>
            <li>Computer</li>
            <li>Current affairs</li>
            <li>Medieval / Modern / Ancient History</li>
            <li>Science, Polity, Geography, Environment, Economics</li>
          </ul>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 line-through">₹{strikePrice}</div>
          <div className="text-2xl font-bold">₹{price}</div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Get Started →</button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Final Step: Enrollment</h3>
            <div className="space-y-2">
              <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="fatherName" placeholder="Father's Name" value={form.fatherName} onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="password" type="password" placeholder="Set Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <p className="text-sm text-gray-600 mt-3">After payment, details will be sent to your email within 5 minutes. Call 7696954686 for support. Make sure your email is correct.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={openPurchase} disabled={processing}>{processing ? 'Processing...' : 'Pay Now'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
