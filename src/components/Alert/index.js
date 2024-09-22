import Cta from "../commons/Cta";

// ICON
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

// ALERT ONLY SHOW 2 CONTENT: SUCCESS AND FAIL
/*
  open: required;
  status: required;
  title: required;
  desc: optional;
  okCta: optional;
  onClickOkCTA: method | optional;
  cancelCta: optional;
  onClickCancelCta: method | optional;
*/
export function Alert(props) {
  // PROPS
  const { open, status, title, desc, okCta, onClickOkCta, cancelCta, onClickCancelCta } = props;

  // CLASS
  const cls = {
    modal: 'flex items-center justify-center w-screen h-screen px-5 text-center fixed top-0 left-0 z-40',
    overlay: 'w-full h-full bg-sky-950/60 absolute top-0 left-0 z-0',
    inner: 'inline-block w-full max-w-xl px-10 py-12 rounded-lg bg-stone-50 relative z-10',
    statusIcon: 'mb-8',
    icon: clsx('size-20', {
      'text-green-600': status,
      'text-red-600': !status,
    }),
    title: clsx('text-3xl font-thin', {
      'text-green-600': status,
      'text-red-600': !status,
    }),
    desc: 'max-w-sm mx-auto my-2 text-base',
    groupCta: 'flex items-center justify-center mt-12',
  }

  // RENDER
  return {
    false: <></>,
    true: (
      <div className={cls.modal} data-alert>
        <div className={cls.inner}>
          <div className={cls.statusIcon}>
            <FontAwesomeIcon icon={status ? faCircleCheck : faCircleXmark} className={cls.icon} />
          </div>
          <div className={cls.title}>{title}</div>
          <div className={cls.desc}>{desc}</div>
          <div className={cls.groupCta}>
            {okCta && <Cta
              type="button"
              customClass="mx-3"
              onClick={onClickOkCta}
            >
              {okCta}
            </Cta>}
            {cancelCta && 
              <Cta
                type="button"
                ctaStyle="dark"
                customClass="mx-3"
                onClick={onClickCancelCta}
              >
                {cancelCta}
              </Cta>}
          </div>
        </div>
        <div className={cls.overlay}></div>
      </div>
    )
  }[open];
}