import type { Metadata } from 'next';
import { WhyAesClient } from './WhyAesClient';

export const metadata: Metadata = {
  title: 'Why Join AES? | Alpha Entrepreneurship Summit 2026',
  description:
    'Discover the key benefits of participating in the Alpha Entrepreneurship Summit (AES) 2026, organized by the ACE Society at Alpha College. Real-world business simulations, leadership skills, networking, and prizes.',
  alternates: {
    canonical: 'https://www.alphaace.com.pk/why-aes'
  },
  openGraph: {
    title: 'Why Join AES? | Alpha Entrepreneurship Summit 2026',
    description:
      'Discover the key benefits of participating in the Alpha Entrepreneurship Summit (AES) 2026, designed to shape the next generation of founders.',
    url: 'https://www.alphaace.com.pk/why-aes',
    siteName: 'Alpha Entrepreneurship Summit'
  }
};

export default function WhyAesPage() {
  return <WhyAesClient />;
}
