import React from 'react';
import Secret from './Secret';
import AddSecret from './AddSecret';
import {getContext, Context} from '../lib/context';

export default function Secrets() {
  const ctx: Context = getContext();

  return (
    <>
      <div className='secrets-list'>
        {[...Array(25)].map(n => <Secret />)}
      </div>
      <AddSecret />
    </>
  );
}
