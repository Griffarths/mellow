const FRAMES = [130, 131, 132, 133, 134, 135, 138, 137, 136];

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
          {FRAMES.map((n) => (
            <img
              key={n}
              src={`/screenshot/FR/Frame%20${n}.jpg`}
              alt=""
              draggable={false}
              className="aspect-[1320/2868] w-[260px] shrink-0 snap-center select-none md:w-[300px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
