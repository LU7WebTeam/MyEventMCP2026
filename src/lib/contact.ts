export const WHATSAPP_NUMBER = '601133078724';
export const PHONE_TEL = '+60386053563';
export const PHONE_DISPLAY = '03-8605 3563';
export const EMAIL = 'hello@myeventmcp.com';

export const DEFAULT_WHATSAPP_MESSAGE = "Hi, I'm interested in multi-camera production for my event.";

export function whatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
