/**
 * A utility function to conditionally join class names together
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}