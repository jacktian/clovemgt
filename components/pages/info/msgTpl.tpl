{@each data as item}
  <tr>
        <td>
          {@if item.type == 1}
      实用资讯
    {@else if item.type == 2 }
      博士观点
    {@else}

    {@/if}
        </td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td><a href="${item.picUrl}" target="_blank">点击查看</a></td>
        <td><a href="${item.url}" target="_blank">点击查看</a></td>
        <td>
          {@if item.prioty == 1}
      top
    {@else if item.prioty == 2 }
      medium
      {@else if item.prioty == 3 }
      low
    {@else}

    {@/if}
        </td>
        <td>
          <div class="ui button red mini info-del-btn" data-id="${item.id}">删除</div>
        </td>
      </tr>

{@/each}
