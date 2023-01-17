import React from 'react';

type Props = {
  name: string;
  role: 'Admin' | 'Member';
  email: string;
};

export default function Member(props: Props) {
  return (
    <tr>
      <td>
        <p className='name'>{props.name}</p>
        <p className='email'>{props.email}</p>
      </td>
      <td>
        <p className='role'>{props.role}</p>
      </td>
    </tr>
  );
}
