import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { handleFetchList } from "~/utils/lists";
import { Avatar } from "~/components/ui/avatar";
import { WrapBalancer } from "qwikjs-wrap-balancer";
import { Following } from "./following";
import { useCurrentUser } from "~/routes/(app)/layout";
export const useList = routeLoader$(async (requestEvent) => {
  return handleFetchList(requestEvent);
});

export default component$(() => {
  const listSig = useList();
  const currentUser = useCurrentUser();
  return (
    <div>
      <PageHeader
        title={listSig.value.name}
        backHref="/lists/"
        subtitle={`@${listSig.value.owner.username}`}
      />
      <div class="w-full bg-info h-48  bg-center bg-no-repeat aspect-video"></div>

      <div class="flex flex-col gap-2 items-center mt-4 px-4">
        <h3 class="font-bold text-xl">{listSig.value.name}</h3>
        <WrapBalancer>
          <p class="text-center opacity-80">{listSig.value.description}</p>
        </WrapBalancer>
        <div class="flex items-center flex-wrap gap-2">
          <Avatar
            circle
            size="sm"
            src={(listSig.value.owner.avatar as any)?.url}
          />
          <Link
            class="font-bold link link-hover"
            href={`/${listSig.value.owner.username}`}
          >
            {listSig.value.owner.name}
          </Link>
          <Link
            class="link link-hover opacity-70"
            href={`/${listSig.value.owner.username}`}
          >
            @{listSig.value.owner.username}
          </Link>
        </div>
        <div class="flex items-center gap-4">
          <Link
            class="link link-hover"
            href={`/lists/${listSig.value.id}/members/`}
          >
            <span class="font-bold">{listSig.value.membersCount} </span>
            <span class="opacity-70 text-sm">Members</span>
          </Link>
          <Link
            class="link link-hover"
            href={`/lists/${listSig.value.id}/followers/`}
          >
            <span class="font-bold">{listSig.value.followersCount} </span>
            <span class="opacity-70 text-sm">Followers</span>
          </Link>
        </div>
        <div class="mt-2">
          {(currentUser.value?.id !== listSig.value.owner.id) && (
            <Following
              isFollowing={listSig.value.isFollowing}
              listId={listSig.value.id}
            />
          )}
        </div>
      </div>

      <div class="divider"></div>
    </div>
  );
});
