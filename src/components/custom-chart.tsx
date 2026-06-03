"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ChartDataPoint {
  month: string;
  revenue: number;
  growth: string;
}

const chartData: ChartDataPoint[] = [
  { month: "Jan", revenue: 28000, growth: "+14%" },
  { month: "Feb", revenue: 32500, growth: "+16%" },
  { month: "Mar", revenue: 31000, growth: "-4.6%" },
  { month: "Apr", revenue: 39000, growth: "+25.8%" },
  { month: "May", revenue: 44200, growth: "+13.3%" },
  { month: "Jun", revenue: 48250, growth: "+9.1%" },
];

export default function CustomChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 800;
  const height = 300;
  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 40;

  // Min and max values for scaling
  const maxRevenue = 60000;
  const minRevenue = 20000;

  // Calculate coordinates for SVG
  const getCoordinates = () => {
    const points: { x: number; y: number }[] = [];
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    chartData.forEach((d, i) => {
      // X coordinate is linear based on index
      const x = paddingLeft + (i / (chartData.length - 1)) * chartWidth;
      // Y coordinate is inverted (high value is closer to 0 at the top)
      const ratio = (d.revenue - minRevenue) / (maxRevenue - minRevenue);
      const y = paddingTop + chartHeight - ratio * chartHeight;
      points.push({ x, y });
    });

    return points;
  };

  const points = getCoordinates();

  // Create path description for line
  const getPathDescription = () => {
    let d = "";
    points.forEach((p, i) => {
      if (i === 0) {
        d += `M ${p.x} ${p.y}`;
      } else {
        // Curve to point for a smoother aesthetic
        const prev = points[i - 1];
        const cp1x = prev.x + (p.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = prev.x + (2 * (p.x - prev.x)) / 3;
        const cp2y = p.y;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
      }
    });
    return d;
  };

  // Create path for the filled gradient area
  const getAreaDescription = () => {
    const path = getPathDescription();
    if (points.length === 0) return "";
    const bottomY = height - paddingBottom;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${path} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const linePath = getPathDescription();
  const areaPath = getAreaDescription();

  return (
    <div className="relative w-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Financial Performance
          </span>
          <h3 className="text-lg font-bold mt-0.5 text-zinc-900 dark:text-zinc-50">
            Revenue Over Time
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span>Monthly Revenue (USD)</span>
          </div>
          <span className="text-zinc-200 dark:text-zinc-800">|</span>
          <span className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded font-semibold">
            Avg +12.4% MoM
          </span>
        </div>
      </div>

      {/* SVG Container wrapper for responsiveness */}
      <div className="relative w-full" style={{ aspectRatio: "800 / 300" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Area Gradient */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-indigo)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--chart-indigo)" stopOpacity="0.00" />
            </linearGradient>
            {/* Stroke Gradient */}
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--chart-indigo)" />
              <stop offset="100%" stopColor="var(--chart-violet)" />
            </linearGradient>
          </defs>

          {/* Grid Lines (Horizontal) */}
          {[20000, 30000, 40000, 50000, 60000].map((val) => {
            const chartHeight = height - paddingTop - paddingBottom;
            const ratio = (val - minRevenue) / (maxRevenue - minRevenue);
            const y = paddingTop + chartHeight - ratio * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  className="stroke-zinc-100 dark:stroke-zinc-800/60"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-zinc-400 dark:fill-zinc-500 text-[10px] font-medium"
                >
                  ${(val / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {chartData.map((d, i) => {
            const x = points[i].x;
            const bottomY = height - paddingBottom;
            return (
              <text
                key={d.month}
                x={x}
                y={bottomY + 20}
                textAnchor="middle"
                className="fill-zinc-400 dark:fill-zinc-500 text-[10px] font-semibold"
              >
                {d.month}
              </text>
            );
          })}

          {/* Render Area under line */}
          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Render Line Path */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Hover interactive vertical helper line */}
          {hoveredIndex !== null && (
            <line
              x1={points[hoveredIndex].x}
              y1={paddingTop}
              x2={points[hoveredIndex].x}
              y2={height - paddingBottom}
              className="stroke-zinc-300 dark:stroke-zinc-700"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          {/* Interactive Interactive Dots */}
          {points.map((p, i) => (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Larger trigger area */}
              <circle
                cx={p.x}
                cy={p.y}
                r="16"
                fill="transparent"
              />
              {/* Outer halo */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === i ? "8" : "5"}
                className="fill-indigo-500/20 stroke-transparent transition-all duration-200"
              />
              {/* Inner dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === i ? "5.5" : "3.5"}
                className="fill-white dark:fill-zinc-950 stroke-indigo-500 dark:stroke-indigo-400 transition-all duration-200"
                strokeWidth="2.5"
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Overlay (HTML overlay mapped to SVG coordinates) */}
        {hoveredIndex !== null && (
          <div
            className="absolute z-10 pointer-events-none transform -translate-x-1/2 bg-white/95 dark:bg-zinc-950/95 border border-zinc-200 dark:border-zinc-800/80 shadow-xl rounded-xl p-3 flex flex-col gap-0.5 text-xs select-none backdrop-blur-sm transition-all duration-150"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100 - 32}%`,
              marginTop: "-36px",
            }}
          >
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider leading-none">
              {chartData[hoveredIndex].month} Revenue
            </span>
            <span className="font-extrabold text-zinc-900 dark:text-zinc-50 text-sm mt-0.5">
              ${chartData[hoveredIndex].revenue.toLocaleString()}
            </span>
            <span
              className={`text-[10px] font-bold leading-none ${
                chartData[hoveredIndex].growth.startsWith("+")
                  ? "text-emerald-500"
                  : "text-rose-500"
              }`}
            >
              {chartData[hoveredIndex].growth} Growth
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
