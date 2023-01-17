import React from 'react';
import Member from './Member';
import AddMember from './AddMember';
import {getContext, Context} from '../lib/context';
import '../css/Members.css';

export default function Members() {
  const ctx: Context = getContext();

  return (
    <>
      <table id="members">
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
        <Member name='Jane Doe' role='Admin' email='jane@example.com' />
        <Member name='Jon Smith' role='Member' email='jon@example.com' />
      </table>
      <AddMember />
    </>
  )
}
