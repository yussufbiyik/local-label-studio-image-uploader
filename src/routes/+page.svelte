<script>
    import { onMount } from 'svelte'; 

    let files = [];
    let dragActive = false;
    let uploadStatus = [];
    let isUploading = false;
    let configMissing = false;
    
    // Yerel depolamadan Label Studio yapılandırması
    let labelStudioConfig = {
        url: '',
        projectId: '',
        apiKey: ''
    };

    onMount(() => {
        try {
            const storedConfig = JSON.parse(localStorage.getItem('labelStudioConfig') || '{}');
            if (storedConfig.labelStudioUrl && storedConfig.projectId && storedConfig.personalAccessToken) {
                labelStudioConfig = {
                    url: storedConfig.labelStudioUrl,
                    projectId: storedConfig.projectId,
                    apiKey: storedConfig.personalAccessToken
                };
                configMissing = false;
            } else if (
                import.meta.env.VITE_LABEL_STUDIO_ADDRESS && 
                import.meta.env.VITE_LABEL_STUDIO_PERSONAL_ACCESS_TOKEN && 
                import.meta.env.VITE_LABEL_STUDIO_PROJECT_ID
            ) {
                labelStudioConfig = {
                    url: import.meta.env.VITE_LABEL_STUDIO_ADDRESS,
                    apiKey: import.meta.env.VITE_LABEL_STUDIO_PERSONAL_ACCESS_TOKEN,
                    projectId: import.meta.env.VITE_LABEL_STUDIO_PROJECT_ID,
                };
                configMissing = false;
            } else {
                configMissing = true;
            }
        } catch (error) {
            console.error('Yapılandırma yüklenirken hata:', error);
            configMissing = true;
        }
    });

    function handleDrop(event) {
        event.preventDefault();
        dragActive = false;
        files = [...event.dataTransfer.files];
        uploadFiles(files);
    }

    function handleFileChange(event) {
        files = [...event.target.files];
        uploadFiles(files);
    }

    async function getAccessToken(personalAccessToken) {
        const response = await fetch(`${labelStudioConfig.url}/api/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': personalAccessToken
            })
        });
        return response.json();
    }

    async function uploadFiles(fileList) {
        if (fileList.length === 0) return;
        if (configMissing) {
            uploadStatus = [{
                name: "Yapılandırma Hatası",
                status: "error",
                message: "Label Studio yapılandırması eksik. Lütfen ayarları kontrol edin."
            }];
            return;
        }
        
        isUploading = true;
        uploadStatus = [];
        
        try {
            const apiKeyRequest = await getAccessToken(labelStudioConfig.apiKey);
            const apiKey = apiKeyRequest.access;
            for (const file of fileList) {
                const formData = new FormData();
                formData.append('data', file); // Label Studio expects 'data' as the field name
                
                // For images, we can add format specification
                const fileInfo = {
                    filename: file.name,
                    size: file.size,
                    type: file.type
                };
                
                // Add status entry for this file
                uploadStatus = [...uploadStatus, { 
                    name: file.name, 
                    status: 'uploading', 
                    message: 'Yükleniyor...' 
                }];
                
                try {
                    const response = await fetch(`${labelStudioConfig.url}/api/projects/${labelStudioConfig.projectId}/import`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Authorization": `Bearer ${apiKey}`,
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        // Update status for this file
                        uploadStatus = uploadStatus.map(item => 
                            item.name === file.name 
                                ? { ...item, status: 'success', message: 'Yükleme başarılı!' }
                                : item
                        );
                    } else {
                        const errorText = await response.text();
                        throw new Error(`Server responded with ${response.status}: ${errorText}`);
                    }
                } catch (error) {
                    // Update status for this file with error
                    uploadStatus = uploadStatus.map(item => 
                        item.name === file.name 
                            ? { ...item, status: 'error', message: `Error: ${error.message}` }
                            : item
                    );
                }
            }
        } finally {
            isUploading = false;
        }
    }
</script>

<style>
    .dropzone {
        border: 2px dashed #aaa;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        transition: border-color 0.3s ease;
    }
    .dropzone.dragover {
        border-color: #5b9dff;
    }
    .upload-container {
        max-width: 500px;
        margin: 1rem;
        display: grid;
        
        gap: 5px;
        grid-auto-flow: row;
        justify-items: stretch;
        align-content: center;
        align-items: center;
        justify-self: center;
    }
    .custom-file-input {
        width: 100%;
        height: 35px;
        border: none;
        color: white;
        cursor: pointer;
        font-weight: 500;
        border-radius: 0.5rem;
        padding: 0.75rem 1.5rem;
        background-color: #5b9dff;
        transition: background-color 0.3s ease;

        gap: 5px;
        display: grid;
        grid-auto-flow: column;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
    
    .custom-file-input:hover {
        background-color: #4a8df7;
    }
    
    .custom-file-input:active {
        background-color: #3a7de7;
    }
    
    input[type="file"] {
        display: none;
    }
    input[type="file"] {
        margin-top: 1rem;
    }
    .status-list {
        margin-top: 1rem;
        text-align: left;
    }
    .status-item {
        padding: 0.5rem;
        border-radius: 0.25rem;
        margin-bottom: 0.25rem;
    }
    .uploading {
        background-color: #f0f0f0;
    }
    .success {
        background-color: #d4edda;
        color: #155724;
    }
    .error {
        background-color: #f8d7da;
        color: #721c24;
    }
    .loading {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        border-top-color: #5b9dff;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .config-banner {
        background-color: #fff3cd;
        color: #856404;
        padding: 0.75rem;
        border-radius: 0.25rem;
        text-align: center;
        margin-bottom: 1rem;
    }
</style>

<div class="upload-container">
    <div class="header">
        <h1>Label Studio Image Uploader</h1>
        <a href="/configurator" class="page-link">
            <i class="fa-solid fa-gear"></i> 
            Ayarlar
        </a>
    </div>
    
    {#if configMissing}
        <div class="config-banner">
            Label Studio ayarları yapılmamış. Lütfen 
            <a href="/configurator" class="page-link">ayarlar sayfasından</a> 
            gerekli bilgileri giriniz.
        </div>
    {/if}

    <div
        class="dropzone {dragActive ? 'dragover' : ''}"
        on:dragover|preventDefault={() => (dragActive = true)}
        on:dragleave={() => (dragActive = false)}
        on:drop={handleDrop}
        role="button"
        tabindex="0"
        aria-label="Dosya yükleme alanı"
    >
        Buraya sürükle bırak
    </div>
    <p>veya dosyaları seç</p>
    <label for="file-upload" class="custom-file-input">
        <i class="fa-solid fa-folder"></i> 
        Dosya Seç
    </label>
    <input id="file-upload" type="file" accept="image/*" multiple on:change={handleFileChange} />
    <label for="camera-upload" class="custom-file-input">
        <i class="fa-solid fa-camera"></i>
        Kameradan Yükle
    </label>
    <input id="camera-upload" type="file" accept="image/*" capture multiple on:change={handleFileChange} />

    {#if uploadStatus.length > 0}
        <div class="status-list">
            <h3>Yükleme Durumu:</h3>
            {#each uploadStatus as item}
                <div class="status-item {item.status}">
                    {#if item.status === 'uploading'}
                        <span class="loading"></span>
                    {/if}
                    {item.name} - {item.message}
                </div>
            {/each}
        </div>
    {/if}
</div>
