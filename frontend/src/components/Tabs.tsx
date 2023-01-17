import React, {useState} from 'react';
import Members from './Members';
import Secrets from './Secrets';
import {Context, getContext} from '../lib/context';
import analytics from '../lib/analytics';
import '../css/Tabs.css';

type State = {
  showSecrets: boolean;
  showMembers: boolean;
};

export default function Tabs() {
  const ctx: Context = getContext();

  const [state, setState] = useState<State>({
    showSecrets: true,
    showMembers: false,
  });

  function showSecrets(): void {
    setState({showSecrets: true, showMembers: false});
    analytics.track('Secrets.Show');
  }

  function showMembers(): void {
    setState({showSecrets: false, showMembers: true});
    analytics.track('Members.Show');
  }

  return (
    <div id="tabs">
      <ul id="links">
        <li className={state.showSecrets ? 'active' : ''}>
          <a onClick={showSecrets}>Secrets</a>
        </li>
        <li className={state.showMembers ? 'active' : ''}>
          <a onClick={showMembers}>Members</a>
        </li>
      </ul>

      <div className={`tab ${state.showSecrets ? '' : 'hidden'}`}>
        <Secrets />
      </div>

      <div className={`tab ${state.showMembers ? '' : 'hidden'}`}>
        <Members />
      </div>
    </div>
  );
}
