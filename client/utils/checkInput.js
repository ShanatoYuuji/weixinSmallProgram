function checkEmoji(str) {
  //验证表情
  var reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  var res = str.match(reg);
  if (res != null) {
    // wx.showModal({
    //   title: '提示',
    //   content: '对不起，您的备注包含暂不支持符号，如表情等',
    //   showCancel: false,
    // })
    return false;
  } else {
    return true;
  }
}
module.exports = {
  checkEmoji: checkEmoji
}