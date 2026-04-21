import { PhoneFrame } from "./PhoneFrame";
import { Blob } from "./Blob";

export function PhoneLog() {
  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col pt-6">
        <Blob
          color="#F8C8CC"
          className="absolute -right-6 -top-6 h-32 w-32"
        />
        <div className="mt-24 px-6">
          <h3 className="text-base font-bold tracking-tight">
            J&apos;enregistre une migraine
          </h3>
          <div className="mt-4 space-y-3">
            <Card
              icon={<RadarIcon color="#EF4A5B" bg="#FBD9DC" />}
              title="Migraine en cours"
              sub="Enregistrement rapide en quelques secondes"
            />
            <Card
              icon={<RadarIcon color="#F28B3E" bg="#FBE0CC" />}
              title="Migraine passée"
              sub="Renseigner une migraine passée en détail"
            />
          </div>
        </div>
        <TabBar active="log" />
      </div>
    </PhoneFrame>
  );
}

function Card({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-black/[0.04] p-3">
      {icon}
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold">{title}</div>
        <div className="text-[10px] leading-tight text-black/50">{sub}</div>
      </div>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-black/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function RadarIcon({ color, bg }: { color: string; bg: string }) {
  return (
    <div
      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
      style={{ background: bg }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <circle cx="16" cy="16" r="13" stroke={color} strokeOpacity="0.25" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="9" stroke={color} strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" stroke={color} strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.5" fill={color} />
      </svg>
    </div>
  );
}

function TabBar({ active }: { active: "home" | "stats" | "log" | "courses" | "profile" }) {
  const items: Array<{ id: typeof active; label: string; icon: React.ReactNode }> = [
    { id: "home", label: "Accueil", icon: <HomeIcon /> },
    { id: "stats", label: "Mon suivi", icon: <BarsIcon /> },
    { id: "log", label: "Enregistrer", icon: <BoltIcon /> },
    { id: "courses", label: "Mes cours", icon: <BookIcon /> },
    { id: "profile", label: "Profil", icon: <UserIcon /> },
  ];
  return (
    <div className="mt-auto flex items-end justify-between border-t border-black/5 px-4 pb-3 pt-2">
      {items.map((it) => (
        <div
          key={it.id}
          className={`flex flex-1 flex-col items-center gap-1 ${
            it.id === active ? "text-ink" : "text-black/35"
          }`}
        >
          <div className="h-4 w-4">{it.icon}</div>
          <span className="text-[8px]">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 11 9-8 9 8v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4a2 2 0 0 1 2-2h14v20H6a2 2 0 0 1-2-2z" strokeLinejoin="round" />
      <path d="M4 18a2 2 0 0 1 2-2h14" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  );
}
