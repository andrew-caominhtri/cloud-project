/** Bắn sự kiện để header cập nhật khi đăng nhập/đăng xuất cùng tab. */
export const AUTH_CHANGED_EVENT = "ttd-auth-changed"

export function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
  }
}
