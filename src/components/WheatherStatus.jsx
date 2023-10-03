export const WheatherStatus = ({icon, value, unit}) => {
  return (
    <div className="flex gap-2 items-center top-0">
      <img src={icon} alt="" />
      <span>{value} {unit}</span>
    </div>
  );
};
