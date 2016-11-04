require('SPNetStatus, WXApi, QQWalletSDK, SPBaseRequestModel, SPSubmitOrderOprator, SPURLTools, UIApplication, SPNewUserStatisticsModel, SPRecUserStatistics, NSMutableDictionary, NSMutableArray, SPBasePostRequestModel, SPVerifyCodeOprator, EPOprator, XNSDKCore, SPUserManager, SPPrefs, SPSCProductModel,SPSCAttributeModel, MASConstraintMaker, UILabel, UIColor, UIFont, UIView, NSScanner, NSString, SPUserSecurityItemModel, SPLoginPasswordController, SPBindEmailController, SPBindUserListController, SPViewController, SPTableViewController, SPActivityGoodsListViewController, SPBrandGoodsListViewController, SDImageCache, SDWebImageDownloader, UIScreen, CGSize, CGRect,QQWalletSDK,UIDevice,NSNotificationCenter,SPInteractionRequestModel')
defineClass('SPPayFailedViewController' ,{
submitOrder: function() {
    if (self.payConModel().contentModel().isUseGiftcardPay().isEqualToString("1")) {
    if (!self.giftCardPassWord() || self.giftCardPassWord().length() == 0) {
        self.dismissTip();self.showTipStatic_blackBg_duration("亲，忘了写密码哦～", true, 2.0);return;}
    var isNetConnect = SPNetStatus.isNetConnect();if (!isNetConnect) {
    self.dismissTip();self.showTipStatic_blackBg_duration("哎呦！您的网络不太给力！", true, 2.0);return;}
    if (self.payConModel().contentModel().paymentModel().lastPayModel().subId().isEqualToString("57") || self.payConModel().contentModel().paymentModel().lastPayModel().subId().isEqualToString("110")) {
        if (!WXApi.isWXAppInstalled()) {
            self.showTipStatic_blackBg_duration("您没有安装微信，请选择其他方式支付", true, 2.0);return;}}
    if (self.payConModel().contentModel().paymentModel().lastPayModel().subId().isEqualToString("134")) {
        if (!QQWalletSDK.isSupportQQWallet()) {
self.showTipStatic_blackBg_duration("您的手机上未安装手机QQ或QQ版本过低，请选择其他方式支付", true, 2.0);return;}}
        self.showTipProgress_blackBg("", false);
        UIApplication.sharedApplication().delegate().connectionCore().cancleWithConnectionKey(self.payGiftcardRequestkey());
        var requestModel = SPBaseRequestModel.alloc().init();
        self.setPayGiftcardRequestkey(requestModel.userInfoKeyString());requestModel.setDelegate(self);
        requestModel.setOpratorClass(SPSubmitOrderOprator.class());
        requestModel.setHostString("http://api.m.shangpin.com/apiv2");
        requestModel.setRequestHeaders(SPURLTools.commonHeader());
    var arr = NSMutableArray.array();arr.addObject("payGiftCardV3");requestModel.setPathArguments(arr);
    var dic = NSMutableDictionary.dictionary();dic.setObject_forKey(self.giftCardPassWord(), "password");
        dic.setObject_forKey(self.payConModel().contentModel().mainOrderNo(), "mainOrderId");
        dic.setObject_forKey(self.payConModel().contentModel().orderType(), "orderType");
dic.setObject_forKey(self.payConModel().contentModel().paymentModel().lastPayModel().subId(), "subId");
        requestModel.setQueryArguments(dic);
        UIApplication.sharedApplication().delegate().connectionCore().requestWithModel(requestModel);
    }else if (self.payConModel().contentModel().isUseGiftcardPay().isEqualToString("0")) {
        var isNetConnect = SPNetStatus.isNetConnect();if (!isNetConnect) {self.dismissTip();
            self.showTipStatic_blackBg_duration("哎呦！您的网络不太给力！", true, 2.0);return;}
    if (self.payConModel().contentModel().paymentModel().lastPayModel().subId().isEqualToString("57") || self.payConModel().contentModel().paymentModel().lastPayModel().subId().isEqualToString("110")) {
        if (!WXApi.isWXAppInstalled()) {
            self.showTipStatic_blackBg_duration("您没有安装微信，请选择其他方式支付", true, 2.0);return;}}
    if (self.payConModel().contentModel().paymentModel().lastPayModel().subId().isEqualToString("134")) {
        if (!QQWalletSDK.isSupportQQWallet()) {
self.showTipStatic_blackBg_duration("您的手机上未安装手机QQ或QQ版本过低，请选择其他方式支付", true, 2.0);return;}}
        self.showTipProgress_blackBg("", false);
        UIApplication.sharedApplication().delegate().connectionCore().cancleWithConnectionKey(self.payOrderRequestkey());
        var requestModel = SPBaseRequestModel.alloc().init();
        self.setPayOrderRequestkey(requestModel.userInfoKeyString());requestModel.setDelegate(self);
        requestModel.setOpratorClass(SPSubmitOrderOprator.class());
        requestModel.setHostString("http://api.m.shangpin.com/apiv2");
        requestModel.setRequestHeaders(SPURLTools.commonHeader());
        var arr = NSMutableArray.array();arr.addObject("payOrderV3");requestModel.setPathArguments(arr);
        var dic = NSMutableDictionary.dictionary();
        dic.setObject_forKey(self.payConModel().contentModel().mainOrderNo(), "mainOrderId");
dic.setObject_forKey(self.payConModel().contentModel().paymentModel().lastPayModel().subId(), "subId");
        dic.setObject_forKey(self.payConModel().contentModel().orderType(), "orderType");
        requestModel.setQueryArguments(dic);
        UIApplication.sharedApplication().delegate().connectionCore().requestWithModel(requestModel);
        var model = SPNewUserStatisticsModel.alloc().init();model.setBhv("order");
        SPRecUserStatistics.sharedInstance().clickWithUSModel(model);}},});
