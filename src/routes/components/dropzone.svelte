<script>
    import { uploadFilesToProject } from "../services/labelStudioAPI";

    export let dragActive = false;

    export let handleDrop = (event) => {
        event.preventDefault();
        let files = [...event.dataTransfer.files];
        uploadFilesToProject(files);
    }
</script>

<div
    class="dropzone {dragActive ? 'dragover' : ''}"
    on:dragover|preventDefault={() => (dragActive = true)}
    on:dragleave={() => (dragActive = false)}
    on:drop={handleDrop}
    role="button"
    tabindex="0"
    aria-label="Dosya yükleme alanı"
>
    <span>
        <i class="fa-solid fa-hand"></i>
    </span>
</div>

<style>
    .dropzone {
        align-self: stretch;
        border: 2px dashed #aaa;
        border-radius: 10px;
        padding: 2rem;
        cursor: grab;
        display: grid;
        justify-items: center;
        align-items: center;

        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
    }
    .dropzone.dragover {
        border-color: #5b9dff;
    }
</style>