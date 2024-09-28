import clsx from "clsx";
import { useMemo } from "react";

export default function Box(props) {
  // PROPS
  const { title, boxStyle, children } = props;

  // CLASS
  const styling = useMemo(() => {
    switch (boxStyle) {
      case 'sky': return 'bg-sky-600 shadow-sky-600/60';
      case 'teal': return 'bg-teal-600 shadow-teal-600/60';
      case 'rose': return 'bg-rose-600 shadow-rose-600/60';
      case 'blue': return 'bg-blue-600 shadow-blue-600/60';
      default: return 'bg-slate-600 shadow-slate-600/60';
    }
  }, [boxStyle]);
  const cls = {
    box: 'h-full pt-4 mb-8 relative',
    boxTitle: `inline-block px-8 py-3 text-lg text-white font-light ${styling} rounded-lg shadow-lg absolute top-0 left-5`,
    boxContent: 'p-5 pt-16 bg-white rounded-lg',
  };

  // RENDER
  return (
    <div className={cls.box} data-box>
      <div className={clsx(cls.boxTitle, cls.boxTitleInYear)}>{title}</div>
      <div className={cls.boxContent}>
        {children}   
      </div>
    </div>
  );
}
