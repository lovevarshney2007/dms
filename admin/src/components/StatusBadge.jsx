export default function StatusBadge({ status }) {
  const map = {
    pending:     'pending',
    approved:    'approved',
    rejected:    'rejected',
    shortlisted: 'shortlisted',
    replied:     'replied',
    resolved:    'resolved',
    contacted:   'contacted',
    active:      'active',
    new:         'new',
    inactive:    'resolved',
  };
  const cls = map[status] || 'pending';
  const labels = {
    pending: 'Pending', approved: 'Approved', rejected: 'Rejected',
    shortlisted: 'Shortlisted', replied: 'Replied', resolved: 'Resolved',
    contacted: 'Contacted', active: 'Active', new: 'New', inactive: 'Inactive',
  };
  return <span className={`badge ${cls}`}>{labels[status] || status}</span>;
}
