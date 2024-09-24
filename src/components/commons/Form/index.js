import { useState } from "react";
import clsx from "clsx";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// IMAGE
export const Form = {
  Input(props) {
    // PROPS
    const { value, customClassGroup, customClassInput, placeholder, onChange, onKeyUp } = props;

    // CLASS
    const cls = {
      formInput: clsx('mb-3', customClassGroup),
      input: clsx('w-full h-12 px-4 rounded outline-0', customClassInput),
    }

    // RENDER
    return (
      <div className={cls.formInput}>
        <input
          type="text"
          value={value}
          className={cls.input}
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </div>
    )
  },

  Password(props) {
    // PROPS
    const { value, customClassGroup, customClassInput, placeholder, onChange, onKeyUp } = props;
    
    // STATE
    const [type, setType] = useState('password');

    // CLASS
    const cls = {
      formInput: clsx('mb-3 relative', customClassGroup),
      input: clsx('w-full h-12 px-4 text-base rounded outline-0 custom-input-password', customClassInput),
      toggle: 'bg-transparent outline-0 absolute top-2/4 right-3 translate-y-[-50%]',
    }

    // RENDER
    return (
      <div className={cls.formInput}>
        <input
          type={type}
          value={value}
          className={cls.input}
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
        <button
          className={cls.toggle}
          onClick={() => setType(type => type === 'password' ? 'text' : 'password')}
          type="button"
        >
          <FontAwesomeIcon icon={type === 'password' ? faEye : faEyeSlash} />
        </button>
      </div>
    )
  }
}