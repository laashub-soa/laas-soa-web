import defaultSettings from '@/settings'

const title = defaultSettings.title || 'LaaS SOA'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
