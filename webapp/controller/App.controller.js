sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller,JSONModel,MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("OData_V4.controller.App", {
	onInit : function () {
			var oJSONData = {
				busy : false
			};
			var oModel = new JSONModel(oJSONData);
			this.getView().setModel(oModel, "appView");
		},
		//refresh data
		onRefresh : function() {
			var oBinding = this.byId("peopleList").getBinding("items");
			
			if(oBinding.hasPendingChanges()){
				MessageBox.error(this._getText("refreshNotPossibleMessage"));
				return;
			}
			oBinding.refresh();
			MessageToast.show(this._getText("refreshSuccessMessage"));
		},
		
		_getText:function(sTextId,aArgs){
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId,aArgs);
		}
	});
});