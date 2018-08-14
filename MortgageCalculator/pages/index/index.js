//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    firstIndexDec: '公积金贷款',
    secondIndexDec: '商业贷款',
    thirdIndexDec: '组合贷款',
    // 当前选择的哪种贷款类型 0 代表公积金贷款 1 代表商业贷款 2 代表组合贷款
    currentSegIndex: 1,
    currentCaculateType:0,
    currentRepaymentType:0,
    segmentControls:[
      {tabInex:0, tabTitle:'公积金贷款'},
      {tabInex:1, tabTitle:'商业贷款'},
      {tabInex:2, tabTitle:'组合贷款'}
    ],
    // 计算方式切换时候更新的UI样式
    allTypeDataItem: {
      // 公积金贷款两种计算方式
      'providentFund': [
        { calculateType:0, typeNameDes: '房价总额:' ,daiKuanBili: true, lilvNameDes:'公积金利率:' },
        { calculateType:1, typeNameDes: '贷款金额:' ,daiKuanBili: false, lilvNameDes:'公积金利率:' },
      ],
      'commercialLoans': [
        { calculateType:0, typeNameDes: '房价总额:' ,daiKuanBili: true, lilvNameDes:'商贷利率:' },
        { calculateType:1, typeNameDes: '贷款金额:' ,daiKuanBili: false, lilvNameDes:'商贷利率:' },
      ],
      'combinedLoan': [
        { calculateType:0, typeNameDes: '房价总额:' ,daiKuanBili: true, loadMoney:'贷款金额:',providentLoad:'公积金贷款金额:', providentlilvDes:'公积金利率:',combinedLoanMoeny:'商业贷款金额:',combinedLoanLilvDes:'商贷利率:' },
        { calculateType:1, typeNameDes: '房价总额:' ,daiKuanBili: false, loadMoney:'贷款金额:',providentLoad:'公积金贷款金额:', providentlilvDes:'公积金利率:',combinedLoanMoeny:'商业贷款金额:',combinedLoanLilvDes:'商贷利率:' },
      ]
    },
    //商贷情况显示数据
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
      leftSelected: true,
      rightSelected: false
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
    },
    // 组合贷款里的pickerView
    // 公积金按揭年数
    combinedLoanPickView:{
      'providentFundPickerData': {
        changeContentTypeNameDes: '按揭年数:',
        array: ['30年(360期)','29年(348期)','28年(336期)','27年(324期)','26年(312期)','25年(300期)','24年(228期)','23年(276期)','22年(264期)','21年(252期)','20年(240期)','19年(228期)','18年(216期)','17年(204期)','16年(192期)','15年(180期)','14年(168期)','13年(156期)','12年(144期)','11年(132期)','10年(120期)','9年(108期)','8年(96期)','7年(84期)','6年(72期)','5年(60期)','4年(48期)','3年(36期)','2年(24期)','1年(12期)'],
        index: 0,
        pickerName: 'combinedLoanProvidentFenqiPicker'
      },
      'commercialLoansPickerData': {
        changeContentTypeNameDes: '按揭年数:',
        array: ['30年(360期)','29年(348期)','28年(336期)','27年(324期)','26年(312期)','25年(300期)','24年(228期)','23年(276期)','22年(264期)','21年(252期)','20年(240期)','19年(228期)','18年(216期)','17年(204期)','16年(192期)','15年(180期)','14年(168期)','13年(156期)','12年(144期)','11年(132期)','10年(120期)','9年(108期)','8年(96期)','7年(84期)','6年(72期)','5年(60期)','4年(48期)','3年(36期)','2年(24期)','1年(12期)'],
        index: 0,
        pickerName: 'combinedLoanCommercialLoansFenqiPicker'
      },
    },
    houseLoanCalcModel: {
      businessTotalPrice:100,// 商业贷款额
      fundTotalPrice: 100,//公积金贷款额
      mortgageYear: 30,//按揭年数
      bankRate: 0.049, //银行利率
      fundRate: 0.059, //公积金利率
      unitPrice: 6100,//房屋单价
      area: 206, //面积,
    },
    houseLoanResultModel: {
      houseTotalPrice: 100,//房屋总价
      loanTotalPrice: 100,//贷款总价
      repayTotalPrice: 100,//还款总额
      interestPayment:20,//支付利息
      mortgageYear: 30,//按揭年数
      mortgageMonth: 360,//按揭月数
      avgMonthRepayment: 6400,//月均还款数
      firstMonthRepayment: 6500,//首月还款
      monthRepaymentArr: []//每月还款个数
    }
    
  },
  onLoad: function () {
  },
  // 计算方式和还款方式选择切换
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
        this.data.cellItem[0].rightSelected = false,
        this.setData({
          cellItem: that.data.cellItem,
          currentCaculateType: 0
        })
      }
        break;
      case 'rightPart0': {
        console.log("按照贷款总额方式计算");
        this.data.cellItem[0].leftSelected = false,
        this.data.cellItem[0].rightSelected = true
        this.setData({
          cellItem: that.data.cellItem,
          currentCaculateType: 1
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
    if (event.currentTarget.dataset.indexname ==  this.data.currentSegIndex) {
      return;
    } 
    switch (event.currentTarget.dataset.indexname) {
      case  0: {
        this.setData({
          currentSegIndex: 0
        })
      }
        break;
      case 1: {
        this.setData({
          currentSegIndex: 1
        })
      }
        break;
      case 2: {
        this.setData({
          currentSegIndex: 2
        })
      }
        break;
    }
  },
  // 选择器
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
        'fenqiItem.index' : e.detail.value,
        'houseLoanCalcModel.mortgageYear': 30-e.detail.value
      });
    }
    
  },
  // 利率输入框
  lilvInputCellBindKeyInput(e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    value = value.replace('%','')
    this.data.houseLoanCalcModel.bankRate = value;
    console.log(this.data.houseLoanCalcModel.bankRate);
    if(value.length > 0){
      value = value+'%'
    }
    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value,
      cursor: pos
    }
    this.setData({
      inputValue: e.detail.value+"%"
      
    })
  },
  // 贷款额度输入框
  inputCellBindKeyInput(e) {
    var value = e.detail.value
    this.data.houseLoanCalcModel.businessTotalPrice = value;

  },
  // 开始计算
  cacluateActive () {
    switch (currentSegIndex){
      case 0:{
        break;
      }
      case 1: {

        break;
      }
      case 2:{

        break;
      }
    }

  wx.navigateTo({
    url: '../Repayment/repaymentPage'
  })
  }
})