defineClass('SPBindingPhoneController' ,{
requestVerifyCodeData: function() {var isNetConnect = SPNetStatus.isNetConnect();if (!isNetConnect) {
        self.showTipStatic_blackBg_duration("哎呦！您的网络不太给力！", true, 2.0);return;}
    self.dismissTip();self.showTipProgress_blackBg("正在请求验证码...", true);
    self.view().setUserInteractionEnabled(false);
    UIApplication.sharedApplication().delegate().connectionCore().cancleWithConnectionKey(self.verifyCodeRequestKey());
    var requestModel = SPBasePostRequestModel.alloc().init();requestModel.setDelegate(self);
    requestModel.setHostString("http://api.m.shangpin.com/apiv2");
var arr = NSMutableArray.array();arr.addObject("sendPhoneCode4User");requestModel.setPathArguments(arr);
    if (self.bindingType() == 0) {self.setVerifyCodeRequestKey(requestModel.userInfoKeyString());
        requestModel.setOpratorClass(SPVerifyCodeOprator.class());var source = "7";var confirm = "";
        var dic = NSMutableDictionary.dictionary();
        dic.setObject_forKey(self.bindingPhoneTextField().text(), "phone");
        dic.setObject_forKey(source, "source");dic.setObject_forKey(confirm, "confirm");
        requestModel.setPostBodyDict(dic);
    } else if (self.bindingType() == 1) {self.setVerifyCodeRequestKey(requestModel.userInfoKeyString());
        requestModel.setOpratorClass(SPVerifyCodeOprator.class());var source = "9";var confirm = "";
        var dic = NSMutableDictionary.dictionary();
        dic.setObject_forKey(self.bindingPhoneTextField().text(), "phone");
        dic.setObject_forKey(source, "source");dic.setObject_forKey(confirm, "confirm");
        requestModel.setPostBodyDict(dic);
    } else if (self.bindingType() == 2) {self.setVerifyCodeRequestKey(requestModel.userInfoKeyString());
        requestModel.setOpratorClass(EPOprator.class());var source = "2";
        var dic = NSMutableDictionary.dictionary();
        dic.setObject_forKey(self.bindingPhoneTextField().text(), "phone");
        dic.setObject_forKey(source, "source");requestModel.setPostBodyDict(dic);
    } else if (self.bindingType() == 3) {self.setVerifyCodeRequestKey(requestModel.userInfoKeyString());
        requestModel.setOpratorClass(EPOprator.class());var source = "6";
        var dic = NSMutableDictionary.dictionary();
        dic.setObject_forKey(self.bindingPhoneTextField().text(), "phone");
        dic.setObject_forKey(source, "source");requestModel.setPostBodyDict(dic);}
UIApplication.sharedApplication().delegate().connectionCore().requestHttpsWithModel(requestModel);},});
defineClass('SPVerifyPhoneView' ,{nextButtonAction: function() {self.ORIGnextButtonAction();
        self.nextBtn().setUserInteractionEnabled(false);},
    requestVerifyData: function() {self.ORIGrequestVerifyData();self.setUserInteractionEnabled(true);},
    getDataSucess: function(oprator) {self.ORIGgetDataSucess(oprator);
    self.nextBtn().setUserInteractionEnabled(true);},
    getDataFail_requestKey: function(oprator, requestKey) {
        self.ORIGgetDataFail_requestKey(oprator, requestKey);
        self.nextBtn().setUserInteractionEnabled(true);},
    prepareThirdLoginButtonIsHeightLight: function() {self.ORIGprepareThirdLoginButtonIsHeightLight();
    var version = UIDevice.currentDevice().systemVersion().integerValue();
    if (version == 10) {self.qqButton().setHidden(true);self.qqButton().setEnabled(false);}},});
