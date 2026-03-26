"use client"

const WHATSAPP_NUMBER = "919833943776"
const PRESET_MESSAGE = "Hi FinMates, I want to discuss your financial services."

export default function FloatingWhatsAppCTA() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PRESET_MESSAGE)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform duration-300 hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M19.11 17.41c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.59.13-.18.26-.68.84-.84 1.01-.15.18-.31.2-.57.07-.26-.13-1.08-.4-2.05-1.27-.76-.68-1.27-1.51-1.42-1.77-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.95-.21-.5-.43-.43-.59-.44-.15-.01-.33-.01-.5-.01-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.18 1.85 2.82 4.48 3.95.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.53-.63 1.75-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.18-.5-.31z" />
        <path d="M16.01 3.2c-7.03 0-12.74 5.71-12.74 12.74 0 2.25.59 4.44 1.7 6.37L3.2 28.8l6.65-1.74a12.72 12.72 0 0 0 6.16 1.58h.01c7.03 0 12.74-5.71 12.74-12.74 0-3.41-1.33-6.61-3.74-9.02A12.66 12.66 0 0 0 16.01 3.2zm0 23.25h-.01a10.5 10.5 0 0 1-5.34-1.46l-.38-.22-3.95 1.04 1.05-3.86-.25-.4a10.55 10.55 0 0 1 1.63-13.39 10.45 10.45 0 0 1 7.25-2.9c5.81 0 10.53 4.73 10.53 10.54 0 5.81-4.73 10.54-10.53 10.54z" />
      </svg>
    </a>
  )
}

