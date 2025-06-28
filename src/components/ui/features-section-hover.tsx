import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Seamless API Integrations",
      description:
        "Connect with any API or service of your choice. Our platform is ready to be shipped with robust integration capabilities.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Trusted Authentication",
      description:
        "Keep yourself and your customers safe with our robust authentication methods. Supporting B2B, B2C, and personal systems.",
      icon: <IconCloud />,
    },
    {
      title: "Premium UI/UX Design",
      description:
        "Excellent seamless fluid UI/UX designs that enhance user experience and drive engagement across all platforms.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Ready to Ship",
      description: "Currently ready to be deployed with all integrations tested and optimized for production.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "B2B & B2C Solutions",
      description: "Comprehensive solutions for business and personal systems tailored to your specific needs.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Lifetime Support",
      description:
        "Ongoing support and development for your peace of mind. We're here for the long haul.",
      icon: <IconHelp />,
    },
    {
      title: "Expert Development",
      description:
        "Professional development with modern technologies and best practices to ensure scalability.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "No Hidden Costs",
      description: "Transparent pricing with no surprises. What you see is what you get, always.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 