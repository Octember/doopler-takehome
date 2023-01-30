import React from 'react';
import analytics from '../lib/analytics';

export default function AddSecret() {
  return (
    <button onClick={() => {
      analytics.track("Secrets.Add");
    }}>Add Secret</button>
  );
}
