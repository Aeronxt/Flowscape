import { ProjectShowcase } from "./project-showcase";

const projects = [
  {
    name: "KontaNibo",
    description: "Bangladesh's first true financial and lifestyle comparison site built with interactive comparison systems.",
    type: "Financial Comparsion Tool",
    image: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture3.PNG",
    link: "https://kontanibo.com",
  },
  {
    name: "Aeron X Technologies",
    description: "A cutting-edge technology blog platform designed for developers, featuring the latest insights and innovations in the tech industry.",
    type: "IT Firm Blog",
    image: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture2222.PNG",
    link: "https://aeronxtt.com",
  },
  {
    name: "ATXR Racing",
    description: "A Next.js project built for ATXR Racing team to support its online identity and track experience booking platform.",
    type: "Motorsports Team Website",
    image: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture.PNG",
    link: "https://atxrracing.com",
  },
  {
    name: "IZEL",
    description: "An e-commerce platform for clothing, offering a wide range of apparel.",
    type: "Ecommerce - Clothing",
    image: "https://wrczctvglyhprlbkogjb.supabase.co/storage/v1/object/public/izel//Capture.PNG",
    link: "https://izelbd.com",
  }
];

export default function ShowcaseSection() {
  return <ProjectShowcase projects={projects} />;
} 