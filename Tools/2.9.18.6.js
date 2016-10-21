require('NSNotificationCenter, SPInteractionRequestModel')
defineClass('SPPushLinkWebController' ,{

    initWithRequestModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setShouldShowLoader(true);
            self.setTargetUrl(model.targetUrl());
            self.setOriginalTitle(model.originalTitle());
            self.setBusiness(model.business());
            self.setShareTitle(model.shareTitle());
            self.setShareImgUrlString(model.shareImgUrl());
            self.setShareurl(model.shareUrl());
            self.setAnalyzeValue(model.analyzeValue());
            NSNotificationCenter.defaultCenter().addObserver_selector_name_object(self, "callBackSucceedOK", "LoginSucceedDismissVerifyPhoneView", null);
        }
        return self;
    },
    callBackSucceedOK: function() {
        self.performSelector_withObject_afterDelay("scrollLoginOrRegistSuccess", null, 0.1);
    },
});
defineClass('SPInteractionWebViewController' ,{
            
    initWithRequestParameterModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setShouldShowLoader(true);
            self.setTitleStr(model.controllerTitle());
            self.setWapRequestUrl(model.url());
            self.setCameFromType(model.cameFromType());
            if (model.analyzeValue().length() > 0) {
                self.setIndexPosition(model.analyzeValue().componentsSeparatedByString("|").lastObject());
            }
            NSNotificationCenter.defaultCenter().addObserver_selector_name_object(self, "callBackSucceedOK", "LoginSucceedDismissVerifyPhoneView", null);
        }
        return self;
    },
    callBackSucceedOK: function() {
        self.performSelector_withObject_afterDelay("scrollLoginOrRegistSuccess", null, 0.1);
    },
});


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








