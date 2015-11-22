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
        <td>${item.picUrl}</td>
        <td>${item.url}</td>
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
      </tr>

{@/each}
