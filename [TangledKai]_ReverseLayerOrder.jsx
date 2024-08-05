///////////////////////////// [TangledKai]/////////////////////////////
// Photoshop ReverseLayerOrder
// by tangled kai
//安裝步驟：
// 1. 將腳本放置於 <Photoshop 目錄>\presets\scripts
// 2. 重新啟動 Photoshop
// 3. 選擇 File -> Scripts -> Corner Editor


var doc = app.activeDocument;

reverseLayerOrder();

function reverseLayerOrder() {
    var layers = [];

    for (var i = 0; i < doc.layers.length; i++) {
        layers.push(doc.layers[i]);
    }

    for (var j = 0; j < layers.length; j++) {
        layers[j].move(doc, ElementPlacement.PLACEATBEGINNING);
    }
}


///////////////////////////// [TangledKai]/////////////////////////////