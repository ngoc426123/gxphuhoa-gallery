import clsx from "clsx";

export default function Cta(props) {
  // PROPS
  const {href, ctaStyle, type, block, onClick, customClass, children} = props;

  // CLASS
  const cls = {
    button: clsx(
      {
        'block w-full': block,
        'inline-block': !block,
      },
      'px-8 py-3 text-base text-center rounded-full transition-all',
      {
        'text-slate-100 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50': !ctaStyle,
        'text-slate-100 bg-slate-600 hover:shadow-lg hover:shadow-slate-500/40': ctaStyle === 'dark',
        'text-blue-600 border border-blue-600 !rounded hover:bg-blue-600/5': ctaStyle === 'outline',
      },
      customClass,
    ),
  }

  // RENDER
  return {
    true: (
      <a
        href={href}
        type={type}
        className={cls.button}
        onClick={onClick}
        title=""
      >
        {children}
      </a>
    ),
    false: (
      <button
        type={type}
        className={cls.button}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }[!!href]
}