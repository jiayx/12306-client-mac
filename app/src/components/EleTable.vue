<style>
  .train-list {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: auto;
    margin-top: 8px;
  }
  .cell {
    padding: 0 !important;
    text-align: center;
  }
</style>

<template>
  <el-table
    :data="trainList"
    border
    highlight-current-row
    class="train-list">
    <el-table-column
      prop="queryLeftNewDTO.station_train_code"
      label="车次"
      width="0">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.from_station_name"
      label="出发站"
      width="0">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.end_station_name"
      label="终到站"
      width="0">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.start_time"
      label="出发时间"
      sortable
      width="0">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.arrive_time"
      label="到达时间"
      sortable
      width="0">    
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.lishi"
      label="历时"
      sortable
      width="0">    
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.swz_num"
      label="商务座"
      width="0">
    </el-table-column>    
    <el-table-column
      prop="queryLeftNewDTO.tz_num"
      label="特等座"
      width="60">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.zy_num"
      label="一等座"
      width="60">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.ze_num"
      label="二等座"
      width="60">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.gg_num"
      label="高级软卧"
      width="70">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.rw_num"
      label="软卧"
      width="50">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.yw_num"
      label="硬卧"
      width="50">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.rz_num"
      label="软座"
      width="50">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.yz_num"
      label="硬座"
      width="50">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.wz_num"
      label="无座"
      width="50">
    </el-table-column>
    <el-table-column
      prop="queryLeftNewDTO.qt_num"
      label="其他"
      width="50">
    </el-table-column>
    <el-table-column
      label="备注"
      min-width="100"
      inline-template>
    <div>
      <el-button type="primary" v-if="row.buttonTextInfo.trim() == '预订'">预定</el-button>
      <span v-else>{{ row.buttonTextInfo.trim() }}</span>
    </div>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['trainList'],
    methods: {
      formatter(row, column) {
        // console.log(column);
        if (row.buttonTextInfo.trim() == '预订') {
          return '预订';
        }
        return row.buttonTextInfo;
      },
      buy() {
        console.log('双击了');
      },
    },
  };
</script>
