import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { UrlState } from "@/context";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();
  // user is the current user object fetched from the context,
  // and fetchUser is a function to refresh the user state after logout

  return (
    <>
      <nav className="sticky top-0 z-10 h-20 px-4 sm:px-6 md:px-10 lg:px-14 flex justify-between items-center border-b border-[#2C2E3D] bg-[#12131A]/95 backdrop-blur-md">

        <Link
          to="/"
          className="flex items-center justify-center h-full shrink-0"
        >
          <img
            src="/logo.png"
            alt="Trimrr Logo"
            className="
              h-12
              sm:h-14
              md:h-16
              lg:h-[72px]
              w-auto
              object-contain
              object-center
              select-none
            "
            draggable={false}
          />
        </Link>

        <div className="flex gap-3 sm:gap-4 items-center">
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-[#E8A73B] hover:bg-[#F2B754] text-[#12131A] font-semibold rounded-md h-10 px-5 transition-all"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 rounded-full overflow-hidden border border-[#2C2E3D] hover:border-[#E8A73B] transition-colors shrink-0 outline-none">

                <Avatar className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#1B1D28]">

                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="w-full h-full object-cover rounded-full"
                  />

                  <AvatarFallback className="w-full h-full flex items-center justify-center text-[#F5F3EF] text-xs font-mono bg-[#1B1D28]">
                    PA
                  </AvatarFallback>

                </Avatar>

              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF]">

                <DropdownMenuLabel className="font-mono text-xs text-[#7C8CFF] break-words">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-[#2C2E3D]" />

                <DropdownMenuItem className="focus:bg-[#2C2E3D] focus:text-[#F5F3EF]">

                  <Link
                    to="/dashboard"
                    className="flex items-center w-full"
                  >
                    <LinkIcon className="mr-2 h-4 w-4 text-[#E8A73B]" />
                    My Links
                  </Link>

                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser(); // Update the user state after logout
                      navigate("/");
                    });
                  }}
                  className="text-red-400 focus:bg-[#2C2E3D] focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          )}
        </div>
      </nav>

      {loading && (
        <BarLoader
          className="mb-4"
          width={"100%"}
          color="#E8A73B"
        />
      )}
    </>
  );
};

export default Header;