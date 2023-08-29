<script>
    export let link;
</script>

<a href={link}>
    <div class='flex w-24 h-24 rounded-xl justify-center items-center variant-outline-primary'>
        {link.slice(13)}
    </div>
</a>