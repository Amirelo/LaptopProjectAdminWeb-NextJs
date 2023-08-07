export default function AnalyticTab({ name, amount, percent }) {
  return (
    <div className="w-60 h-32 bg-backgroundInputColor rounded-md border-borderColor border mt-3 px-4">
      <p className="mt-4 text-md font-bold">{name}</p>
      <p className=" text-lg mt-2">{amount}</p>
    </div>
  );
}
