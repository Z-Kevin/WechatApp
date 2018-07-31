//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    firstIndexDec: '公积金贷款',
    secondIndexDec: '商业贷款',
    thirdIndexDec: '组合贷款',
    firstIndex: true,
    secondIndex: false,
    thirdIndex: false,
    cellItem: [{
      cellid: 0,
      changeTypeName: '计算方式：',
      firstContentDes: '按房价总额',
      secondContentDes: '按照贷款总额',
      leftSelected: true,
      rightSelected: false
    }, {
      cellid: 1,
      changeTypeName: '还款方式：',
      firstContentDes: '等额本息',
      secondContentDes: '等额本金',
      leftSelected: false,
      rightSelected: true
    }]


  },
  onLoad: function () {
  },
  partActive(event) {
    console.log(event);
    const that = this;
    if (event.currentTarget.dataset.indexname == 'leftPart0' && this.data.cellItem[0].leftSelected) {
      return;
    } else if (event.currentTarget.dataset.indexname == 'rightPart0' && this.data.cellItem[0].rightSelected) {
      return;
    } else if (event.currentTarget.dataset.indexname == 'leftPart1' && this.data.cellItem[1].leftSelected) {
      return;
    } else if (event.currentTarget.dataset.indexname == 'rightPart1' && this.data.cellItem[1].rightSelected) {
      return;
    }
    switch (event.currentTarget.dataset.indexname) {
      case 'leftPart0': {
        this.data.cellItem[0].leftSelected = true,
          this.data.cellItem[0].rightSelected = false
        this.setData({
          cellItem: that.data.cellItem
        })
      }
        break;
      case 'rightPart0': {
        this.data.cellItem[0].leftSelected = false,
          this.data.cellItem[0].rightSelected = true
        this.setData({
          cellItem: that.data.cellItem
        })
      }
        break;
      case 'leftPart1': {
        this.data.cellItem[1].leftSelected = true,
          this.data.cellItem[1].rightSelected = false
        this.setData({
          cellItem: that.data.cellItem
        })
      }
        break;
      case 'rightPart1': {
        this.data.cellItem[1].leftSelected = false,
          this.data.cellItem[1].rightSelected = true
        this.setData({
          cellItem: that.data.cellItem
        })
      }
        break;
      default:
        return;
    }
  },
  rSegmentControlActive(event) {
    console.log(event);
    if (event.currentTarget.dataset.indexname == 'firstIndex' && this.data.firstIndex) {
      return;
    } else if (event.currentTarget.dataset.indexname == 'secondIndex' && this.data.secondIndex) {
      return;
    } else if (event.currentTarget.dataset.indexname == 'thirdIndex' && this.data.thirdIndex) {
      return;
    }
    switch (event.currentTarget.dataset.indexname) {
      case 'firstIndex': {
        this.setData({
          firstIndex: true,
          secondIndex: false,
          thirdIndex: false
        })
      }
        break;
      case 'secondIndex': {
        this.setData({
          firstIndex: false,
          secondIndex: true,
          thirdIndex: false
        })
      }
        break;
      case 'thirdIndex': {
        this.setData({
          firstIndex: false,
          secondIndex: false,
          thirdIndex: true
        })
      }
        break;
    }

  }
})
