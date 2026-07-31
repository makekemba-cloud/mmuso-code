<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-white">Users</h2>
      <button
        @click="openModal()"
        class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
      >
        <i class="fas fa-plus mr-2"></i> Add User
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-800/50 border-b border-gray-800">
            <tr>
              <th class="px-3 sm:px-6 py-2 sm:py-3 text-gray-300 text-xs sm:text-sm">Username</th>
              <th class="px-3 sm:px-6 py-2 sm:py-3 text-gray-300 text-xs sm:text-sm">Role</th>
              <th class="px-3 sm:px-6 py-2 sm:py-3 text-gray-300 text-xs sm:text-sm hidden sm:table-cell">Created At</th>
              <th class="px-3 sm:px-6 py-2 sm:py-3 text-gray-300 text-xs sm:text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td class="px-3 sm:px-6 py-2 sm:py-3 text-gray-300 text-xs sm:text-sm">{{ user.username }}</td>
              <td class="px-3 sm:px-6 py-2 sm:py-3">
                <span
                  class="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full"
                  :class="{
                    'bg-blue-500/20 text-blue-400': user.role === 'admin',
                    'bg-green-500/20 text-green-400': user.role === 'editor',
                    'bg-gray-500/20 text-gray-400': user.role === 'viewer'
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-2 sm:py-3 text-gray-400 text-xs sm:text-sm hidden sm:table-cell">{{ formatDate(user.createdAt) }}</td>
              <td class="px-3 sm:px-6 py-2 sm:py-3 text-right">
                <button
                  @click="openModal(user)"
                  class="text-blue-400 hover:text-blue-300 mr-2 sm:mr-3"
                >
                  <i class="fas fa-edit text-xs sm:text-sm"></i>
                </button>
                <button
                  @click="deleteUser(user)"
                  class="text-red-400 hover:text-red-300"
                  :disabled="user.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1"
                >
                  <i class="fas fa-trash text-xs sm:text-sm"></i>
                </button>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="4" class="px-3 sm:px-6 py-4 sm:py-8 text-center text-gray-500 text-xs sm:text-sm">No users found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Create/Edit -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
      <div class="bg-gray-900 rounded-xl max-w-md w-full p-4 sm:p-6 border border-gray-800">
        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{{ editingUser ? 'Edit User' : 'New User' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Username</label>
            <input v-model="form.username" type="text" required class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base">
          </div>
          <div class="mb-2 sm:mb-3">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base pr-8 sm:pr-10"
                :required="!editingUser"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                tabindex="-1"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <p v-if="editingUser" class="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
          </div>
          <div class="mb-3 sm:mb-4">
            <label class="block text-gray-300 text-xs sm:text-sm mb-1">Role</label>
            <select v-model="form.role" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm sm:text-base">
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="flex flex-col xs:flex-row gap-2 sm:gap-3">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2 rounded text-sm sm:text-base">{{ editingUser ? 'Update' : 'Create' }}</button>
            <button type="button" @click="closeModal" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-1.5 sm:py-2 rounded text-sm sm:text-base">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
}

const users = ref<User[]>([]);
const modalOpen = ref(false);
const editingUser = ref<User | null>(null);
const showPassword = ref(false);
const form = ref({
  username: '',
  password: '',
  role: 'viewer' as 'admin' | 'editor' | 'viewer'
});

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const res = await axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    users.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const openModal = (user?: User) => {
  showPassword.value = false;
  if (user) {
    editingUser.value = user;
    form.value = { username: user.username, password: '', role: user.role };
  } else {
    editingUser.value = null;
    form.value = { username: '', password: '', role: 'viewer' };
  }
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  editingUser.value = null;
  showPassword.value = false;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const saveUser = async () => {
  const token = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    if (editingUser.value) {
      const payload: any = { username: form.value.username, role: form.value.role };
      if (form.value.password) payload.password = form.value.password;
      await axios.put(`/api/admin/users/${editingUser.value._id}`, payload, config);
    } else {
      await axios.post('/api/admin/users', form.value, config);
    }
    await fetchUsers();
    closeModal();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to save user');
  }
};

const deleteUser = async (user: User) => {
  const adminCount = users.value.filter(u => u.role === 'admin').length;
  if (user.role === 'admin' && adminCount <= 1) {
    alert('Cannot delete the only admin user.');
    return;
  }
  if (!confirm(`Delete user "${user.username}"?`)) return;

  const token = localStorage.getItem('adminToken');
  try {
    await axios.delete(`/api/admin/users/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await fetchUsers();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to delete user');
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

onMounted(fetchUsers);
</script>