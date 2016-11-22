<style scoped>
  div {
    max-height: 400px;
    background: #fff;
    overflow: auto;
  }
  p {
    margin: 0 auto;
  }
</style>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>车次</th>
          <th>出发站/时间</th>
          <th>终到站/时间</th>
          <th>历时/天</th>
          <th>商务座</th>
          <th>特等座</th>
          <th>一等座</th>
          <th>二等座</th>
          <th>高级软卧</th>
          <th>软卧</th>
          <th>硬卧</th>
          <th>软座</th>
          <th>硬座</th>
          <th>无座</th>
          <th>其他</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in trainList">
          <td>{{ l.queryLeftNewDTO.station_train_code }}</td>
          <td>{{ l.queryLeftNewDTO.from_station_name }} / {{ l.queryLeftNewDTO.start_time }}</td>
          <td>{{ l.queryLeftNewDTO.end_station_name }} / {{ l.queryLeftNewDTO.arrive_time }}</td>
          <td>{{ l.queryLeftNewDTO.lishi }} / {{l.queryLeftNewDTO.day_difference }}</td>
          <td>{{ l.queryLeftNewDTO.swz_num }}</td>
          <td>{{ l.queryLeftNewDTO.tz_num }}</td>
          <td>{{ l.queryLeftNewDTO.zy_num }}</td>
          <td>{{ l.queryLeftNewDTO.ze_num }}</td>
          <td>{{ l.queryLeftNewDTO.gg_num }}</td>
          <td>{{ l.queryLeftNewDTO.rw_num }}</td>
          <td>{{ l.queryLeftNewDTO.yw_num }}</td>
          <td>{{ l.queryLeftNewDTO.rz_num }}</td>
          <td>{{ l.queryLeftNewDTO.yz_num }}</td>
          <td>{{ l.queryLeftNewDTO.wz_num }}</td>
          <td>{{ l.queryLeftNewDTO.qt_num }}</td>
          <td v-if="l.queryLeftNewDTO.canWebBuy == 'Y'"><button type="button" class="btn btn-primary">{{ l.buttonTextInfo }}</button></td>
          <td v-if="l.queryLeftNewDTO.canWebBuy != 'Y'"><button disabled="disabled" type="button" class="btn btn-default">{{ l.buttonTextInfo }}</button></td>
        </tr>
        <!--<tr v-show="trainList.length == 0">
          <td colspan="16">暂无数据</td>        
        </tr>-->
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['trainList'],
  };
</script>
