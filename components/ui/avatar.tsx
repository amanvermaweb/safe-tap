import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/70 shadow-[0_8px_22px_rgba(15,23,42,0.08)]", className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={cn("aspect-square h-full w-full object-cover", className)} alt={alt} {...props} />;
}

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-[#eceef0] text-[#45464d]", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
