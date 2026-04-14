import { X } from 'lucide-react'
import { useStore } from '../store/useStore'
import { cn } from '../lib/utils'

export function TabBar() {
  const openTabs = useStore(state => state.openTabs)
  const activeFile = useStore(state => state.activeFile)
  const loadFile = useStore(state => state.loadFile)
  const closeTab = useStore(state => state.closeTab)
  const presentationMode = useStore(state => state.presentationMode)

  if (openTabs.length === 0) return null

  return (
    <div className={cn(
      "flex items-center bg-[#1e1e1e] border-b border-[#3a3a3a] overflow-x-auto shrink-0",
      presentationMode && "bg-[#1e1e1e]/80 backdrop-blur-sm"
    )}>
      {openTabs.map((tab) => {
        const isActive = activeFile?.path === tab.path
        const isModified = tab.modified

        return (
          <div
            key={tab.path}
            className={cn(
              "group flex items-center gap-1.5 px-3 py-1.5 text-sm border-r border-[#3a3a3a] cursor-pointer select-none min-w-0 max-w-[180px]",
              isActive
                ? "bg-[#2d2d2d] text-gray-100 border-t-2 border-t-blue-500"
                : "bg-[#1e1e1e] text-gray-400 hover:bg-[#252525] hover:text-gray-200 border-t-2 border-t-transparent"
            )}
            onClick={() => loadFile(tab)}
          >
            <span className="truncate">
              {tab.name.replace('.excalidraw', '')}
            </span>
            {isModified && (
              <span className="w-2 h-2 bg-orange-400 rounded-full shrink-0" />
            )}
            {!presentationMode && (
              <button
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#444] rounded shrink-0 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.path)
                }}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
