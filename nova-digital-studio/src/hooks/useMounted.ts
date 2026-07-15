import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only after client-side hydration. Uses useSyncExternalStore (rather than a
 * useState+useEffect flag) so we don't trigger a setState-in-effect cascade re-render.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
