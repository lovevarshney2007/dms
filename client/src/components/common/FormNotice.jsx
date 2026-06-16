function FormNotice({ status }) {
  if (!status.message) {
    return null;
  }

  const tone =
    status.type === "success"
      ? "border-emerald-500/30 bg-emerald-50 text-emerald-900"
      : "border-red-400/30 bg-red-50 text-red-900";

  return <p className={`rounded-2xl border px-4 py-3 text-sm ${tone}`}>{status.message}</p>;
}

export default FormNotice;
