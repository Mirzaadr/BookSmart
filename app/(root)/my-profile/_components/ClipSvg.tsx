const ClipSvg = ({ ...props }: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="61"
      height="86"
      viewBox="0 0 61 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H61V61C59.8438 74.9778 46.585 86 30.5 86C14.415 86 1.15625 74.9778 0 61V0ZM19.5 67C17.0147 67 15 68.7909 15 71C15 73.2091 17.0147 75 19.5 75H41.5C43.9853 75 46 73.2091 46 71C46 68.7909 43.9853 67 41.5 67H19.5Z"
        fill="#464F6F"
      />
    </svg>
  );
};

export default ClipSvg;
