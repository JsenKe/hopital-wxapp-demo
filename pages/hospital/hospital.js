Page({
  data:{
      provinceid:'2',      //省份编号，默认上海
      cityid:'all',        //城市编号，默认上海所有
      provincename:'上海',
      cityname:'',
      hosdatas:[]      //医院数据集
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log(options);
    if(options.proid != null && options.proname != null){
        that.setData({
            provinceid : options.proid,         // url中的省份编号
            provincename : options.proname      // url中的省份名称
        })
    }
    if(options.cityid != null && options.cityname != null){
        that.setData({
            cityid : options.cityid,         // url中的城市编号
            cityname : options.cityname      // url中的城市名称
        })
    }
  },
  onReady:function(){
    // 页面渲染完成
    // 请求接口获取数据
    this.gethosdata()
  },
  gethosdata:function(){
    // 获取医院数据
    var that = this;
    // 请求接口地址
    var url = "http://www.guahao.com/json/white/fastorder/hospitals";        
    wx.request({
        url:url,         
        data:{provinceId:that.data.provinceid,cityId:that.data.cityid},
        success: function(res) {
            that.setData({
                hosdatas:res.data   // 获取到的json数据绑定到定义的变量中
            })
        }
    })
  },
  goarea:function(){
      // 选择城市
      wx.navigateTo({
          url:'../area/area'
      })
  },
  godepartment:function(e){
      // 选中医院到科室列表
      var ihosid = e.currentTarget.dataset.hosid;      //获取当前节点data-hosid的值
      wx.navigateTo({
          url:'../department/department?hosid='+ihosid
      })
  }
})