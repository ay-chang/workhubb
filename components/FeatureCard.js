const FeatureCard = ({ title, desc, width, img }) => {
  return (
    <div className={`border border-gray-300 rounded-lg px-4 py-4 w-${width}`}>
      <div className="feature__card-img pb-4">{img}</div>
      <p className="text-sm font-base">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
};

export default FeatureCard;
