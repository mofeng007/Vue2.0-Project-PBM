<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-7-19</span></p>
          <p>上次登录地点：<span>四川</span></p>
        </div>
      </el-card>
      <!-- 数据 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" stripe style="width: 100%">
          <!-- <el-table-column prop="name" label="课程"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
            :key="key"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card class="line" style="height: 280px">
        <div ref="echarts1"></div>
      </el-card>
      <!-- 柱状图 -->
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
        
<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      // 表格数据
      tableData: [],
      // 表格头部标题
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      // 左侧数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    // 获取home数据
    getData().then(
      (result) => {
        const { tableData } = result.data.data;
        this.tableData = tableData;
      },
      (err) => {
        console.log(err);
      }
    );
    // 初始化图表
    setTimeout(() => {
      this.initChart1();
      this.initChart2();
      this.initChart3();
    }, 20);
  },
  methods: {
    // 折线图表初始化
    initChart1() {
      getData().then(
        (result) => {
          // 获取图表数据
          const echarts1 = echarts.init(this.$refs.echarts1);
          var echarts1Option = {};
          // 处理数据
          const { orderData } = result.data.data;
          const xAxis = Object.keys(orderData.data[0]);
          const xAxisData = {
            data: xAxis,
          };
          echarts1Option.xAxis = xAxisData;
          echarts1Option.yAxis = {};
          echarts1Option.legend = xAxisData;
          echarts1Option.grid = {
            /** 配置图标离容器上下左右的距离 */
            // top: "15px",
            right: "15px",
            left: "70px",
            // bottom: "15px",
          };
          echarts1Option.series = [];

          xAxis.forEach((key) => {
            echarts1Option.series.push({
              name: key,
              data: orderData.data.map((item) => item[key]),
              type: "line",
            });
          });
          echarts1.setOption(echarts1Option);
          // 自适应
          window.addEventListener("resize", () => {
            echarts1.resize();
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 用户柱状图初始化
    initChart2() {
      getData().then(
        (result) => {
          const echarts2 = echarts.init(this.$refs.echarts2);
          const { userData } = result.data.data;
          const echarts2Option = {
            legend: {
              // 图例文字颜色
              textStyle: {
                color: "#333",
              },
            },
            grid: {
              left: "20%",
            },
            // 提示框
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category", // 类目轴
              data: userData.map((item) => item.date),
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
              axisLabel: {
                interval: 0,
                color: "#333",
              },
            },
            yAxis: [
              {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "#17b3a3",
                  },
                },
              },
            ],
            color: ["#2ec7c9", "#b6a2de"],
            series: [
              {
                name: "新增用户",
                data: userData.map((item) => item.new),
                type: "bar",
              },
              {
                name: "活跃用户",
                data: userData.map((item) => item.active),
                type: "bar",
              },
            ],
          };
          echarts2.setOption(echarts2Option);
          // 自适应
          window.addEventListener("resize", () => {
            echarts2.resize();
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 饼状图
    initChart3() {
      getData().then(
        (result) => {
          const echarts3 = echarts.init(this.$refs.echarts3);
          const { videoData } = result.data.data;
          const echarts3Option = {
            tooltip: {
              trigger: "item",
            },
            color: [
              "#0f78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf",
            ],
            series: [{ data: videoData, type: "pie" }],
          };
          echarts3.setOption(echarts3Option);
          // 自适应
          window.addEventListener("resize", () => {
            echarts3.resize();
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
p {
  margin: 0;
  padding: 0;
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    // width: 101px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
.line {
  div {
    height: 280px;
  }
}
</style>