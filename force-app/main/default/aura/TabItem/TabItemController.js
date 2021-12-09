({
    next : function(component, event, helper) {
        //Get the current selected tab value
        var currentTab = component.get("v.selTabId");
         
        if(currentTab == 'tab1'){
            component.set("v.selTabId" , 'tab2');   
        }else if(currentTab == 'tab2'){
            component.set("v.selTabId" , 'tab3');     
        }else if(currentTab == 'tab3'){
            component.set("v.selTabId" , 'tab4');     
        }
    },
     
    back : function(component, event, helper) {
        //Get the current selected tab value  
        var currentTab = component.get("v.selTabId");
         
        if(currentTab == 'tab4'){
            component.set("v.selTabId" , 'tab3');     
        } else if(currentTab == 'tab3'){
            component.set("v.selTabId" , 'tab2');     
        }else if(currentTab == 'tab2'){
            component.set("v.selTabId" , 'tab1'); 
    	}
    },
    closeTool : function(component, event, helper) {
    	helper.closeTool(component);
    },
    showTool: function(component, event, helper) {
    	helper.showTool(component);
    }
})