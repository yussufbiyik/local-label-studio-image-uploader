<script>
    export let status = {
        title: '',
        message: '',
        type: '', // info, success, error
        duration: 5000,
    };    let isDestroyed = false;
    let isDestroying = false;
    let destructionTime = status.duration;

    setTimeout(() => {
        isDestroying = true;
        setTimeout(() => {
            isDestroyed = true;
        }, 2000);
    }, destructionTime);
</script>
{#if !isDestroyed}
    <div class="status-wrapper">
        <div class="status-item {status.type} {isDestroying ? 'destroy' : ''}">
            <span>{status.title}</span>
            <br>
            <span>
                {status.message}
            </span>
        </div>
    </div>
{/if}
<style>
    @keyframes turnTransparent {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }
    
    .status-item.destroy {
        animation: turnTransparent 2s ease-out forwards;
    }
    .status-wrapper {
        z-index: 2;
        position: absolute;
        
        left: 0;
        bottom: 75px;
        width: 100%;
        padding: 10px;
        
        pointer-events: none;
    }    .status-item {
        padding: 10px;
        border-radius: 20px;
        width: 100%;
        animation: slideIn 0.5s ease-out forwards;
    }

    .status-item.info {
        background-color: #31708f;
        color: #e7f3fe;
    }

    .status-item.success {
        background-color: #3c763d;
        color: #dff0d8;
    }

    .status-item.error {
        background-color: #a94442;
        color: #f2dede;
    }
</style>