<script setup lang="tsx">
import { reactive, ref, unref } from 'vue'
import { getIssueListApi, delIssueListApi } from '@/api/vadmin/help/issue'
import { useTable } from '@/hooks/web/useTable'
import { Table, TableColumn } from '@/components/Table'
import { ElButton, ElSwitch, ElRow, ElCol } from 'element-plus'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import { useDictStore } from '@/store/modules/dict'
import { DictDetail } from '@/utils/dict'
import { useRouter } from 'vue-router'
import { getIssueCategoryOptionsApi } from '@/api/vadmin/help/issue'
import { useValidator } from '@/hooks/web/useValidator'

defineOptions({
  name: 'HelpIssue'
})
const a = ref('')

const { push } = useRouter()
const { required } = useValidator()

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getIssueListApi({
      page: unref(currentPage),
      limit: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data || [],
      total: res.count || 0
    }
  },
  fetchDelApi: async (value) => {
    const res = await delIssueListApi(value)
    return res.code === 200
  }
})

const { dataList, loading, total, pageSize, currentPage } = tableState
const { getList, delList } = tableMethods
console.log('dataList', dataList)

const platformOptions = ref<DictDetail[]>([])

const getOptions = async () => {
  const dictStore = useDictStore()
  const dictOptions = await dictStore.getDictObj(['sys_vadmin_platform'])
  platformOptions.value = dictOptions.sys_vadmin_platform
}

getOptions()

const tableColumns = reactive<TableColumn[]>([
  {
    field: 'id',
    label: '編號',
    show: true,
    disabled: true,
    width: '120px'
  },
  {
    field: 'category.name',
    label: '類別名稱',
    width: '200px',
    show: true,
    disabled: true
  },
  {
    field: 'title',
    label: '問題',
    show: true
  },
  /*
  {
    field: 'view_number',
    label: '查看次数',
    show: true,
    width: '100px'
  },
  {
    field: 'is_active',
    label: '是否可见',
    show: true,
    width: '100px',
    slots: {
      default: (data: any) => {
        const row = data.row
        return (
          <>
            <ElSwitch value={row.is_active} disabled />
          </>
        )
      }
    }
  },
  {
    field: 'create_datetime',
    label: '创建时间',
    show: true,
    width: '200px',
    sortable: true
  },
  {
    field: 'create_user.name',
    label: '创建人',
    show: true,
    width: '100px'
  },
  */
  {
    field: 'action',
    width: '120px',
    label: '操作',
    show: true,
    slots: {
      default: (data: any) => {
        const row = data.row
        // 使用is_active可不可刪
        return (
          <>
            <ElButton type="primary" link size="small" onClick={() => editAction(row)}>
              查看
            </ElButton>
            <ElButton
              type="danger"
              loading={delLoading.value}
              link
              size="small"
              onClick={() => delData(row)}
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  }
])

const searchSchema = reactive<FormSchema[]>([
  {
    field: 'category_id',
    label: '問題類別',
    colProps: {
      span: 24
    },
    component: 'Select',
    componentProps: {
      style: {
        width: '100%'
      }
    },
    formItemProps: {
      rules: [required()]
    },
    optionApi: async () => {
      const res = await getIssueCategoryOptionsApi()
      return res.data
    }
  }
  /*
  {
    field: 'name',
    label: '類別名稱',
    component: 'Input',
    componentProps: {
      clearable: true,
      style: {
        width: '214px'
      }
    }
  },
  {
    field: 'platform',
    label: '登录平台',
    component: 'Select',
    componentProps: {
      style: {
        width: '214px'
      },
      options: platformOptions.value
    }
  },
  {
    field: 'is_active',
    label: '是否可见',
    component: 'Select',
    componentProps: {
      style: {
        width: '214px'
      },
      options: [
        {
          label: '可见',
          value: true
        },
        {
          label: '不可见',
          value: false
        }
      ]
    }
  }
  */
])

const searchParams = ref({})
const setSearchParams = (data: any) => {
  currentPage.value = 1
  searchParams.value = data
  getList()
}

const delLoading = ref(false)

const delData = async (row: any) => {
  delLoading.value = true
  await delList(true, [row.id]).finally(() => {
    delLoading.value = false
  })
}

const editAction = async (row: any) => {
  push(`/help/issue/form?id=${row.id}`)
}

// 改看問題回答
const checkAction = async (row: any) => {
  push(`/help/issue/form?id=${row.id}`)
}

const addAction = () => {
  push('/help/issue/form')
}
</script>

<template>
  <ContentWrap>
    <Search :schema="searchSchema" @reset="setSearchParams" @search="setSearchParams" />
    <Table
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      showAction
      :columns="tableColumns"
      default-expand-all
      node-key="id"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total
      }"
      @register="tableRegister"
      @refresh="getList"
    >
      <template #toolbar>
        <ElRow :gutter="10">
          <ElCol :span="1">{{ a }}</ElCol>
        </ElRow>
      </template>
    </Table>
  </ContentWrap>
</template>
