<template>
  <section class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 overflow-hidden">
    <!-- Floating orbs -->
    <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <!-- Badge -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Testimonials</span>
        </span>
      </div>

      <!-- Heading (centered) -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-2">
        What Our <span class="text-[#2563EB]">Clients Say</span>
      </h2>

      <!-- Subheading -->
      <p class="text-center text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
        Real feedback from real people who have worked with us.
      </p>

      <!-- Marquee (horizontal scrolling) -->
      <div v-if="reviews.length > 0" class="relative overflow-hidden mask-gradient">
        <div class="flex gap-5 animate-scroll">
          <div v-for="review in displayedReviews" :key="review._id" class="review-card flex-shrink-0 w-72 md:w-80">
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5 h-full flex flex-col">
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-white text-sm">{{ review.name }}</span>
                    <div class="text-yellow-400 text-xs">
                      {{ '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) }}
                    </div>
                  </div>
                  <p class="text-gray-300 text-sm mt-2 flex-1 line-clamp-3">{{ review.comment }}</p>
                </div>
              </div>
              <div class="mt-3 flex items-center gap-2 flex-wrap">
                <span v-if="review.project" class="text-gray-400 text-xs bg-gray-800 px-2 py-0.5 rounded-full">{{ review.project }}</span>
                <span v-if="review.location" class="text-gray-500 text-xs">{{ review.location }}</span>
                <span class="text-gray-600 text-xs ml-auto">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center text-gray-400 py-8">
        No reviews yet. Be the first!
      </div>

      <!-- Stats: average rating + total reviews -->
      <div v-if="reviews.length > 0" class="text-center mt-6">
        <span class="text-gray-300 text-sm">
          ⭐ {{ averageRating.toFixed(1) }} average rating · Based on {{ reviews.length }} review{{ reviews.length > 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Button at the bottom -->
      <div class="text-center mt-6">
        <button
          @click="openPopup"
          class="bg-[#2563EB] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        >
          <i class="fas fa-plus-circle"></i> Leave a Review
        </button>
      </div>
    </div>
  </section>

  <!-- Popup – Teleported to body to avoid stacking issues -->
  <Teleport to="body">
    <div v-if="popupOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button @click="closePopup" class="absolute top-3 right-3 text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>

        <h3 class="text-xl font-bold text-white mb-4">Leave a Review</h3>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-gray-300 text-sm mb-1">Name *</label>
            <input v-model="form.name" type="text" required class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-1">Email (optional)</label>
            <input v-model="form.email" type="email" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-1">Project / Website (optional)</label>
            <input v-model="form.project" type="text" placeholder="e.g. My Portfolio" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-1">Location (optional)</label>
            <input v-model="form.location" type="text" placeholder="e.g. Johannesburg" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-1">Rating *</label>
            <div class="flex gap-2">
              <button v-for="star in 5" :key="star" type="button" @click="form.rating = star" class="text-2xl focus:outline-none transition-colors" :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-600'">
                ★
              </button>
            </div>
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-1">Comment *</label>
            <textarea v-model="form.comment" rows="3" required class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"></textarea>
          </div>
          <button type="submit" :disabled="submitting" class="w-full bg-[#2563EB] hover:bg-blue-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50 text-sm">
            {{ submitting ? 'Submitting...' : 'Submit Review' }}
          </button>
          <p v-if="submitMessage" class="text-sm text-center" :class="submitError ? 'text-red-400' : 'text-green-400'">{{ submitMessage }}</p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

interface Review {
  _id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  project?: string;
  location?: string;
  createdAt: string;
}

const reviews = ref<Review[]>([]);
const popupOpen = ref(false);
const submitting = ref(false);
const submitMessage = ref('');
const submitError = ref(false);

const form = ref({
  name: '',
  email: '',
  rating: 0,
  comment: '',
  project: '',
  location: '',
});

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.value.length;
});

// Build a longer list for seamless scrolling.
const displayedReviews = computed(() => {
  if (reviews.value.length === 0) return [];
  const minCopies = Math.ceil(10 / reviews.value.length);
  const copies = Math.max(minCopies, 3);
  return Array.from({ length: copies }, () => reviews.value).flat();
});

const openPopup = () => {
  popupOpen.value = true;
};

const closePopup = () => {
  popupOpen.value = false;
  form.value = { name: '', email: '', rating: 0, comment: '', project: '', location: '' };
  submitMessage.value = '';
  submitError.value = false;
};

const fetchReviews = async () => {
  try {
    const res = await axios.get('/api/reviews');
    reviews.value = res.data;
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
  }
};

const submitReview = async () => {
  if (form.value.rating === 0) {
    submitMessage.value = 'Please select a rating.';
    submitError.value = true;
    return;
  }
  submitting.value = true;
  submitMessage.value = '';
  try {
    await axios.post('/api/reviews', form.value);
    submitMessage.value = 'Thank you for your review!';
    submitError.value = false;
    form.value = { name: '', email: '', rating: 0, comment: '', project: '', location: '' };
    await fetchReviews();
    setTimeout(() => closePopup(), 1500);
  } catch (err: any) {
    submitMessage.value = err.response?.data?.error || 'Failed to submit review';
    submitError.value = true;
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchReviews);
</script>

<style scoped>
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(37, 99, 235, 0.1);
  backdrop-filter: blur(4px);
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.pulse-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Marquee scroll */
.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.animate-scroll {
  animation: scroll 30s linear infinite;
  width: max-content;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll:hover {
  animation-play-state: paused;
}

.review-card {
  transition: transform 0.2s, border-color 0.2s;
}

.review-card:hover {
  transform: scale(1.03);
  border-color: rgba(37, 99, 235, 0.3);
}

@media (max-width: 640px) {
  .review-card {
    width: 280px;
  }
}
</style>