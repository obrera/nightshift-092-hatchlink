import { createBrowserRouter, Navigate } from 'react-router'

import type { ShellNotFoundProps } from '@/shell/data-access/shell-not-found-props'

import { ShellFeature, ShellUiLoader } from '@/shell/feature'

export const appRouter = createBrowserRouter(
  [
    {
      children: [
        { element: <Navigate replace to="/hatchlink" />, index: true },
        {
          lazy: () => import('@/features/hatchlink/feature/hatchlink-feature-entry'),
          path: 'hatchlink',
        },
        {
          lazy: () => import('@/about/feature/about-feature'),
          path: 'about',
        },
        {
          lazy: () => import('@/wallet/feature/wallet-feature'),
          path: 'wallet',
        },
        {
          lazy: () => import('@/shell/feature/shell-not-found-feature'),
          loader: (): ShellNotFoundProps => ({
            links: [
              {
                description: 'Learn what this starter includes and how the wallet playground is organized.',
                title: 'About',
                to: '/about',
              },
              {
                description: 'Open the wallet screen if you were looking for connection and signing tools.',
                title: 'Wallet',
                to: '/wallet',
              },
              {
                description: 'Open the HatchLink companion drop claim and verifier.',
                title: 'HatchLink',
                to: '/hatchlink',
              },
            ],
          }),
          path: '*',
        },
      ],
      element: (
        <ShellFeature
          links={[
            { label: 'HatchLink', to: '/hatchlink' },
            { label: 'Wallet', to: '/wallet' },
            { label: 'About', to: '/about' },
          ]}
        />
      ),
      hydrateFallbackElement: <ShellUiLoader fullScreen />,
    },
  ],
  {
    // Set the base URL for router links and redirects, removing trailing slashes if present, independent of the base
    basename: import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)
