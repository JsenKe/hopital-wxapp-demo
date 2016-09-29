Page({
  data:{
    proid:0,            //当前选择的省份编号
    proname:'',         //当前选择的省份名称
    provicedatas:[],    //省份数据集合
    citydatas:[]        //城市数据集合
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    this.getprovicedata()
  },
  getprovicedata:function(){
    // 获取省份数据
    //http://www.guahao.com/json/white/area/provinces
    var that = this;
    // 请求接口地址
    var url = "http://www.guahao.com/json/white/area/provinces";    
    wx.request({
        url:url,         
        success: function(res) {
            that.setData({
                provicedatas:res.data,   // 获取到的json数据绑定到定义的变量中
                proid:res.data[0].value,  //默认第一个省份
                proname:res.data[0].text
            });
            that.getcitydata();
        }
    })
  },
  getcitydata:function(){
    // 获取城市数据
    //http://www.guahao.com/json/white/area/citys?provinceId=27
    var that = this;
    // 请求接口地址
    var url = "http://www.guahao.com/json/white/area/citys";    
    wx.request({
        url:url,         
        data:{provinceId:that.data.proid},
        success: function(res) {
            that.setData({
                citydatas:res.data   // 获取到的json数据绑定到定义的变量中
            })
        }
    })
  },
  onselprovice:function(e){
      // 选择省份      
      var proid = e.currentTarget.dataset.proid;      //获取当前节点data-proid的值
      var proname = e.currentTarget.dataset.proname;  //获取当前节点data-proname的值
      this.setData({
          proid : proid,
          proname : proname
      });
      this.getcitydata();  //执行加载城市数据
  },
  gohospital:function(e){
      // 跳转到医院页面
      var that = this;
      var cityid = e.currentTarget.dataset.cityid;   //获取当前节点data-cityid的值
      var cityname = '';
      if(cityid != "all"){
        cityname = e.currentTarget.dataset.cityname;
      }
      wx.navigateTo({
          url:'../hospital/hospital?proid='+that.data.proid+'&proname='+that.data.proname+'&cityid='+cityid+'&cityname='+cityname
      })
  }
})