sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function(Controller,JSONModel,MessageToast,MessageBox,Sorter, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("OData_V4.controller.App", {
	onInit : function () {
			var oJSONData = {
				busy : false,
				order: 0
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

		onSearch : function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("LastName", FilterOperator.Contains, sValue);
		
			oView.byId("peopleList").getBinding("items").filter(oFilter, FilterType.Application);
		},

		onSort : function () {
			var oView = this.getView(),
				aStates = [undefined, "asc", "desc"],
				aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
				sMessage,
				iOrder = oView.getModel("appView").getProperty("/order");
			
			
			console.log("oView->",oView);
			console.log("aStates->",aStates);
			console.log("iOrder->",iOrder);
			
			iOrder = (iOrder + 1) % aStates.length;  
			console.log("iOrder2->",iOrder);
			var sOrder = aStates[iOrder];

			oView.getModel("appView").setProperty("/order", iOrder);
			
			oView.byId("peopleList").getBinding("items").sort(sOrder && new Sorter("LastName", sOrder === "desc"));

			sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
			MessageToast.show(sMessage);
		},
		
		_getText:function(sTextId,aArgs){
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId,aArgs);
		}
	});
});