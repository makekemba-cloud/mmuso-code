import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

// --- Utilities ---

function getVisitorId(): string {
  let id = localStorage.getItem('visitorId');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('visitorId', id);
  }
  return id;
}

let sessionId = '';
function getSessionId(): string {
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  return sessionId;
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
  const device = isMobile ? (/Tablet/i.test(ua) ? 'tablet' : 'mobile') : 'desktop';
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  return { device, browser, os };
}

// Send event to backend (fire‑and‑forget)
async function sendEvent(payload: any) {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Silently fail – don't break user experience
    console.debug('Tracking failed:', err);
  }
}

// --- Composable ---

export function useTracker() {
  const router = useRouter();
  const visitorId = getVisitorId();
  const session = getSessionId();
  const { device, browser, os } = getDeviceInfo();

  let startTime = Date.now();

  // Track a custom event
  function trackEvent(payload: {
    event: string;
    category: string;
    element?: string;
    url?: string;
    referrer?: string;
    trafficSource?: string;
    metadata?: Record<string, any>;
    duration?: number;
    status?: string;
  }) {
    const data = {
      visitorId,
      sessionId: session,
      event: payload.event,
      category: payload.category,
      element: payload.element || '',
      url: payload.url || window.location.href,
      referrer: payload.referrer || document.referrer || '',
      trafficSource: payload.trafficSource || '',
      device,
      browser,
      os,
      metadata: payload.metadata || {},
      duration: payload.duration || 0,
      status: payload.status || '',
    };
    sendEvent(data);
  }

  // Track page view on route change
  function trackPageView(_to: any, from: any) {
    const url = window.location.href;
    const referrer = from?.fullPath ? window.location.origin + from.fullPath : document.referrer;
    trackEvent({
      event: 'page_view',
      category: 'navigation',
      url,
      referrer,
    });
  }

  // Track click on elements with data-track attribute
  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const trackEl = target.closest('[data-track]');
    if (!trackEl) return;

    const event = trackEl.getAttribute('data-track') || 'click';
    const category = trackEl.getAttribute('data-track-category') || 'interaction';
    const element = trackEl.getAttribute('data-track-label') || trackEl.textContent?.trim() || trackEl.tagName;
    let metadata: Record<string, any> | undefined;
    const metaAttr = trackEl.getAttribute('data-track-metadata');
    if (metaAttr) {
      try { metadata = JSON.parse(metaAttr); } catch (_) { /* ignore */ }
    }
    trackEvent({
      event,
      category,
      element,
      metadata,
    });
  }

  // Track duration on page exit
  function trackDuration() {
    const duration = Date.now() - startTime;
    if (duration > 100) { // only meaningful if > 100ms
      trackEvent({
        event: 'page_exit',
        category: 'navigation',
        duration,
      });
    }
  }

  // --- Lifecycle ---

  onMounted(() => {
    // Track initial page view
    trackPageView(router.currentRoute.value, null);

    // Listen to route changes
    const unsubscribe = router.afterEach((to, from) => {
      trackPageView(to, from);
    });

    // Click listener
    document.addEventListener('click', handleClick);

    // Before leaving page, track duration
    window.addEventListener('beforeunload', trackDuration);

    // Cleanup on unmount
    onBeforeUnmount(() => {
      unsubscribe();
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', trackDuration);
    });
  });

  // Expose manual tracking function
  return { trackEvent };
}