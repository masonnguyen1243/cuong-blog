const FieldErrorAlert = ({ errors, fieldName }) => {
  if (!errors || !errors[fieldName]) return null;
  return (
    <p className="text-wrap text-sm text-red-500">
      {errors[fieldName]?.message}
    </p>
  );
};

export default FieldErrorAlert;
