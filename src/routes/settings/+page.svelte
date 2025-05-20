<script>
    import { availableConfig } from "../stores/configStore";
    import Status from "../components/status.svelte";
    import { mount } from "svelte";

    let currentConfig = {
        url: ($availableConfig && $availableConfig.url) || "",
        projectId: ($availableConfig && $availableConfig.projectId) || "",
        apiKey: ($availableConfig && $availableConfig.apiKey) || ""
    };

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('labelStudioConfig', JSON.stringify(currentConfig));
        availableConfig.set(currentConfig);
        mount(Status, {
            target: window.document.body,
            props: {
                status: {
                    title: `Ayarlar kaydedildi`,
                    message: `Yeni ayarlar başarıyla kaydedildi.`,
                    type: 'success',
                    duration: 2000
                }
            }
        });
    }

    function handleClear(event) {
        event.preventDefault();
        localStorage.removeItem('labelStudioConfig');
        mount(Status, {
            target: window.document.body,
            props: {
                status: {
                    title: `Ayarlar temizlendi`,
                    message: `Kullanıcı ayarları yerine varsayılan ayarlar kullanılacak.`,
                    type: 'info',
                    duration: 2000
                }
            }
        });
    }
</script>
<div class="settings-content">
    <form class="settings-form">
        <div class="input-group">
            <label for="labelStudioUrl">Label Studio URL</label>
            <input 
                type="url" 
                id="labelStudioUrl" 
                bind:value={currentConfig.url}
                placeholder={currentConfig.url || "https://localhost:8080"}
                required
            />
            <small>Label Studio'nun tam URL'sini girin</small>
        </div>
        <div class="input-group">
            <label for="projectId">Proje ID</label>
            <input 
                type="text" 
                id="projectId" 
                bind:value={currentConfig.projectId}
                placeholder={currentConfig.projectId || "1"}
                required
            />
            <small>Label Studio projenizin sayısal ID'si.<br>(Proje sayfasının url kısmında gözüküyor projects/1 vb. şekilde)</small>
        </div>
        <div class="input-group">
            <label for="personalAccessToken">Personal Access Token</label>
            <input 
                type="password" 
                id="personalAccessToken" 
                bind:value={currentConfig.apiKey}
                placeholder={currentConfig.apiKey || "Label Studio API tokenınız"}
                required
            />
            <small>Label Studio kişisel erişim tokenınız, ana sayfada profile girince en alttan alınabilir.</small>
        </div>
    </form>
    <div class="input-group buttons">
        <button class="clear scale-animation"
                on:click={handleClear}>
            <i class="fa-solid fa-xmark"></i>
            <span>Temizle</span>
        </button>
        <button class="submit scale-animation"
                on:click={handleSubmit}>
            <i class="fa-solid fa-floppy-disk"></i>
            <span>Kaydet</span>
        </button>
    </div>
</div>
<style>
    .settings-content {
        height: 100%;
        padding: 10px;
        border-radius: 20px;
        background-color: var(--color-1);
        position: relative;
    }

    .settings-form {
        gap: 10px;
        display: grid;
        grid-auto-flow: row;
    }

    .input-group {
        gap: 5px;
        display: grid;
        flex-direction: row;

        padding: 10px;
        border-radius: 10px;
        background-color: var(--color-1-light);
    }

    .input-group.buttons {
        gap: 10px;
        display: grid;
        grid-auto-flow: column;

        position: absolute;
        margin: 10px;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .input-group.buttons button {
        gap: 5px;
        display: grid;
        grid-auto-flow: column;
        align-items: start;
        justify-items: start;
        justify-content: center;

        font-size: 14pt;
    }

    .input-group.buttons button.submit {
        color: white;
        background-color: var(--color-4);
    }
    .input-group.buttons button.clear {
        color: white;
        background-color: var(--color-2);
    }

    .input-group.buttons i {
        font-size: 20pt;
    }

    .input-group label {
        margin-left: 10px !important;
        font-weight: bold;
    }

    .input-group input {
        width: 100%;
        height: 35px;
        padding: 0 15px;

        border: none;
        border-radius: 5px;
    }
</style>