<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-white">Manage Reviews</h2>
      <button @click="fetchReviews" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
        <i class="fas fa-sync-alt"></i> Refresh
      </button>
    </div>

    <!-- Stats Bar: All, Visible, Hidden -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <!-- All -->
      <div class="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">All Reviews</p>
            <p class="text-2xl font-bold text-white">{{ stats.all.total }}</p>
            <p class="text-yellow-400 text-sm">
              {{ stats.all.average ? stats.all.average.toFixed(1) : '—' }} ★
            </p>
          </div>
          <i class="fas fa-star text-3xl text-gray-500 opacity-30"></i>
        </div>
      </div>

      <!-- Visible -->
      <div class="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">Visible</p>
            <p class="text-2xl font-bold text-green-400">{{ stats.visible.total }}</p>
            <p class="text-yellow-400 text-sm">
              {{ stats.visible.average ? stats.visible.average.toFixed(1) : '—' }} ★
            </p>
          </div>
          <i class="fas fa-eye text-3xl text-green-500/30"></i>
        </div>
      </div>

      <!-- Hidden -->
      <div class="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs uppercase">Hidden</p>
            <p class="text-2xl font-bold text-red-400">{{ stats.hidden.total }}</p>
            <p class="text-yellow-400 text-sm">
              {{ stats.hidden.average ? stats.hidden.average.toFixed(1) : '—' }} ★
            </p>
          </div>
          <i class="fas fa-eye-slash text-3xl text-red-500/30"></i>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Name</label>
          <input v-model="filters.name" placeholder="Search..." class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm">
        </div>
        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Rating</label>
          <select v-model="filters.rating" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm">
            <option value="">All</option>
            <option v-for="r in 5" :key="r" :value="r">{{ r }} ★</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-400 text-xs uppercase mb-1">Status</label>
          <select v-model="filters.isHidden" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm">
            <option value="">All</option>
            <option value="false">Visible</option>
            <option value="true">Hidden</option>
          </select>
        </div>
        <div class="flex items-end gap-2">
          <button @click="applyFilters" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg">Apply</button>
          <button @click="clearFilters" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-lg">Clear</button>
        </div>
      </div>
    </div>

    <!-- Table (unchanged) -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-800/50 border-b border-gray-800">
            <tr>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Name</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Rating</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Comment</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Project</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Location</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Date</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase">Status</th>
              <th class="px-4 py-3 text-gray-300 text-xs uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="review in reviews" :key="review._id" class="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td class="px-4 py-3 text-white text-sm">{{ review.name }}</td>
              <td class="px-4 py-3 text-yellow-400 text-sm">{{ '★'.repeat(review.rating) }}</td>
              <td class="px-4 py-3 text-gray-300 text-sm max-w-xs truncate">{{ review.comment }}</td>
              <td class="px-4 py-3 text-gray-400 text-sm">{{ review.project || '—' }}</td>
              <td class="px-4 py-3 text-gray-400 text-sm">{{ review.location || '—' }}</td>
              <td class="px-4 py-3 text-gray-400 text-sm">{{ new Date(review.createdAt).toLocaleDateString() }}</td>
              <td class="px-4 py-3">
                <span :class="review.isHidden ? 'text-red-400' : 'text-green-400'" class="text-sm">
                  {{ review.isHidden ? 'Hidden' : 'Visible' }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <button @click="openEdit(review)" class="text-blue-400 hover:text-blue-300 mr-2 text-sm">
                  <i class="fas fa-pen"></i>
                </button>
                <button @click="toggleHidden(review)" class="text-blue-400 hover:text-blue-300 mr-2 text-sm">
                  <i :class="review.isHidden ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                </button>
                <button @click="openDelete(review._id)" class="text-red-400 hover:text-red-300 text-sm">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="reviews.length === 0">
              <td colspan="8" class="px-4 py-6 text-center text-gray-500 text-sm">No reviews found</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="flex justify-between items-center px-4 py-3 border-t border-gray-800">
        <button @click="prevPage" :disabled="page <= 1" class="px-4 py-1 bg-gray-800 rounded disabled:opacity-50 text-gray-300 hover:bg-gray-700 text-sm">Previous</button>
        <span class="text-gray-400 text-sm">Page {{ page }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page >= totalPages" class="px-4 py-1 bg-gray-800 rounded disabled:opacity-50 text-gray-300 hover:bg-gray-700 text-sm">Next</button>
      </div>
    </div>

    <!-- ========== EDIT MODAL ========== -->
    <Teleport to="body">
      <div v-if="editModalOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button @click="closeEdit" class="absolute top-3 right-3 text-gray-400 hover:text-white">
            <i class="fas fa-times"></i>
          </button>
          <h3 class="text-xl font-bold text-white mb-4">Edit Review</h3>
          <form @submit.prevent="saveEdit" class="space-y-4">
            <div>
              <label class="block text-gray-300 text-sm mb-1">Name *</label>
              <input v-model="editForm.name" type="text" required class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-1">Rating *</label>
              <div class="flex gap-2">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  @click="editForm.rating = star"
                  class="text-2xl focus:outline-none transition-colors"
                  :class="star <= (editForm.rating || 0) ? 'text-yellow-400' : 'text-gray-600'"
                >
                  ★
                </button>
              </div>
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-1">Comment *</label>
              <textarea v-model="editForm.comment" rows="3" required class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"></textarea>
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-1">Project / Website</label>
              <input v-model="editForm.project" type="text" placeholder="e.g. My Portfolio" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-1">Location</label>
              <input v-model="editForm.location" type="text" placeholder="e.g. Johannesburg" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-1">Status</label>
              <select v-model="editForm.isHidden" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option :value="false">Visible</option>
                <option :value="true">Hidden</option>
              </select>
            </div>
            <div class="flex gap-3">
              <button type="submit" :disabled="saving" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors disabled:opacity-50 text-sm">
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
              <button type="button" @click="closeEdit" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors text-sm">Cancel</button>
            </div>
            <p v-if="editMessage" class="text-sm text-center" :class="editError ? 'text-red-400' : 'text-green-400'">{{ editMessage }}</p>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ========== DELETE MODAL ========== -->
    <Teleport to="body">
      <div v-if="deleteModalOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl max-w-sm w-full p-6 shadow-2xl">
          <h3 class="text-xl font-bold text-white mb-2">Delete Review?</h3>
          <p class="text-gray-400 text-sm mb-6">This action cannot be undone. Are you sure you want to permanently delete this review?</p>
          <div class="flex gap-3">
            <button @click="confirmDelete" :disabled="deleting" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors disabled:opacity-50 text-sm">
              {{ deleting ? 'Deleting...' : 'Yes, Delete' }}
            </button>
            <button @click="closeDelete" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors text-sm">Cancel</button>
          </div>
          <p v-if="deleteMessage" class="text-sm text-center text-red-400 mt-2">{{ deleteMessage }}</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  project?: string;
  location?: string;
  createdAt: string;
  isHidden: boolean;
}

// ── State ──
const reviews = ref<Review[]>([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 10;

const filters = ref({
  name: '',
  rating: '',
  isHidden: '',
});

// New stats structure
const stats = ref({
  all: { total: 0, average: 0 },
  visible: { total: 0, average: 0 },
  hidden: { total: 0, average: 0 },
});

// Edit modal
const editModalOpen = ref(false);
const editForm = ref<Partial<Review>>({});
const saving = ref(false);
const editMessage = ref('');
const editError = ref(false);
let currentEditId: string | null = null;

// Delete modal
const deleteModalOpen = ref(false);
const deleting = ref(false);
const deleteMessage = ref('');
let deleteTargetId: string | null = null;

// ── API Calls ──
const fetchReviews = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const params: any = { page: page.value, limit };
    if (filters.value.name) params.name = filters.value.name;
    if (filters.value.rating) params.rating = parseInt(filters.value.rating);
    if (filters.value.isHidden !== '') params.isHidden = filters.value.isHidden === 'true';

    const res = await axios.get('/api/admin/reviews', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    reviews.value = res.data.reviews;
    totalPages.value = res.data.totalPages;
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
  }
};

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    // Call the breakdown endpoint (no filters needed)
    const res = await axios.get('/api/admin/reviews/stats/breakdown', {
      headers: { Authorization: `Bearer ${token}` },
    });
    stats.value = res.data;
  } catch (err) {
    console.error('Failed to fetch stats:', err);
  }
};

