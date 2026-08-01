<template>
  <div>
    <!-- Header: Title + Count + Refresh -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
      <div class="flex items-center gap-3">
        <h2 class="text-xl md:text-2xl font-bold text-white">API Activity Log</h2>
      </div>
      <button @click="fetchLogs" class="bg-gray-700 hover:bg-gray-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-xs md:text-sm">
        <i class="fas fa-sync-alt"></i> Refresh
      </button>
    </div>

    <!-- Filters Bar -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 p-3 md:p-4 mb-4 md:mb-6">
      <!-- Row 1: Method, Status, Page Path, Time Preset -->
      <div class="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3">
        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">Method</label>
          <select v-model="filters.method" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm">
            <option value="">All</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">Status Code</label>
          <select v-model="filters.statusCode" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm">
            <option value="">All</option>
            <option value="200">200 OK</option>
            <option value="201">201 Created</option>
            <option value="204">204 No Content</option>
            <option value="400">400 Bad Request</option>
            <option value="401">401 Unauthorized</option>
            <option value="403">403 Forbidden</option>
            <option value="404">404 Not Found</option>
            <option value="500">500 Server Error</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">Page Path</label>
          <input v-model="filters.pagePath" type="text" placeholder="/api/..." class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm placeholder-gray-500">
        </div>

        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">Time Range</label>
          <select v-model="selectedPreset" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm">
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

      <!-- Row 2: From Date, To Date, IP Filter, Actions -->
      <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3">
        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">From Date/Time</label>
          <input v-model="filters.startDate" type="datetime-local" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm">
        </div>
        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">To Date/Time</label>
          <input v-model="filters.endDate" type="datetime-local" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm">
        </div>
        <div>
          <label class="block text-gray-400 text-[10px] md:text-xs uppercase mb-1">IP Address (exact match)</label>
          <input v-model="filters.ip" type="text" placeholder="e.g. 192.168.1.1" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm placeholder-gray-500" @keyup.enter="applyFilters">
        </div>
        <div class="flex items-end gap-2">
          <button @click="applyFilters" class="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-xs md:text-sm">
            <i class="fas fa-filter mr-1"></i> Apply
          </button>
          <button @click="clearFilters" class="bg-gray-700 hover:bg-gray-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-xs md:text-sm">
            <i class="fas fa-times mr-1"></i> Clear
          </button>
        </div>
      </div>

      <!-- Row 3: Blocked IPs (toggle + add/remove) -->
      <div class="flex flex-wrap items-center gap-2 md:gap-4 mt-2 border-t border-gray-800 pt-3">
        <div class="flex items-center gap-2">
          <input type="checkbox" id="ipFilterToggle" v-model="ipFilterEnabled" class="form-checkbox bg-gray-800 border-gray-700 text-blue-600 rounded">
          <label for="ipFilterToggle" class="text-gray-300 text-xs md:text-sm cursor-pointer">Hide blocked IPs</label>
        </div>
        <div class="flex items-center gap-1 flex-wrap">
          <span class="text-gray-400 text-xs">Add IP:</span>
          <input v-model="newIP" type="text" placeholder="e.g. 192.168.1.1" class="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs w-32 md:w-40" @keyup.enter="addBlockedIP">
          <button @click="addBlockedIP" class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs">+</button>
        </div>
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-gray-400 text-xs">Blocked:</span>
          <span v-for="ip in blockedIPs" :key="ip" class="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs flex items-center gap-1">
            {{ ip }}
            <button @click="removeBlockedIP(ip)" class="text-red-400 hover:text-red-300 text-xs">✕</button>
          </span>
          <span v-if="blockedIPs.length === 0" class="text-gray-500 text-xs">(none)</span>
          <span class="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
          {{ displayedLogs.length }} / {{ total }}
        </span>
        </div>
      </div>
    </div>

    <!-- Logs Table (mobile‑friendly) -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-800/50 border-b border-gray-800">
            <tr>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase">Time</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase">Method</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase">Page</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase">Status</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase hidden sm:table-cell">Time (ms)</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase">IP</th> <!-- always visible -->
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase hidden lg:table-cell">Browser</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase hidden lg:table-cell">Device</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase hidden lg:table-cell">Country</th>
              <th class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-[10px] md:text-xs uppercase text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in displayedLogs" :key="log._id" class="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-300 text-xs md:text-sm whitespace-nowrap">{{ formatDate(log.timestamp) }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3">
                <span class="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full" :class="getMethodClass(log.method)">
                  {{ log.method }}
                </span>
              </td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-400 text-xs md:text-sm max-w-[80px] md:max-w-xs truncate">{{ log.page }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3">
                <span class="text-xs md:text-sm" :class="getStatusClass(log.statusCode)">
                  {{ log.statusCode || '—' }}
                </span>
              </td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-400 text-xs md:text-sm hidden sm:table-cell">{{ log.responseTime || '—' }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-400 text-xs md:text-sm font-mono">{{ log.ip || '—' }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-400 text-xs md:text-sm hidden lg:table-cell">{{ log.browser || '—' }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-400 text-xs md:text-sm hidden lg:table-cell">{{ log.device || '—' }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-gray-400 text-xs md:text-sm hidden lg:table-cell">{{ log.country || '—' }}</td>
              <td class="px-2 md:px-4 py-2 md:py-3 text-center">
                <button @click="openDetail(log)" class="text-blue-400 hover:text-blue-300">
                  <i class="fas fa-eye text-xs md:text-sm"></i>
                </button>
              </td>
            </tr>
            <tr v-if="displayedLogs.length === 0">
              <td colspan="10" class="px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm">
                {{ logs.length === 0 ? 'No logs found' : 'All logs are filtered out' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 md:px-6 py-3 md:py-4 border-t border-gray-800">
        <button
          @click="prevPage"
          :disabled="page <= 1"
          class="w-full sm:w-auto px-4 py-1.5 md:py-2 bg-gray-800 rounded disabled:opacity-50 text-gray-300 hover:bg-gray-700 text-xs md:text-sm"
        >
          Previous
        </button>
        <span class="text-gray-400 text-xs md:text-sm">Page {{ page }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="page >= totalPages"
          class="w-full sm:w-auto px-4 py-1.5 md:py-2 bg-gray-800 rounded disabled:opacity-50 text-gray-300 hover:bg-gray-700 text-xs md:text-sm"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Detail Modal (unchanged) -->
    <div v-if="selectedLog" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
      <div class="bg-gray-900 rounded-xl max-w-3xl w-full p-4 md:p-6 border border-gray-800 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-3 md:mb-4">
          <h3 class="text-lg md:text-xl font-bold text-white">API Log Details</h3>
          <button @click="closeDetail" class="text-gray-400 hover:text-white">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Timestamp</dt>
            <dd class="text-white text-sm md:text-base">{{ formatDate(selectedLog.timestamp) }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Method</dt>
            <dd class="text-white font-mono text-sm md:text-base">{{ selectedLog.method }}</dd>
          </div>
          <div class="col-span-1 md:col-span-2">
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Page</dt>
            <dd class="text-white break-all text-sm md:text-base">{{ selectedLog.page }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Status Code</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.statusCode || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Response Time</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.responseTime ? selectedLog.responseTime + ' ms' : '—' }}</dd>
          </div>
          <div class="col-span-1 md:col-span-2">
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Query</dt>
            <dd class="text-white font-mono text-xs md:text-sm break-all">{{ selectedLog.query || '—' }}</dd>
          </div>
          <div class="col-span-1 md:col-span-2">
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Body</dt>
            <dd v-if="parsedBody" class="bg-gray-800 p-2 md:p-3 rounded text-xs md:text-sm">
              <div v-for="(value, key) in parsedBody" :key="key" class="flex py-1 border-b border-gray-700/50 last:border-0">
                <span class="text-gray-400 font-mono w-1/3">{{ key }}</span>
                <span class="text-white font-mono w-2/3 break-all">{{ formatBodyValue(value) }}</span>
              </div>
            </dd>
            <dd v-else class="text-gray-400 text-xs md:text-sm">—</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Referrer</dt>
            <dd class="text-white break-all text-sm md:text-base">{{ selectedLog.referrer || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">IP</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.ip || '—' }}</dd>
          </div>
          <div class="col-span-1 md:col-span-2">
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">User Agent</dt>
            <dd class="text-white break-all text-xs md:text-sm">{{ selectedLog.userAgent || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Browser</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.browser || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">OS</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.os || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Device</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.device || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Country</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.country || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Region</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.region || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">City</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.city || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">User ID</dt>
            <dd class="text-white text-sm md:text-base">{{ selectedLog.userId || '—' }}</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-[10px] md:text-xs uppercase">Session ID</dt>
            <dd class="text-white font-mono text-xs md:text-sm">{{ selectedLog.sessionId || '—' }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';

// ── Types ──
interface ActivityLog {
  _id: string;
  timestamp: string;
  method: string;
  page: string;
  statusCode?: number;
  responseTime?: number;
  ip?: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  device?: string;
  country?: string;
  region?: string;
  city?: string;
  referrer?: string;
  query?: string;
  body?: string;
  userId?: string;
  sessionId?: string;
}

// ── Debounce ──
function debounce(fn: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ── State ──
const logs = ref<ActivityLog[]>([]);
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const totalPages = ref(1);
const selectedLog = ref<ActivityLog | null>(null);

const filters = ref({
  method: '',
  statusCode: '',
  pagePath: '',
  startDate: '',
  endDate: '',
  ip: '',
});

const selectedPreset = ref('10m');

// ── Blocked IPs ──
const blockedIPs = ref<string[]>(['102.253.50.15', '105.245.241.114']);
const ipFilterEnabled = ref(true);
const newIP = ref('');

// Save/load blocked IPs from localStorage
const loadBlockedIPs = () => {
  const stored = localStorage.getItem('blockedIPs');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        blockedIPs.value = parsed;
      }
    } catch {}
  }
};
const saveBlockedIPs = () => {
  localStorage.setItem('blockedIPs', JSON.stringify(blockedIPs.value));
};

const addBlockedIP = () => {
  const ip = newIP.value.trim();
  if (ip && !blockedIPs.value.includes(ip)) {
    blockedIPs.value.push(ip);
    saveBlockedIPs();
    newIP.value = '';
  }
};

const removeBlockedIP = (ip: string) => {
  blockedIPs.value = blockedIPs.value.filter(i => i !== ip);
  saveBlockedIPs();
};

// ── Computed ──
const parsedBody = computed(() => {
  if (!selectedLog.value?.body) return null;
  try { return JSON.parse(selectedLog.value.body); } catch { return null; }
});

// Displayed logs with IP filter + block list
const displayedLogs = computed(() => {
  let result = logs.value;
  if (filters.value.ip) {
    const ip = filters.value.ip.trim();
    result = result.filter(log => log.ip === ip);
  }
  if (ipFilterEnabled.value && blockedIPs.value.length > 0) {
    result = result.filter(log => {
      if (!log.ip) return true;
      return !blockedIPs.value.includes(log.ip);
    });
  }
  return result;
});

// ── Helpers ──
function formatDatetimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatBodyValue(value: any): string {
  if (value === null) return 'null';
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

function applyPreset(preset: string) {
  if (!preset) {
    filters.value.startDate = '';
    filters.value.endDate = '';
    return;
  }
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

// ── API call ──
const fetchLogs = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const params: any = {
      page: page.value,
      limit: limit.value,
    };
    if (filters.value.method) params.method = filters.value.method;
    if (filters.value.statusCode) params.statusCode = parseInt(filters.value.statusCode);
    if (filters.value.pagePath) params.pagePath = filters.value.pagePath;
    if (filters.value.startDate) params.startDate = new Date(filters.value.startDate).toISOString();
    if (filters.value.endDate) params.endDate = new Date(filters.value.endDate).toISOString();

    const res = await axios.get('/api/admin/stats/activities', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    logs.value = res.data.activities;
    total.value = res.data.total;
    totalPages.value = res.data.totalPages || 1;
  } catch (err) {
    console.error('Failed to fetch logs:', err);
  }
};

// ── Apply filters (manual) ──
const applyFilters = () => {
  page.value = 1;
  fetchLogs();
};

// ── Debounced fetch for auto‑filter ──
const debouncedFetch = debounce(() => {
  page.value = 1;
  fetchLogs();
}, 400);

// ── Watchers (auto‑filter) ──
watch(() => filters.value.method, debouncedFetch);
watch(() => filters.value.statusCode, debouncedFetch);
watch(() => filters.value.pagePath, debouncedFetch);
watch(() => filters.value.startDate, debouncedFetch);
watch(() => filters.value.endDate, debouncedFetch);
// IP filter is NOT watched – only applied via button (or Enter key)

watch(selectedPreset, (newVal) => {
  applyPreset(newVal);
});

// ── Clear filters ──
const clearFilters = () => {
  filters.value = {
    method: '',
    statusCode: '',
    pagePath: '',
    startDate: '',
    endDate: '',
    ip: '',
  };
  selectedPreset.value = '10m';
  page.value = 1;
  fetchLogs();
};

// ── Pagination ──
const prevPage = () => { if (page.value > 1) { page.value--; fetchLogs(); } };
const nextPage = () => { if (page.value < totalPages.value) { page.value++; fetchLogs(); } };

// ── Formatting ──
const formatDate = (date: string) => new Date(date).toLocaleString();

const getMethodClass = (method: string) => {
  const map: Record<string, string> = {
    GET: 'bg-blue-500/20 text-blue-400',
    POST: 'bg-green-500/20 text-green-400',
    PUT: 'bg-yellow-500/20 text-yellow-400',
    DELETE: 'bg-red-500/20 text-red-400',
    PATCH: 'bg-purple-500/20 text-purple-400',
  };
  return map[method] || 'bg-gray-500/20 text-gray-400';
};

const getStatusClass = (status?: number) => {
  if (!status) return 'text-gray-400';
  if (status >= 200 && status < 300) return 'text-green-400';
  if (status >= 300 && status < 400) return 'text-yellow-400';
  if (status >= 400 && status < 500) return 'text-orange-400';
  if (status >= 500) return 'text-red-400';
  return 'text-gray-400';
};

// ── Modal ──
const openDetail = (log: ActivityLog) => { selectedLog.value = log; };
const closeDetail = () => { selectedLog.value = null; };

// ── Initial load ──
onMounted(() => {
  loadBlockedIPs();
  applyPreset('10m');
  fetchLogs();
});
</script>