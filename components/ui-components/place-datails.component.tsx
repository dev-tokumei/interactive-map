"use client";
import { PlaceInfo } from "@/app/types";
import { DetailItem } from "./details-item.componen";

export const PlaceDetails = ({
  placeInfo,
}: {
  placeInfo: PlaceInfo | null;
}) => (
  <div className="w-[100vw] pb-4 absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md max-h-[40%] overflow-y-auto md:flex md:items-start md:justify-between md:p-6">
    {placeInfo ? (
      <>
        <div className="w-full px-3">
          <h2 className="text-lg font-semibold mb-2">{placeInfo.name}</h2>
          <DetailItem
            label="Координаты:"
            value={placeInfo.coordinates.join(", ")}
          />
          <DetailItem label="Тип:" value={placeInfo.type} />
          <DetailItem label="Часы открытия:" value={placeInfo.openingHours} />
          <DetailItem label="Часы закрытия:" value={placeInfo.closingHours} />
          <DetailItem
            label="Дополнительная информация:"
            value={placeInfo.otherData}
          />
        </div>
        {placeInfo.photoUrl && (
          <div className="w-full md:w-1/3 md:pl-4">
            <img
              src={placeInfo.photoUrl}
              alt="Место"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </>
    ) : (
      <div className="w-full text-center">
        <p>Место не выбрано. Нажмите на здание, чтобы увидеть детали.</p>
      </div>
    )}
  </div>
);
