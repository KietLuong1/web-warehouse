import { useEffect } from 'react'

const ChatBot: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    script.type = 'text/javascript'

    script.onload = () => {
      if ((window as any).voiceflow?.chat) {
        ;(window as any).voiceflow.chat.load({
          verify: { projectID: '678a15e979783c849856d728' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: 'https://runtime-api.voiceflow.com'
          }
        })
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null // This component doesn't render anything, it just loads the script
}

export default ChatBot
