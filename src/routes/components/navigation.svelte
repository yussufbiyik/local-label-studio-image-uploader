<script>
    export let navigationItems = [
        {
            name: 'Anasayfa',
            icon: 'house',
            url: '/',
            disabled: false,
            props: {}
        },
        {
            name: 'Ayarlar',
            icon: 'gear',
            url: '/settings',
            disabled: false,
            props: {}
        }
    ];
    export let preferences = {
        itemNames:false
    }
    /*
        {
            name,
            icon,
            url,
            disabled,
            props
        }
    */
</script>
<div class="navigation-wrapper">
    <nav id="navigation-bar">
        {#each navigationItems as item}
            <a
                href={item.url}
                class="nav-link scale-animation {item.disabled ? 'disabled' : ''}"
                {...item.props}
            >
                {#if item.icon}
                    <i class="nav-icon fa-solid fa-{item.icon}"></i>
                {/if}
                {#if preferences.itemNames}
                    <span class="nav-text">{item.name}</span>
                {/if}
            </a>
        {/each}
    </nav>
</div>
<style>
    .navigation-wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 10px;
    }
    #navigation-bar {
        gap: 10px;
        display: grid;
        align-content: center;
        justify-items: center;
        /* grid-auto-flow: column; */
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        
        padding: 10px;
        border-radius: 20px;
        background-color: var(--color-1);

        min-height: 60px;
        width: 100%;
    }
    .nav-link {
        color: inherit;
        font-weight: bold;
        text-decoration: none;

        gap: 5px;
        display: grid;
        grid-auto-flow: row;
        justify-items: center;
        align-content: center;

        border-radius: 10px;
        background-color: var(--color-1-light);

        height: 100%;
        width: 100%;
        padding: 10px;

        font-size: 20pt;
    }
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>