///////////////////////////// [TangledKai]/////////////////////////////
#target photoshop

// 主函數
function main() {
    if (app.documents.length === 0) {
        alert("請先開啟一個文件!");
        return;
    }
    
    var doc = app.activeDocument;
    var visibleGroups = findVisibleGroups(doc);
    
    // 選擇檔案格式
    var fileFormat = chooseFileFormat();
    if (!fileFormat) return; // 如果用戶取消選擇，則退出腳本
    
    for (var i = 0; i < visibleGroups.length; i++) {
        exportGroup(visibleGroups[i], doc, fileFormat);
    }
    
    // 執行完畢後顯示提示
    alert("已經輸出完畢");
}

// 讓用戶選擇檔案格式
function chooseFileFormat() {
    var dialog = new Window("dialog", "選擇儲存格式");
    dialog.orientation = "column";
    
    var formatGroup = dialog.add("group");
    formatGroup.add("statictext", undefined, "選擇儲存格式:");
    var dropdown = formatGroup.add("dropdownlist", undefined, ["JPG", "PNG", "PSD"]);
    dropdown.selection = 0; // 預設選擇 JPG
    
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

// 尋找可見的最外層群組
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

// 檢查是否為子群組
function isSubgroup(group) {
    return group.parent instanceof LayerSet && group.parent !== app.activeDocument;
}

// 匯出群組
function exportGroup(group, doc, format) {
    // 隱藏所有圖層
    hideAllLayers(doc);
    
    // 只顯示當前群組
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

// 儲存為 JPG
function saveAsJPG(doc, file) {
    var jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12; // 最高品質
    jpgSaveOptions.embedColorProfile = false; // 不嵌入顏色配置檔
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.preserveEdges = false;
    jpgSaveOptions.optimized = true;
    doc.saveAs(file, jpgSaveOptions, true, Extension.LOWERCASE);
}

// 儲存為 PNG
function saveAsPNG(doc, file) {
    var pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.compression = 9; // 最高壓縮
    pngSaveOptions.interlaced = false;
    doc.saveAs(file, pngSaveOptions, true, Extension.LOWERCASE);
}

// 儲存為 PSD
function saveAsPSD(doc, group) {
    // 創建文件的副本
    var docCopy = doc.duplicate();
    
    try {
        // 刪除除了目標群組之外的所有頂層群組和圖層
        for (var i = docCopy.layers.length - 1; i >= 0; i--) {
            var layer = docCopy.layers[i];
            if (layer.name !== group.name) {
                layer.remove();
            }
        }

        // 確保目標群組可見
        docCopy.layers[0].visible = true;

        // 設置儲存選項
        var psdSaveOptions = new PhotoshopSaveOptions();
        psdSaveOptions.embedColorProfile = false; // 不嵌入顏色配置檔
        psdSaveOptions.alphaChannels = false; // 不包含 alpha 通道
        psdSaveOptions.layers = true; // 保留圖層
        psdSaveOptions.annotations = false; // 不包含註釋
        psdSaveOptions.spotColors = false; // 不包含特別色

        // 儲存檔案
        var file = new File(doc.path + "/" + group.name + ".psd");
        docCopy.saveAs(file, psdSaveOptions, true, Extension.LOWERCASE);
    } 
    finally {
        // 關閉副本文件而不儲存更改
        docCopy.close(SaveOptions.DONOTSAVECHANGES);
    }
}

// 隱藏所有圖層
function hideAllLayers(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        doc.layers[i].visible = false;
    }
    for (var i = 0; i < doc.layerSets.length; i++) {
        doc.layerSets[i].visible = false;
    }
}

// 執行主函數
main();

///////////////////////////// [TangledKai]/////////////////////////////