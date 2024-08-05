///////////////////////////// [TangledKai]/////////////////////////////
// Photoshop LayertoGroup
// by tangled kai
//安裝步驟：
// 1. 將腳本放置於 <Photoshop 目錄>\presets\scripts
// 2. 重新啟動 Photoshop
// 3. 選擇 File -> Scripts -> Corner Editor


#target photoshop

var dlg = new Window("dialog", "重命名圖層組");
dlg.orientation = "column";
dlg.alignChildren = ["fill", "top"];

dlg.add("statictext", undefined, "新名稱:");
var textInput = dlg.add("edittext", undefined, "");
textInput.characters = 20;

dlg.add("statictext", undefined, "模式:");
var modeGroup = dlg.add("group", undefined, "模式:");
modeGroup.orientation = "row";
var appendRadio = modeGroup.add("radiobutton", undefined, "字尾");
var prependRadio = modeGroup.add("radiobutton", undefined, "字首");
var replaceRadio = modeGroup.add("radiobutton", undefined, "替換");
var namereplaceRadio = modeGroup.add("radiobutton", undefined, "名稱排序");

appendRadio.value = true;

var btnGroup = dlg.add("group");
btnGroup.orientation = "row";
var okBtn = btnGroup.add("button", undefined, "確定");
var cancelBtn = btnGroup.add("button", undefined, "取消", {name: "cancel"});


okBtn.onClick = function() {
    var newName = textInput.text;
    if (newName === "") {
        alert("請輸入新名稱。");
        return;
    }
    
    var mode;
    if (appendRadio.value) mode = "append";
    else if (prependRadio.value) mode = "prepend";
    else if (replaceRadio.value) mode = "replace";
    else if (namereplaceRadio.value) mode = "namereplace";

    var layerSets = app.activeDocument.layerSets;
    var groupIndex = 1;

    for (var i = 0; i < layerSets.length; i++) {
        var group = layerSets[i];
        var newGroupName;

        switch (mode) {
            case "append":
                newGroupName = group.name + newName;
                break;
            case "prepend":
                newGroupName = newName + group.name;
                break;
            case "replace":
                newGroupName = newName;
                break;
            case "namereplace":
                newGroupName = newName + formatNumber(groupIndex);
                groupIndex++;
                break;
        }
        group.name = newGroupName;
    }
    dlg.close();
    alert("圖層組已重命名。");
};

function formatNumber(number) {
    return ("00" + number).slice(-3);
}

dlg.show();


///////////////////////////// [TangledKai]/////////////////////////////