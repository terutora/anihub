export function isValidImageUrl(url) {
    if (!url) return false;
    
    try {
      const parsedUrl = new URL(url);
      return ['http:', 'https:'].includes(parsedUrl.protocol) && 
             !parsedUrl.hostname.includes('localhost') &&
             !parsedUrl.hostname.match(/^(\d{1,3}\.){3}\d{1,3}$/);
    } catch {
      return false;
    }
  }