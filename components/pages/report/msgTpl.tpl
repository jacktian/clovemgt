{@each data as item}
<tr>
  <td>${item.test_ver}</td>
  <td>${item.versionName}</td>
  <td>
  {@if item.taskname == null}
  其他测试任务
  {@else}
  ${item.taskname}
  {@/if}   
  </td>
  <td>
    {@if item.status == 2}
      执行完毕
    {@else if item.status == 3 }
      执行出错
    {@else}
      执行完毕
    {@/if}   
  </td>
  <td  style="display:none;">${item.taskId}</td>
  <td>
 	<button class="circular ui icon button report-detail-btn">
          查看测试报告
    </button>
  </td>
</tr>
{@/each}