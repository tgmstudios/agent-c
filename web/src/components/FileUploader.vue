<template>
    <div class="file-uploader">
      <div 
        class="upload-area" 
        :class="{ 'drag-over': isDragging, 'has-file': !!selectedFile }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onFileDrop"
        @click="triggerFileInput"
      >
        <input 
          type="file" 
          ref="fileInput" 
          @change="onFileChange" 
          accept=".pdf,.csv" 
          class="file-input"
        >
        
        <div v-if="!selectedFile">
          <i class="fas fa-cloud-upload-alt upload-icon"></i>
          <p>Drag and drop your transcript file here or click to browse</p>
          <p class="file-types">Accepted file types: PDF, CSV</p>
        </div>
        
        <div v-else class="file-info">
          <i class="fas fa-file-alt file-icon"></i>
          <p class="file-name">{{ selectedFile.name }}</p>
          <p class="file-size">{{ formatFileSize(selectedFile.size) }}</p>
          <button class="btn-remove" @click.stop="removeFile">
            <i class="fas fa-times"></i> Remove
          </button>
        </div>
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'FileUploader',
    props: {
      // Maximum file size in bytes (default: 10MB)
      maxSize: {
        type: Number,
        default: 10 * 1024 * 1024
      }
    },
    emits: ['file-selected', 'file-removed'],
    
    setup(props, { emit }) {
      const fileInput = ref(null);
      const selectedFile = ref(null);
      const isDragging = ref(false);
      const errorMessage = ref('');
      
      // Trigger the hidden file input when the upload area is clicked
      const triggerFileInput = () => {
        fileInput.value.click();
      };
      
      // Handle file selection from the file input
      const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          validateAndSetFile(file);
        }
      };
      
      // Handle file drop
      const onFileDrop = (event) => {
        isDragging.value = false;
        const file = event.dataTransfer.files[0];
        if (file) {
          validateAndSetFile(file);
        }
      };
      
      // Validate file type and size
      const validateAndSetFile = (file) => {
        errorMessage.value = '';
        
        // Check file type
        const fileType = file.type;
        const validTypes = ['application/pdf', 'text/csv'];
        
        if (!validTypes.includes(fileType) && 
            !file.name.endsWith('.pdf') && 
            !file.name.endsWith('.csv')) {
          errorMessage.value = 'Please upload a PDF or CSV file.';
          return;
        }
        
        // Check file size
        if (file.size > props.maxSize) {
          errorMessage.value = `File size exceeds the maximum limit of ${formatFileSize(props.maxSize)}.`;
          return;
        }
        
        // Set the selected file and emit event
        selectedFile.value = file;
        emit('file-selected', file);
      };
      
      // Remove the selected file
      const removeFile = () => {
        selectedFile.value = null;
        fileInput.value.value = '';
        emit('file-removed');
      };
      
      // Format file size for display
      const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };
      
      return {
        fileInput,
        selectedFile,
        isDragging,
        errorMessage,
        triggerFileInput,
        onFileChange,
        onFileDrop,
        removeFile,
        formatFileSize
      };
    }
  }
  </script>
  
  <style scoped>
  .file-uploader {
    margin-bottom: 20px;
  }
  
  .upload-area {
    color: rgb(255, 255, 255);
    border: 2px dashed rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: rgba(83, 248, 0, 0);
  }
  
  .upload-area:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: #ffffff;
  }
  
  .drag-over {
    background-color: rgba(255, 219, 0, 0.1);
    border-color: #ffffff;
  }
  
  .has-file {
    background-color: rgba(255, 221, 0, 0);
    border-color: #d8efcf;
  }
  
  .file-input {
    display: none;
  }
  
  .upload-icon {
    font-size: 48px;
    color: #00b634;
    margin-bottom: 15px;
  }
  
  .file-types {
    font-size: 14px;
    color: rgb(255, 255, 255);
    margin-top: 10px;
  }
  
  .file-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .file-icon {
    font-size: 36px;
    color: #5b00a1;
    margin-bottom: 10px;
  }
  
  .file-name {
    font-weight: bold;
    margin-bottom: 5px;
    word-break: break-all;
  }
  
  .file-size {
    color: rgba(255, 255, 255, 0.549);
    margin-bottom: 15px;
  }
  
  .btn-remove {
    background-color: rgba(0, 0, 0, 0.2);
    color: #b70e0e;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-remove:hover {
    background-color: rgba(255, 82, 82, 0.3);
  }
  
  /* TODO: Customize these styles to match your university's branding */
  </style>
  