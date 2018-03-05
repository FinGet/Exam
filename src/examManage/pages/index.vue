<template>
    <div class="index">
      <el-row>
        <el-col class="marginB10 paddingL10 paddingR10">
          <img v-lazy="banner" width="100%" height="200px" alt="">
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <div class="box news-box">
              <h3 class="news text-center">新闻公告</h3>
              <div>
                <ul class="ul">
                  <li v-for="item in news" :key="item.id">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top-start">
                      <span class="title">{{item.title}}</span>
                    </el-tooltip>
                    <span class="data marginL10">{{item.data}}</span>
                    <span class="time">{{item.time}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="box exam-box">
              <h3 class="exam text-center">进行中的考试</h3>
              <div>
                <ul class="ul">
                  <li v-for="item in exams" class="clearfix" :key="item.id">
                    <el-tooltip class="item" effect="dark" :content="item.examname" placement="top-start">
                      <div class="pull-left examname">{{item.examname}}</div>
                    </el-tooltip>
                    <div class="pull-left">
                      <span>考试分值:{{item.total}}</span>
                      <br>
                      <span>考试日期:{{item.datarang}}</span>
                    </div>
                    <div class="pull-left">
                      <span><span class="examnum">{{item.examnum}}人</span> 正在考试</span>
                      <br>
                      <span>考试时长: <span class="examduration">{{item.examduration}}分钟</span> </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <br>
      <el-row class="copy">
        <el-col>
          <div>
            &copy;This Exam System belongs to Bios!
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        banner:require('../../common/img/banner.jpg'),
        news:[
          {
            title: '关于2017最新考试通知关于2017最新考试通知关于2017最新考试通知关于2017最新考试通知',
            data: '2017/09/01',
            time: '16:30'
          },
          {
            title: '关于2017最新考试通知',
            data: '2017/09/01',
            time: '16:30'
          },
          {
            title: '关于2017最新考试通知',
            data: '2017/09/01',
            time: '16:30'
          },
          {
            title: '关于2017最新考试通知',
            data: '2017/09/01',
            time: '16:30'
          }
        ],
        exams: [
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          },
          {
            examname:'计算机基础',
            total:'100',
            datarang:'2017/09/01-2017/09/02',
            examnum:'20',
            examduration:'50'
          }
        ]
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .public{
    padding: 10px 0;
    border-radius:2px ;
    box-shadow: 3px 3px 3px rgba(13, 13, 13, 0.2);
  }
  .span {
    display: inline-block;
    float: right;
    color: #7a7a7a;
  }
  .index {
    height:100%;
    overflow-y:scroll ;
    .box{
      padding:0 10px;
    }
    .news{
      @extend .public;
      background: #f7aa2a;
      color: #fff;
    }
    .news-box{
      ul {
        li {
          .title {
            max-width: 60%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .data {
            @extend .span;
          }
          .time {
            @extend .span
          }
        }
      }
    }
    .ul {
      @extend .public;
      border: 1px solid #cccccc;
      border-top:none;
      min-height:500px;
      max-height:650px;
      overflow-y: scroll;
      padding:10px 10px;
      li {
        padding:10px 0;
        border-bottom:1px dashed #e4b0b0;
        cursor: pointer;
      }
    }
    .ul::-webkit-scrollbar {
      display:none
    }
    .exam{
      @extend .public;
      background: #5bbf83;
      color: #fff;
    }
    .exam-box{
      .ul {
        li {
          .examname{
            color: #ff0a1e;
            width:100px ;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
          }
          div{
            height:33px;
            margin-left: 20px;
            .examnum{
              color: #00B7FF;
            }
            .examduration{
              color: #e72620;
            }
          }
          div:first-child{
            margin-left: 0;
            line-height: 33px;
            max-width: 100%;
            overflow: hidden;
          }
        }
      }
    }
    .copy{
      position: absolute;
      bottom:0;
      left:0;
      padding:3px 0;
      text-align: center;
      background: #324157;
      color: #fff;
      width: 100%;
    }
  }
  .index::-webkit-scrollbar {
    display:none
  }
</style>
