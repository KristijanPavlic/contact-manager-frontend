<template>
  <div class="h-64">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)

onMounted(() => {
  const ctx = chartRef.value.getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Active', 'Inactive', 'Pending'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
})
</script>
