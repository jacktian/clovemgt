{@each data as item}
  <tr>
        <td>
          {@if item.type == 1}
      实用资讯
    {@else if item.type == 0 }
      博士观点
    {@else}

    {@/if}
        </td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.picUrl}</td>
        <td>${item.postUrl}</td>
        <td>
          {@if item.prioty == 1}
      最高优先
    {@else if item.prioty == 0 }
      中等优先
      {@else if item.prioty == 0 }
      最低优先
    {@else}

    {@/if}
        </td>
      </tr>

{@/each}
