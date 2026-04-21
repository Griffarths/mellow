import { PhoneLog } from "../phones/PhoneLog";
import { PhoneIntensity } from "../phones/PhoneIntensity";
import { PhoneTriggers } from "../phones/PhoneTriggers";
import { PhoneRelief } from "../phones/PhoneRelief";
import { PhoneAnalysis } from "../phones/PhoneAnalysis";

const SHOTS = [
  { title: "Enregistrer", node: <PhoneLog /> },
  { title: "Exprimer", node: <PhoneIntensity /> },
  { title: "Identifier", node: <PhoneTriggers /> },
  { title: "Soulager", node: <PhoneRelief /> },
  { title: "Analyser", node: <PhoneAnalysis /> },
];

export function Screenshots() {
  return (
    <section id="screens" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="section-title max-w-2xl text-4xl font-bold md:text-6xl">
          Découvre l&apos;app.
        </h2>
      </div>

      <div className="mt-12 md:mt-16">
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pr-6 [scrollbar-width:none] md:gap-8 md:pr-12 [&::-webkit-scrollbar]:hidden"
          style={{
            paddingLeft:
              "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          }}
        >
          {SHOTS.map((s) => (
            <div key={s.title} className="snap-center shrink-0">
              <div className="w-[260px] md:w-[300px]">{s.node}</div>
              <p className="mt-4 text-center text-sm font-medium text-black/60">
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
