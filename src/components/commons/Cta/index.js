import clsx from "clsx";

export default function Cta(props) {
  // PROPS
  const {href, style, type, block, onClick, children} = props;

  // CLASS
  const cls = {
    button: clsx(
      {
        'block w-full': block,
        'inline-block': !block,
      },
      'px-8 py-3 text-base text-center rounded-full transition-all',
      {
        'text-stone-100 bg-skyline-400 border border-skyline-400 hover:bg-skyline-300 hover:border-skyline-400': !style,
      },
    )
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