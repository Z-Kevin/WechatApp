Page({
  data: {
    sectionHeaderLocationTop: 0,
    fixed: false
  },
  /**
  * 页面加载完成
  */
  onReady: function () {
    let that = this
    let query = wx.createSelectorQuery()
    query.select(".titleWrap").boundingClientRect(function (res) {
      // console.log(res)
      that.setData({
        //section header 距离 ‘当前顶部’ 距离
        sectionHeaderLocationTop: res.top
      })
    }).exec()
  },
  onLoad() {

  },
  /**
* 页面滚动监听
*/
  onPageScroll: function (e) {
    //console.log(e)
    this.setData({
      scrollTop: e.scrollTop
    })
    if (e.scrollTop > this.data.sectionHeaderLocationTop) {
      this.setData({
        fixed: true
      })
    } else {
      this.setData({
        fixed: false
      })
    }
  },

})