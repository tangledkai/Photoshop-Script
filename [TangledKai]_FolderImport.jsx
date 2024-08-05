///////////////////////////// [TangledKai]/////////////////////////////
// Photoshop FolderImport
// by tangled kai
//安裝步驟：
// 1. 將腳本放置於 <Photoshop 目錄>\presets\scripts
// 2. 重新啟動 Photoshop
// 3. 選擇 File -> Scripts -> Corner Editor


var dlg = new Window("dialog", "創建新PSD與圖像");
dlg.orientation = "column";
dlg.alignChildren = ["fill", "top"];

dlg.add("statictext", undefined, "寬度 (像素):");
var widthInput = dlg.add("edittext", undefined, "1920");
widthInput.characters = 10;

dlg.add("statictext", undefined, "高度 (像素):");
var heightInput = dlg.add("edittext", undefined, "1080");
heightInput.characters = 10;

dlg.add("statictext", undefined, "解析度 (ppi):");
var resolutionInput = dlg.add("edittext", undefined, "72");
resolutionInput.characters = 10;

var btnGroup = dlg.add("group");
btnGroup.orientation = "row";
var okBtn = btnGroup.add("button", undefined, "確認");
var cancelBtn = btnGroup.add("button", undefined, "取消", {name: "cancel"});

okBtn.onClick = function() {
    var width = parseInt(widthInput.text);
    var height = parseInt(heightInput.text);
    var resolution = parseInt(resolutionInput.text);
    
    if (isNaN(width) || isNaN(height) || isNaN(resolution)) {
        alert("請輸入有效的數值。");
    } else {
        dlg.close();
        
        var folderPath = Folder.selectDialog("選擇包含圖像的文件夾");
        if (folderPath != null) {
            var imageFiles = folderPath.getFiles(/\.(jpg|jpeg|png|tiff|gif|bmp)$/i);
            
            if (imageFiles.length > 0) {

                var doc = app.documents.add(width, height, resolution, "合併圖像");
                
                for (var i = 0; i < imageFiles.length; i++) {
                    var file = imageFiles[i];
                    try {
                        var imageDoc = open(file);
                        
                        app.activeDocument = imageDoc;
                        
                        imageDoc.selection.selectAll();
                        imageDoc.selection.copy();

                        app.activeDocument = doc;
                        
                        doc.paste();
                        
                        var fileName = decodeURIComponent(file.name).replace(/\.[^\.]+$/, '');
                        doc.activeLayer.name = fileName;
                        
                        imageDoc.close(SaveOptions.DONOTSAVECHANGES);
                    } catch(e) {
                        alert("處理文件 " + decodeURIComponent(file.name) + " 時出錯: " + e);
                    }
                }
                
                alert("所有圖像已導入到新的PSD文件中。");
            } else {
                alert("選定文件夾中沒有找到圖像文件。");
            }
        } else {
            alert("未選擇文件夾。");
        }
    }
}

dlg.show();


///////////////////////////// [TangledKai]/////////////////////////////
