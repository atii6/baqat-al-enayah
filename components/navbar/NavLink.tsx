import React from "react";
import Link, { type LinkProps } from "next/link";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  isActive?: boolean;
  isPending?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName,
      pendingClassName,
      href,
      isActive,
      isPending,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={`${className || ""} ${isActive ? activeClassName : ""} ${
          isPending ? pendingClassName : ""
        }`}
        {...props}
      />
    );
  }
);
NavLink.displayName = "NavLink";

export default NavLink;
