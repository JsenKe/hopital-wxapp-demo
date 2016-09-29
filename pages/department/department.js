Page({
  data:{
    hosid:'',
    deptdatas:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var ihosid = options.hosid;
    this.setData({
        hosid : ihosid
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.getdeptdata();
  },
  getdeptdata:function(){
    // 获取科室数据
    var that = this;
    // 请求接口地址
    var url = "http://www.guahao.com/json/white/fastorder/depts";
    wx.request({
        url:url,         
        data:{hospitalId:that.data.hosid},
        success: function(res) {
            that.setData({
                deptdatas:res.data.hospDepts   // 获取到的json数据绑定到定义的变量中
            })
        }
    })
  }
})