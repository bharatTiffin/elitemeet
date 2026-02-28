import React, { useState, useEffect } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';

const PdfIcon = ({ active }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill={active ? '#22c55e' : '#64748b'} fillOpacity="0.15"/>
    <path d="M7 7h10v10H7V7zm2 2v6h6V9H9z" fill={active ? '#22c55e' : '#64748b'} />
  </svg>
);

const RESUME_ACCEPT = 'application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const JOBS = [
  { label: 'Data Entry', value: 'data-entry', color: 'from-emerald-400 to-cyan-500', border: 'emerald-400', focus: 'focus:border-emerald-400/70' },
  { label: 'Teacher', value: 'teacher', color: 'from-amber-400 to-orange-600', border: 'amber-400', focus: 'focus:border-amber-400/70' },
  { label: 'Content Creator', value: 'content-creator', color: 'from-fuchsia-500 to-purple-600', border: 'fuchsia-500', focus: 'focus:border-fuchsia-500/70' },
];

const COUNTRIES = [
  'India', 'USA', 'Canada', 'UK', 'Australia', 'Other'
];

function getInterviewDates() {
  const dates = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(
      date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }) + ' | 8:00 AM IST'
    );
  }
  return dates;
}

export default function JoinTeam() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get('role') || 'teacher';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: initialRole,
    country: '',
    contract: '12month',
    interview: getInterviewDates()[0],
    resume: null,
  });
  const [resumeName, setResumeName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [jobInfo, setJobInfo] = useState(null);

  useEffect(() => {
    jobAPI.getInfo().then((res) => setJobInfo(res.data)).catch(() => setJobInfo({ price: 50, currency: 'USD' }));
  }, []);

  const jobObj = JOBS.find(j => j.value === formData.role) || JOBS[1];
  const interviewDates = getInterviewDates();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const allowedResumeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const isResumeValid = (file) => file && allowedResumeTypes.includes(file.type);

  const handleResume = e => {
    const file = e.target.files[0];
    if (isResumeValid(file)) {
      setFormData(f => ({ ...f, resume: file }));
      setResumeName(file.name);
      setError('');
    } else {
      setError('Please upload a PDF, DOC or DOCX file.');
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (isResumeValid(file)) {
      setFormData(f => ({ ...f, resume: file }));
      setResumeName(file.name);
      setError('');
    } else {
      setError('Please upload a PDF, DOC or DOCX file.');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    if (!formData.resume) {
      setError('Please upload your resume.');
      setSubmitting(false);
      return;
    }
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError('Could not load payment. Please try again.');
        setSubmitting(false);
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('contract', formData.contract);
      formDataToSend.append('interview', formData.interview);
      formDataToSend.append('resume', formData.resume);

      const { data } = await jobAPI.createOrder(formDataToSend);
      const { order, razorpayKeyId } = data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Elite Academy',
        description: 'Job application fee',
        order_id: order.id,
        handler: function () {
          setSubmitting(false);
          setSuccess(true);
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: jobObj?.border === 'emerald-400' ? '#10b981' : jobObj?.border === 'amber-400' ? '#f59e0b' : '#d946ef' },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className={`max-w-2xl w-full mx-auto mt-16 mb-8 p-8 rounded-3xl border-2 shadow-xl bg-white/5 backdrop-blur-xl transition-all duration-300 ${formData.role === 'teacher' ? 'border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : formData.role === 'data-entry' ? 'border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-fuchsia-500/30 shadow-[0_0_20px_rgba(232,121,249,0.1)]'}` }>
        <h1 className={`text-3xl sm:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r ${jobObj.color} bg-clip-text text-transparent`}>Begin Your Career at Elite Academy</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${jobObj.focus}`} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="you@email.com" className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${jobObj.focus}`} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +1 (416) 555-0123" className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${jobObj.focus}`} />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold mb-1 text-white">Country</label>
              <select name="country" value={formData.country} onChange={handleChange} required className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all appearance-none pr-10 ${jobObj.focus}` }>
                <option value="" className="bg-black">Select Country</option>
                {COUNTRIES.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
              {/* Custom arrow */}
              <span className="pointer-events-none absolute right-3 top-9 transform -translate-y-1/2">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1 text-white">Address</label>
              <input name="address" value={formData.address} onChange={handleChange} required placeholder="Your Address" className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${jobObj.focus}`} />
            </div>
          </div>
          {/* Job Details */}
          <div className="grid grid-row-1 md:grid-row-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Job Opt For</label>
              <div className="relative">
                <select name="role" value={formData.role} onChange={handleChange} className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all appearance-none pr-10 ${jobObj.focus}` }>
                  {JOBS.map(j => <option key={j.value} value={j.value} className="bg-black">{j.label}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-4 transform -translate-y-1/2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Contract</label>
              <div className="flex gap-4 mt-2">
                {['6month', '9month', '12month'].map(opt => (
                  <label key={opt} className={`cursor-pointer px-6 py-3 rounded-xl border-2 font-semibold text-white transition-all duration-200 flex-1 text-center select-none ${formData.contract === opt ? `border-4 border-transparent bg-gradient-to-r ${jobObj.color} text-black shadow-lg ring-2 ring-${jobObj.border}/40` : 'border-white/10 bg-white/10 hover:border-white/20'}` }>
                    <input type="radio" name="contract" value={opt} checked={formData.contract === opt} onChange={handleChange} className="hidden" />
                    {opt.replace('month', ' Months')}
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Interview Date as Time Slots */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-white">Interview Date Available</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {interviewDates.map(date => (
                <label key={date} className={`cursor-pointer px-6 py-3 rounded-xl border-2 font-semibold text-white transition-all duration-200 flex items-center gap-2 ${formData.interview === date ? `bg-gradient-to-r ${jobObj.color} text-black border-transparent scale-105 shadow-lg` : 'border-white/10 bg-white/10 hover:border-white/20'}` }>
                  <input type="radio" name="interview" value={date} checked={formData.interview === date} onChange={handleChange} className="hidden" />
                  {date.split('|')[0].trim()} <span className="ml-2 px-2 py-0.5 rounded bg-white/10 text-xs text-emerald-300 border border-emerald-600/20">IST</span>
                  <span className="ml-2 text-xs text-gray-800">{date.split('|')[1]?.trim()}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-white">Resume (PDF, DOC or DOCX)</label>
            <div
              className={`w-full border-2 ${formData.resume ? 'border-emerald-400' : 'border-white/10'} border-dashed rounded-xl p-4 bg-white/5 text-white flex flex-col items-center justify-center cursor-pointer transition-all duration-200`}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => document.getElementById('resume-upload').click()}
            >
              <input id="resume-upload" type="file" accept={RESUME_ACCEPT} className="hidden" onChange={handleResume} />
              <div className="flex items-center">
                <PdfIcon active={!!resumeName} />
                {resumeName ? (
                  <span className="font-semibold text-emerald-300">{resumeName}</span>
                ) : (
                  <span className="text-gray-400">Drag & Drop or Click to Upload</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="mb-2 text-lg font-bold text-white">Pay: <span className="text-emerald-400">{jobInfo?.currency === 'USD' ? '$' : '₹'}{jobInfo?.price ?? (jobInfo?.currency === 'USD' ? 50 : 500)}</span></div>
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-gray-300"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0f9d58"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Secured by Razorpay</div>
            <button type="submit" disabled={submitting} className={`w-full py-3 rounded-lg font-bold text-lg bg-gradient-to-r ${jobObj.color} shadow-lg hover:opacity-90 transition-all duration-300 ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>{submitting ? 'Processing...' : 'Submit & Pay'}</button>
            {error && <div className="mt-2 text-red-400 font-semibold">{error}</div>}
            {success && <div className="mt-2 text-emerald-400 font-semibold">Application submitted! Check your email for interview details and meeting link.</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
