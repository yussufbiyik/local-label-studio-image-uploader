import { mount } from "svelte";
import Status from "../components/status.svelte";
import { availableConfig, apiAccessToken } from "../stores/configStore";
import { get } from "svelte/store";

export let isUploading = false;

export async function getAccessToken() {
    const config = get(availableConfig);
    const response = await fetch(`${config.url}/api/token/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'refresh': config.apiKey
        })
    });
    return response.json();
}

export async function uploadFilesToProject(files) {
    const config = get(availableConfig);
    const accessToken = get(apiAccessToken);
    isUploading = true;
    for (const file of files) {
        const formData = new FormData();
        formData.append('data', file);
        mount(Status, {
            target: window.document.body,
            props: {
                status: {
                    title: `Yükleniyor...`,
                    message: `Dosya adı: ${file.name}`,
                    type: 'info',
                    duration: 2000
                }
            }
        });
        fetch(`${config.url}/api/projects/${config.projectId}/import`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        }).then(response => {
            if(response.status !== 201) throw new Error(`${response.statusText}`);
            mount(Status, {
                target: window.document.body,
                props: {
                    status: {
                        title: `Dosya Yüklendi`,
                        message: `${file.name} dosyası yüklendi.`,
                        type: 'success',
                        duration: 2000
                    }
                }
            });
        }).catch(error => {
            console.error('Error uploading file:', error);
            mount(Status, {
                target: window.document.body,
                props: {
                    status: {
                        title: `Hata`,
                        message: `Dosya yüklenirken hata oluştu: ${error.message}`,
                        type: 'error',
                        duration: 2000
                    }
                }
            });
        });
    }
    isUploading = false;
}