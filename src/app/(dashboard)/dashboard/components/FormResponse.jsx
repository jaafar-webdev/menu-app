export default function FormResponse({ response }) {
  if (!response) return null;

  const { success, message } = response;
  const alertClasses = success
    ? "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
    : "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50";

  return (
    <div className={alertClasses} role="alert">
      {message}
    </div>
  );
}
