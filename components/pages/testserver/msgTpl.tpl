{@each data as item}
  <tr>
    <td>${item.testserver_id}</td>
    <td>${item.name}</td>        
    <td>${item.url}</td>
    <td datavalue='${item.available}'>
    {@if item.available === "1"}
    	可用
    {@else if item.available === "0" }
    	停用
    {@else}
        ${item.available}
    {@/if}    
    </td>        
    <td>
    <button class="circular ui icon button test-edit-btn">
      <i class="icon edit" data-content="点击修改本数据"></i>
    </button>
    </td>
  </tr>

{@/each}