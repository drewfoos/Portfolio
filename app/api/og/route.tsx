// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og'
 
export const runtime = 'edge'
 
export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B0B0B',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            Andrew Dryfoos
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#888',
            }}
          >
            Software Engineer & Developer
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.log(`${error instanceof Error ? error.message : 'Failed to generate image'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}