defineClass('SPSCProductModel',['priceColor','shangPinPrice','shangPinPriceColor','isShowDeleteLine'], {
    fillSelfWithDict: function(dict) {self.ORIGfillSelfWithDict(dict);
    var priceColorStr = dict.objectForKey("priceColor");self.setPriceColor(priceColorStr);
    var shangPinPriceStr = dict.objectForKey("shangPinPrice");self.setShangPinPrice(shangPinPriceStr);
    var shangPinPriceColorStr = dict.objectForKey("shangPinPriceColor");
    self.setShangPinPriceColor(shangPinPriceColorStr);
    var isShowDeleteLineStr = dict.objectForKey("isShowDeleteLine");
    self.setIsShowDeleteLine(isShowDeleteLineStr);},});
defineClass('SPNewNewShopCartView', {
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
    var sectionModel = self.shopCartOprator().sectionList().objectAtIndex(indexPath.section());
    var sctionArr = sectionModel.productList();
    var productModel = sctionArr.objectAtIndex(indexPath.row());
    var cell = self.ORIGtableView_cellForRowAtIndexPath(tableView, indexPath);
    if (productModel.priceColor() != null && productModel.priceColor().length() > 0) {
    cell.priceLabel().setTextColor(self.colorWithColorStr(productModel.priceColor()));}
    if (productModel.shangPinPrice() != null && productModel.shangPinPrice().length() > 0) {
    cell.cwwngPriceLable().setText("¥" + productModel.shangPinPrice().toJS());
    }else {cell.cwwngPriceLable().setText("");}
    if (productModel.shangPinPriceColor() != null && productModel.shangPinPriceColor().length() > 0) {
    cell.cwwngPriceLable().setTextColor(self.colorWithColorStr(productModel.shangPinPriceColor()));
    cell.cwwngPriceLableLine().setBackgroundColor(self.colorWithColorStr(productModel.shangPinPriceColor()));}
if (productModel.isShowDeleteLine().isEqualToString("1") && productModel.shangPinPrice().length() > 0) {
    cell.cwwngPriceLableLine().setHidden(false);
    }else {cell.cwwngPriceLableLine().setHidden(true);}return cell;},
    colorWithColorStr: function(colorStr) {
    if (colorStr.length() < 7) {return UIColor.colorWithHex(0x2d2d2d);}
    var rString = colorStr.substringWithRange({location: 1, length: 2});
    var gString = colorStr.substringWithRange({location: 3, length: 2});
    var bString = colorStr.substringWithRange({location: 5, length: 2});
    var r = parseInt(rString.toJS(),16);var g = parseInt(gString.toJS(),16);
    var b = parseInt(bString.toJS(),16);
    var cwwngColor = UIColor.colorWithRed_green_blue_alpha(r/255.0, g/255.0, b/255.0, 1.0);
    return cwwngColor;},});
