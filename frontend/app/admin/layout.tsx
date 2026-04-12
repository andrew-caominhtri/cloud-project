"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { notifyAuthChanged } from "@/lib/auth-storage"

const SIDEBAR_STORAGE_KEY = "adminSidebarCollapsed"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        setCollapsed(localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1")
      }
    } finally {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? "1" : "0")
    } catch {
      /* ignore quota / private mode */
    }
  }, [collapsed, ready])

  const toggle = () => setCollapsed((c) => !c)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.replace("/admin-login")
    }
  }, [router])

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken")
    notifyAuthChanged()
    router.replace("/admin-login")
  }

  return (
    <div className="admin-container">
      <aside
        className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}
        aria-label="Admin navigation"
      >
        <div className="sidebar-header">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={toggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Mở menu admin" : "Thu gọn menu admin"}
          >
            <i
              className={`fa-solid ${collapsed ? "fa-angles-right" : "fa-angles-left"}`}
            />
          </button>
          <h2 className="sidebar-heading">{collapsed ? "A" : "Admin"}</h2>
        </div>

        <ul className="sidebar-nav">
          <li
            role="button"
            tabIndex={0}
            title="Dashboard"
            onClick={() => router.push("/admin")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                router.push("/admin")
              }
            }}
          >
            <i className="fa-solid fa-gauge-high sidebar-nav-icon" aria-hidden />
            <span className="sidebar-nav-label">Dashboard</span>
          </li>

          <li
            role="button"
            tabIndex={0}
            title="Add Product"
            onClick={() => router.push("/admin/add-product")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                router.push("/admin/add-product")
              }
            }}
          >
            <i className="fa-solid fa-plus sidebar-nav-icon" aria-hidden />
            <span className="sidebar-nav-label">Add Product</span>
          </li>

          <li role="button" tabIndex={0} title="Orders">
            <i className="fa-solid fa-cart-shopping sidebar-nav-icon" aria-hidden />
            <span className="sidebar-nav-label">Orders</span>
          </li>

          <li
            role="button"
            tabIndex={0}
            title="Đăng xuất"
            className="sidebar-nav-logout"
            onClick={logoutAdmin}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                logoutAdmin()
              }
            }}
          >
            <i className="fa-solid fa-right-from-bracket sidebar-nav-icon" aria-hidden />
            <span className="sidebar-nav-label">Đăng xuất</span>
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <div className="page-container">{children}</div>
      </main>
    </div>
  )
}
