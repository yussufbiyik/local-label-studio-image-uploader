<script>
    import { onMount } from 'svelte';

    // Yapılandırma durumu
    let labelStudioUrl = '';
    let projectId = '';
    let personalAccessToken = '';
    let saveStatus = '';
    let saved = false;

    // Bileşen yüklendiğinde yerel depolamadan mevcut yapılandırmayı yükle
    onMount(() => {
        const config = JSON.parse(localStorage.getItem('labelStudioConfig') || '{}');
        labelStudioUrl = config.labelStudioUrl || '';
        projectId = config.projectId || '';
        personalAccessToken = config.personalAccessToken || '';
        saved = !!labelStudioUrl;
    });

    // Yapılandırmayı yerel depolamaya kaydet
    function saveConfiguration() {
        const config = {
            labelStudioUrl: labelStudioUrl.trim(),
            projectId: projectId.trim(),
            personalAccessToken: personalAccessToken.trim()
        };
        
        if (!config.labelStudioUrl || !config.projectId || !config.personalAccessToken) {
            saveStatus = 'Lütfen tüm alanları doldurun';
            return;
        }

        try {
            localStorage.setItem('labelStudioConfig', JSON.stringify(config));
            saved = true;
            saveStatus = 'Yapılandırma başarıyla kaydedildi!';
            setTimeout(() => {
                saveStatus = '';
            }, 3000);
        } catch (error) {
            saveStatus = `Yapılandırma kaydedilirken hata oluştu: ${error.message}`;
        }
    }

    function clearConfiguration() {
        localStorage.removeItem('labelStudioConfig');
        labelStudioUrl = '';
        projectId = '';
        personalAccessToken = '';
        saved = false;
        saveStatus = 'Yapılandırma temizlendi';
        setTimeout(() => {
            saveStatus = '';
        }, 3000);
    }
</script>

<main class="container">
    <div class="header">
        <h1>Label Studio Yapılandırması</h1>
        <a class="page-link" href="/">
            <i class="fa-solid fa-house"></i>
            Ana Sayfa
        </a>
    </div>
    <form on:submit|preventDefault={saveConfiguration}>
        <div class="form-group">
            <label for="labelStudioUrl">Label Studio URL</label>
            <input 
                type="url" 
                id="labelStudioUrl" 
                bind:value={labelStudioUrl} 
                placeholder="https://localhost:8080"
                required
            />
            <small>Label Studio'nun tam URL'sini girin</small>
        </div>

        <div class="form-group">
            <label for="projectId">Proje ID</label>
            <input 
                type="text" 
                id="projectId" 
                bind:value={projectId} 
                placeholder="1"
                required
            />
            <small>Label Studio projenizin sayısal ID'si.<br>(Proje sayfasının url kısmında gözüküyor projects/1 vb. şekilde)</small>
        </div>

        <div class="form-group">
            <label for="personalAccessToken">Personal Access Token</label>
            <input 
                type="password" 
                id="personalAccessToken" 
                bind:value={personalAccessToken} 
                placeholder="Label Studio API tokenınız"
                required
            />
            <small>Label Studio kişisel erişim tokenınız, ana sayfada profile girince en alttan alınabilir.</small>
        </div>

        <div class="bottom-buttons">
            <button type="submit" class="primary">
                <i class="fa-solid fa-floppy-disk"></i>
                Kaydet
            </button>
            <button type="button" on:click={clearConfiguration} class="secondary">
                <i class="fa-solid fa-broom"></i>
                Temizle
            </button>
        </div>

        {#if saveStatus}
            <div class="notification {saved ? 'success' : 'error'}">
                {saveStatus}
            </div>
        {/if}

        {#if saved}
            <div class="saved-notification">
                <p>✓ Yapılandırma kaydedildi</p>
                <a href="/">Ana sayfaya dön</a>
            </div>
        {/if}
    </form>
</main>

<style>
    h1 {
        margin-bottom: 2rem;
        color: #333;
        text-align: center;
    }

    form {
        display: grid;
        gap: 1rem;
        grid-auto-flow: row;
        justify-items: stretch;
        align-content: center;
        align-items: center;
        justify-self: center;
    }

    .form-group {
        gap: 5px;
        display: grid;
        grid-auto-flow: row;
        justify-items: stretch;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    small {
        display: block;
        margin-top: 0.25rem;
        color: #666;
        font-size: 0.85rem;
    }

    button.primary {
        background-color: #4a6cf7;
        color: white;
    }

    button.secondary {
        background-color: #f1f1f1;
        color: #333;
    }

    .notification {
        margin-top: 1.5rem;
        padding: 0.75rem;
        border-radius: 4px;
        text-align: center;
    }

    .success {
        background-color: #d4edda;
        color: #155724;
    }

    .error {
        background-color: #f8d7da;
        color: #721c24;
    }

    .saved-notification {
        margin-top: 2rem;
        text-align: center;
    }

    .saved-notification p {
        color: #155724;
        font-weight: bold;
    }

    a {
        color: #4a6cf7;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>