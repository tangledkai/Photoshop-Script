///////////////////////////// [TangledKai]/////////////////////////////
// Photoshop LayertoGroup
// by tangled kai
//安裝步驟：
// 1. 將腳本放置於 <Photoshop 目錄>\presets\scripts
// 2. 重新啟動 Photoshop
// 3. 選擇 File -> Scripts -> Corner Editor

function isGroup(layer) {
    return layer.typename === "LayerSet";
}


function groupSelectedLayers() {
    var doc = app.activeDocument;
    var selectedLayers = getSelectedLayers();

    if (selectedLayers.length === 0) {
        alert("最少請選擇兩個圖層。");
        return;
    }


    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (!isGroup(layer)) {
            var groupName = layer.name;
            var newGroup = doc.layerSets.add();
            newGroup.name = groupName;
            layer.move(newGroup, ElementPlacement.INSIDE);
        }
    }
}


function getSelectedLayers() {
    var selectedLayers = [];
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);
    if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
        var layersList = desc.getList(stringIDToTypeID("targetLayers"));
        for (var i = 0; i < layersList.count; i++) {
            var layerIndex = layersList.getReference(i).getIndex();
            selectedLayers.push(app.activeDocument.artLayers[layerIndex]);
        }
    }
    return selectedLayers;
}


groupSelectedLayers();


///////////////////////////// [TangledKai]/////////////////////////////
