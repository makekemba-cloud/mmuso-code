<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <h2 class="text-2xl font-bold text-white">User Events</h2>
      <button @click="refresh" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
        <i class="fas fa-sync-alt"></i> Refresh
      </button>
    </div>

    <!-- Filters Bar -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 p-4 mb-6">
      <!-- Row 1: Event, Category, Page Path, Time Preset -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Event Type</label>
          <select v-model="filters.event" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            <option value="">All</option>
            <option value="page_view">Page View</option>
            <option value="click">Click</option>
            <option value="form_submit">Form Submit</option>
            <option value="page_exit">Page Exit</option>
            <option value="login_attempt">Login Attempt</option>
            <option value="login_success">Login Success</option>
            <option value="login_failed">Login Failed</option>
            <option value="logout">Logout</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Category</label>
          <select v-model="filters.category" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            <option value="">All</option>
            <option value="navigation">Navigation</option>
            <option value="cta">CTA</option>
            <option value="social">Social</option>
            <option value="contact">Contact</option>
            <option value="admin">Admin</option>
            <option value="404">404</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Page Path</label>
          <input v-model="filters.pagePath" type="text" placeholder="/about, /pricing..." class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500">
        </div>

        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Time Range</label>
          <select v-model="selectedPreset" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            <option value="10m">Last 10 min</option>
            <option value="30m">Last 30 min</option>
            <option value="1h">Last 1 hour</option>
            <option value="2h">Last 2 hours</option>
            <option value="1d">Last 1 day</option>
            <option value="2d">Last 2 days</option>
            <option value="">Custom</option>
          </select>
        </div>
      </div>

      <!-- Row 2: Manual datetime + Apply / Clear -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">From Date/Time</label>
          <input v-model="filters.startDate" type="datetime-local" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
        </div>
        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">To Date/Time</label>
          <input v-model="filters.endDate" type="datetime-local" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
        </div>
        <div class="flex items-end gap-2">
          <button @click="applyFilters" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            <i class="fas fa-filter mr-1"></i> Apply Filters
          </button>
          <button @click="clearFilters" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            <i class="fas fa-times mr-1"></i> Clear
          </button>
          <span v-if="isFiltered" class="text-gray-400 text-sm">(Filtered)</span>
        </div>
      </div>
    </div>

    <!-- Events Table (unchanged) -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-800/50 border-b border-gray-800">
            <tr>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Time</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Event</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Category</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Element</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Page</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">IP</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Browser</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Country</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase">Duration</th>
              <th class="px-3 py-3 text-gray-300 text-xs uppercase text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evt in events" :key="evt._id" class="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td class="px-3 py-3 text-gray-300 text-sm">{{ formatTime(evt.timestamp) }}</td>
              <td class="px-3 py-3">
                <span class="px-2 py-1 text-xs rounded-full" :class="getEventClass(evt.event)">
                  {{ evt.event }}
                </span>
              </td>
              <td class="px-3 py-3 text-gray-400 text-sm">{{ evt.category }}</td>
              <td class="px-3 py-3 text-gray-300 text-sm max-w-xs truncate">{{ evt.element || '—' }}</td>
              <td class="px-3 py-3 text-gray-400 text-sm max-w-xs truncate">{{ evt.page || evt.url }}</td>
              <td class="px-3 py-3 text-gray-400 text-sm">{{ evt.ip || '—' }}</td>
              <td class="px-3 py-3 text-gray-400 text-sm">{{ evt.browser || '—' }}</td>
              <td class="px-3 py-3 text-gray-400 text-sm">{{ evt.country || '—' }}</td>
              <td class="px-3 py-3 text-gray-400 text-sm">{{ evt.duration ? evt.duration + 'ms' : '—' }}</td>
              <td class="px-3 py-3 text-center">
                <button @click="openDetail(evt)" class="text-blue-400 hover:text-blue-300">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="10" class="px-6 py-8 text-center text-gray-500">No events found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center px-6 py-4 border-t border-gray-800">
        <button
          @click="prevPage"
          :disabled="page <= 1"
          class="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 text-gray-300 hover:bg-gray-700"
        >
          Previous
        </button>
        <span class="text-gray-400 text-sm">Page {{ page }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="page >= totalPages"
          class="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 text-gray-300 hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 rounded-xl max-w-2xl w-full p-6 border border-gray-800 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-white">Event Details</h3>
          <button @click="closeDetail" class="text-gray-400 hover:text-white">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt class="text-gray-500 text-xs uppercase">Event</dt>
            <dd class="text-white font-mono">{{ selectedEvent.event }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Category</dt>
            <dd class="text-white">{{ selectedEvent.category }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Element</dt>
            <dd class="text-white">{{ selectedEvent.element || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">URL</dt>
            <dd class="text-white break-all">{{ selectedEvent.url }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Page</dt>
            <dd class="text-white">{{ selectedEvent.page || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Referrer</dt>
            <dd class="text-white break-all">{{ selectedEvent.referrer || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Traffic Source</dt>
            <dd class="text-white">{{ selectedEvent.trafficSource || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Status</dt>
            <dd class="text-white">{{ selectedEvent.status || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Duration</dt>
            <dd class="text-white">{{ selectedEvent.duration ? selectedEvent.duration + 'ms' : '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">IP</dt>
            <dd class="text-white">{{ selectedEvent.ip || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">User Agent</dt>
            <dd class="text-white break-all text-sm">{{ selectedEvent.userAgent || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Device</dt>
            <dd class="text-white">{{ selectedEvent.device || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Browser</dt>
            <dd class="text-white">{{ selectedEvent.browser || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">OS</dt>
            <dd class="text-white">{{ selectedEvent.os || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Country</dt>
            <dd class="text-white">{{ selectedEvent.country || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Region</dt>
            <dd class="text-white">{{ selectedEvent.region || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">City</dt>
            <dd class="text-white">{{ selectedEvent.city || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Visitor ID</dt>
            <dd class="text-white font-mono text-sm">{{ selectedEvent.visitorId || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-xs uppercase">Session ID</dt>
            <dd class="text-white font-mono text-sm">{{ selectedEvent.sessionId || '—' }}</dd>
          </div>
          <div class="col-span-2">
            <dt class="text-gray-500 text-xs uppercase">Metadata</dt>
            <dd class="text-white font-mono text-sm bg-gray-800 p-2 rounded overflow-x-auto">
              <pre>{{ JSON.stringify(selectedEvent.metadata, null, 2) || '—' }}</pre>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';

interface Event {
  _id: string;
  timestamp: string;
  event: string;
  category: string;
  element?: string;
  url: string;
  page?: string;
  referrer?: string;
  trafficSource?: string;
  status?: string;
  duration?: number;
  ip?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  region?: string;
  city?: string;
  visitorId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

// ── Debounce helper ──
function debounce(fn: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ── State ──
const events = ref<Event[]>([]);
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const totalPages = ref(1);
const selectedEvent = ref<Event | null>(null);

const filters = ref({
  event: '',
  category: '',
  pagePath: '',
  startDate: '',
  endDate: '',
});

const selectedPreset = ref('10m');

const isFiltered = computed(() => {
  return !!filters.value.event || !!filters.value.category || !!filters.value.pagePath || !!filters.value.startDate || !!filters.value.endDate;
});

// ── Helpers ──
function formatDatetimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function applyPreset(preset: string) {
  if (!preset) { filters.value.startDate = ''; filters.value.endDate = ''; return; }
  const now = new Date();
  let start = new Date(now);
  switch (preset) {
    case '10m': start.setMinutes(now.getMinutes() - 10); break;
    case '30m': start.setMinutes(now.getMinutes() - 30); break;
    case '1h': start.setHours(now.getHours() - 1); break;
    case '2h': start.setHours(now.getHours() - 2); break;
    case '1d': start.setDate(now.getDate() - 1); break;
    case '2d': start.setDate(now.getDate() - 2); break;
    default: return;
  }
  filters.value.startDate = formatDatetimeLocal(start);
  filters.value.endDate = formatDatetimeLocal(now);
}

// ── API fetch ──
const fetchEvents = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const params: any = {
      page: page.value,
      limit: limit.value,
    };
    if (filters.value.event) params.event = filters.value.event;
    if (filters.value.category) params.category = filters.value.category;
    if (filters.value.pagePath) params.pagePath = filters.value.pagePath;
    if (filters.value.startDate) params.startDate = new Date(filters.value.startDate).toISOString();
    if (filters.value.endDate) params.endDate = new Date(filters.value.endDate).toISOString();

    const res = await axios.get('/api/events', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    events.value = res.data.events;
    total.value = res.data.total;
    totalPages.value = res.data.totalPages || 1;
  } catch (err) {
    console.error('Failed to fetch events:', err);
  }
};

// ── Apply filters (manual) ──
const applyFilters = () => {
  page.value = 1;
  fetchEvents();
};

// ── Clear filters ──
const clearFilters = () => {
  filters.value = { event: '', category: '', pagePath: '', startDate: '', endDate: '' };
  selectedPreset.value = '10m';
  page.value = 1;
  fetchEvents();
};

// ── Auto‑apply time preset and date changes (debounced) ──
const debouncedFetch = debounce(() => { page.value = 1; fetchEvents(); }, 400);

watch(selectedPreset, (newVal) => {
  applyPreset(newVal);
});

watch(() => filters.value.startDate, debouncedFetch);
watch(() => filters.value.endDate, debouncedFetch);

// ── Pagination ──
const prevPage = () => { if (page.value > 1) { page.value--; fetchEvents(); } };
const nextPage = () => { if (page.value < totalPages.value) { page.value++; fetchEvents(); } };
const refresh = () => fetchEvents();

// ── Formatting ──
const formatTime = (date: string) => new Date(date).toLocaleString();

const getEventClass = (event: string) => {
  const map: Record<string, string> = {
    page_view: 'bg-blue-500/20 text-blue-400',
    click: 'bg-green-500/20 text-green-400',
    form_submit: 'bg-purple-500/20 text-purple-400',
    page_exit: 'bg-orange-500/20 text-orange-400',
    login_attempt: 'bg-yellow-500/20 text-yellow-400',
    login_success: 'bg-green-500/20 text-green-400',
    login_failed: 'bg-red-500/20 text-red-400',
    logout: 'bg-gray-500/20 text-gray-400',
  };
  return map[event] || 'bg-gray-500/20 text-gray-400';
};

// ── Modal ──
const openDetail = (evt: Event) => { selectedEvent.value = evt; };
const closeDetail = () => { selectedEvent.value = null; };

// ── Init ──
onMounted(() => {
  applyPreset('10m');
  fetchEvents();
});
</script>