import React from 'react';
import analytics from '../lib/analytics';

export default function AddMember() {
  const addMember = function() {
    analytics.track('Members.Add');
  };

  return (
    <button onClick={addMember}>Add Member</button>
  );
}
