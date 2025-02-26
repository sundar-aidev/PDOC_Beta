"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, ClipboardCheck, Syringe, BarChart2, Globe, Eye, Upload, Settings } from "lucide-react"
import styles from "./sidebar.module.css"

const navigation = [
  {
    title: "Your Portfolio",
    items: [
      { icon: <Home size={20} />, label: "Home", href: "/" },
      { icon: <ClipboardCheck size={20} />, label: "Check", href: "/check" },
      { icon: <Syringe size={20} />, label: "Treatment", href: "/treatment" },
      { icon: <BarChart2 size={20} />, label: "Plan", href: "/plan" },
    ],
  },
  {
    title: "The Market",
    items: [
      { icon: <Globe size={20} />, label: "Explore", href: "/explore" },
      { icon: <Eye size={20} />, label: "Watch", href: "/watch" },
    ],
  },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      className={styles.sidebar}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>P</div>
          {isExpanded && <span className={styles.logoText}>PORTFOLIO DOC</span>}
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navigation.map((section) => (
            <div key={section.title} className={styles.section}>
              {isExpanded && <h2 className={styles.sectionTitle}>{section.title}</h2>}
              <ul className={styles.navList}>
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.navLink}>
                      <span className={styles.icon}>{item.icon}</span>
                      {isExpanded && <span className={styles.label}>{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={styles.profile}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <Image src="/placeholder.svg" alt="Jane Smith" width={32} height={32} className={styles.avatarImage} />
            </div>
            {isExpanded && <span className={styles.userName}>Jane Smith</span>}
          </div>
          <div className={styles.actions}>
            <Link href="/upload" className={styles.actionLink}>
              <Upload size={20} />
              {isExpanded && <span>Upload</span>}
            </Link>
            <Link href="/settings" className={styles.actionLink}>
              <Settings size={20} />
              {isExpanded && <span>Settings</span>}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

