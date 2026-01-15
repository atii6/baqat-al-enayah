import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grid, GridItem } from "@/components/grid";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type DashboardHeaderProps = {
  HeaderTitleComponent?: React.ReactNode;
};

const DashboardHeader = ({ HeaderTitleComponent }: DashboardHeaderProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignout = async () => {
    queryClient.clear();
    await signOut({ redirect: false });
    router.replace("/");
  };

  return (
    <Grid className="min-h-24 px-6">
      <GridItem className="flex items-center order-2 lg:order-1 lg:col-span-6 col-span-12">
        {HeaderTitleComponent && HeaderTitleComponent}
      </GridItem>
      <GridItem className="flex items-center justify-end order-2 lg:order-1 lg:col-span-6 col-span-12">
        <div className="flex items-center space-x-4 gap-2">
          {/* Notifications */}
          <Bell className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer" />
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </GridItem>
    </Grid>
  );
};

export default DashboardHeader;
