//index.js
//获取应用实例

Page({
  data: {
    prize: [{
      name: '当前未获得奖品'
    }],
    prize_list: [{
      id:1,
      name:'未中奖',
      src:"../img/prize_1.png",
    },{
      id:2,
      name:'抽奖券*1',
      src:"../img/prize_2.png",
    },{
      id:3,
      name:'五元红包*1',
      src:"../img/prize_3.png",
    }],
    ticket_sum: 99,
    nickname: '酒酒子',
    lottery_btn: true,
    show_prize: false,
    is_prize: false,
    is_ani_radio: false,
    radio: '',
    ani_tiger_1: {},
    ani_tiger_2: {},
    ani_tiger_3: {},
    tab1:{
      id:1,
      src:"../img/prize_1.png",
    },
    tab2:{
      id:1,
      src:"../img/prize_2.png",
    },
    tab3:{
      id:3,
      src:"../img/prize_3.png",
    },
    tiger_res:[],
 },

  onLoad: function () {
    let that = this
    that.radio('')
    if(this.data.ticket_sum <= 0){
      this.setData({
        lottery_btn: false,
      })
    }
  },

  getAnmiation: function() {
    let randomNum = Math.random() * 10;
    randomNum = parseInt(randomNum, 10);
    this.setData({
      resNum: [],
      lottery_btn: false,
    })
 
    this.getOpenAnimation(1, randomNum);
    this.getOpenAnimation(2, randomNum);
    this.getOpenAnimation(3, randomNum);
 
    var that = this;
    var resTime = setInterval(function() {
      if (that.data.resNum.length === 3) {
        setTimeout(function() {
          var tab1 = that.data.tab1.id;
          var tab2 = that.data.tab2.id;
          var tab3 = that.data.tab3.id;
          console.log("状态：", tab1, tab2, tab3);
          var message;
          let _prize = that.data.prize
          let prize_name = null
          if (tab1 == 2 && tab2 == 2 && tab3 == 2) {
            prize_name = that.data.prize_list[1].name
          } else if (tab1 == 3 && tab2 == 3 && tab3 == 3) {
            prize_name = that.data.prize_list[2].name
            that.setData({
              ticket_sum: that.data.ticket_sum - 1,
            })
          }else{
            that.setData({
              ticket_sum: that.data.ticket_sum - 1,
            })
          }
          if(prize_name != null){
            message = "恭喜 "+that.data.nickname+" 获得 "+prize_name+" ！";
            _prize.push({name:prize_name})
            that.radio(message)
            if(!that.data.is_prize){
              _prize[0] = _prize[1]
              _prize.pop()
              that.setData({
                is_prize: true,
              })
            }
          }
          that.setData({
            lottery_btn: true,
          })
          if(that.data.ticket_sum <= 0){
            that.setData({
              lottery_btn: false,
            })
          }
          setTimeout(function(){
              that.setData({
                prize: _prize,
              })
          },8000)
        }, 1000);
        clearInterval(resTime);
      }
    }, 500);
  },

  
  getOpenAnimation: function(line, resNum) {
    var that = this;
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
 
    // 摇奖区滚动的总共时长
    let randomTotalTime = 2000
    if(line == 2){
      randomTotalTime = 2500
    }else if(line == 3){
      randomTotalTime = 3000
    }
 
    // 每次循环间隔的时间
    let tempRandom = Math.random() * 50 + 100;
    tempRandom = parseInt(tempRandom, 10);
 
    let num = 0; // 设定计数标签，从0开始
    let count = 1; // 循环计数
    let loop = setInterval(function() {
      num++;
      count++;
      if (num > 2) {
        num = 0;
      }
      if (count * tempRandom >= randomTotalTime) {
        animation.translateY(0).step({
          duration: 0
        });
        handleSet(that);
 
        if (resNum >= 0 && resNum < 3) {
          num = 0;
        } else if (resNum >= 3 && resNum < 6) {
          num = 1;
        } else if (resNum >= 6 && resNum < 9) {
          num = 2;
        }
 
        handleSet(that);
        count = 0;
        let tempArr = that.data.resNum;
        tempArr.push(num);
        that.setData({
          resNum: tempArr
        })
        clearInterval(loop);
      } else {
        animation.translateY(0).step().translateY(0).step({
          duration: 0
        });
        handleSet(that);
      }
 
      function handleSet(that) {
        if (line === 1) {
          that.setData({
            tab1: that.data.prize_list[num], // 修改显示的图片
            ani_tiger_1: animation.export()
          })
        } else if (line === 2) {
          that.setData({
            tab2: that.data.prize_list[num],
            ani_tiger_2: animation.export()
          })
        } else if (line === 3) {
          that.setData({
            tab3: that.data.prize_list[num],
            ani_tiger_3: animation.export()
          })
        }
      }
    }, tempRandom);
  },

  radio: function(message){
    var that = this
    that.setData({
      radio: message
    })
    let animation = wx.createAnimation({
      duration: 8000,
      timingFunction: 'linear',
    })
    animation.opacity(1).translateX(-250).step()
    that.setData({
      ani_radio:  animation.export(),
    })
    setTimeout(function(){
      let animation2 = wx.createAnimation({
        duration: 1,
        timingFunction: 'linear',
      })
      animation2.opacity(1).translateX(250).step()
      that.setData({
        ani_radio:  animation2.export(),
      })
    },8000)
  },

  cancel: function(){
    this.setData({
      show_prize: false
    })
  },

  show_prize: function(){
    this.setData({
      show_prize: true
    })
  }
})
