"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {
  AUTH_CHANGED_EVENT,
  notifyAuthChanged,
} from "@/lib/auth-storage"

export function AccountMenu() {
  const router = useRouter()
  const [hasUser, setHasUser] = useState(false)
  const [hasAdmin, setHasAdmin] = useState(false)

  const syncFromStorage = useCallback(() => {
    if (typeof window === "undefined") return
    setHasUser(!!localStorage.getItem("token"))
    setHasAdmin(!!localStorage.getItem("adminToken"))
  }, [])

  useEffect(() => {
    syncFromStorage()
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "adminToken" || e.key === null) {
        syncFromStorage()
      }
    }
    const onAuthChanged = () => syncFromStorage()
    window.addEventListener("storage", onStorage)
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged)
    }
  }, [syncFromStorage])

  const logoutUser = () => {
    localStorage.removeItem("token")
    notifyAuthChanged()
    router.push("/")
    router.refresh()
  }

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken")
    notifyAuthChanged()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="account-menu">
      <div className="account-title">
        <i className="fa-regular fa-user" /> Tài khoản
      </div>
      <div className="account-dropdown">
        {!hasUser ? (
          <Link href="/login">
            <i className="fa-solid fa-user" /> Đăng nhập khách
          </Link>
        ) : null}
        {hasUser ? (
          <div className="account-dropdown-hint">Đã đăng nhập khách</div>
        ) : null}
        {hasUser ? (
          <button type="button" className="account-dropdown-btn" onClick={logoutUser}>
            <i className="fa-solid fa-right-from-bracket" /> Đăng xuất khách
          </button>
        ) : null}

        {!hasAdmin ? (
          <Link href="/admin-login">
            <i className="fa-solid fa-user-tie" /> Đăng nhập Admin
          </Link>
        ) : null}
        {hasAdmin ? (
          <Link href="/admin">
            <i className="fa-solid fa-gauge-high" /> Vào Admin
          </Link>
        ) : null}
        {hasAdmin ? (
          <button type="button" className="account-dropdown-btn" onClick={logoutAdmin}>
            <i className="fa-solid fa-right-from-bracket" /> Đăng xuất Admin
          </button>
        ) : null}
      </div>
    </div>
  )
}
