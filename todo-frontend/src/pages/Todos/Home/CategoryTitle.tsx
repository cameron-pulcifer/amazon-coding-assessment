const CategoryTitle = ({ name }: { name: string }) => {
  return (
    <div className="my-4">
      <h4 className="text-xl font-semibold">{name}</h4>
    </div>
  );
};

export default CategoryTitle;
