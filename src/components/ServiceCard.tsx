import React from "react";
import type { Service } from "../data/content";

type Props = {
  service: Service;
};

const ServiceCard: React.FC<Props> = ({ service }) => {
  return (
    <div className="group rounded-2xl bg-slate-900/70 border border-white/10 p-5 hover:border-pink-400/70 hover:shadow-lg transition">
      <div className="flex justify-between gap-3 mb-2">
        <h3 className="font-semibold text-base text-white">
          {service.name}
        </h3>
        {service.tag && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold uppercase tracking-wide">
            {service.tag}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-300">{service.description}</p>
    </div>
  );
};

export default ServiceCard;
