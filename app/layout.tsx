import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Uma pergunta para Gabi 💙', description: 'Uma surpresa especial.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
