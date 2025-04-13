import styles from './sort-icon.module.scss';

const SortIcon = ({ className, ...props }: any) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.sortIcon} ${className}`}
    {...props}
  >
    <g opacity="0.8">
      <g opacity="0.4">
        <path
          // eslint-disable-next-line max-len
          d="M16.7455 10C17.308 10 17.5893 9.3125 17.183 8.90625L13.183 4.90625C12.933 4.65625 12.5268 4.65625 12.2768 4.90625L8.27679 8.90625C7.87054 9.3125 8.15179 10 8.71429 10L16.7455 10Z"
          fill="#53A0B4"
        />
      </g>
      <g opacity="0.4">
        <path
          // eslint-disable-next-line max-len
          d="M8.68304 14C8.12054 14 7.83929 14.6875 8.24554 15.0938L12.2455 19.0938C12.4955 19.3438 12.9018 19.3438 13.1518 19.0938L17.1518 15.0938C17.558 14.6875 17.2768 14 16.7143 14H8.68304Z"
          fill="#53A0B4"
        />
      </g>
    </g>
  </svg>
);

export default SortIcon;
