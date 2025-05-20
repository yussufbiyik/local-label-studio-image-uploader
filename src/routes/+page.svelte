<script>
    import Dropzone from './components/dropzone.svelte';
    import { uploadFilesToProject } from './services/labelStudioAPI';
</script>
<div class="home-content">
    <div class="dropzone-wrapper"><Dropzone/></div>
    <div class="manuel-inputs">
        <div class="file-upload scale-animation">
            <label for="file-upload" class="custom-file-input">
                <i class="fa-solid fa-folder"></i>
            </label>
            <input id="file-upload" type="file" accept="image/*" multiple on:change={(event) => uploadFilesToProject(event.target.files)} />
        </div>
        <div class="camera-upload scale-animation">
            <label for="camera-upload" class="custom-file-input">
                <i class="fa-solid fa-camera"></i>
            </label>
            <input id="camera-upload" type="file" accept="image/*" capture multiple on:change={(event) => uploadFilesToProject(event.target.files)} />
        </div>
    </div>
</div>
<style>
    .home-content {
        height: 100%;

        gap: 10px;
        display: grid;
        grid-template-rows: 1fr auto;
    }
    .manuel-inputs {
        gap: 5px;
        display: grid;
        grid-auto-flow: column;
        /* grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); */
        

        width: 100%;
        min-height: 30px;
        justify-content: end;
        justify-items: stretch;

        bottom: 0;
        position: relative;
    }

    .manuel-inputs > div {
        padding: 10px;
        border-radius: 20px;
        background-color: var(--color-1);
        
        aspect-ratio: 1 / 1;
        font-size: 20pt;

        display: grid;
        align-items: center;
        justify-content: center;
    }

    input[type="file"] {
        display: none;
    }

    .dropzone-wrapper {
        padding: 10px;
        border-radius: 20px;
        background-color: var(--color-1);
    }
</style>