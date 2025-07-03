---
layout: single
title: "Image Format Converter"
permalink: /tools/image-converter/
author_profile: true
classes: wide
---

<div class="image-converter-container">
  <div class="converter-header">
    <h2>🖼️ Image Format Converter</h2>
    <p>Convert images between different formats (JPEG, PNG, WebP, HEIC, etc.) right in your browser. No uploads needed - everything happens locally!</p>
  </div>

  <div class="converter-main">
    <!-- File Upload Section -->
    <div class="upload-section">
      <div class="upload-zone" id="uploadZone">
        <div class="upload-content">
          <div class="upload-icon">📁</div>
          <h3>Drop your images here or click to browse</h3>
          <p><strong>Supported formats:</strong> JPEG, PNG, WebP, BMP, GIF, TIFF, HEIC, HEIF</p>
          <p style="font-size: 0.8rem; color: #27ae60;"><strong>New:</strong> HEIC/HEIF files are now supported!</p>
          <input type="file" id="imageInput" accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/webp,image/tiff,.heic,.heif" multiple>
        </div>
      </div>
    </div>

    <!-- Settings Section -->
    <div class="settings-section" id="settingsSection" style="display: none;">
      <h3>⚙️ Conversion Settings</h3>
      
      <div class="settings-grid">
        <div class="setting-group">
          <label for="outputFormat">Output Format:</label>
          <select id="outputFormat">
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
            <option value="bmp">BMP</option>
          </select>
        </div>

        <div class="setting-group">
          <label for="quality">Quality (1-100):</label>
          <input type="range" id="quality" min="1" max="100" value="90">
          <span id="qualityValue">90</span>
        </div>

        <div class="setting-group">
          <label for="resize">Resize Image:</label>
          <input type="checkbox" id="resize">
        </div>

        <div class="setting-group resize-options" id="resizeOptions" style="display: none;">
          <label for="width">Width (px):</label>
          <input type="number" id="width" placeholder="Auto">
          <label for="height">Height (px):</label>
          <input type="number" id="height" placeholder="Auto">
          <label>
            <input type="checkbox" id="maintainAspect" checked> Maintain aspect ratio
          </label>
        </div>
      </div>

      <button id="convertBtn" class="convert-button">🔄 Convert Images</button>
    </div>

    <!-- Preview Section -->
    <div class="preview-section" id="previewSection" style="display: none;">
      <h3>📋 Conversion Results</h3>
      <div id="previewContainer"></div>
      <button id="downloadAllBtn" class="download-all-button" style="display: none;">📥 Download All</button>
    </div>
  </div>
</div>

<!-- Load HEIC conversion library -->
<script src="https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js"></script>

<style>
.image-converter-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.converter-header {
  text-align: center;
  margin-bottom: 2rem;
}

.converter-header h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.upload-section {
  margin-bottom: 2rem;
}

.upload-zone {
  border: 3px dashed #bdc3c7;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.upload-zone:hover, .upload-zone.dragover {
  border-color: #3498db;
  background-color: #e3f2fd;
  transform: translateY(-2px);
}

.upload-content {
  pointer-events: none;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-zone h3 {
  color: #34495e;
  margin-bottom: 0.5rem;
}

.upload-zone p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

#imageInput {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  pointer-events: auto;
}

.settings-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.settings-section h3 {
  margin-top: 0;
  color: #2c3e50;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setting-group label {
  font-weight: 600;
  color: #34495e;
}

.setting-group select,
.setting-group input[type="number"] {
  padding: 0.5rem;
  border: 2px solid #ecf0f1;
  border-radius: 6px;
  font-size: 1rem;
}

.setting-group input[type="range"] {
  width: 100%;
}

#qualityValue {
  font-weight: 600;
  color: #3498db;
}

.resize-options {
  grid-column: 1 / -1;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;
}

.resize-options label:last-child {
  grid-column: 1 / -1;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.convert-button, .download-all-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.convert-button:hover, .download-all-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.convert-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.preview-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.preview-section h3 {
  margin-top: 0;
  color: #2c3e50;
}

.preview-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #f8f9fa;
}

.preview-info {
  flex: 1;
}

.preview-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.preview-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.download-btn, .preview-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.download-btn {
  background: #27ae60;
  color: white;
}

.preview-btn {
  background: #3498db;
  color: white;
}

.download-btn:hover {
  background: #229954;
}

.preview-btn:hover {
  background: #2980b9;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  width: 0%;
  transition: width 0.3s ease;
}

