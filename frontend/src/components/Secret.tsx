import React, {useState} from 'react';
import {randomWord, randomKey} from '../lib/words';
import '../css/Secret.css';

type State = {
  revealPassword: boolean;
  key: string;
  value: string;
};

export default function Secret() {
  const [values, setValues] = useState<State>({
    revealPassword: false,
    key: randomKey(3),
    value: randomWord(),
  });

  function reveal() {
    setValues({...values, revealPassword: true});
  }

  function hide(e: React.MouseEvent<HTMLElement>) {
    (e.target as HTMLElement).blur();
    setValues({...values, revealPassword: false});
  }

  return (
    <div className="secret">
      <div className="key">
        <input type="text" value={values.key} />
      </div>

      <div className="value">
        <input type={values.revealPassword ? 'input' : 'password'} value={values.value} onMouseOver={reveal} onMouseOut={hide} />
      </div>
    </div>
  )
}
