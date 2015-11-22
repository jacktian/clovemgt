{@each data as item}
  <tr>
    <td>${item.case_id}</td>
    <td>${item.name}</td>
    <td>${item.tag}</td>
    <td>${item.path}</td>
    <td>${item.createtime}</td>
    <td  datavalue='${item.status}'>    
    {@if item.status == 1}
      可用
    {@else if item.status == 0 }
      停用
    {@else}

    {@/if} </td>
    <td style="display:none;">${item.parameter}</td>
    <td>
      <button class="circular ui icon button usecase-edit-btn">
      <i class="icon edit" data-content="修改"></i>
    </button>
    <button class="circular ui icon button usecase-testdata-btn">
        测试数据
    </button> 
    </td>
  </tr>

{@/each}
