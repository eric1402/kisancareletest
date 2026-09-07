import { CloudSun, Droplets, Wind, CloudRain, Sun, MapPin } from "lucide-react";

// 3D Weather Sun & Cloud Graphic
function WeatherCenterGraphic() {
  return (
    <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center select-none animate-sun-3d">
      <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md" fill="none">
        {/* Glowing Sun */}
        <circle cx="62" cy="34" r="20" fill="url(#sunGrad)" />
        {/* Sun rays subtle glow */}
        <circle cx="62" cy="34" r="23" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

        {/* Fluffy 3D Cloud */}
        <path
          d="M26 62 L66 62 C 73 62, 78 57, 78 50 C 78 44, 74 39, 68 38.5 C 66 28, 56 22, 46 24 C 40 25, 34 29, 32 35 C 24 36, 18 42, 18 50 C 18 57, 21 62, 26 62 Z"
          fill="url(#cloudGrad)"
        />
        <path
          d="M28 60 L64 60 C 69 60, 74 56, 74 50 C 74 45, 71 41, 66 40 C 64 31, 55 26, 46 27 C 41 28, 36 32, 34 37 C 28 38, 22 43, 22 50 C 22 56, 25 60, 28 60 Z"
          fill="#FFFFFF"
        />

        <defs>
          <linearGradient id="sunGrad" x1="42" y1="14" x2="82" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.6" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="48" y1="22" x2="48" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const forecast = [
  { day: "Today", icon: CloudSun, high: 28, low: 18, active: true },
  { day: "Wed", icon: CloudSun, high: 29, low: 19, active: false },
  { day: "Thu", icon: CloudRain, high: 30, low: 20, active: false },
  { day: "Fri", icon: Sun, high: 31, low: 21, active: false },
  { day: "Sat", icon: CloudSun, high: 30, low: 20, active: false },
];

export default function WeatherCard() {
  return (
    <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between card-3d-hover">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center">
          <CloudSun className="w-4 h-4 text-amber-500" />
        </div>
        <span className="font-bold text-sm text-kc-text">Weather Update</span>
      </div>

      {/* Main weather middle row */}
      <div className="flex items-center justify-between gap-2 my-1">
        {/* Left: Temp & status */}
        <div className="shrink-0">
          <div className="text-3xl sm:text-[36px] font-bold text-kc-text leading-tight">
            28°C
          </div>
          <div className="text-xs font-semibold text-kc-muted mt-0.5">
            Partly Cloudy
          </div>
          <div className="flex items-center gap-1 text-[11px] text-kc-muted mt-1.5 font-medium">
            <MapPin className="w-3 h-3 text-kc-green shrink-0" />
            <span>Pune, Maharashtra</span>
          </div>
        </div>

        {/* Center: Sun & Cloud 3D Icon */}
        <div className="flex justify-center">
          <WeatherCenterGraphic />
        </div>

        {/* Right: Detailed metrics */}
        <div className="space-y-1.5 text-right shrink-0">
          <div className="text-xs text-kc-muted flex items-center justify-end gap-1.5">
            <span>Humidity</span>
            <span className="font-bold text-kc-text">65%</span>
          </div>
          <div className="text-xs text-kc-muted flex items-center justify-end gap-1.5">
            <span>Wind</span>
            <span className="font-bold text-kc-text">12 km/h</span>
          </div>
          <div className="text-xs text-kc-muted flex items-center justify-end gap-1.5">
            <span>Rain Chance</span>
            <span className="font-bold text-kc-text">20%</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Strip */}
      <div className="grid grid-cols-5 gap-1.5 pt-3.5 mt-2 border-t border-kc-border/80">
        {forecast.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.day}
              className={`flex flex-col items-center py-2 px-1 rounded-xl transition-colors ${
                item.active ? "bg-kc-green-light" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`text-[11px] font-semibold mb-1 ${
                  item.active ? "text-kc-green" : "text-kc-muted"
                }`}
              >
                {item.day}
              </span>
              <Icon
                className={`w-4 h-4 mb-1.5 ${
                  item.active
                    ? "text-kc-green"
                    : item.day === "Fri"
                    ? "text-amber-500"
                    : item.day === "Thu"
                    ? "text-blue-400"
                    : "text-amber-500"
                }`}
              />
              <span
                className={`text-[11px] font-semibold ${
                  item.active ? "text-kc-green" : "text-kc-text"
                }`}
              >
                {item.high}° / {item.low}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
