// A raw app screen (status bar and island included) in an iPhone: a thin
// titanium band with a soft highlight, the black bezel, the side buttons.
// Its width comes from the parent.
const BUTTON = "absolute w-[1.6%] bg-gradient-to-r from-[#4a4a50] to-[#26262a]";

export function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <span aria-hidden className={`${BUTTON} -left-[1.2%] top-[17%] h-[3.4%] rounded-l-sm`} />
      <span aria-hidden className={`${BUTTON} -left-[1.2%] top-[23.5%] h-[6.5%] rounded-l-sm`} />
      <span aria-hidden className={`${BUTTON} -left-[1.2%] top-[31.5%] h-[6.5%] rounded-l-sm`} />
      <span aria-hidden className={`${BUTTON} -right-[1.2%] top-[26%] h-[10%] rotate-180 rounded-l-sm`} />
      <div className="relative rounded-[16%/7.7%] bg-gradient-to-br from-[#5b5b61] via-[#2c2c30] to-[#4a4a50] p-[1.4%] shadow-[0_2px_6px_rgb(0_0_0/0.06),0_32px_60px_-28px_rgb(0_0_0/0.25)]">
        <div className="rounded-[15%/7.1%] bg-black p-[2.6%] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
          <img
            src={src}
            alt={alt}
            width={600}
            height={1304}
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none rounded-[12.5%/5.75%]"
          />
        </div>
      </div>
    </div>
  );
}
