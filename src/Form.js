import React, {useState} from 'react';

const Form = (props) => {
  const [name, setName] = useState('');
  const [timeZone, setTimeZone] = useState('');

  return (
    <form className="form" onSubmit={e => props.handleAdd(e, name, timeZone)}>
      <div className="input-wrapper">
        <label htmlFor="currentName" className="label">Название</label>
        <input name="currentName" type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="currentTimeZone" className="label">Временная зона</label>
        <input name="currentTimeZone" type="text" value={timeZone} onChange={e => setTimeZone(e.target.value)} />
      </div>
      <input type="submit" value="добавить" className="btn" />
    </form>
  );
};

export default Form;