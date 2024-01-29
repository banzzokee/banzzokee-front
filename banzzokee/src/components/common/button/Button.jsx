import styles from './Button.module.css';
import cx from 'clsx';
// type = 'button';
export default function Button({ size, style, children }) {
  return (
    <button className={cx(styles.button, styles[size])} style={style}>
      {children}
    </button>
  );
}
