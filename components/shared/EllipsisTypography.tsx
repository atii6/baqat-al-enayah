import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EllipsisTypographyProps = {
  children?: React.ReactNode;
  title?: string;
  className?: string;
};

const EllipsisTypography: React.FC<EllipsisTypographyProps> = ({
  children,
  title,
  className = "",
}) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = React.useState(false);

  React.useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const isOverflowing =
      el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;

    setIsTruncated(isOverflowing);
  }, [children]);

  const content = (
    <div
      ref={textRef}
      className={`overflow-hidden text-ellipsis wrap-break-word ${className}`}
    >
      {children}
    </div>
  );

  if (!isTruncated || !title) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-sm text-xs">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EllipsisTypography;
