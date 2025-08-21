import React from "react";
import Pill from "./Pill";

export default function SpeedBadge({ v, f, lambda }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <Pill>v = f × λ</Pill>
      <Pill>
        v = {f.toFixed(2)} × {lambda.toFixed(2)} = <span className="tabular-nums">{v.toFixed(2)}</span> u/s
      </Pill>
    </div>
  );
}
