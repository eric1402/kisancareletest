/** Mock mini-widgets shown inside flagship feature blocks. Static demo data. */

export function WeatherWidget() {
  const days = [
    { d: "Today", t: "31°", i: "☀️" },
    { d: "Fri", t: "29°", i: "⛅" },
    { d: "Sat", t: "27°", i: "🌧️" },
    { d: "Sun", t: "30°", i: "☀️" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-sm font-semibold text-muted-foreground">Nashik · Next 4 days</p>
      <ul className="mt-4 grid grid-cols-4 gap-2 text-center">
        {days.map((day) => (
          <li key={day.d} className="rounded-xl bg-secondary py-3">
            <span aria-hidden="true" className="text-xl">
              {day.i}
            </span>
            <p className="mt-1 text-sm font-semibold">{day.t}</p>
            <p className="text-xs text-muted-foreground">{day.d}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground">
        Rain likely Saturday — spray before Friday evening.
      </p>
    </div>
  );
}

export function CropWidget() {
  const stages = ["Sowing", "Tillering", "Flowering", "Harvest"];
  const active = 1;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-sm font-semibold text-muted-foreground">Wheat · Plot 2 · 3.5 acre</p>
      <ol className="mt-4 flex items-center gap-2">
        {stages.map((stage, i) => (
          <li key={stage} className="flex-1">
            <div
              className={`h-2 rounded-full ${i <= active ? "bg-primary" : "bg-secondary"}`}
              aria-hidden="true"
            />
            <p
              className={`mt-2 text-xs font-medium ${i === active ? "text-primary" : "text-muted-foreground"}`}
            >
              {stage}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm font-medium">
        Next activity: top dressing of urea in 4 days.
      </p>
    </div>
  );
}

export function SoilWidget() {
  const rows = [
    { k: "Nitrogen (N)", v: "Low", pct: 34 },
    { k: "Phosphorus (P)", v: "Medium", pct: 58 },
    { k: "Potassium (K)", v: "Good", pct: 78 },
    { k: "Organic carbon", v: "0.54%", pct: 46 },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">Soil report · Plot 2</p>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">pH 7.8</span>
      </div>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.k}>
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{row.k}</span>
              <span className="text-muted-foreground">{row.v}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-secondary" aria-hidden="true">
              <div
                data-soil-bar
                className="h-2 rounded-full bg-primary"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MandiWidget() {
  const bars = [42, 55, 48, 63, 71, 66, 84];
  const rows = [
    { m: "Nashik", p: "₹2,340", t: "+2.1%" },
    { m: "Pune", p: "₹2,290", t: "+0.8%" },
    { m: "Sangli", p: "₹2,205", t: "-1.2%" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-sm font-semibold text-muted-foreground">Wheat · last 7 days</p>
      <div className="mt-4 flex h-24 items-end gap-2" aria-hidden="true">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-primary/25 last:bg-primary"
            style={{ height: `${b}%` }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li
            key={row.m}
            className="flex items-center justify-between rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium"
          >
            <span>{row.m}</span>
            <span className="flex items-center gap-3">
              <span className="font-semibold">{row.p}/q</span>
              <span
                className={row.t.startsWith("-") ? "text-clay" : "text-primary"}
              >{`${row.t}`}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
