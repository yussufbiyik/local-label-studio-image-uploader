<script>
    import { onMount, mount } from "svelte";
    import "../app.css";
    import Navigation from './components/navigation.svelte';
    import Status from "./components/status.svelte";
    import { getAccessToken } from "./services/labelStudioAPI";
    import { availableConfig, apiAccessToken } from "./stores/configStore";
    
    import { Capacitor } from '@capacitor/core';
    import { StatusBar } from '@capacitor/status-bar';
    
    let isConfigMissing = false;

    onMount(() => {
        if (Capacitor.isPluginAvailable('StatusBar')) {
            StatusBar.hide();
        }
        // Check for env variables and local storage for Label Studio configuration
        const storedConfig = JSON.parse(localStorage.getItem("labelStudioConfig"));
        const envConfig = {
            url: import.meta.env.VITE_LABEL_STUDIO_ADDRESS,
            projectId: import.meta.env.VITE_LABEL_STUDIO_PROJECT_ID,
            apiKey: import.meta.env.VITE_LABEL_STUDIO_PERSONAL_ACCESS_TOKEN,
        };
        try {
            if((storedConfig != null && Object.values(storedConfig).some(value => value != undefined)) || (Object.values(envConfig).some(value => value != undefined))) {
                const config = storedConfig || envConfig;
                availableConfig.set(config);
                console.log("Label Studio yapılandırması:", $availableConfig);
                // Get access token from api
                getAccessToken().then((response) => {
                    if (response.access) {
                        apiAccessToken.set(response.access);
                    } else {
                        mount(Status, {
                            target: window.document.body,
                            props: {
                                status: {
                                    title: 'Hata',
                                    message: 'Label Studio sunucusu olumsuz yanıt verdi. Lütfen yapılandırma ayarlarınızı kontrol edin.',
                                    type: 'error',
                                    duration:2000
                                }
                            }
                        });
                    }
                }).catch((error) => {
                    console.error("API erişim hatası:", error);
                    mount(Status, {
                        target: window.document.body,
                        props: {
                            status: {
                                title: 'Hata',
                                message: 'Label Studio API erişim hatası. Lütfen yapılandırma ayarlarınızı kontrol edin.',
                                type: 'error',
                                duration:2000
                            }
                        }
                    });
                })
            }else {
                isConfigMissing = true;
                if (!["/error", "/setting"].includes(window.location.pathname)) window.location.href = "/error";
            }
        } catch (error) {
            console.error("Yapılandırma yüklenirken hata oluştu:", error);
            mount(Status, {
                target: window.document.body,
                props: {
                    status: {
                        title: 'Hata',
                        message: 'Yapılandırma yüklenirken hata oluştu. Lütfen yapılandırma ayarlarınızı kontrol edin. Detaylar için tarayıcı konsolunu kontrol edin.',
                        type: 'error',
                        duration:2000
                    }
                }
            });
        }
    });
</script>

<div id="content-area">
    <slot />
</div>
<Navigation />
<style>
    #content-area {
        height: 100%;

        padding: 20px 10px;
        padding-bottom: 85px;
    }
</style>