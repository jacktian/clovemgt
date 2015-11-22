{@each data as item}
<tr>
  <td>${item.ver_id}</td>
  <td>${item.name}</td>
  <td>
    {@if item.status == 1}
      可用
    {@else if item.status == 0 }
      停用
    {@else}

    {@/if}   
  </td>
  <td>
    <button class="circular ui icon button version-edit-btn" data-json="${item|tojson}">
      <i class="icon edit" data-content="点击修改本数据"></i>
    </button>
  </td>
</tr>
{@/each}
