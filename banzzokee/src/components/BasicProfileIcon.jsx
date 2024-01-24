import styles from './BadgeIcon.module.css';

export default function BadgeIcon({ size }) {
  return (
    <svg className={styles[size]} width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 15C1.5 13.9391 1.92143 12.9217 2.67157 12.1716C3.42172 11.4214 4.43913 11 5.5 11H13.5C14.5609 11 15.5783 11.4214 16.3284 12.1716C17.0786 12.9217 17.5 13.9391 17.5 15C17.5 15.5304 17.2893 16.0391 16.9142 16.4142C16.5391 16.7893 16.0304 17 15.5 17H3.5C2.96957 17 2.46086 16.7893 2.08579 16.4142C1.71071 16.0391 1.5 15.5304 1.5 15Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 7C11.1569 7 12.5 5.65685 12.5 4C12.5 2.34315 11.1569 1 9.5 1C7.84315 1 6.5 2.34315 6.5 4C6.5 5.65685 7.84315 7 9.5 7Z" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}