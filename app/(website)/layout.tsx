import { redirect } from 'next/navigation'

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  redirect('/maintenance')
}
