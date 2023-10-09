import { component$ } from "@builder.io/qwik";
import { HomeIcon, HomeOutlineIcon } from "~/icons/home";
import { SearchIcon, SearchOutlineIcon } from "~/icons/search";
import { CommunityIcon, CommunityOutlineIcon } from "~/icons/community";
import { ProfileIcon, ProfileOutlineIcon } from "~/icons/profile";
import { Profile } from "./profile";
import { MenuItem } from "./menu-item";
import { useCurrentUser } from "~/routes/(app)/layout";
import { CreatePost } from "../create-post";
import { BookmarkIcon, BookmarkOutlineIcon } from "~/icons/bookmark";
import { SuggestionIcon, SuggestionOutlineIcon } from "~/icons/suggestion";

export const BottomNav = component$(() => {
  const userSig = useCurrentUser();
  const links = [
    {
      name: "Home",
      href: "/",
      icon: HomeOutlineIcon,
      activeIcon: HomeIcon,
      show: true,
    },
    {
      name: "Login",
      href: "/login/",
      icon: CommunityOutlineIcon,
      activeIcon: CommunityIcon,
      show: !userSig.value,
    },
    {
      name: "Explore",
      href: "/explore/",
      icon: SearchOutlineIcon,
      activeIcon: SearchIcon,
      show: true,
    },
    {
      name: "Bookmarks",
      href: "/bookmarks/",
      icon: BookmarkOutlineIcon,
      activeIcon: BookmarkIcon,
      show: !!userSig.value,
    },

    {
      name: "Profile",
      href: `/${userSig.value?.username}/`,
      icon: ProfileOutlineIcon,
      activeIcon: ProfileIcon,
      show: !!userSig.value,
    },
    {
      name: "Suggestions",
      href: "/suggestions/",
      icon: SuggestionOutlineIcon,
      activeIcon: SuggestionIcon,
      show: !!userSig.value,
    },
  ];
  return (
    <nav class="bg-base-100 fixed bottom-0 w-full h-12 px-4 grid place-items-center">
      <ul class="flex flex-row justify-between w-full gap-y-1">
        {links.map(
          (link) => link.show && <MenuItem key={link.name} {...link} />
        )}

        {!!userSig.value && (
          <div class="px-2 absolute -top-14 right-1">
            <CreatePost small showText={false} />
          </div>
        )}
        {userSig.value && (
          <li>
            <Profile
              avatar={userSig.value.avatar.url}
              name={userSig.value.name}
            />
          </li>
        )}
      </ul>
    </nav>
  );
});
