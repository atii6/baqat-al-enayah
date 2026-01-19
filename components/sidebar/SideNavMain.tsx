import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

export type Items = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  shouldRender?: boolean;
  items?: Items[];
};

type NavMainProps = {
  items: Items[];
};

export function SideNavMain({ items }: NavMainProps) {
  const router = useRouter();

  const handleClick = (url: string | undefined) => {
    if (url) {
      router.push(url);
    }
  };
  return (
    <SidebarMenu className="px-3 space-y-2 rounded-md h-full">
      <div className="flex items-center justify-center mb-4 border-b">
        <div className="w-72 h-36">
          <Image
            src={"/baqat_al_enayah_logo.png"}
            alt="logo"
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {items.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={
            item.isActive || item.items?.some((item) => item.isActive)
          }
          className="group/collapsible "
        >
          {item.shouldRender && (
            <SidebarMenuItem>
              <>
                {item.items ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      className="py-6 cursor-pointer "
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.isActive}
                    onClick={() => handleClick(item.url)}
                    className="py-6 cursor-pointer"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </>

              {item.items && (
                <SidebarMenu>
                  <CollapsibleContent className="">
                    {item.items?.map((subItem) => (
                      <React.Fragment key={subItem.title}>
                        {subItem.shouldRender && (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="cursor-pointer"
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                              onClick={() => handleClick(subItem.url)}
                              className="py-6"
                            >
                              <div className="flex pl-6">
                                <span>
                                  {subItem.icon && (
                                    <subItem.icon size={16} />
                                  )}{" "}
                                </span>
                                <span>{subItem.title}</span>
                              </div>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                      </React.Fragment>
                    ))}
                  </CollapsibleContent>
                </SidebarMenu>
              )}
            </SidebarMenuItem>
          )}
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
