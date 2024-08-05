///////////////////////////// [TangledKai]/////////////////////////////
// Photoshop GroupOutput
// by tangled kai
//安裝步驟：
// 1. 將腳本放置於 <Photoshop 目錄>\presets\scripts
// 2. 重新啟動 Photoshop
// 3. 選擇 File -> Scripts -> Corner Editor

function main() {
    if (app.documents.length === 0) {
        alert("請先開啟一個文件!");
        return;
    }
    
    var doc = app.activeDocument;
    var visibleGroups = findVisibleGroups(doc);
    

    var fileFormat = chooseFileFormat();
    if (!fileFormat) return; 
    
    for (var i = 0; i < visibleGroups.length; i++) {
        exportGroup(visibleGroups[i], doc, fileFormat);
    }
    

    alert("圖層已經輸出完成");
}


function chooseFileFormat() {
    var dialog = new Window("dialog", "選擇儲存格式");
    dialog.orientation = "column";
    
    var formatGroup = dialog.add("group");
    formatGroup.add("statictext", undefined, "選擇儲存格式:");
    var dropdown = formatGroup.add("dropdownlist", undefined, ["JPG", "PNG", "PSD"]);
    dropdown.selection = 0;
    
    var buttonGroup = dialog.add("group");
    var okButton = buttonGroup.add("button", undefined, "確定");
    var cancelButton = buttonGroup.add("button", undefined, "取消");
    
    var selectedFormat = null;
    
    okButton.onClick = function() {
        selectedFormat = dropdown.selection.text;
        dialog.close();
    }
    
    cancelButton.onClick = function() {
        dialog.close();
    }
    
    dialog.show();
    
    return selectedFormat;
}


function findVisibleGroups(doc) {
    var visibleGroups = [];
    for (var i = 0; i < doc.layerSets.length; i++) {
        var group = doc.layerSets[i];
        if (group.visible && !isSubgroup(group)) {
            visibleGroups.push(group);
        }
    }
    return visibleGroups;
}


function isSubgroup(group) {
    return group.parent instanceof LayerSet && group.parent !== app.activeDocument;
}


function exportGroup(group, doc, format) {

    hideAllLayers(doc);
    
    group.visible = true;
    
    switch(format) {
        case "JPG":
            var file = new File(doc.path + "/" + group.name + ".jpg");
            saveAsJPG(doc, file);
            break;
        case "PNG":
            var file = new File(doc.path + "/" + group.name + ".png");
            saveAsPNG(doc, file);
            break;
        case "PSD":
            saveAsPSD(doc, group);
            break;
    }
}


function saveAsJPG(doc, file) {
    var jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;
    jpgSaveOptions.embedColorProfile = false;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.preserveEdges = false;
    jpgSaveOptions.optimized = true;
    doc.saveAs(file, jpgSaveOptions, true, Extension.LOWERCASE);
}


function saveAsPNG(doc, file) {
    var pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.compression = 9;
    pngSaveOptions.interlaced = false;
    doc.saveAs(file, pngSaveOptions, true, Extension.LOWERCASE);
}


function saveAsPSD(doc, group) {

    var docCopy = doc.duplicate();
    
    try {

        for (var i = docCopy.layers.length - 1; i >= 0; i--) {
            var layer = docCopy.layers[i];
            if (layer.name !== group.name) {
                layer.remove();
            }
        }


        docCopy.layers[0].visible = true;


        var psdSaveOptions = new PhotoshopSaveOptions();
        psdSaveOptions.embedColorProfile = false;
        psdSaveOptions.alphaChannels = false; 
        psdSaveOptions.layers = true;
        psdSaveOptions.annotations = false;
        psdSaveOptions.spotColors = false;

        var file = new File(doc.path + "/" + group.name + ".psd");
        docCopy.saveAs(file, psdSaveOptions, true, Extension.LOWERCASE);
    } 
    finally {

        docCopy.close(SaveOptions.DONOTSAVECHANGES);
    }
}

function hideAllLayers(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        doc.layers[i].visible = false;
    }
    for (var i = 0; i < doc.layerSets.length; i++) {
        doc.layerSets[i].visible = false;
    }
}


main();


///////////////////////////// [TangledKai]/////////////////////////////