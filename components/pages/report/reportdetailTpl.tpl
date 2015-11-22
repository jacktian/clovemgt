{@each data as item}
<tr>
  <td>${item.versionname}</td>
  <td>${item.title}</td>
  <td><a href=${item.test_url} target="_blank">点击查看</a></td>
  <td>${item.result}</td>
  <td>
   {@if item.status == 1}
      <font color="green">正确</font>
    {@else}
      <font color="red">有错误</font>
    {@/if} 
  </td>
</tr>
{@/each}