import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'iWeather',
    short_name: 'iWeather',
    description: 'Weather app',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}