defineClass('SPNewShopCartBaseCell' ,['cwwngPriceLable', 'cwwngPriceLableLine'],{
            addconstraint: function() {
            self.cellBackView().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.edges().mas__equalTo()(self.contentView());}));
            self.selectedBtn().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
              make.left().centerY().mas__equalTo()(self.cellBackView().cellContentView());
              make.width().mas__equalTo()(36);make.height().mas__equalTo()(56);}));
            self.productImageView().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.left().mas__equalTo()(self.selectedBtn().right());
               make.top().mas__equalTo()(self.cellBackView().cellContentView()).offset()(10);
               make.width().mas__equalTo()(70);make.height().mas__equalTo()(94);}));
            self.productNameLabel().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.top().mas__equalTo()(self.productImageView());
               make.left().mas__equalTo()(self.productImageView().right()).offset()(10);
               make.right().mas__equalTo()(self.cellBackView().cellContentView()).offset()(-10);}));
    self.abroadNationalFlagImageView().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
              make.top().mas__equalTo()(self.productImageView()).offset()(2);
              make.left().mas__equalTo()(self.productNameLabel().right()).offset()(5);
              make.right().mas__equalTo()(self.cellBackView().cellContentView()).offset()(-5);
              make.height().mas__equalTo()(13);}));
            self.colorLabel().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
                 make.left().mas__equalTo()(self.productNameLabel());
                 make.top().mas__equalTo()(self.productNameLabel().bottom()).offset()(5);
                 make.height().mas__equalTo()(self.sizeLabel());}));
        self.sizeLabel().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
        make.left().mas__equalTo()(self.colorLabel().right()).offset()(25);
        make.top().mas__equalTo()(self.colorLabel());
        make.right().mas__lessThanOrEqualTo()(self.cellBackView().cellContentView()).offset()(-10);}));
            self.countryDescLabel().makeConstraints(block('MASConstraintMaker*', function(make) {
          make.top().mas__equalTo()(self.colorLabel().bottom()).offset()(10);
          make.left().mas__equalTo()(self.colorLabel().left());make.height().mas__equalTo()(14);}));
            self.priceLabel().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
             make.left().mas__equalTo()(self.productNameLabel());
             make.centerY().mas__equalTo()(self.countBtn()).offset()(-0.5);}));
            self.priceTagLabel().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
                make.left().mas__equalTo()(self.priceLabel().right());
                make.centerY().mas__equalTo()(self.countBtn()).offset()(-0.5);}));
            self.minusBtn().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.right().mas__equalTo()(self.countBtn().left()).offset()(0);
               make.top().mas__equalTo()(self.colorLabel().bottom()).offset()(25);
               make.width().mas__equalTo()(44);make.height().mas__equalTo()(44);
               make.centerY().mas__equalTo()(self.countBtn()).offset()(0.25);}));
            self.countImageView().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
             make.edges().mas__equalTo()(self.countBtn());}));
            self.countBtn().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.width().mas__equalTo()(36);make.height().mas__equalTo()(25);
               make.right().mas__equalTo()(self.plusBtn().left()).offset()(0);
               make.centerY().mas__equalTo()(self.priceLabel()).offset()(0);}));
            self.plusBtn().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
              make.size().mas__equalTo()(self.minusBtn());
              make.right().mas__equalTo()(self.cellBackView().cellContentView().right()).offset()(13);
              make.centerY().mas__equalTo()(self.countBtn()).offset()(0.25);}));
            self.grayLine().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.left().right().mas__equalTo()(self.cellBackView().cellContentView());
               make.bottom().mas__equalTo()(self.cellBackView().cellContentView()).offset()(-1);
               make.height().mas__equalTo()(0.5);}));
            self.maskView().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.edges().mas__equalTo()(self.cellBackView().cellContentView());}));
            self.roundImgView().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
               make.left().mas__equalTo()(self.selectedBtn().right());make.top().mas__equalTo()(10);
               make.width().mas__equalTo()(24);make.height().mas__equalTo()(24);}));
            self.addNewSubViewsAndConstraints();},
    addNewSubViewsAndConstraints: function() {var cwwngPrice = UILabel.alloc().init();
    cwwngPrice.setBackgroundColor(UIColor.clearColor());cwwngPrice.setTextAlignment(0);
    cwwngPrice.setTextColor(UIColor.colorWithHex(0x2d2d2d));
    cwwngPrice.setFont(UIFont.fontWithName_size("Futura-Medium", 13));
    self.setCwwngPriceLable(cwwngPrice);
    self.cellBackView().cellContentView().addSubview(self.cwwngPriceLable());
    var cwwngLine = UIView.alloc().init();cwwngLine.setHidden(true);
    cwwngLine.setBackgroundColor(UIColor.colorWithHex(0x2d2d2d));
    self.setCwwngPriceLableLine(cwwngLine);
    self.cwwngPriceLable().addSubview(self.cwwngPriceLableLine());
    cwwngPrice.mas__makeConstraints(block('MASConstraintMaker*', function(make) {
      make.left().mas__equalTo()(self.priceTagLabel().right()).offset()(10);
      make.centerY().mas__equalTo()(self.countBtn()).offset()(-0.5);}));
    cwwngLine.mas__makeConstraints(block('MASConstraintMaker*', function(make) {
         make.centerY().mas__equalTo()(self.cwwngPriceLable());
         make.left().mas__equalTo()(self.cwwngPriceLable()).offset()(-5);
         make.right().mas__equalTo()(self.cwwngPriceLable()).offset()(5);
         make.height().mas__equalTo()(0.5);}));},});
