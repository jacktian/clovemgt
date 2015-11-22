{@each data as item}
  <tr>
    <td>${item.task_id}</td>
    <td>${item.name}</td>
    <td>${item.versionName}</td>       
    <td>${item.runtime}</td>
    <td datavalue='${item.status}'>
    {@if item.status === "0"}
    	未执行
    {@else if item.status === "1" }
    	执行中
    {@else if item.status === "2" }
    	执行完毕
    {@else}
        执行出错
    {@/if}    
    </td>
    <td style="display:none;">${item.versionId}</td>
    <td>   
    {@if item.status === "0"}
     <button class="circular ui icon button task-edit-btn">
      <i class="icon edit" data-content="点击修改本数据"></i>
    </button>
	   <button class="circular ui icon button task-delete-btn">
      <i class="icon delete" data-content="删除"></i>
    </button>   
    {@else if item.status === "2"}
      <button class="circular ui icon button task-report-detail-btn">
          查看测试报告
    </button> 
     {@else}
     
     {@/if}  
    </td>
  </tr>

{@/each}