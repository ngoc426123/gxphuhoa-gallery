import { useState } from "react";
import clsx from "clsx";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// IMAGE
export const Form = {
  Label(props) {
    // PROPS
    const { text } = props;

    // CLASS
    const cls = {
      label: 'inline-block mb-3 font-semibold'
    }

    // RENDER
    return (
      <label className={cls.label}>{text}</label>
    );
  },

  Input(props) {
    // PROPS
    const { value, customClassGroup, customClassInput, placeholder, onChange, onKeyUp } = props;

    // CLASS
    const cls = {
      formInput: clsx(
        'mb-3',
        customClassGroup,
        'group-[.input-group]:w-full group-[.input-group]:mb-0 group-[.input-group]:border-r-none'
      ),
      input: clsx('w-full h-12 px-4 border border-slate-300/60 rounded outline-0', customClassInput),
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
      input: clsx('w-full h-12 px-4 text-base border border-slate-300/60 rounded outline-0 custom-input-password', customClassInput),
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
  },

  InputGroup(props) {
    // PROPS
    const { children } = props;

    // CLASS
    const cls = {
      inputGroup: 'flex items-center mb-3 group input-group'
    };

    // RENDER
    return (
      <div className={cls.inputGroup}>
        {children}
      </div>
    );
  }
}
