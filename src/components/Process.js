export default function Process({ text, img }) {
  return (
    <div className="relative w-80  bg-white-base rounded-lg grid grid-cols-3 items-center p-4 shadow-lg transform transition duration-300 ease-out hover:shadow-sm">
      <img src={img} alt="crop" className="w-32 h-16" />
      <h1 className="md:p text-bold col-span-2 flex justify-center">{text}</h1>
    </div>
  );
}
