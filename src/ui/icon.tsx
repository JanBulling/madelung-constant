import { cn } from "@/lib/utils";
import { Loader2, LucideIcon, icons } from "lucide-react";

type IconProps = {
  icon: keyof typeof icons;
  size?: string | number;
  light?: boolean;
};

function Icon({
  icon,
  className,
  size = 20,
  light,
  ...props
}: IconProps & React.HTMLAttributes<HTMLOrSVGElement>) {
  const ICON = icons[icon] as LucideIcon;

  if (light)
    return (
      <div className="light-bg rounded-sm p-1">
        <ICON size={+size - 4} className={cn(className)} {...props} />
      </div>
    );

  return <ICON size={size} className={className} {...props} />;
}

type LoaderProps = {
  size?: string | number;
};

function Loader({
  className,
  size = 20,
  ...props
}: LoaderProps & React.HTMLAttributes<HTMLOrSVGElement>) {
  return <Loader2 size={size} className={cn("animate-spin", className)} />;
}

export { Icon, Loader as Loading };
