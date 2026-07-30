// Admin Panel JavaScript

class AdminPanel {
    constructor() {
        this.currentFormType = null;
        this.currentMode = 'add';
        this.currentContent = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFormValidation();
    }

    bindEvents() {
        // Mode selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchMode(mode);
            });
        });

        // Content type selection (add mode)
        document.querySelectorAll('.selector-card[data-type]:not([data-mode])').forEach(card => {
            card.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.showForm(type);
            });
        });

        // Content type selection (edit mode)
        document.querySelectorAll('.selector-card[data-mode="edit"]').forEach(card => {
            card.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.showContentList(type);
            });
        });

        // Back buttons
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showSelector();
        });

        document.getElementById('backToListBtn').addEventListener('click', () => {
            this.showSelector();
        });

        // Form submissions
        document.querySelectorAll('.content-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Special handling for gallery form
                if (form.id === 'galleryForm') {
                    this.handleGalleryFormSubmit(e.target);
                } else {
                    this.handleFormSubmit(e.target);
                }
            });

            // Preview buttons
            const previewBtn = form.querySelector('.preview-btn');
            if (previewBtn) {
                previewBtn.addEventListener('click', () => {
                    if (form.id === 'galleryForm') {
                        this.handleGalleryFormSubmit(form);
                    } else {
                        this.showPreview(form);
                    }
                });
            }
        });

        // Close preview
        document.getElementById('closePreviewBtn').addEventListener('click', () => {
            this.hidePreview();
        });

        // Copy code button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyGeneratedCode();
        });

        // Present checkbox handlers
        document.querySelectorAll('input[name="present"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const endDateInput = e.target.closest('.form-group').querySelector('input[type="month"]');
                if (e.target.checked) {
                    endDateInput.disabled = true;
                    endDateInput.value = '';
                } else {
                    endDateInput.disabled = false;
                }
            });
        });

        // Gallery file upload functionality
        this.setupGalleryFileUpload();
    }

    setupFormValidation() {
        // Real-time validation
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'url' && value && !this.isValidUrl(value)) {
            this.showFieldError(field, 'Please enter a valid URL');
            return false;
        }

        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--danger-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showForm(type, editIndex = null) {
        this.currentFormType = type;
        
        // Hide selector and content list
        document.querySelector('.content-selector').style.display = 'none';
        document.getElementById('contentListSection').style.display = 'none';
        
        // Show form section
        document.getElementById('formSection').style.display = 'block';
        
        // Update form title
        const titles = {
            publication: editIndex !== null ? 'Edit Publication' : 'Add Publication',
            experience: editIndex !== null ? 'Edit Experience' : 'Add Experience',
            award: editIndex !== null ? 'Edit Award' : 'Add Award',
            project: editIndex !== null ? 'Edit Project' : 'Add Project',
            teaching: editIndex !== null ? 'Edit Teaching/Service' : 'Add Teaching/Service',
            event: editIndex !== null ? 'Edit Event' : 'Add Event',
            gallery: editIndex !== null ? 'Edit Gallery Item' : 'Add Gallery Item'
        };
        document.getElementById('formTitle').textContent = titles[type];
        
        // Hide all forms
        document.querySelectorAll('.content-form').forEach(form => {
            form.style.display = 'none';
        });
        
        // Show specific form
        const form = document.getElementById(`${type}Form`);
        form.style.display = 'block';
        
        // Pre-fill form if editing
        if (editIndex !== null && this.currentContent) {
            this.preFillForm(form, type, editIndex);
            // Update button text for edit mode
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = `Update ${titles[type].replace('Edit ', '')}`;
            }
        } else {
            // Reset form for new content
            form.reset();
            // Update button text for add mode
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = `Add ${titles[type].replace('Add ', '')}`;
            }
        }
        
        // Scroll to form
        document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
    }

    async preFillForm(form, type, index) {
        try {
            // Get the content data from the stored content
            const fileMap = {
                publication: 'publications.html',
                experience: 'experiences.html',
                award: 'awards.html',
                project: 'projects.html',
                teaching: 'teaching.html',
                event: 'index.html',
                gallery: 'gallery.html'
            };

            const filename = fileMap[type];
            const response = await fetch(`/get-file/${filename}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to read file');
            }
            
            const html = result.content;
            const contentItems = this.extractContentItems(html, type);
            
            if (contentItems[index]) {
                const data = contentItems[index].data;
                this.fillFormFields(form, type, data);
            }
            
        } catch (error) {
            console.error('Error pre-filling form:', error);
            this.showMessage(`Error loading content for editing: ${error.message}`, 'error');
        }
    }

    fillFormFields(form, type, data) {
        switch (type) {
            case 'publication':
                if (form.querySelector('[name="section"]')) form.querySelector('[name="section"]').value = data.section || '';
                form.querySelector('[name="title"]').value = data.title || '';
                form.querySelector('[name="status"]').value = data.status || '';
                if (form.querySelector('[name="venue"]')) form.querySelector('[name="venue"]').value = data.venue || '';
                form.querySelector('[name="authors"]').value = data.authors || '';
                form.querySelector('[name="description"]').value = data.description || '';
                if (form.querySelector('[name="tags"]')) form.querySelector('[name="tags"]').value = data.tags || '';
                form.querySelector('[name="link"]').value = data.link || '';
                if (form.querySelector('[name="linkText"]')) form.querySelector('[name="linkText"]').value = data.linkText || 'View Paper →';
                break;
                
            case 'experience':
                form.querySelector('[name="title"]').value = data.title || '';
                if (data.duration) {
                    const parts = data.duration.split(/\s*[–-]\s*/);
                    if (parts.length >= 1) {
                        form.querySelector('[name="startDate"]').value = this.parseDateToMonth(parts[0]);
                        if (parts[1] && parts[1] !== 'Present') {
                            form.querySelector('[name="endDate"]').value = this.parseDateToMonth(parts[1]);
                            form.querySelector('[name="present"]').checked = false;
                        } else if (parts[1] === 'Present') {
                            form.querySelector('[name="present"]').checked = true;
                            form.querySelector('[name="endDate"]').disabled = true;
                        }
                    }
                }
                form.querySelector('[name="company"]').value = data.company || '';
                form.querySelector('[name="description"]').value = data.description || '';
                break;
                
            case 'award':
                form.querySelector('[name="title"]').value = data.title || '';
                form.querySelector('[name="year"]').value = data.year || '';
                form.querySelector('[name="organization"]').value = data.organization || '';
                form.querySelector('[name="description"]').value = data.description || '';
                form.querySelector('[name="link"]').value = data.link || '';
                break;
                
            case 'project':
                form.querySelector('[name="title"]').value = data.title || '';
                if (form.querySelector('[name="type"]')) form.querySelector('[name="type"]').value = data.type || '';
                if (form.querySelector('[name="year"]')) form.querySelector('[name="year"]').value = data.year || '';
                form.querySelector('[name="description"]').value = data.description || '';
                form.querySelector('[name="technologies"]').value = data.technologies || '';
                if (form.querySelector('[name="tags"]')) form.querySelector('[name="tags"]').value = data.tags || '';
                form.querySelector('[name="link"]').value = data.link || '';
                break;
                
            case 'teaching':
                if (form.querySelector('[name="section"]')) form.querySelector('[name="section"]').value = data.section || '';
                form.querySelector('[name="title"]').value = data.title || '';
                if (data.duration) {
                    const parts = data.duration.split(/\s*[–-]\s*/);
                    if (parts.length >= 1) {
                        form.querySelector('[name="startDate"]').value = this.parseDateToMonth(parts[0]);
                        if (parts[1] && parts[1] !== 'Present') {
                            form.querySelector('[name="endDate"]').value = this.parseDateToMonth(parts[1]);
                            form.querySelector('[name="present"]').checked = false;
                        } else if (parts[1] === 'Present') {
                            form.querySelector('[name="present"]').checked = true;
                            form.querySelector('[name="endDate"]').disabled = true;
                        }
                    }
                }
                form.querySelector('[name="institution"]').value = data.institution || '';
                form.querySelector('[name="description"]').value = data.description || '';
                if (form.querySelector('[name="tags"]')) form.querySelector('[name="tags"]').value = data.tags || '';
                form.querySelector('[name="link"]').value = data.link || '';
                break;
                
            case 'event':
                form.querySelector('[name="title"]').value = data.title || '';
                form.querySelector('[name="date"]').value = this.parseDateToMonth(data.date);
                form.querySelector('[name="description"]').value = data.description || '';
                form.querySelector('[name="link"]').value = data.link || '';
                break;
                
            case 'gallery':
                if (form.querySelector('[name="category"]')) form.querySelector('[name="category"]').value = data.category || '';
                form.querySelector('[name="title"]').value = data.title || '';
                form.querySelector('[name="description"]').value = data.description || '';
                if (form.querySelector('[name="caption"]')) form.querySelector('[name="caption"]').value = data.caption || '';
                form.querySelector('[name="images"]').value = data.images || '';
                break;
        }
    }

    parseDateToMonth(dateString) {
        if (!dateString) return '';
        dateString = String(dateString).trim();

        // Already YYYY-MM
        if (/^\d{4}-\d{2}$/.test(dateString)) return dateString;

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (let i = 0; i < monthNames.length; i++) {
            if (dateString.includes(monthNames[i]) || dateString.includes(monthShort[i])) {
                const year = dateString.match(/\d{4}/);
                if (year) {
                    return `${year[0]}-${String(i + 1).padStart(2, '0')}`;
                }
            }
        }

        // Year only
        const yearOnly = dateString.match(/^(\d{4})$/);
        if (yearOnly) return `${yearOnly[1]}-01`;

        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }

        return '';
    }

    formatDisplayMonth(monthValue) {
        if (!monthValue) return '';
        if (monthValue === 'Present') return 'Present';
        // YYYY-MM → Mon YYYY
        const match = String(monthValue).match(/^(\d{4})-(\d{2})$/);
        if (match) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[parseInt(match[2], 10) - 1]} ${match[1]}`;
        }
        return monthValue;
    }

    formatDuration(startDate, endDate, isPresent) {
        const start = this.formatDisplayMonth(startDate);
        const end = isPresent ? 'Present' : this.formatDisplayMonth(endDate);
        return `${start} – ${end}`;
    }

    formatEventDate(monthValue) {
        return this.formatDisplayMonth(monthValue);
    }

    buildTagsHTML(tagsString) {
        if (!tagsString || !String(tagsString).trim()) return '';
        const tags = String(tagsString).split(',').map(t => t.trim()).filter(Boolean);
        if (!tags.length) return '';
        return `<div class="publication-meta">
                                    ${tags.map(tag => `<span class="publication-tag">${this.escapeHtml(tag)}</span>`).join('\n                                    ')}
                                </div>`;
    }

    getPublicationStatusClass(section, statusText = '') {
        if (section === 'journal') return 'status-journal';
        if (section === 'conference') return 'status-accepted';
        if (/revision/i.test(statusText)) return 'status-revision';
        if (/submitted/i.test(statusText)) return 'status-submitted';
        return 'status-review';
    }

    getSectionId(type, data) {
        if (type === 'publication') {
            const map = { journal: 'journal-papers', 'under-review': 'under-review', conference: 'conference-papers' };
            return map[data.section] || null;
        }
        if (type === 'project') {
            const map = { research: 'research-projects', application: 'application-projects' };
            return map[data.type] || null;
        }
        if (type === 'teaching') {
            const map = { teaching: 'teaching', mentoring: 'mentoring', 'community-service': 'community-service' };
            return map[data.section] || null;
        }
        return null;
    }

    detectItemSection(item, type) {
        const sectionEl = item.closest('.pub-section');
        if (!sectionEl || !sectionEl.id) return '';
        const id = sectionEl.id;
        if (type === 'publication') {
            if (id === 'journal-papers') return 'journal';
            if (id === 'under-review') return 'under-review';
            if (id === 'conference-papers') return 'conference';
        }
        if (type === 'project') {
            if (id === 'research-projects') return 'research';
            if (id === 'application-projects') return 'application';
        }
        if (type === 'teaching') {
            if (id === 'teaching') return 'teaching';
            if (id === 'mentoring') return 'mentoring';
            if (id === 'community-service') return 'community-service';
        }
        return '';
    }

    slugify(text) {
        return String(text || 'gallery-item')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 60) || 'gallery-item';
    }

    updateSectionCount(sectionEl) {
        if (!sectionEl) return;
        const countEl = sectionEl.querySelector('.pub-section-count');
        if (!countEl) return;
        const itemCount = sectionEl.querySelectorAll('.publication-item, .project-item, .teaching-item').length;
        const label = itemCount === 1 ? '1 item' : `${itemCount} items`;
        // Preserve specialty wording when possible
        const current = countEl.textContent || '';
        if (/paper/i.test(current)) {
            countEl.textContent = itemCount === 1 ? '1 paper' : `${itemCount} papers`;
        } else if (/manuscript/i.test(current)) {
            countEl.textContent = itemCount === 1 ? '1 manuscript' : `${itemCount} manuscripts`;
        } else if (/published/i.test(current)) {
            countEl.textContent = itemCount === 1 ? '1 published' : `${itemCount} published`;
        } else if (/project/i.test(current)) {
            countEl.textContent = itemCount === 1 ? '1 project' : `${itemCount} projects`;
        } else if (/role/i.test(current)) {
            countEl.textContent = itemCount === 1 ? '1 role' : `${itemCount} roles`;
        } else {
            countEl.textContent = label;
        }
    }

    insertIntoSection(root, sectionId, htmlCode, itemSelector) {
        const section = root.querySelector(`#${sectionId}`);
        if (!section) {
            throw new Error(`Could not find section #${sectionId}`);
        }
        const header = section.querySelector('.pub-section-header');
        const firstItem = section.querySelector(itemSelector);
        if (firstItem) {
            firstItem.insertAdjacentHTML('beforebegin', htmlCode);
        } else if (header) {
            header.insertAdjacentHTML('afterend', '\n\n                            ' + htmlCode);
        } else {
            section.insertAdjacentHTML('beforeend', htmlCode);
        }
        this.updateSectionCount(section);
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // Show/hide grids
        if (mode === 'add') {
            document.getElementById('addModeGrid').style.display = 'grid';
            document.getElementById('editModeGrid').style.display = 'none';
        } else {
            document.getElementById('addModeGrid').style.display = 'none';
            document.getElementById('editModeGrid').style.display = 'grid';
        }
        
        // Hide other sections
        document.getElementById('formSection').style.display = 'none';
        document.getElementById('contentListSection').style.display = 'none';
        document.getElementById('previewSection').style.display = 'none';
        document.getElementById('codeSection').style.display = 'none';
    }

    showSelector() {
        document.querySelector('.content-selector').style.display = 'block';
        document.getElementById('formSection').style.display = 'none';
        document.getElementById('contentListSection').style.display = 'none';
        document.getElementById('previewSection').style.display = 'none';
        document.getElementById('codeSection').style.display = 'none';
        
        // Reset forms
        document.querySelectorAll('.content-form').forEach(form => {
            form.reset();
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async showContentList(type) {
        this.currentFormType = type;
        
        // Hide selector
        document.querySelector('.content-selector').style.display = 'none';
        
        // Show content list section
        document.getElementById('contentListSection').style.display = 'block';
        
        // Update title
        const titles = {
            publication: 'Publications',
            experience: 'Experiences',
            award: 'Awards',
            project: 'Projects',
            teaching: 'Teaching & Services',
            event: 'Events',
            gallery: 'Gallery Items'
        };
        document.getElementById('listTitle').textContent = `Select ${titles[type]} to Edit`;
        
        // Load content
        await this.loadContentList(type);
        
        // Scroll to list
        document.getElementById('contentListSection').scrollIntoView({ behavior: 'smooth' });
    }

    async loadContentList(type) {
        try {
            const fileMap = {
                publication: 'publications.html',
                experience: 'experiences.html',
                award: 'awards.html',
                project: 'projects.html',
                teaching: 'teaching.html',
                event: 'index.html',
                gallery: 'gallery.html'
            };

            const filename = fileMap[type];
            const response = await fetch(`/get-file/${filename}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to read file');
            }
            
            const html = result.content;
            const contentItems = this.extractContentItems(html, type);
            
            this.displayContentList(contentItems, type);
            
        } catch (error) {
            console.error('Error loading content list:', error);
            this.showMessage(`Error loading content: ${error.message}`, 'error');
        }
    }

    extractContentItems(html, type) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const selectors = {
            publication: '.publication-item',
            experience: '.experience-item',
            award: '.award-item',
            project: '.project-item',
            teaching: '.teaching-item',
            event: '.news-item',
            gallery: '.gallery-item'
        };
        
        const selector = selectors[type];
        const items = tempDiv.querySelectorAll(selector);
        
        console.log('Extracted items:', { type, selector, count: items.length, items: Array.from(items).map(item => item.outerHTML.substring(0, 100)) });
        
        return Array.from(items).map((item, index) => {
            return {
                index: index,
                element: item,
                html: item.outerHTML,
                data: this.extractDataFromItem(item, type)
            };
        });
    }

    extractDataFromItem(item, type) {
        const data = {};
        
        switch (type) {
            case 'publication':
                data.title = item.querySelector('h3')?.textContent?.trim() || '';
                data.status = item.querySelector('.publication-status')?.textContent?.trim() || '';
                data.venue = item.querySelector('.publication-venue')?.textContent?.trim() || '';
                data.authors = item.querySelector('.publication-authors')?.textContent?.trim() || '';
                data.description = item.querySelector('.publication-description')?.textContent?.trim() || '';
                data.tags = Array.from(item.querySelectorAll('.publication-tag')).map(t => t.textContent.trim()).join(', ');
                data.link = item.querySelector('.publication-link')?.getAttribute('href') || '';
                data.linkText = item.querySelector('.publication-link')?.textContent?.trim() || 'View Paper →';
                data.section = this.detectItemSection(item, type);
                break;
                
            case 'experience':
                data.title = item.querySelector('h3')?.textContent?.trim() || '';
                data.duration = item.querySelector('.experience-duration')?.textContent?.trim() || '';
                data.company = item.querySelector('.experience-company')?.textContent?.trim() || '';
                data.description = item.querySelector('.experience-description')?.textContent?.trim() || '';
                break;
                
            case 'award':
                data.title = item.querySelector('h3')?.textContent?.trim() || '';
                data.year = item.querySelector('.award-year')?.textContent?.trim() || '';
                data.organization = item.querySelector('.award-organization')?.textContent?.trim() || '';
                data.description = item.querySelector('.award-description')?.textContent?.trim() || '';
                data.link = item.querySelector('.award-link')?.getAttribute('href') || '';
                break;
                
            case 'project':
                data.title = item.querySelector('h4')?.textContent?.trim() || item.querySelector('h3')?.textContent?.trim() || '';
                data.year = item.querySelector('.project-year')?.textContent?.trim() || '';
                data.description = item.querySelector('.project-description')?.textContent?.trim()
                    || item.querySelector('p:not(.project-technologies)')?.textContent?.trim() || '';
                const techText = item.querySelector('.project-technologies')?.textContent?.trim() || '';
                data.technologies = techText.replace(/^Technologies:\s*/i, '');
                data.tags = Array.from(item.querySelectorAll('.publication-tag')).map(t => t.textContent.trim()).join(', ');
                data.link = item.querySelector('.project-link')?.getAttribute('href') || '';
                data.type = this.detectItemSection(item, type);
                break;
                
            case 'teaching':
                data.title = item.querySelector('h3')?.textContent?.trim() || '';
                data.duration = item.querySelector('.teaching-duration')?.textContent?.trim() || '';
                data.institution = item.querySelector('.teaching-institution')?.textContent?.trim() || '';
                data.description = item.querySelector('.teaching-description')?.textContent?.trim() || '';
                data.tags = Array.from(item.querySelectorAll('.publication-tag')).map(t => t.textContent.trim()).join(', ');
                data.link = item.querySelector('.teaching-link')?.getAttribute('href') || '';
                data.section = this.detectItemSection(item, type);
                break;
                
            case 'event':
                data.title = item.querySelector('h3')?.textContent?.trim() || '';
                data.date = item.querySelector('.news-date')?.textContent?.trim() || '';
                data.description = item.querySelector('.news-content p')?.textContent?.trim()
                    || item.querySelector('p')?.textContent?.trim() || '';
                data.link = item.querySelector('.news-content a')?.getAttribute('href')
                    || item.querySelector('a')?.getAttribute('href') || '';
                break;
                
            case 'gallery':
                data.title = item.querySelector('.gallery-title')?.textContent?.trim() || '';
                data.description = item.querySelector('.gallery-description')?.textContent?.trim() || '';
                data.category = item.querySelector('.gallery-category')?.textContent?.trim() || '';
                data.caption = item.querySelector('.gallery-caption')?.textContent?.trim() || '';
                const images = item.querySelectorAll('.gallery-image');
                data.images = Array.from(images).map(img => img.getAttribute('src')).filter(Boolean).join('\n');
                break;
        }
        
        return data;
    }

    displayContentList(items, type) {
        const container = document.getElementById('contentList');
        
        console.log('Displaying content list:', { items, type });
        
        if (items.length === 0) {
            container.innerHTML = '<p class="no-content">No content found to edit.</p>';
            return;
        }
        
        const titles = {
            publication: 'Publications',
            experience: 'Experiences',
            award: 'Awards',
            project: 'Projects',
            teaching: 'Teaching & Services',
            event: 'Events',
            gallery: 'Gallery Items'
        };
        
        container.innerHTML = items.map((item, index) => {
            const title = item.data.title || `Item ${index + 1}`;
            const subtitle = this.getSubtitle(item.data, type);
            
            return `
                <div class="content-list-item" data-index="${index}">
                    <h3>${title}</h3>
                    <p>${subtitle}</p>
                    <div class="meta">${titles[type]} #${index + 1}</div>
                    <div class="action-buttons">
                        <button class="edit-btn" data-index="${index}" data-type="${type}">Edit</button>
                        <button class="delete-btn" data-index="${index}" data-type="${type}">Delete</button>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to edit buttons
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                const type = btn.dataset.type;
                this.editContent(index, type);
            });
        });

        // Add event listeners to delete buttons
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                const type = btn.dataset.type;
                this.deleteContent(index, type);
            });
        });
    }

    getSubtitle(data, type) {
        switch (type) {
            case 'publication':
                return `${data.status || ''}${data.section ? ` · ${data.section}` : ''}` || data.authors || 'No additional info';
            case 'experience':
                return data.company || data.duration || 'No additional info';
            case 'award':
                return data.organization || data.year || 'No additional info';
            case 'project':
                return `${data.type || 'project'}${data.year ? ` · ${data.year}` : ''}` || data.description?.substring(0, 100) + '...' || 'No description';
            case 'teaching':
                return `${data.section || ''}${data.institution ? ` · ${data.institution}` : ''}` || data.duration || 'No additional info';
            case 'event':
                return data.date || data.description?.substring(0, 100) + '...' || 'No additional info';
            case 'gallery':
                return data.category || data.description?.substring(0, 100) + '...' || 'No description';
            default:
                return 'No additional info';
        }
    }

    editContent(index, type) {
        console.log('Edit content called:', { index, type });
        
        // Store current content for editing
        this.currentContent = { index, type };
        
        // Set mode to edit
        this.currentMode = 'edit';
        
        // Show form with pre-filled data
        this.showForm(type, index);
    }

    async deleteContent(index, type) {
        console.log('Delete content called:', { index, type });
        
        // Show confirmation dialog
        const title = await this.getContentTitle(index, type);
        const confirmed = confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`);
        
        if (confirmed) {
            this.performDelete(index, type);
        }
    }

    async performDelete(index, type) {
        try {
            console.log(`Starting deletion of ${type} at index ${index}`);
            await this.deleteContentFromFile(type, index);
            
            const typeName = this.getTypeName(type);
            this.showMessage(`${typeName} deleted successfully!`, 'success');
            
            // Refresh the content list
            setTimeout(() => {
                this.showContentList(type);
            }, 1500);
            
        } catch (error) {
            console.error('Error deleting content:', error);
            this.showMessage(`Error deleting content: ${error.message}`, 'error');
        }
    }

    async deleteContentFromFile(type, index) {
        const fileMap = {
            publication: 'publications.html',
            experience: 'experiences.html',
            award: 'awards.html',
            project: 'projects.html',
            teaching: 'teaching.html',
            event: 'index.html',
            gallery: 'gallery.html'
        };

        const filename = fileMap[type];
        const response = await fetch(`/get-file/${filename}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || 'Failed to read file');
        }
        
        let html = result.content;
        
        // Find and remove the specific item
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const selectors = {
            publication: '.publication-item',
            experience: '.experience-item',
            award: '.award-item',
            project: '.project-item',
            teaching: '.teaching-item',
            event: '.news-item',
            gallery: '.gallery-item'
        };
        
        const selector = selectors[type];
        const items = tempDiv.querySelectorAll(selector);
        
        console.log(`Deleting ${type} item at index ${index}. Found ${items.length} items with selector: ${selector}`);
        
        if (items[index]) {
            const section = items[index].closest('.pub-section');
            items[index].remove();
            if (section) this.updateSectionCount(section);
            
            await this.saveFile(`../${filename}`, tempDiv.innerHTML);
            console.log(`Successfully deleted item and saved file: ${filename}`);
        } else {
            throw new Error(`Item not found for deletion. Index: ${index}, Total items: ${items.length}`);
        }
    }

    async getContentTitle(index, type) {
        try {
            const fileMap = {
                publication: 'publications.html',
                experience: 'experiences.html',
                award: 'awards.html',
                project: 'projects.html',
                teaching: 'teaching.html',
                event: 'index.html',
                gallery: 'gallery.html'
            };

            const filename = fileMap[type];
            const response = await fetch(`/get-file/${filename}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to read file');
            }
            
            const html = result.content;
            const contentItems = this.extractContentItems(html, type);
            
            console.log(`Getting title for ${type} at index ${index}. Found ${contentItems.length} items.`);
            
            if (contentItems[index]) {
                const title = contentItems[index].data.title;
                return title || `${this.getTypeName(type)} #${index + 1}`;
            }
            
            return `${this.getTypeName(type)} #${index + 1}`;
            
        } catch (error) {
            console.error('Error getting content title:', error);
            return `${this.getTypeName(type)} #${index + 1}`;
        }
    }

    getTypeName(type) {
        const titles = {
            publication: 'Publication',
            experience: 'Experience',
            award: 'Award',
            project: 'Project',
            teaching: 'Teaching Activity',
            event: 'Event',
            gallery: 'Gallery Item'
        };
        
        return titles[type] || 'Item';
    }

    handleFormSubmit(form) {
        // Validate all fields
        const fields = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Please fix the errors in the form', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        if (this.currentMode === 'edit' && this.currentContent) {
            // Update existing content
            this.updateExistingContent(data);
        } else {
            // Add new content
            const htmlCode = this.generateHTML(data, this.currentFormType);
            this.showGeneratedCode(htmlCode, data);
        }
    }

    async updateExistingContent(data) {
        try {
            const { index, type } = this.currentContent;
            
            // Generate new HTML
            const newHtmlCode = this.generateHTML(data, type);
            
            // Update the specific item in the file
            await this.updateContentInFile(type, index, newHtmlCode);
            
            this.showMessage('Content updated successfully!', 'success');
            
            // Go back to content list
            setTimeout(() => {
                this.showContentList(type);
            }, 1500);
            
        } catch (error) {
            console.error('Error updating content:', error);
            this.showMessage(`Error updating content: ${error.message}`, 'error');
        }
    }

    async updateContentInFile(type, index, newHtmlCode) {
        const fileMap = {
            publication: 'publications.html',
            experience: 'experiences.html',
            award: 'awards.html',
            project: 'projects.html',
            teaching: 'teaching.html',
            event: 'index.html',
            gallery: 'gallery.html'
        };

        const filename = fileMap[type];
        const response = await fetch(`/get-file/${filename}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || 'Failed to read file');
        }
        
        let html = result.content;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const selectors = {
            publication: '.publication-item',
            experience: '.experience-item',
            award: '.award-item',
            project: '.project-item',
            teaching: '.teaching-item',
            event: '.news-item',
            gallery: '.gallery-item'
        };
        
        const selector = selectors[type];
        const items = tempDiv.querySelectorAll(selector);
        
        if (!items[index]) {
            throw new Error('Item not found for editing');
        }

        const oldSection = items[index].closest('.pub-section');
        const form = document.getElementById(`${type}Form`);
        const formData = form ? Object.fromEntries(new FormData(form).entries()) : {};
        if (form?.querySelector('[name="present"]')?.checked) {
            formData.present = 'on';
        }
        const newSectionId = this.getSectionId(type, formData);
        const oldSectionId = oldSection?.id || null;

        // If section changed for sectioned types, move the item
        if (newSectionId && oldSectionId && newSectionId !== oldSectionId &&
            (type === 'publication' || type === 'project' || type === 'teaching')) {
            items[index].remove();
            this.updateSectionCount(oldSection);
            const itemSelector = selector;
            this.insertIntoSection(tempDiv, newSectionId, newHtmlCode, itemSelector);
        } else {
            items[index].outerHTML = newHtmlCode;
            if (oldSection) this.updateSectionCount(oldSection);
        }

        await this.saveFile(`../${filename}`, tempDiv.innerHTML);
    }

    showPreview(form, galleryData = null) {
        // Validate form (skip for gallery with provided data)
        if (!galleryData) {
            const fields = form.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                this.showMessage('Please fix the errors in the form before previewing', 'error');
                return;
            }
        }

        // Get form data
        let data = {};
        if (galleryData) {
            // Use provided gallery data
            data = galleryData;
        } else {
            // Extract from form data
            const formData = new FormData(form);
            data = Object.fromEntries(formData.entries());
        }
        
        // Generate preview HTML
        const previewHTML = this.generatePreviewHTML(data, this.currentFormType);
        
        // Show preview
        document.getElementById('previewContent').innerHTML = previewHTML;
        document.getElementById('previewSection').style.display = 'block';
        
        // Generate and show HTML code
        const htmlCode = this.generateHTML(data, this.currentFormType);
        this.showGeneratedCode(htmlCode, data);
        
        // Scroll to preview
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
    }

    hidePreview() {
        document.getElementById('previewSection').style.display = 'none';
    }

    generatePreviewHTML(data, type) {
        switch (type) {
            case 'publication':
                return this.generatePublicationPreview(data);
            case 'experience':
                return this.generateExperiencePreview(data);
            case 'award':
                return this.generateAwardPreview(data);
            case 'project':
                return this.generateProjectPreview(data);
            case 'teaching':
                return this.generateTeachingPreview(data);
            case 'event':
                return this.generateEventPreview(data);
            case 'gallery':
                return this.generateGalleryPreview(data);
            default:
                return '<p>Preview not available</p>';
        }
    }

    generatePublicationPreview(data) {
        const linkHTML = data.link ? `<a href="${data.link}" class="link" target="_blank">View Publication →</a>` : '';
        
        return `
            <div class="generated-publication">
                <h3>${data.title}</h3>
                <div class="status">${data.status}</div>
                <div class="authors">${data.authors}</div>
                <div class="description">${data.description}</div>
                ${linkHTML}
            </div>
        `;
    }

    generateExperiencePreview(data) {
        const endDate = data.present ? 'Present' : data.endDate;
        const duration = `${data.startDate} - ${endDate}`;
        
        return `
            <div class="generated-experience">
                <h3>${data.title}</h3>
                <div class="duration">${duration}</div>
                <div class="company">${data.company}</div>
                <div class="description">${data.description}</div>
            </div>
        `;
    }

    generateAwardPreview(data) {
        const linkHTML = data.link ? `<a href="${data.link}" class="link" target="_blank">View Award →</a>` : '';
        
        return `
            <div class="generated-award">
                <h3>${data.title}</h3>
                <div class="year">${data.year}</div>
                <div class="organization">${data.organization}</div>
                <div class="description">${data.description}</div>
                ${linkHTML}
            </div>
        `;
    }

    generateProjectPreview(data) {
        const technologiesHTML = data.technologies ? `
            <div class="technologies">
                <h4>Technologies Used:</h4>
                <p>${data.technologies}</p>
            </div>
        ` : '';
        
        const linkHTML = data.link ? `<a href="${data.link}" class="link" target="_blank">View Project →</a>` : '';
        
        return `
            <div class="generated-project">
                <h3>${data.title}</h3>
                <div class="type">${data.type}</div>
                <div class="description">${data.description}</div>
                ${technologiesHTML}
                ${linkHTML}
            </div>
        `;
    }

    generateTeachingPreview(data) {
        const endDate = data.present ? 'Present' : data.endDate;
        const duration = `${data.startDate} - ${endDate}`;
        
        const linkHTML = data.link ? `<a href="${data.link}" class="link" target="_blank">View Organization →</a>` : '';
        
        return `
            <div class="generated-teaching">
                <h3>${data.title}</h3>
                <div class="duration">${duration}</div>
                <div class="institution">${data.institution}</div>
                <div class="description">${data.description}</div>
                ${linkHTML}
            </div>
        `;
    }

    generateEventPreview(data) {
        const linkHTML = data.link ? `<a href="${data.link}" class="link" target="_blank">View Event →</a>` : '';
        
        return `
            <div class="generated-event">
                <h3>${data.title}</h3>
                <div class="date">${data.date}</div>
                <div class="description">${data.description}</div>
                ${linkHTML}
            </div>
        `;
    }

    generateGalleryPreview(data) {
        // Handle both URL strings and array of URLs
        let images = [];
        if (typeof data.images === 'string') {
            // Split by newlines for URL input
            images = data.images.split('\n').filter(url => url.trim());
        } else if (Array.isArray(data.images)) {
            // Use array directly for file uploads
            images = data.images;
        }
        
        const imageCount = images.length;
        
        let imageHTML = '';
        if (imageCount === 1) {
            imageHTML = `<img src="${images[0]}" alt="${this.escapeHtml(data.title)}" class="gallery-image">`;
        } else if (imageCount > 1) {
            imageHTML = `
                <div class="gallery-slider">
                    <div class="gallery-slides">
                        ${images.map(img => `<div class="gallery-slide"><img src="${img}" alt="${this.escapeHtml(data.title)}" class="gallery-image"></div>`).join('')}
                    </div>
                    <button class="gallery-slider-nav prev">‹</button>
                    <button class="gallery-slider-nav next">›</button>
                    <div class="gallery-indicators">
                        ${images.map((_, index) => `<div class="gallery-indicator ${index === 0 ? 'active' : ''}"></div>`).join('')}
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="generated-gallery">
                <h3>${this.escapeHtml(data.title)}</h3>
                <div class="description">${this.escapeHtml(data.description)}</div>
                <div class="images">
                    ${imageHTML}
                </div>
            </div>
        `;
    }

    generateHTML(data, type) {
        switch (type) {
            case 'publication':
                return this.generatePublicationHTML(data);
            case 'experience':
                return this.generateExperienceHTML(data);
            case 'award':
                return this.generateAwardHTML(data);
            case 'project':
                return this.generateProjectHTML(data);
            case 'teaching':
                return this.generateTeachingHTML(data);
            case 'event':
                return this.generateEventHTML(data);
            case 'gallery':
                return this.generateGalleryHTML(data);
            default:
                return '';
        }
    }

    generatePublicationHTML(data) {
        const statusClass = this.getPublicationStatusClass(data.section, data.status);
        const venueHTML = data.venue ? `<p class="publication-venue">${this.escapeHtml(data.venue)}</p>` : '';
        const tagsHTML = this.buildTagsHTML(data.tags);
        const linkText = data.linkText || 'View Paper →';
        const linkHTML = data.link ? `<a href="${this.escapeHtml(data.link)}" target="_blank" class="publication-link">${this.escapeHtml(linkText)}</a>` : '';
        
        return `<!-- New Publication -->
<div class="publication-item">
                                <div class="publication-header">
                                    <h3>${this.escapeHtml(data.title)}</h3>
                                    <span class="publication-status ${statusClass}">${this.escapeHtml(data.status)}</span>
                                </div>
                                ${venueHTML}
                                <p class="publication-authors">${this.escapeHtml(data.authors)}</p>
                                <p class="publication-description">${this.escapeHtml(data.description)}</p>
                                ${tagsHTML}
                                ${linkHTML}
                            </div>`;
    }

    generateExperienceHTML(data) {
        const duration = this.formatDuration(data.startDate, data.endDate, !!data.present);
        
        return `<!-- New Experience -->
<div class="experience-item">
                            <div class="experience-header">
                                <h3>${this.escapeHtml(data.title)}</h3>
                                <span class="experience-duration">${this.escapeHtml(duration)}</span>
                            </div>
                            <p class="experience-company">${this.escapeHtml(data.company)}</p>
                            <p class="experience-description">${this.escapeHtml(data.description)}</p>
                        </div>`;
    }

    generateAwardHTML(data) {
        const linkHTML = data.link ? `<a href="${this.escapeHtml(data.link)}" target="_blank" class="award-link">View Details →</a>` : '';
        
        return `<!-- New Award -->
<div class="award-item">
                            <div class="award-header">
                                <h3>${this.escapeHtml(data.title)}</h3>
                                <span class="award-year">${this.escapeHtml(data.year)}</span>
                            </div>
                            <p class="award-organization">${this.escapeHtml(data.organization)}</p>
                            <p class="award-description">${this.escapeHtml(data.description)}</p>
                            ${linkHTML}
                        </div>`;
    }

    generateProjectHTML(data) {
        const yearHTML = data.year ? `<span class="project-year">${this.escapeHtml(data.year)}</span>` : '';
        const technologiesHTML = data.technologies
            ? `<p class="project-technologies"><strong>Technologies:</strong> ${this.escapeHtml(data.technologies)}</p>`
            : '';
        const tagsHTML = this.buildTagsHTML(data.tags);
        const linkHTML = data.link ? `<a href="${this.escapeHtml(data.link)}" target="_blank" class="project-link">View Project →</a>` : '';
        
        return `<!-- New Project -->
<div class="project-item">
                                <div class="project-header">
                                    <h4>${this.escapeHtml(data.title)}</h4>
                                    ${yearHTML}
                                </div>
                                <p class="project-description">${this.escapeHtml(data.description)}</p>
                                ${technologiesHTML}
                                ${tagsHTML}
                                ${linkHTML}
                            </div>`;
    }

    generateTeachingHTML(data) {
        const duration = this.formatDuration(data.startDate, data.endDate, !!data.present);
        const tagsHTML = this.buildTagsHTML(data.tags);
        const linkHTML = data.link ? `<a href="${this.escapeHtml(data.link)}" target="_blank" class="teaching-link">Visit Organization →</a>` : '';
        
        return `<!-- New Teaching/Service -->
<div class="teaching-item">
                                <div class="teaching-header">
                                    <h3>${this.escapeHtml(data.title)}</h3>
                                    <span class="teaching-duration">${this.escapeHtml(duration)}</span>
                                </div>
                                <p class="teaching-institution">${this.escapeHtml(data.institution)}</p>
                                <p class="teaching-description">${this.escapeHtml(data.description)}</p>
                                ${tagsHTML}
                                ${linkHTML}
                            </div>`;
    }

    generateEventHTML(data) {
        const displayDate = this.formatEventDate(data.date);
        const linkInside = data.link
            ? ` <a href="${this.escapeHtml(data.link)}" target="_blank">View details →</a>`
            : '';
        
        return `<!-- New Event -->
<div class="news-item" data-page="1">
                        <div class="news-date">${this.escapeHtml(displayDate)}</div>
                        <div class="news-content">
                            <h3>${this.escapeHtml(data.title)}</h3>
                            <p>${this.escapeHtml(data.description)}${linkInside}</p>
                        </div>
                    </div>`;
    }

    generateGalleryHTML(data) {
        let images = [];
        if (typeof data.images === 'string') {
            images = data.images.split('\n').map(u => u.trim()).filter(Boolean);
        } else if (Array.isArray(data.images)) {
            images = data.images;
        }

        const category = data.category || 'Other';
        const slug = this.slugify(data.title);
        const captionHTML = data.caption
            ? `<p class="gallery-caption">${this.escapeHtml(data.caption)}</p>`
            : '';

        let imageHTML = '';
        if (images.length > 0) {
            const containClass = /certificate|recognition/i.test(category) ? ' contain' : '';
            imageHTML = `<div class="gallery-images">
                                    ${images.map(img => `
                                    <a href="${img}" class="gallery-image-link" data-lightbox>
                                        <img src="${img}" alt="${this.escapeHtml(data.title)}" class="gallery-image${containClass}">
                                    </a>`).join('')}
                                    ${captionHTML}
                                </div>`;
        }

        return `<!-- New Gallery Item -->
<article class="gallery-item" id="${slug}">
                                <div class="gallery-header">
                                    <span class="gallery-category">${this.escapeHtml(category)}</span>
                                    <h3 class="gallery-title">${this.escapeHtml(data.title)}</h3>
                                    <p class="gallery-description">${this.escapeHtml(data.description)}</p>
                                </div>
                                ${imageHTML}
                            </article>`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showGeneratedCode(htmlCode, data) {
        document.getElementById('generatedCode').textContent = htmlCode;
        document.getElementById('codeSection').style.display = 'block';
        
        // Hide other sections
        document.getElementById('previewSection').style.display = 'none';
        
        // Scroll to code section
        document.getElementById('codeSection').scrollIntoView({ behavior: 'smooth' });
        
        // Automatically add to website files
        this.addToWebsite(htmlCode, this.currentFormType);
        
        // Show success message based on content type
        const typeName = this.getTypeName(this.currentFormType);
        this.showMessage(`${typeName} successfully added to your website!`, 'success');
    }

    async addToWebsite(htmlCode, type) {
        try {
            const fileMap = {
                publication: '../publications.html',
                experience: '../experiences.html',
                award: '../awards.html',
                project: '../projects.html',
                teaching: '../teaching.html',
                event: '../index.html',
                gallery: '../gallery.html'
            };

            const targetFile = fileMap[type];
            if (!targetFile) {
                this.showMessage('Error: Unknown content type', 'error');
                return;
            }

            // For events, we need to add to the news section in index.html
            if (type === 'event') {
                await this.addEventToNewsSection(htmlCode);
            } else {
                await this.addContentToFile(targetFile, htmlCode, type);
            }

        } catch (error) {
            console.error('Error adding to website:', error);
            this.showMessage('Error: Could not automatically add to website. Please copy the code manually.', 'error');
        }
    }

    async addContentToFile(filePath, htmlCode, type) {
        try {
            console.log(`Adding content to file: ${filePath}, type: ${type}`);
            
            const filename = filePath.split('/').pop();
            const response = await fetch(`/get-file/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to read file');
            }
            
            let html = result.content;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Prefer sectioned insert for publications / projects / teaching
            const form = document.getElementById(`${type}Form`);
            const formData = form ? Object.fromEntries(new FormData(form).entries()) : {};
            if (form?.querySelector('[name="present"]')?.checked) {
                formData.present = 'on';
            }
            const sectionId = this.getSectionId(type, formData);

            if (sectionId && (type === 'publication' || type === 'project' || type === 'teaching')) {
                const itemSelector = type === 'publication'
                    ? '.publication-item'
                    : type === 'project'
                        ? '.project-item'
                        : '.teaching-item';
                this.insertIntoSection(tempDiv, sectionId, htmlCode, itemSelector);
            } else {
                const sectionSelectors = {
                    publication: '.publications-content',
                    experience: '.experiences-content',
                    award: '.awards-content',
                    project: '.projects-content',
                    gallery: '.gallery-grid',
                    teaching: '.teaching-content'
                };

                const selector = sectionSelectors[type];
                if (!selector) {
                    throw new Error('Unknown content type');
                }

                const contentSection = tempDiv.querySelector(selector);
                if (!contentSection) {
                    throw new Error(`Could not find ${selector} section`);
                }

                // For gallery: prepend into grid; for others fallback prepend
                if (type === 'gallery') {
                    contentSection.insertAdjacentHTML('afterbegin', htmlCode);
                } else if (type === 'experience' || type === 'award') {
                    contentSection.insertAdjacentHTML('afterbegin', htmlCode);
                } else {
                    contentSection.insertAdjacentHTML('afterbegin', htmlCode);
                }
            }

            await this.saveFile(filePath, tempDiv.innerHTML);
            
            const typeName = this.getTypeName(type);
            this.showMessage(`${typeName} successfully added to your website!`, 'success');
            
        } catch (error) {
            console.error('Error updating file:', error);
            this.showMessage(`Error updating ${filePath}: ${error.message}`, 'error');
        }
    }

    async addEventToNewsSection(htmlCode) {
        try {
            // Get current index.html content from server
            const response = await fetch('/get-file/index.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to read file');
            }
            
            let html = result.content;
            
            // Find the news section
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const newsSection = tempDiv.querySelector('.news-grid');
            
            if (!newsSection) {
                throw new Error('Could not find news-grid section');
            }
            
            // Insert the new event at the beginning
            newsSection.insertAdjacentHTML('afterbegin', htmlCode);
            
            // Save the updated HTML
            await this.saveFile('../index.html', tempDiv.innerHTML);
            
            this.showMessage('Event successfully added to news section', 'success');
            
        } catch (error) {
            console.error('Error updating news section:', error);
            this.showMessage(`Error updating news section: ${error.message}`, 'error');
        }
    }

    async saveFile(filePath, content) {
        try {
            console.log(`Saving file: ${filePath}`);
            const response = await fetch('/save-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filePath: filePath,
                    content: content
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Unknown error');
            }
            
            console.log(`File saved successfully: ${filePath}`);
            
        } catch (error) {
            console.error('Error saving file:', error);
            // Fallback: show instructions for manual save
            this.showManualSaveInstructions(filePath, content);
        }
    }

    showManualSaveInstructions(filePath, content) {
        const message = `
            <div class="manual-save-instructions">
                <h4>Manual Save Required</h4>
                <p>Due to browser security restrictions, the file couldn't be saved automatically.</p>
                <p><strong>To save manually:</strong></p>
                <ol>
                    <li>Copy the generated code above</li>
                    <li>Open ${filePath} in your code editor</li>
                    <li>Find the appropriate content section</li>
                    <li>Paste the code at the beginning of the section</li>
                    <li>Save the file</li>
                </ol>
                <button onclick="this.parentElement.remove()" class="close-btn">Close</button>
            </div>
        `;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message warning';
        messageDiv.innerHTML = message;
        
        const main = document.querySelector('.admin-main .container');
        main.insertBefore(messageDiv, main.firstChild);
    }

    copyGeneratedCode() {
        const codeElement = document.getElementById('generatedCode');
        const text = codeElement.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = 'var(--gradient-accent)';
            }, 2000);
            
            this.showMessage('Code copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            this.showMessage('Failed to copy code. Please select and copy manually.', 'error');
        });
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Insert at the top of the main content
        const main = document.querySelector('.admin-main .container');
        main.insertBefore(messageDiv, main.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    setupGalleryFileUpload() {
        const uploadMethodRadios = document.querySelectorAll('input[name="uploadMethod"]');
        const urlInputGroup = document.getElementById('urlInputGroup');
        const fileInputGroup = document.getElementById('fileInputGroup');
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('galleryFileInput');
        const uploadedFiles = document.getElementById('uploadedFiles');

        // Handle upload method switching
        uploadMethodRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'url') {
                    urlInputGroup.style.display = 'block';
                    fileInputGroup.style.display = 'none';
                    // Make URL textarea required
                    document.getElementById('galleryImages').required = true;
                    // Clear file input
                    fileInput.value = '';
                    uploadedFiles.innerHTML = '';
                } else {
                    urlInputGroup.style.display = 'none';
                    fileInputGroup.style.display = 'block';
                    // Remove required from URL textarea
                    document.getElementById('galleryImages').required = false;
                }
            });
        });

        // File upload area click handler
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop functionality
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });

        fileUploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            this.handleFileSelection(files);
        });

        // File input change handler
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFileSelection(files);
        });
    }

    handleFileSelection(files) {
        const uploadedFiles = document.getElementById('uploadedFiles');
        const maxFiles = 10;
        const maxSize = 5 * 1024 * 1024; // 5MB

        // Clear existing files if too many
        if (uploadedFiles.children.length + files.length > maxFiles) {
            this.showMessage(`Maximum ${maxFiles} images allowed. Please remove some files first.`, 'error');
            return;
        }

        files.forEach(file => {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                this.showMessage(`${file.name} is not an image file.`, 'error');
                return;
            }

            // Validate file size
            if (file.size > maxSize) {
                this.showMessage(`${file.name} is too large. Maximum size is 5MB.`, 'error');
                return;
            }

            // Create file preview
            this.createFilePreview(file);
        });
    }

    createFilePreview(file) {
        const uploadedFiles = document.getElementById('uploadedFiles');
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'uploaded-file';
            fileDiv.dataset.filename = file.name;

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-file';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', () => {
                fileDiv.remove();
            });

            const infoDiv = document.createElement('div');
            infoDiv.className = 'uploaded-file-info';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'uploaded-file-name';
            nameDiv.textContent = file.name;

            const sizeDiv = document.createElement('div');
            sizeDiv.className = 'uploaded-file-size';
            sizeDiv.textContent = this.formatFileSize(file.size);

            infoDiv.appendChild(nameDiv);
            infoDiv.appendChild(sizeDiv);
            fileDiv.appendChild(img);
            fileDiv.appendChild(removeBtn);
            fileDiv.appendChild(infoDiv);
            uploadedFiles.appendChild(fileDiv);
        };

        reader.readAsDataURL(file);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Override the gallery form submission to handle file uploads
    async handleGalleryFormSubmit(form) {
        const formData = new FormData(form);
        const uploadMethod = formData.get('uploadMethod');
        
        let images = [];
        
        if (uploadMethod === 'url') {
            // Handle URL input
            const urlText = formData.get('images');
            if (urlText.trim()) {
                images = urlText.split('\n').map(url => url.trim()).filter(url => url);
            }
        } else {
            // Handle file uploads
            const uploadedFiles = document.getElementById('uploadedFiles');
            const fileElements = uploadedFiles.querySelectorAll('.uploaded-file');
            
            if (fileElements.length === 0) {
                this.showMessage('Please upload at least one image.', 'error');
                return;
            }

            // Convert uploaded files to base64 URLs
            for (let fileElement of fileElements) {
                const img = fileElement.querySelector('img');
                if (img && img.src) {
                    images.push(img.src);
                }
            }
        }

        if (images.length === 0) {
            this.showMessage('Please provide at least one image.', 'error');
            return;
        }

        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            images: images
        };

        // Generate HTML and add to website
        const htmlCode = this.generateHTML(data, 'gallery');
        this.showGeneratedCode(htmlCode, data);
        
        // Show immediate success message
        this.showMessage('Gallery item successfully added to your website!', 'success');
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminPanel();
});

// Add some utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
    });
}

function formatMonthYear(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
    });
} 