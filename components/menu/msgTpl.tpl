{@if data==null}
你还未同步RAP项目数据，点击这里<a href="#" class="syncProject" style="color:yellow;">立即同步数据</a>
{@/if}    

{@each data as item}
        你当前操作的项目是：<b style="color:yellow;">${item.name}</b>
{@/each}