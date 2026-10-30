import { useState, useEffect, useCallback } from 'react';
import { teacherLeaveAPI } from '../services/api';

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const fmtTime = (hhmm) => {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

const fmtDate = (ymd) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
  });
};

const TYPE_META = {
  lecture: { label: 'Lecture', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  half_day: { label: 'Half day', badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  full_day: { label: 'Full day', badge: 'bg-red-500/15 text-red-300 border-red-500/30' },
};

const emptyForm = () => ({
  teacherId: '', type: 'lecture', lectureCount: 1, date: todayStr(), dateTo: '',
  startTime: '18:00', endTime: '19:00', note: '', notify: true,
});

function TeacherLeaveTracker() {
  const [month, setMonth] = useState(todayStr().slice(0, 7));
  const [summary, setSummary] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { ok, text }
  const [expanded, setExpanded] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [emailDraft, setEmailDraft] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await teacherLeaveAPI.getSummary(month);
      setSummary(res.data.summary || []);
    } catch (err) {
      setMessage({ ok: false, text: err.response?.data?.error || 'Failed to load teacher leaves' });
    }
  }, [month]);

  useEffect(() => { load(); }, [load]);

  // Default the teacher dropdown to the first teacher once loaded
  useEffect(() => {
    if (!form.teacherId && summary.length) setForm((f) => ({ ...f, teacherId: summary[0].teacher._id }));
  }, [summary, form.teacherId]);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  // Per-lecture teachers (Sourab sir) only miss lectures, so they pick a lecture count instead of full/half day
  const selectedTeacher = summary.find((s) => s.teacher._id === form.teacherId)?.teacher;
  const isPerLecture = selectedTeacher?.payType === 'per_lecture';
  const effType = isPerLecture ? 'lecture' : form.type;
  const needsTime = effType !== 'full_day';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        ...form,
        type: effType,
        lectureCount: effType === 'lecture' ? form.lectureCount : 1,
        dateTo: effType === 'full_day' ? form.dateTo : '',
      };
      const res = await teacherLeaveAPI.createLeave(payload);
      const { created, emailSent, emailError } = res.data;
      const mail = !form.notify ? '' : emailSent ? ' Email sent to teacher.' : ` Saved, but email failed (${emailError}).`;
      setMessage({ ok: !form.notify || emailSent, text: `Marked ${created} absence${created > 1 ? 's' : ''}.${mail}` });
      setForm((f) => ({ ...emptyForm(), teacherId: f.teacherId, type: f.type }));
      // Jump to the month of the date just saved so it's visible
      if (payload.date.slice(0, 7) !== month) setMonth(payload.date.slice(0, 7)); else load();
    } catch (err) {
      setMessage({ ok: false, text: err.response?.data?.error || 'Failed to save absence' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (leave, teacher) => {
    const notify = window.confirm(`Remove this absence for ${teacher.name}?\n\nPress OK to remove it, then you'll be asked whether to email them.`)
      ? window.confirm(`Also email ${teacher.name} that this leave was cancelled?`)
      : null;
    if (notify === null) return;
    try {
      await teacherLeaveAPI.deleteLeave(leave._id, notify);
      load();
    } catch (err) {
      setMessage({ ok: false, text: err.response?.data?.error || 'Failed to remove' });
    }
  };

  const startEdit = (teacher) => { setEditingId(teacher._id); setEmailDraft(teacher.email); };

  const saveEmail = async (teacher) => {
    const email = emailDraft.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage({ ok: false, text: 'Enter a valid email address' });
      return;
    }
    try {
      await teacherLeaveAPI.updateTeacher(teacher._id, { email });
      setEditingId(null);
      setMessage({ ok: true, text: `Email updated for ${teacher.name}.` });
      load();
    } catch (err) {
      setMessage({ ok: false, text: err.response?.data?.error || 'Failed to update email' });
    }
  };

  const inputCls ='w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50';
  const labelCls = 'block text-xs font-medium text-gray-400 mb-1';

  return (
    <div className="mb-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">🗓️</div>
          <h2 className="text-2xl font-bold">Teacher Absences</h2>
        </div>
        <input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50" />
      </div>

      {/* Mark absent form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-3 items-end">
        <div className="lg:col-span-1">
          <label className={labelCls}>Teacher</label>
          <select className={inputCls} value={form.teacherId} onChange={(e) => set({ teacherId: e.target.value })} required>
            {summary.map(({ teacher }) => (
              <option key={teacher._id} value={teacher._id}>{teacher.name}{teacher.subject ? ` (${teacher.subject})` : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Absent for</label>
          {isPerLecture ? (
            <select className={inputCls} value={form.lectureCount} onChange={(e) => set({ lectureCount: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'lecture' : 'lectures'}</option>
              ))}
            </select>
          ) : (
            <select className={inputCls} value={form.type} onChange={(e) => set({ type: e.target.value })}>
              <option value="lecture">One lecture</option>
              <option value="half_day">Half day</option>
              <option value="full_day">Full day</option>
            </select>
          )}
        </div>
        <div>
          <label className={labelCls}>{effType === 'full_day' ? 'From date' : 'Date'}</label>
          <input type="date" className={inputCls} value={form.date} onChange={(e) => set({ date: e.target.value })} required />
        </div>
        {effType === 'full_day' ? (
          <div className="lg:col-span-2">
            <label className={labelCls}>Till date (optional, skips Sat/Sun)</label>
            <input type="date" className={inputCls} value={form.dateTo} min={form.date} onChange={(e) => set({ dateTo: e.target.value })} />
          </div>
        ) : (
          <>
            <div>
              <label className={labelCls}>From</label>
              <input type="time" className={inputCls} value={form.startTime} onChange={(e) => set({ startTime: e.target.value })} required={needsTime} />
            </div>
            <div>
              <label className={labelCls}>To</label>
              <input type="time" className={inputCls} value={form.endTime} onChange={(e) => set({ endTime: e.target.value })} required={needsTime} />
            </div>
          </>
        )}
        <button type="submit" disabled={saving || !form.teacherId}
          className="px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50">
          {saving ? 'Saving...' : 'Mark Absent'}
        </button>
        <div className="sm:col-span-2 lg:col-span-4">
          <input className={inputCls} placeholder="Note (optional)" value={form.note} onChange={(e) => set({ note: e.target.value })} />
        </div>
        <label className="lg:col-span-2 flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" checked={form.notify} onChange={(e) => set({ notify: e.target.checked })} />
          Email the teacher
        </label>
      </form>

      {message && (
        <p className={`text-sm mb-3 ${message.ok ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>
      )}

      {/* Monthly summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {summary.map(({ teacher, fullDays, halfDays, lectures, leaves }) => {
          const isOpen = expanded === teacher._id;
          const isLectureTeacher = teacher.payType === 'per_lecture';
          const total = isLectureTeacher ? lectures : fullDays + halfDays + lectures;
          return (
            <div key={teacher._id} className="bg-gray-900/60 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{teacher.name}</div>
                  <div className="text-xs text-gray-500">
                    {teacher.payType === 'per_lecture' ? `₹${teacher.ratePerLecture}/lecture` : 'Salary based'}
                  </div>
                  {editingId === teacher._id ? (
                    <div className="flex items-center gap-1 mt-1">
                      <input type="email" value={emailDraft} onChange={(e) => setEmailDraft(e.target.value)}
                        className="w-44 px-2 py-1 text-xs bg-gray-800 border border-white/10 rounded text-white focus:outline-none focus:border-blue-500/50" />
                      <button onClick={() => saveEmail(teacher)} className="text-green-400 hover:text-green-300 text-xs px-1" title="Save">✓</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-300 text-xs px-1" title="Cancel">✕</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <span className="break-all">{teacher.email}</span>
                      <button onClick={() => startEdit(teacher)} className="text-blue-400 hover:text-blue-300" title="Edit email">✎</button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">{total}</div>
                  <div className="text-xs text-gray-500">{isLectureTeacher ? (total === 1 ? 'lecture missed' : 'lectures missed') : 'entries'}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {teacher.payType === 'per_lecture' ? (
                  <span className="px-2 py-1 rounded-full border bg-amber-500/15 text-amber-300 border-amber-500/30">{lectures} lectures missed</span>
                ) : (
                  <>
                    <span className="px-2 py-1 rounded-full border bg-red-500/15 text-red-300 border-red-500/30">{fullDays} full day</span>
                    <span className="px-2 py-1 rounded-full border bg-purple-500/15 text-purple-300 border-purple-500/30">{halfDays} half day</span>
                    <span className="px-2 py-1 rounded-full border bg-amber-500/15 text-amber-300 border-amber-500/30">{lectures} lecture</span>
                  </>
                )}
                {teacher.payType === 'per_lecture' && (fullDays > 0 || halfDays > 0) && (
                  <span className="px-2 py-1 rounded-full border bg-gray-500/15 text-gray-300 border-gray-500/30">+ {fullDays} full / {halfDays} half day entries</span>
                )}
              </div>
              {leaves.length > 0 && (
                <button onClick={() => setExpanded(isOpen ? null : teacher._id)} className="mt-3 text-xs text-blue-400 hover:text-blue-300">
                  {isOpen ? 'Hide details' : 'Show details'}
                </button>
              )}
              {isOpen && (
                <ul className="mt-2 space-y-1.5">
                  {leaves.map((l) => (
                    <li key={l._id} className="flex items-center justify-between gap-2 text-sm bg-gray-800/60 rounded-lg px-3 py-2">
                      <div>
                        <span className="text-gray-200">{fmtDate(l.date)}</span>
                        <span className={`ml-2 px-1.5 py-0.5 rounded border text-[11px] ${TYPE_META[l.type].badge}`}>{l.type === 'lecture' ? `${l.lectureCount || 1} ${(l.lectureCount || 1) === 1 ? 'lecture' : 'lectures'}` : TYPE_META[l.type].label}</span>
                        {l.startTime && <div className="text-xs text-gray-400">{fmtTime(l.startTime)} – {fmtTime(l.endTime)}</div>}
                        {l.note && <div className="text-xs text-gray-500">{l.note}</div>}
                      </div>
                      <button onClick={() => handleDelete(l, teacher)} className="text-red-400 hover:text-red-300 text-xs" title="Remove">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeacherLeaveTracker;
