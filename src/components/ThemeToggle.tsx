import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")

  React.useEffect(() => {
    // Initialize state from local storage or system
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  React.useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      localStorage.removeItem("theme")
      return
    }

    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'}`}
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-md transition-all ${theme === 'system' ? 'bg-white dark:bg-gray-700 text-blue-500 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'}`}
        aria-label="System Mode"
      >
        <Laptop className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-md transition-all ${theme === 'dark' ? 'bg-gray-700 text-purple-400 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'}`}
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  )
}