defineClass('SPNewShopCartDetailCell: SPNewShopCartBaseCell',{
            addconstraint: function() {self.super().addconstraint();}});
defineClass('SPNewShopCartPromotionCell: SPNewShopCartBaseCell',{
            addconstraint: function() {self.super().addconstraint();}});
defineClass('SPNewShopCartSettlementCell: SPNewShopCartBaseCell',{
            addconstraint: function() {self.super().addconstraint();}});
defineClass('SPNewShopCartPromSettCell: SPNewShopCartBaseCell',{
            addconstraint: function() {self.super().addconstraint();}});
defineClass('SPSecurityModifyController' ,{
    initData: function() {
        var arr = NSMutableArray.alloc().initWithCapacity(2);self.setDataArr(arr);
        for (var i = 0; i < 2; i++) {var tempArr = NSMutableArray.alloc().init();
            if (i == 0) {var model = SPUserSecurityItemModel.alloc().init();
                model.setItemTitle("登录密码");model.setItemTitleStatus("修改");
                tempArr.addObject(model);self.dataArr().addObject(tempArr);}
            if (i == 1) {var model1 = SPUserSecurityItemModel.alloc().init();model1.setItemTitle("邮箱");
                if (SPUserManager.getBindRelation().length() > 2) {var range = {location: 1, length: 1}
                    if (SPUserManager.getBindRelation().substringWithRange(range).isEqualToString("0")) {
                        model1.setItemTitleStatus("未绑定");
                    } else {model1.setItemTitleStatus("已绑定");}}tempArr.addObject(model1);
                self.dataArr().addObject(tempArr);}}},
tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
    if (indexPath.section() == 0) {if (indexPath.row() == 0) {
            var loginVC = SPLoginPasswordController.alloc().init();loginVC.setType("1");
            self.navigationController().pushViewController_animated(loginVC, YES);}
    }else if (indexPath.section() == 1) {if (indexPath.row() == 0) {
    if (SPUserManager.getBindRelation().length() > 2) {var range = {location: 1, length: 1}
        if (SPUserManager.getBindRelation().substringWithRange(range).isEqualToString("0")) {
    var emailVC = SPBindEmailController.alloc().init();emailVC.setType("1");emailVC.setBindOrChange(2);
            self.navigationController().pushViewController_animated(emailVC, YES);
        } else {var userVC = SPBindUserListController.alloc().init();userVC.setBindListCameFrom(0);
            self.navigationController().pushViewController_animated(userVC, YES);}}}}},});
defineClass('SPGiftCardNOPayPasswordView' ,{mas__makeConstraints: function() {
    self.tipIcon().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
      make.centerY().mas__equalTo()(self.centerY()).offset()(-75);
      make.centerX().mas__equalTo()(self);}));
    self.tipLabel().mas__makeConstraints(block('MASConstraintMaker*', function(make) {
       make.top().mas__equalTo()(self.tipIcon().mas__bottom()).offset()(30);
       make.centerX().mas__equalTo()(self);}));},});
