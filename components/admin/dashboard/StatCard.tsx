const StatCard = ({
  title,
  count,
  change,
}: {
  title: string;
  count: string | number;
  change?: number;
}) => {
  return (
    <div className="stat">
      <div className="stat-info">
        <p className="stat-label" title={title}>
          {title}
        </p>
        {change && (
          <span className="flex items-center gap-1">
            {change > 0 ? <TriangleUp /> : <TriangleDown />}
            {change}
          </span>
        )}
      </div>
      <h2 className="stat-count">{count}</h2>
    </div>
  );
};

const TriangleUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 ml-2"
      strokeWidth="0"
    >
      <path
        d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
        fill="#16a34a"
      ></path>
    </svg>
  );
};
const TriangleDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 ml-2"
      transform="rotate(180)"
      strokeWidth="0"
    >
      <path
        d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
        fill="#b91c1c"
      ></path>
    </svg>
  );
};

export default StatCard;
