export const WHATSAPP_PHONE = '5574999728690'

/** wa.me link that opens a chat with Mega News with `text` already typed in. */
export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
}