defineClass('SPSafeKitManager' ,{
    nextStepAction: function() {SDImageCache.sharedImageCache().setShouldDecompressImages(false);
                SDWebImageDownloader.sharedDownloader().setShouldDecompressImages(false);},});
defineClass('SPCouponsView' ,{actionLogin: function() {self.ORIGactionLogin();
var controller = self.nextResponder();
while (true) {controller = controller.nextResponder();
    if (controller.isKindOfClass(SPViewController.class()) || controller.isKindOfClass(SPTableViewController.class())) {
    if (controller.isKindOfClass(SPActivityGoodsListViewController.class())) {var activity = controller;
        UIApplication.sharedApplication().delegate().setRecordPopController(activity);
        activity.view().addSubview(self.verifyPhoneView());
    } else if (controller.isKindOfClass(SPBrandGoodsListViewController.class())) {var brand = controller;
        UIApplication.sharedApplication().delegate().setRecordPopController(brand);
        brand.view().addSubview(self.verifyPhoneView());
    }break;}}},});
defineClass('SPBindingView' ,{
        prepareSubviews: function() {self.ORIGprepareSubviews();self.titleLable().setText("账号合并声明");
            self.bindingBtn().setTitle_forState("同意合并", 0);
            if(UIScreen.mainScreen().bounds().height == 568.0) {
                 self.contentTextView().setFont(UIFont.systemFontOfSize(11));
            }else if(UIScreen.mainScreen().bounds().height == 480.0) {
                 self.contentTextView().setFont(UIFont.systemFontOfSize(9));}},
        prepareContentString: function() {
            var contentStr = "您输入的手机号码已在尚品网注册过，是否要将当前登录账号和手机账号合并？\r\n\ \r\n\ 1.如果不想合并，请关闭当前页面，输入其他手机号码或直接用手机账号登录；\r\n\ \r\n\ 2.如果选择合并，则当前登录账号会和手机账号合并成一个账号：\r\n\ a)合并后,订单/礼品卡等记录会合到一起,不会丢失；\r\n\ b)合并后,会员等级及权益等会根据两个账号消费金额综合计算，等级有可能会提升；\r\n\ c)合并后,个人资料如头像/性别/生日/地址等均以手机账号的信息为准，当前登录账号的信息暂不考虑；\r\n\ d)合并后，购物车/优惠券/愿望清单等均以手机账号的信息为准，当前登录账号的信息暂不考虑；\r\n\ e)合并后,无论用哪个账号登录，均登录到合并后的账号，登录密码以手机账号的密码为准，如果密码不对，请通过手机/邮箱找回密码；\r\n\ \r\n\ 如有任何问题,请致电尚品客服4006-900-900";return contentStr;},});
defineClass('SPUserCenterView' ,{
    showLoginedHeader: function() {self.ORIGshowLoginedHeader();
    var vipStr = SPUserManager.getTheLevelStr();
    var sizeJS = {width: UIScreen.mainScreen().bounds().width - 30, height: 10};
    var rectVip = vipStr.boundingRectWithSize_options_attributes_context(sizeJS, 1 << 1,
         {NSFontAttributeName: UIFont.systemFontOfSize(10)}, null);var widthVip = rectVip.width;
    self.vipAccessContainer().mas__updateConstraints(block('MASConstraintMaker*', function(make) {
            make.width().mas__equalTo()(widthVip + 10);}));
    self.vipAccessButton().mas__updateConstraints(block('MASConstraintMaker*', function(make) {
             make.width().mas__equalTo()(widthVip + 10);}));},});
defineClass('SPCouponView' ,{actionLogin: function() {self.ORIGactionLogin();
    var controller = self.nextResponder();while (true) {controller = controller.nextResponder();
    if (controller.isKindOfClass(SPViewController.class()) || controller.isKindOfClass(SPTableViewController.class())) {
    if (controller.isKindOfClass(SPActivityGoodsListViewController.class())) {var activity = controller;
        UIApplication.sharedApplication().delegate().setRecordPopController(activity);
        activity.view().addSubview(self.verifyPhoneView());
    } else if (controller.isKindOfClass(SPBrandGoodsListViewController.class())) {var brand = controller;
        UIApplication.sharedApplication().delegate().setRecordPopController(brand);
        brand.view().addSubview(self.verifyPhoneView());}break;}}},});
