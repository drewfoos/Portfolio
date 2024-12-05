// components/layout/SocialSidebar.tsx
import type { FC } from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon, SendIcon } from 'lucide-react'

const SocialSidebar: FC = () => {
  return (
    <aside className="fixed left-4 top-1/4 z-50 hidden lg:block"> {/* Added hidden lg:block */}
      <div className="flex flex-col space-y-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200"
        >
          <GithubIcon size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200"
        >
          <InstagramIcon size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200"
        >
          <LinkedinIcon size={24} />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200"
        >
          <SendIcon size={24} />  
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200"
        >
          <TwitterIcon size={24} />
        </a>
      </div>
    </aside>
  )
}

export default SocialSidebar