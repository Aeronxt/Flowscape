import { useState } from "react";
import { GripVertical } from "lucide-react";

function UIUXDesignFeature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-600/30 border border-purple-500/40 rounded-full px-3 md:px-4 py-2">
              <span className="bg-purple-600 text-white text-xs px-2 md:px-3 py-1 rounded-full font-medium">Platform</span>
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              UI/UX Design
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-400">
              At Flowscape, we craft pixel‑perfect interfaces and seamless user experiences that are as beautiful as they are intuitive.
            </p>
          </div>
          <div className="pt-12 w-full">
            <div
              className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-gray-600 h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-gray-600 rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none" />
                </button>
              </div>
              <img
                src="https://www.twblocks.com/_next/image?url=%2Ffeature8.png&w=3840&q=75"
                alt="feature8"
                className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none border"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              />
              <img
                src="https://www.twblocks.com/_next/image?url=%2Fdarkmode-feature8.png&w=3840&q=75"
                alt="darkmode-feature8.png"
                className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none border"
              />
            </div>
          </div>
          
          {/* Full description */}
          <div className="mt-12 space-y-4">
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Our user‑centered design process begins with detailed user persona and journey mapping, ensuring we understand every touchpoint and pain‑point in your customer's workflow. From there, we build out information architecture and low‑fidelity wireframes, then iterate into high‑fidelity prototypes in Figma or Sketch, complete with design system tokens and atomic design components for maximum consistency and scalability.
            </p>
            
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Our UI work is fully responsive and mobile‑first, leveraging modern CSS techniques (Flexbox, Grid, utility‑first Tailwind) to adapt flawlessly across devices. We enhance every interaction with micro‑animations and motion design—powered by Framer Motion or CSS transitions—to guide users' attention and provide real‑time feedback. Rigorous usability testing, A/B experiments, and accessibility audits (WCAG 2.1 AA) ensure not only that your interface looks stunning but also performs under real‑world conditions and maximizes conversion rates.
            </p>
            
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              By combining information hierarchy, visual hierarchy, and interaction design best practices, we deliver bespoke UI/UX solutions tailored to your brand's voice and your users' needs so you launch with confidence, knowing every button, every form, and every flow has been optimized for efficiency, engagement, and growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { UIUXDesignFeature }; 