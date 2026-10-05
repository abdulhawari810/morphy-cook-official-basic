import { renderIcon } from "@/utils/icons.utils";

export default function Rating() {
  return (
    <>
      <div className="w-full gap-2 flex items-center justify-end">
        <div className="flex items-center justify-center gap-1">
          {renderIcon("Star", { className: "w-4 h-4" })}
          {renderIcon("Star", { className: "w-4 h-4" })}
          {renderIcon("Star", { className: "w-4 h-4" })}
          {renderIcon("Star", { className: "w-4 h-4" })}
          {renderIcon("StarHalf", { className: "w-4 h-4" })}
        </div>
        <span>5.0</span>
      </div>
    </>
  );
}
