//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    firstIndexDec: '公积金贷款',
    secondIndexDec: '商业贷款',
    thirdIndexDec: '组合贷款',
    typeNameDes: '房价总额:',
    daiKuanNameDes: "贷款金额",
    lilvNameDes: '商贷利率',
    firstIndex: true,
    secondIndex: false,
    thirdIndex: false,
    daiKuanBili: true,
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
    }],
    changeContentItem: {
      changeContentTypeNameDes: '贷款比例:',
      array: ['2成','2.5成','3成','3.5成','4成','4.5成','5成','5.5成','6成','6.5成','7成','7.5成','8成'],
      index: 0,
      pickerName: 'daikuanBiliPicker'
    },
    fenqiItem: {
      changeContentTypeNameDes: '按揭年数:',
      array: ['30年(360期)','29年(348期)','28年(336期)','27年(324期)','26年(312期)','25年(300期)','24年(228期)','23年(276期)','22年(264期)','21年(252期)','20年(240期)','19年(228期)','18年(216期)','17年(204期)','16年(192期)','15年(180期)','14年(168期)','13年(156期)','12年(144期)','11年(132期)','10年(120期)','9年(108期)','8年(96期)','7年(84期)','6年(72期)','5年(60期)','4年(48期)','3年(36期)','2年(24期)','1年(12期)'],
      index: 0,
      pickerName: 'fenqiPicker'
    }
    
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
          cellItem: that.data.cellItem,
          daiKuanBili: true,
          typeNameDes: '房价总额'
        })
      }
        break;
      case 'rightPart0': {
        console.log("按照贷款总额方式计算");
        this.data.cellItem[0].leftSelected = false,
        this.data.cellItem[0].rightSelected = true
        this.setData({
          cellItem: that.data.cellItem,
          daiKuanBili: false,
          typeNameDes: '贷款总额'
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
  },
  bindPickerChange(e) {
    console.log(e);
    console.log(e.detail);
    if (e.currentTarget.dataset.pickername =='daikuanBiliPicker'){
      console.log(e.detail);
      this.setData({
        'changeContentItem.index' : e.detail.value
      });
    } else if (e.currentTarget.dataset.pickername =='fenqiPicker'){
      console.log(e.detail);
      this.setData({
        'fenqiItem.index' : e.detail.value
      });
    }
    
  },
  bindKeyInput(e) {
    console.log(e.detail.value);
    var value = e.detail.value
    var pos = e.detail.cursor
    value = value.replace('%','')
    if(value.length > 0){
      value = value+'%'
    }
    // if(pos != -1){
    //   //光标在中间
    //   var left = e.detail.value.slice(0,pos)
    //   //计算光标的位置
    //   pos = left.replace(/11/g,'2').length
    // }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value,
      cursor: pos
    }
    this.setData({
      inputValue: e.detail.value+"%"
      
    })
  }
})
