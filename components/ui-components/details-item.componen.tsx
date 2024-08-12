"use client";
export const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <div className="mb-1 lg:flex justify-between items-center">
    <h1 className="font-bold sm:text-md md:text-xl lg:text-2xl">{label}</h1>
    <p className="sm:text-sm md:text-md lg:text-xl">{value}</p>
  </div>
);
