import {
  KBarPortal,
  KBarSearch,
  KBarAnimator,
  KBarPositioner,
  KBarResults,
  useMatches,
  Action,
  useRegisterActions,
} from "kbar";
import { Search } from "pixelarticons/react/Search.js";

import { PixelIcon } from "@components/pixel";

import { formatDate } from "@lib/utils/date";

// The search palette, styled as a 16-bit pause menu.
export const KBarModal = ({
  actions,
  isLoading,
}: {
  actions: Action[];
  isLoading: boolean;
}) => {
  useRegisterActions(actions, [actions]);

  return (
    <KBarPortal>
      <KBarPositioner className="z-[80] bg-black/60 p-4">
        <KBarAnimator className="w-full max-w-xl">
          <div className="px-frame px-frame--msg p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="px-hud-text m-0 text-[12px] text-px-coin">Pause</p>
              <kbd className="px-kbd text-px-stone">Esc</kbd>
            </div>
            <div className="flex items-center gap-3">
              <PixelIcon icon={Search} className="text-px-stone" />
              <KBarSearch
                className="px-input"
                defaultPlaceholder="Search posts or warp to a level…"
              />
            </div>
            {!isLoading ? (
              <RenderResults />
            ) : (
              <p className="px-hud-text m-0 px-4 py-8 text-center text-[10px] text-px-stone">
                Loading…
              </p>
            )}
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

const RenderResults = () => {
  const { results } = useMatches();

  if (!results.length) {
    return (
      <p className="px-hud-text m-0 px-4 py-8 text-center text-[10px] text-px-stone">
        No results for your search…
      </p>
    );
  }

  return (
    <div className="mt-2">
      <KBarResults
        items={results}
        onRender={({ item, active }) => {
          if (typeof item === "string") {
            return (
              <div className="px-hud-text px-3 pb-2 pt-5 text-[10px] text-px-coin">
                {item}
              </div>
            );
          }

          return (
            <div
              className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 text-white ${
                active ? "bg-white/15" : "bg-transparent"
              }`}
            >
              {/* the cursor arrow marks the active row, so it never relies on colour alone */}
              <span aria-hidden="true" className="px-hud-text w-4 flex-none text-[12px] text-px-coin">
                {active ? "►" : ""}
              </span>
              {item.icon && <span className="flex-none text-px-stone">{item.icon}</span>}
              <div className="min-w-0 flex-1">
                {item.subtitle && (
                  <div className="text-xs text-px-stone">{formatDate(item.subtitle)}</div>
                )}
                <div className="truncate">{item.name}</div>
              </div>
              {item.shortcut?.length ? (
                <div aria-hidden className="flex flex-none items-center gap-2">
                  {item.shortcut.map((sc) => (
                    <kbd key={sc} className="px-kbd text-px-stone">
                      {sc}
                    </kbd>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
};