.status-message {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.status-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .image-converter-container {
    padding: 1rem;
  }
  
  .upload-zone {
    padding: 2rem 1rem;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .resize-options {
    grid-template-columns: 1fr;
  }
  
  .preview-item {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .preview-actions {
    justify-content: center;
  }
}
</style>

<script>
class ImageConverter {
  constructor() {
    this.files = [];
    this.convertedFiles = [];
    this.supportedInputFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];
    this.heicFiles = [];
    this.initializeElements();
    this.bindEvents();
  }

  initializeElements() {
    this.uploadZone = document.getElementById('uploadZone');
    this.imageInput = document.getElementById('imageInput');
    this.settingsSection = document.getElementById('settingsSection');
    this.previewSection = document.getElementById('previewSection');
    this.outputFormat = document.getElementById('outputFormat');
    this.quality = document.getElementById('quality');
    this.qualityValue = document.getElementById('qualityValue');
    this.resize = document.getElementById('resize');
    this.resizeOptions = document.getElementById('resizeOptions');
    this.width = document.getElementById('width');
    this.height = document.getElementById('height');
    this.maintainAspect = document.getElementById('maintainAspect');
    this.convertBtn = document.getElementById('convertBtn');
    this.previewContainer = document.getElementById('previewContainer');
    this.downloadAllBtn = document.getElementById('downloadAllBtn');
  }

  bindEvents() {
    // File input events
    this.imageInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
    
    // Drag and drop events
    this.uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.uploadZone.classList.add('dragover');
    });
    
    this.uploadZone.addEventListener('dragleave', () => {
      this.uploadZone.classList.remove('dragover');
    });
    
    this.uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.uploadZone.classList.remove('dragover');
      this.handleFiles(e.dataTransfer.files);
    });

    // Settings events
    this.quality.addEventListener('input', () => {
      this.qualityValue.textContent = this.quality.value;
    });
    
    this.resize.addEventListener('change', () => {
      this.resizeOptions.style.display = this.resize.checked ? 'grid' : 'none';
    });
    
    this.width.addEventListener('input', () => {
      if (this.maintainAspect.checked && this.width.value) {
        this.calculateHeight();
      }
    });
    
    this.height.addEventListener('input', () => {
      if (this.maintainAspect.checked && this.height.value) {
        this.calculateWidth();
      }
    });

    // Convert button
    this.convertBtn.addEventListener('click', () => this.convertImages());
    
    // Download all button
    this.downloadAllBtn.addEventListener('click', () => this.downloadAll());
  }

  async handleFiles(fileList) {
    const allFiles = Array.from(fileList);
    this.files = [];
    this.heicFiles = [];
    const unsupportedFiles = [];
    
    this.showStatus('Processing files...', 'info');
    
    // Process each file
    for (const file of allFiles) {
      const fileName = file.name.toLowerCase();
      
      // Check if it's a HEIC/HEIF file first (by extension)
      if (fileName.match(/\.(heic|heif)$/)) {
        try {
          this.showStatus(`Converting HEIC file: ${file.name}...`, 'info');
          
          // Check if heic2any is available
          if (typeof heic2any === 'undefined') {
            throw new Error('HEIC conversion library not loaded');
          }
          
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.95
          });
          
          // Create a new File object from the converted blob with original name
          const convertedFile = new File([convertedBlob], 
            file.name, // Keep original name for now
            { type: 'image/jpeg' });
          
          this.files.push(convertedFile);
          this.heicFiles.push({
            original: file.name,
            converted: convertedFile.name
          });
          
        } catch (error) {
          console.error('HEIC conversion failed:', error);
          this.showStatus(`Failed to convert HEIC file: ${file.name} - ${error.message}`, 'error');
          unsupportedFiles.push(file.name);
        }
      }
      // Check if it's a standard image format
      else if (file.type.startsWith('image/')) {
        if (this.supportedInputFormats.includes(file.type.toLowerCase()) || 
            fileName.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|tif)$/)) {
          this.files.push(file);
        } else {
          unsupportedFiles.push(file.name);
        }
      }
      // Check by file extension for files without proper MIME types
      else if (fileName.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|tif)$/)) {
        this.files.push(file);
      }
      else {
        unsupportedFiles.push(file.name);
      }
    }
    
    if (this.files.length === 0) {
      let message = 'No supported image files selected.';
      if (unsupportedFiles.length > 0) {
        message += ` Unsupported files: ${unsupportedFiles.join(', ')}`;
      }
      this.showStatus(message, 'error');
      return;
    }
    
    let message = `${this.files.length} image(s) ready for conversion.`;
    if (this.heicFiles.length > 0) {
      message += ` (${this.heicFiles.length} HEIC files pre-converted to JPEG)`;
    }
    if (unsupportedFiles.length > 0) {
      message += ` Note: ${unsupportedFiles.length} unsupported files were skipped.`;
    }
    
    this.showStatus(message, 'success');
    this.settingsSection.style.display = 'block';
    
    // Set default dimensions from first image
    if (this.files[0]) {
      this.loadImageDimensions(this.files[0]);
    }
  }

  loadImageDimensions(file) {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      this.width.placeholder = img.width;
      this.height.placeholder = img.height;
      this.originalAspectRatio = img.width / img.height;
      URL.revokeObjectURL(objectUrl);
    };
    
    img.onerror = () => {
      console.warn('Could not load dimensions for:', file.name);
      URL.revokeObjectURL(objectUrl);
    };
    
    img.src = objectUrl;
  }

  calculateHeight() {
    if (this.originalAspectRatio && this.width.value) {
      this.height.value = Math.round(this.width.value / this.originalAspectRatio);
    }
  }

  calculateWidth() {
    if (this.originalAspectRatio && this.height.value) {
      this.width.value = Math.round(this.height.value * this.originalAspectRatio);
    }
  }

  async convertImages() {
    if (this.files.length === 0) return;
    
    this.convertBtn.disabled = true;
    this.convertBtn.innerHTML = '<span class="loading-spinner"></span>Converting...';
    this.convertedFiles = [];
    
    this.showStatus('Converting images...', 'info');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < this.files.length; i++) {
      try {
        const convertedFile = await this.convertSingleImage(this.files[i], i);
        this.convertedFiles.push(convertedFile);
        successCount++;
        
        // Update progress
        const progress = Math.round(((i + 1) / this.files.length) * 100);
        this.convertBtn.innerHTML = `<span class="loading-spinner"></span>Converting... ${progress}%`;
        
      } catch (error) {
        console.error('Conversion error for', this.files[i].name, ':', error);
        errorCount++;
        
        this.convertedFiles.push({
          error: true,
          fileName: this.files[i].name,
          errorMessage: error.message
        });
      }
    }
    
    this.displayResults();
    this.convertBtn.disabled = false;
    this.convertBtn.textContent = '🔄 Convert Images';
    
    // Show final status
    if (successCount > 0 && errorCount === 0) {
      this.showStatus(`✅ Successfully converted all ${successCount} image(s)!`, 'success');
    } else if (successCount > 0 && errorCount > 0) {
      this.showStatus(`⚠️ Converted ${successCount} image(s), but ${errorCount} failed.`, 'error');
    } else {
      this.showStatus(`❌ Failed to convert any images. Please check file formats.`, 'error');
    }
  }

  convertSingleImage(file, index) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      const loadTimeout = setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Image loading timeout - file may be corrupted or unsupported'));
      }, 15000); // Increased timeout for larger files
      
      img.onload = () => {
        clearTimeout(loadTimeout);
        
        try {
          if (img.width === 0 || img.height === 0) {
            throw new Error('Invalid image dimensions');
          }
          
          let { width, height } = this.getOutputDimensions(img);
          
          if (width <= 0 || height <= 0 || width > 8192 || height > 8192) {
            throw new Error('Invalid output dimensions');
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Clear canvas with white background for JPEG
          if (this.outputFormat.value === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
          }
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          const outputFormat = this.outputFormat.value;
          const quality = this.quality.value / 100;
          const mimeType = this.getMimeType(outputFormat);
          
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(objectUrl);
            
            if (blob && blob.size > 0) {
              const fileName = this.generateFileName(file.name, outputFormat);
              resolve({
                blob,
                fileName,
                originalSize: file.size,
                convertedSize: blob.size,
                originalName: file.name,
                dimensions: `${width}×${height}`,
                wasHeic: this.heicFiles.some(h => h.converted === file.name || h.original === file.name)
              });
            } else {
              reject(new Error('Failed to generate output image'));
            }
          }, mimeType, mimeType === 'image/jpeg' ? quality : undefined);
          
        } catch (error) {
          URL.revokeObjectURL(objectUrl);
          reject(error);
        }
      };
      
      img.onerror = (e) => {
        clearTimeout(loadTimeout);
        URL.revokeObjectURL(objectUrl);
        reject(new Error(`Cannot load image: ${file.name}. File may be corrupted or in an unsupported format.`));
      };
      
      img.crossOrigin = 'anonymous';
      img.src = objectUrl;
    });
  }

  getOutputDimensions(img) {
    let width = img.width;
    let height = img.height;
    
    if (this.resize.checked) {
      const targetWidth = parseInt(this.width.value) || null;
      const targetHeight = parseInt(this.height.value) || null;
      
      if (targetWidth && targetHeight) {
        width = targetWidth;
        height = targetHeight;
      } else if (targetWidth) {
        width = targetWidth;
        if (this.maintainAspect.checked) {
          height = Math.round(targetWidth / (img.width / img.height));
        }
      } else if (targetHeight) {
        height = targetHeight;
        if (this.maintainAspect.checked) {
          width = Math.round(targetHeight * (img.width / img.height));
        }
      }
    }
    
    return { width, height };
  }

  getMimeType(format) {
    const mimeTypes = {
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'webp': 'image/webp',
      'bmp': 'image/bmp'
    };
    return mimeTypes[format] || 'image/jpeg';
  }

  generateFileName(originalName, format) {
    // Remove the extension and replace with new format extension
    let nameWithoutExt = originalName.replace(/\.[^.]+$/, '');
    return `${nameWithoutExt}.${format}`;
  }

  displayResults() {
    this.previewContainer.innerHTML = '';
    
    const successfulConversions = this.convertedFiles.filter(file => !file.error);
    const failedConversions = this.convertedFiles.filter(file => file.error);
    
    // Display successful conversions
    successfulConversions.forEach((file, index) => {
      const previewItem = document.createElement('div');
      previewItem.className = 'preview-item';
      
      const sizeReduction = ((file.originalSize - file.convertedSize) / file.originalSize * 100).toFixed(1);
      const sizeReductionText = sizeReduction > 0 ? 
        `↓ ${sizeReduction}% smaller` : 
        `↑ ${Math.abs(sizeReduction)}% larger`;
      
      const heicBadge = file.wasHeic ? '<span style="background: #e74c3c; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; margin-left: 8px;">From HEIC</span>' : '';
      
      previewItem.innerHTML = `
        <div class="preview-info">
          <h4>✅ ${file.fileName}${heicBadge}</h4>
          <p>Original: ${this.formatFileSize(file.originalSize)} → Converted: ${this.formatFileSize(file.convertedSize)}</p>
          <p>${sizeReductionText} • ${file.dimensions}</p>
        </div>
        <div class="preview-actions">
          <button class="preview-btn" onclick="converter.previewImage(${index})">👁️ Preview</button>
          <button class="download-btn" onclick="converter.downloadSingle(${index})">💾 Download</button>
        </div>
      `;
      
      this.previewContainer.appendChild(previewItem);
    });
    
    // Display failed conversions
    failedConversions.forEach((file) => {
      const previewItem = document.createElement('div');
      previewItem.className = 'preview-item';
      previewItem.style.backgroundColor = '#ffeaea';
      previewItem.style.borderColor = '#ffcdd2';
      
      previewItem.innerHTML = `
        <div class="preview-info">
          <h4>❌ ${file.fileName}</h4>
          <p style="color: #d32f2f;">Error: ${file.errorMessage}</p>
        </div>
        <div class="preview-actions">
          <span style="color: #d32f2f; font-size: 0.9rem;">Conversion failed</span>
        </div>
      `;
      
      this.previewContainer.appendChild(previewItem);
    });
    
    this.previewSection.style.display = 'block';
    this.downloadAllBtn.style.display = successfulConversions.length > 1 ? 'block' : 'none';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  previewImage(index) {
    const successfulFiles = this.convertedFiles.filter(file => !file.error);
    const file = successfulFiles[index];
    if (file && file.blob) {
      const url = URL.createObjectURL(file.blob);
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Preview: ${file.fileName}</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0;">
              <img src="${url}" style="max-width:100%; max-height:100%; object-fit:contain;" onload="setTimeout(() => URL.revokeObjectURL('${url}'), 1000)">
            </body>
          </html>
        `);
      }
    }
  }

  downloadSingle(index) {
    const successfulFiles = this.convertedFiles.filter(file => !file.error);
    const file = successfulFiles[index];
    if (file && file.blob) {
      const url = URL.createObjectURL(file.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  async downloadAll() {
    const successfulFiles = this.convertedFiles.filter(file => !file.error);
    if (successfulFiles.length === 0) return;
    
    // Stagger downloads to avoid browser blocking
    for (let i = 0; i < successfulFiles.length; i++) {
      setTimeout(() => {
        const fileIndex = this.convertedFiles.filter(file => !file.error).indexOf(successfulFiles[i]);
        this.downloadSingle(this.downloadSingle(fileIndex));
      }, i * 500);
    }
  }

  showStatus(message, type) {
    // Remove existing status messages
    const existingStatus = document.querySelector('.status-message');
    if (existingStatus) {
      existingStatus.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message status-${type}`;
    statusDiv.textContent = message;
    
    if (this.settingsSection.parentNode) {
      this.settingsSection.parentNode.insertBefore(statusDiv, this.settingsSection);
    }
    
    // Auto-remove success/info messages after 8 seconds
    if (type !== 'error') {
      setTimeout(() => {
        if (statusDiv.parentNode) {
          statusDiv.remove();
        }
      }, 8000);
    }
  }
}

// Initialize the converter when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.converter = new ImageConverter();
});
</script>