import { cookies } from "next/headers";

export const SESSION_COOKIE = "ext4_game_session";

export async function getSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}