defineClass('SPEditDeliverAddressController',{getDataSucess: function(oprator) {
                self.saveButton().setEnabled(true);self.ORIGgetDataSucess(oprator);},
    getDataFail: function(oprator) {self.saveButton().setEnabled(true);self.ORIGgetDataFail(oprator);},
    buttonClick: function(sender) {if (sender.tag() == 10086) {self.saveButton().setEnabled(false);
    if (self.addressButton().titleLabel().text().isEqualToString("省市区")) {
        self.saveButton().setEnabled(true);}if (self.addressDescField().text().length() == 0) {
        self.saveButton().setEnabled(true);}if (self.postCodeField().text().length() < 6) {
        self.saveButton().setEnabled(true);}if (self.nameField().text().length() == 0) {
        self.saveButton().setEnabled(true);}if (!self.validatePhoneNumber(self.phoneField().text())) {
        self.saveButton().setEnabled(true);}if (self.identifyField().text().length() > 0) {
        var flag = self.validateIdentityCard(self.identifyField().text());if (!flag) {
        self.saveButton().setEnabled(true);}}}self.ORIGbuttonClick(sender);},
    setup: function() {self.ORIGsetup();self.saveButton().setTag(10086);},});
defineClass('SPTencentLoginCenter' ,{init: function() {
    var version = UIDevice.currentDevice().systemVersion().integerValue();
    if (version == 10) {self = self.super().init();if (self) {
    QQWalletSDK.registerQQWalletApplication_urlScheme_name("1105283905", "qq1105283905", "com.shangpin.ShangPinAPP");}return self;}else {self = self.super().init();
    if (self) {self.ORIGinit();}return self;}},});
defineClass('SPVerifyEmailController' ,{prepareThirdLoginButtonIsHeightLight: function() {
    self.ORIGprepareThirdLoginButtonIsHeightLight();
    var version = UIDevice.currentDevice().systemVersion().integerValue();
    if (version == 10) {self.qqButton().setHidden(true);self.qqButton().setEnabled(false);}},});
defineClass('SPPushLinkWebController' ,{initWithRequestModel: function(model) {self = self.super().init();
    if (self) {self.setShouldShowLoader(true);self.setTargetUrl(model.targetUrl());self.setOriginalTitle(model.originalTitle());self.setBusiness(model.business());self.setShareTitle(model.shareTitle());
    self.setShareImgUrlString(model.shareImgUrl());self.setShareurl(model.shareUrl());self.setAnalyzeValue(model.analyzeValue());NSNotificationCenter.defaultCenter().addObserver_selector_name_object(self, "callBackSucceedOK", "LoginSucceedDismissVerifyPhoneView", null);}return self;},
    callBackSucceedOK: function() {self.performSelector_withObject_afterDelay("scrollLoginOrRegistSuccess", null, 0.1);},});
defineClass('SPInteractionWebViewController' ,{initWithRequestParameterModel: function(model) {
    self = self.super().init();if (self) {self.setShouldShowLoader(true);self.setTitleStr(model.controllerTitle());self.setWapRequestUrl(model.url());self.setCameFromType(model.cameFromType());
    if (model.analyzeValue().length() > 0) {self.setIndexPosition(model.analyzeValue().componentsSeparatedByString("|").lastObject());}NSNotificationCenter.defaultCenter().addObserver_selector_name_object(self, "callBackSucceedOK", "LoginSucceedDismissVerifyPhoneView", null);}return self;},
    callBackSucceedOK: function() {
        self.performSelector_withObject_afterDelay("scrollLoginOrRegistSuccess", null, 0.1);},});

defineClass('SPSubmitOrderBaseView' ,{
            
            manageOprator: function(oprator) {
            
            self.ORIGmanageOprator(oprator);
            if (self.dataOprator()) {
            
            if (oprator.contentModel().buyIds() && oprator.contentModel().buyIds().count() > 0) {
            self.dataOprator().contentModel().setBuyIds(oprator.contentModel().buyIds());
            }
            if (oprator.contentModel().isProductCod() && oprator.contentModel().isProductCod().length() > 0) {
            self.dataOprator().contentModel().setIsProductCod(oprator.contentModel().isProductCod());
            }
            }
            },
            });

