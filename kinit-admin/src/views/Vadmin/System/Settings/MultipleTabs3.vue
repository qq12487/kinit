<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
const Pdf = '09.pdf'

/*
import * as PDF from 'pdfjs-dist'
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')
PDF.GlobalWorkerOptions.workerSrc = pdfjsWorker
import { onMounted, reactive, nextTick } from 'vue'

const state = reactive<any>({
  pdfPath: Pdf,
  pdfPages: '',
  pdfWidth: '',
  pdfSrc: '',
  pdfScale: 1.0
})
let pdfDoc: any = null
onMounted(() => {
  loadFile(state.pdfPath)
})
function loadFile(url: string) {
  PDF.getDocument(url).promise.then((p: any) => {
    pdfDoc = p
    const { numPages } = p
    state.pdfPages = numPages
    nextTick(() => {
      renderPage(1) // 从第一页开始渲染
    })
  })
}
function renderPage(num: number) {
  pdfDoc.getPage(num).then((page: any) => {
    const canvas: any = document.getElementById(`pdfCanvas${num}`)
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    //const bsr = ctx.webkitBackingStorePixelRatio ||
    //            ctx.mozBackingStorePixelRatio ||
    //            ctx.msBackingStorePixelRatio ||
    //            ctx.oBackingStorePixelRatio ||
    //            ctx.backingStorePixelRatio ||
    //            1
    //const ratio = dpr / bsr
    const ratio = 1.5
    const viewport = page.getViewport({ scale: state.pdfScale })
    canvas.width = viewport.width * ratio
    canvas.height = viewport.height * ratio
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    state.pdfWidth = `${viewport.width}px`
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    // 将 PDF 页面渲染到 canvas 上下文中
    const renderContext = {
      canvasContext: ctx,
      viewport
    }
    page.render(renderContext)
    if (state.pdfPages > num) {
      renderPage(num + 1)
    }
  })
}
*/
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
      <el-aside width="400px">Aside</el-aside>
    </el-container>
  </div>
  <!--
  <div id="pdf-container">
    <canvas v-for="page in state.pdfPages" :key="page" :id="`pdfCanvas${page}`"></canvas>
  </div>
  
  <ElButton v-for="item in 5" :key="item" type="primary" @click="openTab(item)">
    打开详情页{{ item }}
  </ElButton>
  -->
</template>
