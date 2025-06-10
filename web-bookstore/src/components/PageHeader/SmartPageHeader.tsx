import { ReactNode } from 'react'
import DynamicPageHeader from './DynamicPageHeader'
import { PageConfig, createPageConfig } from './config'

interface SmartPageHeaderProps {
  title?: string
  subtitle?: string
  showSearch?: boolean
  showDatePicker?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  rightContent?: ReactNode
  badge?: {
    label: string
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  }

  config?: Partial<PageConfig>
}

export default function SmartPageHeader({
  title,
  subtitle,
  showSearch,
  showDatePicker,
  searchPlaceholder,
  onSearch,
  rightContent,
  badge,
  config
}: SmartPageHeaderProps) {
  const propsConfig = title
    ? createPageConfig(title, {
        subtitle,
        showSearch,
        showDatePicker,
        searchPlaceholder,
        badge
      })
    : undefined

  const finalConfig = config || propsConfig

  return <DynamicPageHeader config={finalConfig} onSearch={onSearch} rightContent={rightContent} />
}
