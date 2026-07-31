<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">Total Visits</p>
            <p class="text-2xl font-bold text-white">{{ stats.totalVisits || 0 }}</p>
          </div>
          <i class="fas fa-eye text-2xl text-blue-500 opacity-50"></i>
        </div>
      </div>
      <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">Unique Visitors</p>
            <p class="text-2xl font-bold text-white">{{ stats.uniqueVisitors || 0 }}</p>
          </div>
          <i class="fas fa-users text-2xl text-green-500 opacity-50"></i>
        </div>
      </div>
      <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">Total Projects</p>
            <p class="text-2xl font-bold text-white">{{ stats.projectsCount || 0 }}</p>
          </div>
          <i class="fas fa-folder-open text-2xl text-purple-500 opacity-50"></i>
        </div>
      </div>
      <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">API Requests</p>
            <p class="text-2xl font-bold text-white">{{ apiRequests || 0 }}</p>
          </div>
          <i class="fas fa-code text-2xl text-yellow-500 opacity-50"></i>
        </div>
      </div>
    </div>

    <!-- Additional stats row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
        <p class="text-gray-400 text-xs uppercase">Avg Response Time</p>
        <p class="text-xl font-bold text-white">{{ avgResponseTime }} ms</p>
      </div>
      <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
        <p class="text-gray-400 text-xs uppercase">Most Used Method</p>
        <p class="text-xl font-bold text-white">{{ topMethod || '—' }}</p>
      </div>
      <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
        <p class="text-gray-400 text-xs uppercase">Top Browser</p>
        <p class="text-xl font-bold text-white">{{ topBrowser || '—' }}</p>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Line chart: visits over last 7 days -->
      <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
        <h3 class="text-sm font-semibold text-white mb-3">Visits (Last 7 Days)</h3>
        <canvas ref="lineChartCanvas"></canvas>
      </div>
      <!-- Pie chart: device distribution -->
      <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
        <h3 class="text-sm font-semibold text-white mb-3">Device Distribution</h3>
        <canvas ref="pieChartCanvas"></canvas>
      </div>
    </div>

    <!-- Top pages table -->
    <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
      <h3 class="text-sm font-semibold text-white mb-4">Top API Endpoints</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="text-gray-400 text-xs uppercase border-b border-gray-700">
            <tr>
              <th class="pb-2 pr-4">Endpoint</th>
              <th class="pb-2 pr-4">Method</th>
              <th class="pb-2">Requests</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in topPages" :key="item.page" class="border-b border-gray-700/50 last:border-0">
              <td class="py-2 pr-4 text-gray-300 text-sm font-mono">{{ item.page }}</td>
              <td class="py-2 pr-4 text-gray-400 text-sm">{{ item.method }}</td>
              <td class="py-2 text-gray-300 text-sm">{{ item.count }}</td>
            </tr>
            <tr v-if="topPages.length === 0">
              <td colspan="3" class="py-4 text-center text-gray-500">No data yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted} from 'vue'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const stats = ref({
  totalVisits: 0,
  uniqueVisitors: 0,
  projectsCount: 0
})

const lineChartCanvas = ref<HTMLCanvasElement | null>(null)
const pieChartCanvas = ref<HTMLCanvasElement | null>(null)
let lineChartInstance: Chart | null = null
let pieChartInstance: Chart | null = null

// Derived stats from logs
const logs = ref<any[]>([])
const apiRequests = ref(0)
const avgResponseTime = ref(0)
const topMethod = ref('')
const topBrowser = ref('')
const topPages = ref<{ page: string; method: string; count: number }[]>([])

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const response = await axios.get('/api/admin/stats/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = response.data
  } catch (err) {
    console.error('Failed to fetch stats', err)
  }
}

const fetchLogs = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const response = await axios.get('/api/admin/stats/activities?limit=500', {
      headers: { Authorization: `Bearer ${token}` }
    })
    logs.value = response.data.activities || []
    computeDerivedStats()
    renderLineChart()
    renderPieChart()
  } catch (err) {
    console.error('Failed to fetch logs', err)
  }
}

function computeDerivedStats() {
  const items = logs.value
  if (!items.length) {
    apiRequests.value = 0
    avgResponseTime.value = 0
    topMethod.value = '—'
    topBrowser.value = '—'
    topPages.value = []
    return
  }

  // Total requests
  apiRequests.value = items.length

  // Average response time
  const times = items.map(l => l.responseTime).filter(t => t && t > 0)
  avgResponseTime.value = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0

  // Most common method
  const methodCounts: Record<string, number> = {}
  items.forEach(l => { methodCounts[l.method] = (methodCounts[l.method] || 0) + 1 })
  const topMethodEntry = Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0]
  topMethod.value = topMethodEntry ? topMethodEntry[0] : '—'

  // Most common browser
  const browserCounts: Record<string, number> = {}
  items.forEach(l => {
    if (l.browser) {
      browserCounts[l.browser] = (browserCounts[l.browser] || 0) + 1
    }
  })
  const topBrowserEntry = Object.entries(browserCounts).sort((a, b) => b[1] - a[1])[0]
  topBrowser.value = topBrowserEntry ? topBrowserEntry[0] : '—'

  // Top pages (group by page + method)
  const pageMap: Record<string, { page: string; method: string; count: number }> = {}
  items.forEach(l => {
    const key = `${l.method} ${l.page}`
    if (!pageMap[key]) {
      pageMap[key] = { page: l.page, method: l.method, count: 0 }
    }
    pageMap[key].count++
  })
  topPages.value = Object.values(pageMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

function renderLineChart() {
  if (!lineChartCanvas.value) return
  const items = logs.value
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().split('T')[0]
  }).reverse()
  const counts = last7Days.map(date => items.filter(log => log.timestamp?.startsWith(date)).length)

  if (lineChartInstance) lineChartInstance.destroy()
  lineChartInstance = new Chart(lineChartCanvas.value, {
    type: 'line',
    data: {
      labels: last7Days,
      datasets: [{
        label: 'Visits',
        data: counts,
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#2563EB'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#fff' } } },
      scales: {
        y: { ticks: { color: '#fff' }, grid: { color: '#1f2937' } },
        x: { ticks: { color: '#fff' }, grid: { color: '#1f2937' } }
      }
    }
  })
}

function renderPieChart() {
  if (!pieChartCanvas.value) return
  const items = logs.value
  const deviceCounts: Record<string, number> = {}
  items.forEach(l => {
    const device = l.device || 'unknown'
    deviceCounts[device] = (deviceCounts[device] || 0) + 1
  })
  const labels = Object.keys(deviceCounts)
  const data = Object.values(deviceCounts)
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  if (pieChartInstance) pieChartInstance.destroy()
  pieChartInstance = new Chart(pieChartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: labels.length ? labels : ['No Data'],
      datasets: [{
        data: labels.length ? data : [1],
        backgroundColor: colors.slice(0, labels.length || 1),
        borderColor: '#1a1a1a',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#fff' } }
      },
      cutout: '60%'
    }
  })
}

onMounted(() => {
  fetchStats()
  fetchLogs()
})
</script>

<style scoped>
canvas { max-height: 200px; width: 100%; }
@media (min-width: 768px) {
  canvas { max-height: 250px; }
}
</style>