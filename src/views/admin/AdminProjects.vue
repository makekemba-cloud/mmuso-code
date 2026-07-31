<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-white">Projects</h2>
      <button
        @click="openModal()"
        class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
      >
        <i class="fas fa-plus mr-2"></i> Add Project
      </button>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div v-for="project in projects" :key="project._id" class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
        <img :src="project.imageUrl" :alt="project.title" class="w-full h-40 sm:h-48 object-cover">
        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{{ project.title }}</h3>
          <p class="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{{ project.description }}</p>
          <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <span v-for="tech in project.techStack" :key="tech" class="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              {{ tech }}
            </span>
          </div>
          <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span v-if="project.underDevelopment" class="text-[10px] sm:text-xs bg-yellow-500/20 text-yellow-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Under Development</span>
            <span v-if="project.inProduction" class="text-[10px] sm:text-xs bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">In Production</span>
          </div>
          <div class="flex flex-col-2 xs:flex-row gap-1.5 sm:gap-2">
            <button @click="openModal(project)" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-1.5 sm:py-2 rounded transition-colors text-xs sm:text-sm">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deleteProject(project._id!)" class="flex-1 bg-red-900/50 hover:bg-red-800 text-red-400 py-1.5 sm:py-2 rounded transition-colors text-xs sm:text-sm">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for create/edit -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
      <div class="bg-gray-900 rounded-xl max-w-lg w-full p-4 sm:p-6 border border-gray-800 max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{{ editingProject ? 'Edit Project' : 'New Project' }}</h3>
        <form @submit.prevent="saveProject">
          <!-- Title -->
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Title</label>
            <input v-model="form.title" type="text" required class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base">
          </div>

          <!-- Description -->
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Description</label>
            <textarea v-model="form.description" rows="3" required class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base"></textarea>
          </div>

          <!-- Image (File Upload) -->
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Image</label>
            <div class="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <div v-if="imagePreview || form.imageUrl" class="mt-1 sm:mt-2">
                <img :src="imagePreview || form.imageUrl" alt="Preview" class="max-h-24 sm:max-h-40 rounded-lg border border-gray-700">
              </div>
              <p v-if="uploadingImage" class="text-blue-400 text-xs sm:text-sm">Uploading image...</p>
              <input v-model="form.imageUrl" type="hidden" />
            </div>
          </div>

          <!-- Tech Stack (comma separated) -->
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Tech Stack (comma separated)</label>
            <input v-model="techStackStr" type="text" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base">
          </div>

          <!-- Live URL -->
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Live URL (optional)</label>
            <input v-model="form.liveUrl" type="url" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base">
          </div>

          <!-- GitHub URL -->
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">GitHub URL (optional)</label>
            <input v-model="form.githubUrl" type="url" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base">
          </div>

          <!-- Checkboxes -->
          <div class="mb-2 sm:mb-3 flex flex-col xs:flex-row gap-2 sm:gap-4">
            <label class="text-gray-300 text-xs sm:text-sm flex items-center gap-2">
              <input v-model="form.underDevelopment" type="checkbox" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 bg-gray-800 border-gray-700 rounded">
              Under Development
            </label>
            <label class="text-gray-300 text-xs sm:text-sm flex items-center gap-2">
              <input v-model="form.inProduction" type="checkbox" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 bg-gray-800 border-gray-700 rounded">
              In Production
            </label>
          </div>

          <!-- Actions -->
          <div class="flex flex-col xs:flex-row gap-2 sm:gap-3">
            <button type="submit" :disabled="uploadingImage" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2 rounded disabled:opacity-50 text-sm sm:text-base">
              {{ editingProject ? 'Update' : 'Create' }}
            </button>
            <button type="button" @click="closeModal" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-1.5 sm:py-2 rounded text-sm sm:text-base">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  underDevelopment?: boolean;
  inProduction?: boolean;
}

const projects = ref<Project[]>([]);
const modalOpen = ref(false);
const editingProject = ref<Project | null>(null);
const uploadingImage = ref(false);
const imagePreview = ref('');

const form = ref<Project>({
  title: '',
  description: '',
  imageUrl: '',
  techStack: [],
  liveUrl: '',
  githubUrl: '',
  underDevelopment: false,
  inProduction: false,
});

const techStackStr = ref('');

watch(techStackStr, (val) => {
  form.value.techStack = val.split(',').map(s => s.trim()).filter(Boolean);
});

// ── Image upload handler ──
const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  if (!file) return;

  imagePreview.value = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append('image', file);

  uploadingImage.value = true;
  try {
    const token = localStorage.getItem('adminToken');
    const res = await axios.post('/api/projects/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    form.value.imageUrl = res.data.url;
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Failed to upload image');
    imagePreview.value = '';
  } finally {
    uploadingImage.value = false;
  }
};

// ── Fetch projects ──
const fetchProjects = async () => {
  try {
    const res = await axios.get('/api/projects');
    projects.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const openModal = (project?: Project) => {
  imagePreview.value = '';
  if (project) {
    editingProject.value = project;
    form.value = { ...project };
    techStackStr.value = project.techStack.join(', ');
    imagePreview.value = project.imageUrl;
  } else {
    editingProject.value = null;
    form.value = {
      title: '',
      description: '',
      imageUrl: '',
      techStack: [],
      liveUrl: '',
      githubUrl: '',
      underDevelopment: false,
      inProduction: false,
    };
    techStackStr.value = '';
    imagePreview.value = '';
  }
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  editingProject.value = null;
  imagePreview.value = '';
  uploadingImage.value = false;
};

const saveProject = async () => {
  if (!form.value.imageUrl) {
    alert('Please upload an image');
    return;
  }

  const token = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    if (editingProject.value && editingProject.value._id) {
      await axios.put(`/api/projects/${editingProject.value._id}`, form.value, config);
    } else {
      await axios.post('/api/projects', form.value, config);
    }
    await fetchProjects();
    closeModal();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to save project');
  }
};

const deleteProject = async (id: string) => {
  if (!confirm('Delete this project?')) return;
  const token = localStorage.getItem('adminToken');
  await axios.delete(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  await fetchProjects();
};

onMounted(fetchProjects);
</script>