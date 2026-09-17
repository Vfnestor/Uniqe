type StateIconProps = {
  icon: string;
};

export default function StateIcon({
  icon,
}: StateIconProps) {
  return (
    <div
      className="state-icon"
      aria-hidden="true"
    >
      {icon}
    </div>
  );
}