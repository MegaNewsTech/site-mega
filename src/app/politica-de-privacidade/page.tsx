import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/features/privacy/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Política de privacidade — Mega News',
  description:
    'Como a Mega News trata os dados de quem visita o site: formulários, cookies e Microsoft Clarity, conforme a LGPD.',
  alternates: { canonical: '/politica-de-privacidade/' },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
