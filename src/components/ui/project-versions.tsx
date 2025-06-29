import { ProjectShowcase } from "./project-showcase";

function openInNewTab(link: string) {
  window.open(link, "_blank", "noopener,noreferrer");
}

const LTRVersion = () => (
  <div className="p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
    <div className="items-center justify-center relative flex" style={{ maxWidth: "1536px" }}>
      <ProjectShowcase
        testimonials={[
          {
            name: "KontaNibo",
            quote: "Bangladesh's first true financial and lifestyle comparison site built with interactive comparison systems.",
            designation: "Vite + React Project",
            src: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture3.PNG",
            link: "https://kontanibo.com",
          },
          {
            name: "Aeron X Technologies",
            quote: "A cutting-edge technology blog platform designed for developers, featuring the latest insights and innovations in the tech industry.",
            designation: "Technology Agency Blog",
            src: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture2222.PNG",
            link: "https://aeronxtt.com",
          },
          {
            name: "ATXR Racing",
            quote: "A Next.js project built for ATXR Racing team to support its online identity and track experience booking platform.",
            designation: "Next.js Project",
            src: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture.PNG",
            link: "https://atxrracing.com",
          },
        ]}
        colors={{
          name: "var(--project-showcase-name-color)",
          position: "var(--project-showcase-position-color)",
          testimony: "var(--project-showcase-testimony-color)",
        }}
        fontSizes={{
          name: "var(--project-showcase-name-size)",
          position: "var(--project-showcase-position-size)",
          testimony: "var(--project-showcase-testimony-size)",
        }}
        spacing={{
          nameTop: "var(--project-showcase-name-top)",
          nameBottom: "var(--project-showcase-name-bottom)",
          positionTop: "var(--project-showcase-position-top)",
          positionBottom: "var(--project-showcase-position-bottom)",
          testimonyTop: "var(--project-showcase-testimony-top)",
          testimonyBottom: "var(--project-showcase-testimony-bottom)",
          lineHeight: "var(--project-showcase-line-height)",
        }}
        halomotButtonGradient="var(--project-showcase-button-gradient)"
        halomotButtonBackground="var(--project-showcase-button-background)"
        halomotButtonTextColor="var(--project-showcase-button-text-color)"
        halomotButtonOuterBorderRadius="var(--project-showcase-button-outer-radius)"
        halomotButtonInnerBorderRadius="var(--project-showcase-button-inner-radius)"
        halomotButtonHoverTextColor="var(--project-showcase-button-hover-text-color)"
        onItemClick={openInNewTab}
      />
    </div>
  </div>
);

const RTLVersion = () => (
  <div className="p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
    <div className="items-center justify-center relative flex" style={{ maxWidth: "1152px" }}>
      <ProjectShowcase
        testimonials={[
          {
            name: "KontaNibo",
            quote: "אתר ההשוואה הפיננסי וסגנון החיים הראשון והאמיתי של בנגלדש שנבנה עם מערכות השוואה אינטראקטיביות.",
            designation: "פרויקט Vite + React",
            src: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture3.PNG",
            link: "https://kontanibo.com",
          },
          {
            name: "Aeron X Technologies",
            quote: "פלטפורמת בלוג טכנולוגי חדשנית המיועדת למפתחים, הכוללת את התובנות והחידושים האחרונים בתעשיית הטכנולוגיה.",
            designation: "בלוג סוכנות טכנולוגיה",
            src: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture2222.PNG",
            link: "https://aeronxtt.com",
          },
          {
            name: "ATXR Racing",
            quote: "פרויקט Next.js שנבנה עבור צוות ATXR Racing לתמיכה בזהות המקוונת שלו ובפלטפורמת הזמנת חוויות מסלול.",
            designation: "פרויקט Next.js",
            src: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture.PNG",
            link: "https://atxrracing.com",
          },
        ]}
        colors={{
          name: "var(--project-showcase-name-color)",
          position: "var(--project-showcase-position-color)",
          testimony: "var(--project-showcase-testimony-color)",
        }}
        fontSizes={{
          name: "var(--project-showcase-name-size)",
          position: "var(--project-showcase-position-size)",
          testimony: "var(--project-showcase-testimony-size)",
        }}
        spacing={{
          nameTop: "var(--project-showcase-name-top)",
          nameBottom: "var(--project-showcase-name-bottom)",
          positionTop: "var(--project-showcase-position-top)",
          positionBottom: "var(--project-showcase-position-bottom)",
          testimonyTop: "var(--project-showcase-testimony-top)",
          testimonyBottom: "var(--project-showcase-testimony-bottom)",
          lineHeight: "var(--project-showcase-line-height)",
        }}
        isRTL={true}
        buttonInscriptions={{
          previousButton: "הקודם",
          nextButton: "הבא",
          openWebAppButton: "פתח אפליקציה",
        }}
        halomotButtonGradient="var(--project-showcase-button-gradient)"
        halomotButtonBackground="var(--project-showcase-button-background)"
        halomotButtonTextColor="var(--project-showcase-button-text-color)"
        halomotButtonOuterBorderRadius="var(--project-showcase-button-outer-radius)"
        halomotButtonInnerBorderRadius="var(--project-showcase-button-inner-radius)"
        halomotButtonHoverTextColor="var(--project-showcase-button-hover-text-color)"
        onItemClick={openInNewTab}
      />
    </div>
  </div>
);

export { LTRVersion, RTLVersion }; 