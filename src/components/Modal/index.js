
// ALERT ONLY SHOW 2 CONTENT: SUCCESS AND FAIL
/*
  open: required;
  children: <Component/>;
*/
export function Modal(props) {
  // PROPS
  const { open, children } = props;

  // CLASS
  const cls = {
    modal: 'flex items-center justify-center w-screen h-screen px-5 fixed top-0 left-0 z-40',
    overlay: 'w-full h-full bg-sky-950/60 absolute top-0 left-0 z-0',
    inner: 'inline-block w-full max-w-xl px-10 py-12 rounded-lg bg-stone-50 relative z-10',
  }

  // RENDER
  return {
    false: <></>,
    true: (
      <div className={cls.modal} data-alert>
        <div className={cls.inner}>
          {children}
        </div>
        <div className={cls.overlay}></div>
      </div>
    )
  }[open];
}