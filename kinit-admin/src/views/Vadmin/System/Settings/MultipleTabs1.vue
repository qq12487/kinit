<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useRouter } from 'vue-router'
import { useForm } from '@/hooks/web/useForm'
import { reactive, ref } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { ElButton, ElMessage } from 'element-plus'
import { Form, FormSchema } from '@/components/Form'
import {
  addIssueApi,
  getIssueApi,
  putIssueApi,
  getIssueCategoryOptionsApi,
  getPaperApi
} from '@/api/vadmin/help/issue'

const Pdf = '01.pdf'
const drawer = ref(false)
defineOptions({
  name: 'HelpIssueForm'
})

const { required } = useValidator()
const { push, currentRoute } = useRouter()

const editorConfig = {
  customAlert: (s: string, t: string) => {
    switch (t) {
      case 'success':
        ElMessage.success(s)
        break
      case 'info':
        ElMessage.info(s)
        break
      case 'warning':
        ElMessage.warning(s)
        break
      case 'error':
        ElMessage.error(s)
        break
      default:
        ElMessage.info(s)
        break
    }
  },
  autoFocus: false,
  scroll: true,
  readOnly: false,
  uploadImgShowBase64: true,
  placeholder: '请输入内容...'
}

const formSchema = reactive<FormSchema[]>([
  {
    field: 'title',
    label: 'Query',
    component: 'Input',
    colProps: {
      span: 20
    },
    componentProps: {
      style: {
        width: '100%'
      }
    },
    formItemProps: {
      rules: [required()]
    }
  }
])

const formSchema2 = reactive<FormSchema[]>([
  {
    field: 'category_id',
    label: '問題類別',
    colProps: {
      span: 15
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
])

const { formRegister, formMethods } = useForm()
const { getFormData, getElFormExpose, setValues } = formMethods

const actionType = ref('')
const saveLoading = ref(false)

/*
const initData = async () => {
  const issueId = currentRoute.value.query.id
  if (issueId) {
    actionType.value = 'edit'
    const res = await getIssueApi(Number(issueId))
    if (res) {
      setValues(res.data)
    } else {
      // 未获取到数据，跳转到404页面
      push('/404')
    }
  } else {
    actionType.value = 'add'
  }
}

initData()
*/
actionType.value = 'add'
const q = ref('What were the outcomes for the patients in this paper?')
const reply = ref(
  'This paper provides information on the outcomes for patients in a study involving the treatment of Spinal Muscular Atrophy (SMA) with a drug called nusinersen. The treatment duration was measured from the administration of the first dose to the last day of follow-up. Adverse events (AEs) were recorded and categorized using the Medical Dictionary for Regulatory Activities (MedDRA) System Organ Class and Preferred Term. The incidence rate of post-lumbar puncture syndrome (PLPS) was also determined. The paper analyzed data related to treatment duration, the amount of study drug received, and incidence of AEs and serious AEs (SAEs) in both the nusinersen-treated and control groups. The events associated with post-lumbar puncture were analyzed separately, specifically looking at back pain and cerebrospinal fluid leak. The results showed that the proportion of participants experiencing AEs was low, with similar rates in the nusinersen-treated and control groups. Additionally, there were low rates of positive urinary protein results in both groups. In terms of hospitalization, the study found that the rate of hospitalization was lower in infants treated with nusinersen compared to those who underwent a sham procedure. This difference was statistically significant. The most common reason for hospitalization in both groups was respiratory-related events. The study followed a total of 121 participants, including infants and older participants, with a follow-up period of up to 394 days. However, the data collected for this paper only includes information up to the last study visit (December 16, 2016) due to the early termination of the study. Overall, the outcomes of the study indicate that nusinersen treatment was associated with a lower rate of hospitalization and a low incidence of adverse events in patients with SMA.'
)
const paper = getPaperApi(Pdf)

// 記得上題？？
// 改輸入問題並回答
const getquery = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate()
  if (valid) {
    saveLoading.value = true
    const formData = await getFormData()
    console.log('formData', formData.value)

    if (!formData) {
      saveLoading.value = false
      return ElMessage.error('未获取到数据')
    }
    //paper.value = getPaperApi(Pdf)
    //reply.value = 'hi'
    // const tagsViewStore = useTagsViewStore()
    // const res = ref()
    // try {
    //   if (actionType.value === 'add') {
    //     res.value = await addIssueApi(formData)
    //     console.log('res', res)
    //     if (res.value) {
    //       // 删除当前标签页，并跳转到列表页
    //       // tagsViewStore.delView(unref(currentRoute))
    //       // push('/help/issue')
    //       elForm?.resetFields()
    //       ElMessage.success('新增成功')
    //     }
    //   }
    //   /*
    //   else if (actionType.value === 'edit') {
    //     res.value = await putIssueApi(formData)
    //     if (res.value) {
    //       // 删除当前标签页，并跳转到列表页
    //       // tagsViewStore.delView(unref(currentRoute))
    //       // push('/help/issue')
    //       setValues(res.value.data)
    //       ElMessage.success('更新成功')
    //     }
    //   }
    //   */
    // } finally {
    //   saveLoading.value = false
    // }
    saveLoading.value = false
  }
}

defineExpose({
  getquery
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <iframe
          :src="`/static/pdf/web/viewer.html?file=${Pdf}`"
          style="width: 100%; height: 850px"
        ></iframe>
      </el-main>
      <el-aside width="500px">
        <Form @register="formRegister" :schema="formSchema" labelPosition="left" />
        <ElButton type="primary" :loading="saveLoading.value" @click="getquery"
          ><el-icon><Promotion /></el-icon>
        </ElButton>
        <ContentWrap>
          <span>Q: {{ q }}</span>
          <p>
            <span>{{ reply }}</span>
          </p>
          <!--
            <Form @register="formRegister" :schema="formSchema2" labelPosition="left" />
          <ElButton type="primary" :loading="saveLoading.value" @click="submit">上傳問題</ElButton>
          -->
        </ContentWrap>
      </el-aside>
    </el-container>
  </div>
  <!--
    <canvas v-for="page in state.pdfPages" :key="page" :id="`pdfCanvas${page}`"></canvas>
  </div>
  
  <ElButton v-for="item in 5" :key="item" type="primary" @click="openTab(item)">
    打开详情页{{ item }}
  </ElButton>
  -->
</template>