// ── Debounce helper ──
function debounce(fn: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedFetch = debounce(() => {
  page.value = 1;
  fetchReviews();
  fetchStats();
}, 300);

// ── Watchers (auto‑filter) ──
watch(() => filters.value.name, debouncedFetch);
watch(() => filters.value.rating, debouncedFetch);
watch(() => filters.value.isHidden, debouncedFetch);

// ── Apply filters (manual) ──
const applyFilters = () => {
  page.value = 1;
  fetchReviews();
  // Stats are global, no need to re‑fetch on filter change, but keep for consistency
  fetchStats();
};

const clearFilters = () => {
  filters.value = { name: '', rating: '', isHidden: '' };
  page.value = 1;
  fetchReviews();
  fetchStats();
};

// ── Pagination ──
const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchReviews();
  }
};
const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchReviews();
  }
};

// ── Toggle Hidden ──
const toggleHidden = async (review: Review) => {
  try {
    const token = localStorage.getItem('adminToken');
    const res = await axios.patch(`/api/admin/reviews/${review._id}`,
      { isHidden: !review.isHidden },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    review.isHidden = res.data.isHidden;
    fetchStats(); // refresh stats after visibility change
  } catch (err) {
    console.error('Failed to toggle review status:', err);
  }
};

// ── Edit ──
const openEdit = (review: Review) => {
  currentEditId = review._id;
  editForm.value = {
    name: review.name,
    rating: review.rating,
    comment: review.comment,
    project: review.project || '',
    location: review.location || '',
    isHidden: review.isHidden,
  };
  editMessage.value = '';
  editError.value = false;
  editModalOpen.value = true;
};

const closeEdit = () => {
  editModalOpen.value = false;
  currentEditId = null;
  editForm.value = {};
};

const saveEdit = async () => {
  if (!currentEditId) return;
  saving.value = true;
  editMessage.value = '';
  try {
    const token = localStorage.getItem('adminToken');
    const payload = {
      name: editForm.value.name,
      rating: editForm.value.rating,
      comment: editForm.value.comment,
      project: editForm.value.project || '',
      location: editForm.value.location || '',
      isHidden: editForm.value.isHidden,
    };
    const res = await axios.patch(`/api/admin/reviews/${currentEditId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const idx = reviews.value.findIndex(r => r._id === currentEditId);
    if (idx !== -1) {
      reviews.value[idx] = res.data;
    }
    editMessage.value = 'Review updated successfully!';
    editError.value = false;
    fetchStats();
    setTimeout(closeEdit, 1200);
  } catch (err) {
    console.error('Failed to update review:', err);
    editMessage.value = 'Failed to update review.';
    editError.value = true;
  } finally {
    saving.value = false;
  }
};

// ── Delete ──
const openDelete = (id: string) => {
  deleteTargetId = id;
  deleteMessage.value = '';
  deleteModalOpen.value = true;
};

const closeDelete = () => {
  deleteModalOpen.value = false;
  deleteTargetId = null;
};

const confirmDelete = async () => {
  if (!deleteTargetId) return;
  deleting.value = true;
  deleteMessage.value = '';
  try {
    const token = localStorage.getItem('adminToken');
    await axios.delete(`/api/admin/reviews/${deleteTargetId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    reviews.value = reviews.value.filter(r => r._id !== deleteTargetId);
    closeDelete();
    if (reviews.value.length === 0 && page.value > 1) {
      page.value--;
      fetchReviews();
    }
    fetchStats();
  } catch (err) {
    console.error('Failed to delete review:', err);
    deleteMessage.value = 'Failed to delete review.';
  } finally {
    deleting.value = false;
  }
};

// ── Init ──
onMounted(() => {
  fetchReviews();
  fetchStats();
});
</script>