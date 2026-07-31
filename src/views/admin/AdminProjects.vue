<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-white">Projects</h2>
      <button
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <i class="fas fa-plus mr-2"></i> Add Project
      </button>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project._id" class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
        <img :src="project.imageUrl" :alt="project.title" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-2">{{ project.title }}</h3>
          <p class="text-gray-400 text-sm mb-3 line-clamp-2">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tech in project.techStack" :key="tech" class="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
              {{ tech }}
            </span>
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-if="project.underDevelopment" class="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Under Development</span>
            <span v-if="project.inProduction" class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">In Production</span>
          </div>
          <div class="flex gap-2">
            <button @click="openModal(project)" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-1 rounded transition-colors">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deleteProject(project._id!)" class="flex-1 bg-red-900/50 hover:bg-red-800 text-red-400 py-1 rounded transition-colors">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for create/edit -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 rounded-xl max-w-lg w-full p-6 border border-gray-800 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-bold text-white mb-4">{{ editingProject ? 'Edit Project' : 'New Project' }}</h3>
        <form @submit.prevent="saveProject">
          <!-- Title -->
          <div class="mb-3">
            <label class="block text-gray-300 text-sm mb-1">Title</label>
            <input v-model="form.title" type="text" required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white">
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="block text-gray-300 text-sm mb-1">Description</label>
            <textarea v-model="form.description" rows="3" required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"></textarea>
          </div>

          <!-- Image (File Upload) -->
          <div class="mb-3">
            <label class="block text-gray-300 text-sm mb-1">Image</label>
            <div class="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <div v-if="imagePreview || form.imageUrl" class="mt-2">
                <img :src="imagePreview || form.imageUrl" alt="Preview" class="max-h-40 rounded-lg border border-gray-700">
              </div>
              <p v-if="uploadingImage" class="text-blue-400 text-sm">Uploading image...</p>
              <input v-model="form.imageUrl" type="hidden" />
            </div>
          </div>

          <!-- Tech Stack (comma separated) -->
          <div class="mb-3">
            <label class="block text-gray-300 text-sm mb-1">Tech Stack (comma separated)</label>
            <input v-model="techStackStr" type="text" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white">
          </div>

          <!-- Live URL -->
          <div class="mb-3">
            <label class="block text-gray-300 text-sm mb-1">Live URL (optional)</label>
            <input v-model="form.liveUrl" type="url" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white">
          </div>

          <!-- GitHub URL -->
          <div class="mb-3">
            <label class="block text-gray-300 text-sm mb-1">GitHub URL (optional)</label>
            <input v-model="form.githubUrl" type="url" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white">
          </div>

          <!-- Checkboxes -->
          <div class="mb-3 flex gap-4">
            <label class="text-gray-300 text-sm flex items-center gap-2">
              <input v-model="form.underDevelopment" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded">
              Under Development
            </label>
            <label class="text-gray-300 text-sm flex items-center gap-2">
              <input v-model="form.inProduction" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded">
              In Production
            </label>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button type="submit" :disabled="uploadingImage" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50">
              {{ editingProject ? 'Update' : 'Create' }}
            </button>
            <button type="button" @click="closeModal" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">Cancel</button>
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

// ── Image upload handler (fixed) ──
const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  if (!file) return; // guard against undefined

  // Show preview
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
      // Update existing project
      await axios.put(`/api/projects/${editingProject.value._id}`, form.value, config);
    } else {
      // Create new
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